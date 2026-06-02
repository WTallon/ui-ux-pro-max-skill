import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/index";
import { createAdminClient } from "@/lib/supabase/admin";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      const { ticket_id } = intent.metadata;
      if (ticket_id) {
        await supabase
          .from("tickets")
          .update({ status: "confirmed" })
          .eq("id", ticket_id);
        // Increment tickets_sold on the event
        await supabase.rpc("increment_tickets_sold", { event_id: intent.metadata.event_id });
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      const { ticket_id } = intent.metadata;
      if (ticket_id) {
        await supabase
          .from("tickets")
          .update({ status: "cancelled" })
          .eq("id", ticket_id);
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const periodEnd = (sub as unknown as { current_period_end: number }).current_period_end;
      await supabase
        .from("subscriptions")
        .update({
          status: sub.status,
          current_period_end: new Date(periodEnd * 1000).toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
