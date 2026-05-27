import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripeClient(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(key, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

// Re-export for convenience in webhook (used via getStripeClient())
export { getStripeClient as stripe }

export const TEST_FEE_AMOUNT = 1500 // $15.00 in cents
export const SUBSCRIPTION_AMOUNT = 9900 // $99.00 in cents

export async function createTestFeeCheckout(freelancerUserId: string, applicationId: string) {
  const s = getStripeClient()
  const session = await s.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ProvenHire Skill Test Fee',
            description: 'One-time fee to access and complete the skill verification test',
          },
          unit_amount: TEST_FEE_AMOUNT,
        },
        quantity: 1,
      },
    ],
    metadata: {
      freelancer_user_id: freelancerUserId,
      application_id: applicationId,
      type: 'test_fee',
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/freelancer/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/freelancer/apply?payment=cancelled`,
  })
  return session
}

export async function createSubscriptionCheckout(clientUserId: string, stripeCustomerId?: string) {
  const s = getStripeClient()
  const session = await s.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer: stripeCustomerId,
    line_items: [
      {
        price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      client_user_id: clientUserId,
      type: 'subscription',
    },
    subscription_data: {
      metadata: { client_user_id: clientUserId },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard?subscribed=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard?payment=cancelled`,
  })
  return session
}
