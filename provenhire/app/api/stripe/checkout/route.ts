import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, requireAuth, parseBody } from '@/lib/api-helpers'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { createTestFeeCheckout, createSubscriptionCheckout } from '@/lib/stripe'
import { z } from 'zod'

const checkoutSchema = z.object({
  type: z.enum(['test_fee', 'subscription']),
})

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const auth = await requireAuth(req)
      if (auth instanceof NextResponse) return auth

      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = checkoutSchema.safeParse(body)
      if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

      const admin = createSupabaseAdminClient()

      if (parsed.data.type === 'test_fee') {
        if (auth.role !== 'freelancer')
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        const { data: profile } = await admin
          .from('freelancer_profiles')
          .select('id')
          .eq('user_id', auth.userId)
          .single()
        if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        const { data: app } = await admin
          .from('applications')
          .select('id, test_fee_paid')
          .eq('freelancer_id', profile.id)
          .single()
        if (app?.test_fee_paid)
          return NextResponse.json({ error: 'Test fee already paid' }, { status: 400 })
        const session = await createTestFeeCheckout(auth.userId, app?.id ?? '')
        return NextResponse.json({ url: session.url })
      }

      if (parsed.data.type === 'subscription') {
        if (auth.role !== 'client')
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        const { data: clientProfile } = await admin
          .from('client_profiles')
          .select('stripe_customer_id')
          .eq('user_id', auth.userId)
          .single()
        const session = await createSubscriptionCheckout(
          auth.userId,
          clientProfile?.stripe_customer_id ?? undefined
        )
        return NextResponse.json({ url: session.url })
      }

      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    },
    { rateLimit: 'api' }
  )
}
