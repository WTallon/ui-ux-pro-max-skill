import Link from "next/link";
import { ArrowRight, Zap, MapPin, Play, Radio, Users, Music } from "lucide-react";

const TICKER_ITEMS = [
  "Chris Stussy just announced Miami Friday",
  "UNRELEASED ID reached Heat Score 97",
  "Berghain warehouse rave → 3 tickets left",
  "New Skrillex x Fred again collab dropped",
  "Ultra Miami lineup confirmed",
  "Aftermovie from last week's Fabric posted",
  "ID solved: Charlotte de Witte closing track",
  "Detroit scene is blowing up this month",
];

const ROLES = [
  {
    role: "Fan",
    color: "#888",
    headline: "Be the first to know.",
    points: [
      "Track every unreleased ID you've been chasing",
      "See what's playing at every club tonight",
      "Earn XP solving track IDs — become a Scene Legend",
      "Build crates with released + unreleased music",
    ],
  },
  {
    role: "DJ",
    color: "#00D4FF",
    headline: "Your sets, identified.",
    points: [
      "Upload any mix → get a full timestamped tracklist",
      "Every follower sees your show announcements",
      "Get booked through the marketplace",
      "Analytics on who follows you and from where",
    ],
  },
  {
    role: "Producer",
    color: "#00D4FF",
    headline: "Track your music's journey.",
    points: [
      "See which DJs are playing your unreleased tracks",
      "Watch your Heat Score climb before release day",
      "Get structured feedback from the scene",
      "Build an audience before you need a label",
    ],
  },
  {
    role: "Venue",
    color: "#9B59B6",
    headline: "Sell tickets. Build your crowd.",
    points: [
      "Post events with full lineups",
      "Sell tickets directly — 97.5% goes to you",
      "Build a venue following that actually shows up",
      "Upload aftermovies and grow year-round",
    ],
  },
  {
    role: "Promoter",
    color: "#FF9500",
    headline: "Find acts. Fill rooms.",
    points: [
      "Browse DJs by fee, genre, availability",
      "Manage ticket sales across every show",
      "Target city audiences by genre and scene",
      "Track velocity: know when you'll sell out",
    ],
  },
  {
    role: "Label",
    color: "#FF9500",
    headline: "Scout the underground.",
    points: [
      "Heat Score shows what the scene is reacting to",
      "Find emerging artists before anyone else",
      "Manage release calendars and announcements",
      "Promote drops to followers who actually listen",
    ],
  },
];

const FEATURED_EVENTS = [
  {
    name: "Klubnacht",
    venue: "Berghain",
    city: "Berlin",
    date: "SAT JUN 7",
    price: 15,
    sold_pct: 72,
    genres: ["Techno", "Industrial"],
  },
  {
    name: "Fabric Live",
    venue: "Fabric",
    city: "London",
    date: "FRI JUN 6",
    price: 22,
    sold_pct: 55,
    genres: ["Drum & Bass", "House"],
  },
  {
    name: "Space Opening",
    venue: "Space Ibiza",
    city: "Ibiza",
    date: "SUN JUN 8",
    price: 40,
    sold_pct: 89,
    genres: ["Tech House", "Deep House"],
  },
];

const RADAR_TRACKS = [
  { rank: 1, title: "UNRELEASED ID", artist: "Chris Stussy", score: 97, status: "unreleased" },
  { rank: 2, title: "Modus Operandi", artist: "Charlotte de Witte", score: 89, status: "unreleased" },
  { rank: 3, title: "Acid Rain", artist: "FISHER", score: 81, status: "released" },
  { rank: 4, title: "WL#0412", artist: "Unknown", score: 74, status: "white_label" },
  { rank: 5, title: "Club Classic Edit", artist: "Fred again..", score: 68, status: "unreleased" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#222] bg-[#080808]/95 px-6 py-4 backdrop-blur-md">
        <span
          className="text-2xl font-bold tracking-widest text-[#E8FF47]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          UNDERGROUND
        </span>
        <div className="flex items-center gap-4">
          <Link href="/feed" className="text-sm text-[#888] hover:text-white transition-colors">Feed</Link>
          <Link href="/radar" className="text-sm text-[#888] hover:text-white transition-colors">Radar</Link>
          <Link href="/tonight" className="text-sm text-[#888] hover:text-white transition-colors">Tonight</Link>
          <Link href="/login" className="text-sm text-[#888] hover:text-white transition-colors">Sign in</Link>
          <Link href="/signup" className="rounded-full bg-[#E8FF47] px-4 py-1.5 text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors">
            Join free
          </Link>
        </div>
      </nav>

      {/* Live Ticker */}
      <div className="overflow-hidden border-b border-[#222] bg-[#111] py-2">
        <div className="flex whitespace-nowrap" style={{ animation: "scroll 35s linear infinite" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-sm text-[#888]">
              <span className="mr-2 text-[#E8FF47]">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[#E8FF47]/5 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-[#00D4FF]/5 blur-3xl" />
        </div>

        {/* Waveform */}
        <div className="mx-auto mb-8 flex h-16 items-end justify-center gap-[3px]">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = Math.abs(Math.sin(i * 0.5)) * 70 + 20;
            return (
              <div
                key={i}
                className="w-1 rounded-full bg-[#E8FF47]/30"
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>

        <h1
          className="mb-4 text-7xl font-bold leading-none tracking-wider md:text-9xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          EVERYTHING
          <br />
          <span className="text-[#E8FF47]">ELECTRONIC</span>
          <br />
          IN ONE PLACE.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-[#888]">
          Instagram + SoundCloud + Eventbrite + Beatport + RA + 1001Tracklists — replaced by one
          feed that actually understands the scene.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-full bg-[#E8FF47] px-8 py-3 font-bold text-black transition-all hover:bg-[#d4eb3d] hover:gap-3"
          >
            Join the underground
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/radar"
            className="flex items-center gap-2 rounded-full border border-[#222] px-8 py-3 text-[#888] transition-colors hover:border-[#333] hover:text-white"
          >
            <Radio size={16} />
            See what&apos;s hot right now
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#888]">
          Free forever for fans. No algorithmic suppression. No bullshit.
        </p>
      </section>

      {/* 5 Pillars */}
      <section className="border-t border-[#222] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-center text-sm tracking-[4px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
            FIVE PILLARS
          </p>
          <h2 className="mb-12 text-center text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ONE PLATFORM. EVERYTHING.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Users, name: "SOCIAL SCENE", tab: "FEED", desc: "Posts, follows, reposts. No algorithm hiding your content.", color: "#E8FF47" },
              { icon: Music, name: "SETLIST INTEL", tab: "SETS", desc: "Upload any DJ set. Get a full timestamped tracklist.", color: "#00D4FF" },
              { icon: Radio, name: "RADAR", tab: "RADAR", desc: "Heat Score rankings. What's blowing up before it blows up.", color: "#FF3366" },
              { icon: Play, name: "UNDERGROUND TV", tab: "TV", desc: "Vertical video feed built exclusively for electronic music.", color: "#FF9500" },
              { icon: MapPin, name: "TONIGHT NEAR ME", tab: "TONIGHT", desc: "What's happening tonight, near you, right now.", color: "#9B59B6" },
            ].map(({ icon: Icon, name, tab, desc, color }) => (
              <div key={name} className="card-hover rounded-xl border border-[#222] bg-[#111] p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="mb-1 text-xs tracking-[2px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  TAB: {tab}
                </p>
                <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", color }}>{name}</h3>
                <p className="text-sm text-[#666]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="border-t border-[#222] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm tracking-[4px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
                HAPPENING NOW
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                EVENTS THIS WEEK
              </h2>
            </div>
            <Link href="/events" className="flex items-center gap-1 text-sm text-[#888] hover:text-white transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURED_EVENTS.map((event) => (
              <div key={event.name} className="card-hover overflow-hidden rounded-xl border border-[#222] bg-[#111]">
                <div className="relative h-40 bg-gradient-to-br from-[#222] to-[#111] flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#333]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {event.venue.slice(0, 2).toUpperCase()}
                  </span>
                  {event.sold_pct >= 85 && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#FF3366] px-2 py-0.5 text-[10px] font-bold text-white">
                      ALMOST SOLD OUT
                    </span>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-[#080808]/80 px-2 py-0.5 text-xs text-[#888]">
                    {event.date}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mb-0.5 font-bold">{event.name}</h3>
                  <p className="mb-2 text-sm text-[#888]">{event.venue} · {event.city}</p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {event.genres.map((g) => (
                      <span key={g} className="rounded-full bg-[#222] px-2 py-0.5 text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div className="h-1 w-full rounded-full bg-[#222]">
                      <div className="h-1 rounded-full" style={{ width: `${event.sold_pct}%`, backgroundColor: event.sold_pct >= 85 ? "#FF3366" : "#E8FF47" }} />
                    </div>
                    <p className="mt-1 text-[10px] text-[#888]">{event.sold_pct}% sold</p>
                  </div>
                  <button className="w-full rounded-full bg-[#E8FF47] py-2 text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors">
                    Get tickets — €{event.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radar Preview */}
      <section className="border-t border-[#222] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-1 text-sm tracking-[4px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
                UNDERGROUND RADAR
              </p>
              <h2 className="mb-4 text-5xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                WHAT&apos;S BLOWING UP<br />BEFORE IT BLOWS UP.
              </h2>
              <p className="mb-8 text-[#888]">
                Heat Score tracks every unreleased ID, white label, and bootleg across the scene.
                Know what DJs are playing before it&apos;s on Beatport.
              </p>
              <Link href="/radar" className="inline-flex items-center gap-2 rounded-full bg-[#E8FF47] px-6 py-2.5 font-bold text-black hover:bg-[#d4eb3d] transition-colors">
                <Zap size={16} />
                Open Radar
              </Link>
            </div>
            <div className="space-y-2">
              {RADAR_TRACKS.map((track) => (
                <div key={track.rank} className="flex items-center gap-4 rounded-xl border border-[#222] bg-[#111] p-4 card-hover">
                  <span className="w-6 text-center text-sm text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>{track.rank}</span>
                  <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#222]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs text-[#888]">{track.artist}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      track.status === "unreleased"
                        ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                        : track.status === "white_label"
                        ? "bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/30"
                        : "bg-[#222] text-[#888]"
                    }`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {track.status.replace("_", " ").toUpperCase()}
                  </span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      track.score >= 90 ? "border-[#E8FF47] text-[#E8FF47] heat-90plus" : track.score >= 70 ? "border-[#FF9500] text-[#FF9500]" : "border-[#FF3366] text-[#FF3366]"
                    }`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {track.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-[#222] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-center text-sm tracking-[4px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
            FOR EVERYONE IN THE SCENE
          </p>
          <h2 className="mb-12 text-center text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            YOUR ROLE. YOUR TOOLS.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div key={r.role} className="card-hover rounded-xl border border-[#222] bg-[#111] p-6">
                <div className="mb-4">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ fontFamily: "'DM Mono', monospace", backgroundColor: `${r.color}15`, color: r.color, border: `1px solid ${r.color}30` }}
                  >
                    {r.role.toUpperCase()}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{r.headline}</h3>
                <ul className="space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-[#888]">
                      <span className="mt-0.5 text-[#E8FF47]">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="border-t border-[#222] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-center text-sm tracking-[4px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
            13 LAUNCH CITIES
          </p>
          <h2 className="mb-8 text-center text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            YOUR SCENE. EVERYWHERE.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Miami", "Berlin", "London", "NYC", "Chicago", "Ibiza", "Amsterdam", "Detroit", "Melbourne", "São Paulo", "Barcelona", "Paris", "Tokyo"].map((city) => (
              <Link key={city} href={`/scenes/${city.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-full border border-[#222] bg-[#111] px-5 py-2 text-sm text-[#888] hover:border-[#E8FF47] hover:text-[#E8FF47] transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#222] px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-6xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            JOIN THE <span className="text-[#E8FF47]">UNDERGROUND.</span>
          </h2>
          <p className="mb-10 text-[#888]">Free for fans. No algorithm. No ads. Just the scene.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#E8FF47] px-10 py-4 text-lg font-bold text-black hover:bg-[#d4eb3d] transition-colors">
            Get started free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-lg font-bold tracking-widest text-[#E8FF47]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            UNDERGROUND
          </span>
          <p className="text-sm text-[#888]">Everything electronic in one place.</p>
          <div className="flex gap-4 text-sm text-[#888]">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
