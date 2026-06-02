import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PLATFORM_FEE_PERCENT = 2.5;
export const BOOKING_FEE_PERCENT = 5;

export function calculatePlatformFee(ticketPrice: number): number {
  return Math.round(ticketPrice * (PLATFORM_FEE_PERCENT / 100));
}
