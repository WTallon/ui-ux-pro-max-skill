import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Fan",
    price: "Free",
    period: "forever",
    color: "#888",
    description: "For every fan in the scene.",
    features: [
      "Full social feed access",
      "Browse events & buy tickets",
      "3 track IDs per day",
      "Follow artists, venues, scenes",
      "Community ID voting",
      "Basic reputation system",
      "Tonight Near Me",
    ],
    cta: "Join free",
    href: "/signup",
    featured: false,
  },
  {
    name: "Fan Pass",
    price: "$5",
    period: "per month",
    color: "#E8FF47",
    description: "For fans who live and breathe the scene.",
    features: [
      "Everything in Fan",
      "Unlimited track IDs",
      "Priority ID processing",
      "Notify Me on any track",
      "City digest emails",
      "Early access to secret events",
      "Fan Pass badge on profile",
    ],
    cta: "Get Fan Pass",
    href: "/signup?plan=fan_pass",
    featured: true,
  },
  {
    name: "DJ Pro",
    price: "$15",
    period: "per month",
    color: "#00D4FF",
    description: "For DJs who want to build a following.",
    features: [
      "Everything in Fan Pass",
      "Setlist Intelligence — 10 uploads/mo",
      "Full analytics dashboard",
      "Booking marketplace inbox",
      "Priority feed placement",
      "Verified DJ badge",
      "Booking inquiry management",
    ],
    cta: "Get DJ Pro",
    href: "/signup?plan=dj_pro",
    featured: false,
  },
  {
    name: "Venue Pro",
    price: "$50–200",
    period: "per month",
    color: "#9B59B6",
    description: "For venues selling tickets and building a crowd.",
    features: [
      "Everything in DJ Pro",
      "Event ticketing (2.5% fee only)",
      "Stripe Connect payouts",
      "Aftermovie uploads",
      "City featured placement",
      "Venue analytics",
      "Dedicated support",
    ],
    cta: "Get Venue Pro",
    href: "/signup?plan=venue_pro",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#080808] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/">
            <span className="text-2xl font-bold tracking-widest text-[#E8FF47]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>UNDERGROUND</span>
          </Link>
          <h1 className="mt-6 text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            SIMPLE PRICING.
            <br />
            <span className="text-[#E8FF47]">FREE FOR FANS.</span>
          </h1>
          <p className="mt-4 text-[#888]">No ads. No algorithmic suppression. No bullshit.</p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${
                plan.featured
                  ? "border-[#E8FF47] bg-[#E8FF47]/5"
                  : "border-[#222] bg-[#111]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#E8FF47] px-3 py-0.5 text-[10px] font-bold text-black" style={{ fontFamily: "'DM Mono', monospace" }}>
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-4">
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{ fontFamily: "'DM Mono', monospace", color: plan.color, backgroundColor: `${plan.color}15`, border: `1px solid ${plan.color}30` }}
                >
                  {plan.name.toUpperCase()}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", color: plan.color }}>
                  {plan.price}
                </span>
                {plan.period !== "forever" && (
                  <span className="ml-1 text-sm text-[#888]">/{plan.period}</span>
                )}
              </div>

              <p className="mb-6 text-sm text-[#888]">{plan.description}</p>

              <ul className="mb-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 flex-shrink-0 text-[#E8FF47]" />
                    <span className="text-[#ccc]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full rounded-full py-2.5 text-center text-sm font-bold transition-colors ${
                  plan.featured
                    ? "bg-[#E8FF47] text-black hover:bg-[#d4eb3d]"
                    : "border border-[#222] text-[#888] hover:border-[#333] hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Label Pro note */}
        <div className="mt-6 rounded-2xl border border-[#FF9500]/30 bg-[#FF9500]/5 p-6 text-center">
          <span className="text-[10px] text-[#FF9500]" style={{ fontFamily: "'DM Mono', monospace" }}>LABEL PRO</span>
          <p className="mt-2 font-bold">Label accounts from $49–500/month</p>
          <p className="mt-1 text-sm text-[#888]">Roster management, release calendars, A&R intelligence, trend reports. Contact us for pricing.</p>
          <Link href="mailto:labels@ugscene.app" className="mt-3 inline-block rounded-full border border-[#FF9500]/50 px-4 py-1.5 text-sm text-[#FF9500] hover:bg-[#FF9500]/10 transition-colors">
            Contact for Label Pro →
          </Link>
        </div>

        {/* Ticketing note */}
        <div className="mt-4 rounded-xl border border-[#222] bg-[#111] p-4 text-center">
          <p className="text-sm text-[#888]">
            <span className="font-bold text-white">Ticketing</span> — We take 2.5%. You keep 97.5%.
            No Eventbrite. No hidden fees. Payouts via Stripe Connect.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#888] hover:text-white transition-colors">
            ← Back to Underground
          </Link>
        </div>
      </div>
    </div>
  );
}
