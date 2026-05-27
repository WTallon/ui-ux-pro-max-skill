import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { sendTestFeeConfirmedEmail, sendSubscriptionConfirmedEmail } from '@/lib/resend'
import type Stripe from 'stripe'

interface StripeSubscriptionExtended extends Stripe.Subscription {
  current_period_end: number
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripeClient().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const admin = createSupabaseAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.metadata?.type === 'test_fee') {
          const applicationId = session.metadata.application_id
          const userId = session.metadata.freelancer_user_id
          if (applicationId) {
            await admin
              .from('applications')
              .update({
                test_fee_paid: true,
                stripe_payment_intent_id: session.payment_intent as string,
              })
              .eq('id', applicationId)
          }
          const { data: user } = await admin
            .from('users')
            .select('email')
            .eq('id', userId)
            .single()
          const { data: profile } = await admin
            .from('freelancer_profiles')
            .select('name')
            .eq('user_id', userId)
            .single()
          if (user?.email && profile?.name) {
            await sendTestFeeConfirmedEmail(user.email, profile.name)
          }
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as StripeSubscriptionExtended
        const userId = sub.metadata?.client_user_id
        if (!userId) break
        const { data: clientProfile } = await admin
          .from('client_profiles')
          .select('id')
          .eq('user_id', userId)
          .single()
        if (!clientProfile) break

        await admin
          .from('client_profiles')
          .update({
            subscription_status: sub.status as string,
            stripe_customer_id: sub.customer as string,
          })
          .eq('user_id', userId)

        await admin.from('subscriptions').upsert(
          {
            client_id: clientProfile.id,
            stripe_subscription_id: sub.id,
            status: sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          },
          { onConflict: 'stripe_subscription_id' }
        )

        if (event.type === 'customer.subscription.created') {
          const { data: user } = await admin
            .from('users')
            .select('email')
            .eq('id', userId)
            .single()
          const { data: cp } = await admin
            .from('client_profiles')
            .select('company_name')
            .eq('user_id', userId)
            .single()
          if (user?.email && cp?.company_name) {
            await sendSubscriptionConfirmedEmail(user.email, cp.company_name)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await admin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', sub.id)
        const userId = sub.metadata?.client_user_id
        if (userId) {
          await admin
            .from('client_profiles')
            .update({ subscription_status: 'canceled' })
            .eq('user_id', userId)
        }
        break
      }
    }
  } catch (err) {
    console.error('[Webhook] Handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
