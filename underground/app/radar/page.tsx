import { AppShell } from "@/components/layout/AppShell";
import { Bell, TrendingUp, Zap, Filter } from "lucide-react";

const GENRES = ["All", "House", "Tech House", "Techno", "Melodic", "D&B", "Trance", "EDM"];
const TIMEFRAMES = ["This Week", "This Month", "All Time"];

const RADAR_ENTRIES = [
  { rank: 1, title: "UNRELEASED ID", artist: "Chris Stussy", score: 97, status: "unreleased", change: +12, plays: 847, notified: false },
  { rank: 2, title: "Modus Operandi", artist: "Charlotte de Witte", score: 89, status: "unreleased", change: +5, plays: 623, notified: true },
  { rank: 3, title: "Acid Rain (WL Edit)", artist: "FISHER", score: 81, status: "white_label", change: +18, plays: 412, notified: false },
  { rank: 4, title: "WL#0412", artist: "Unknown Artist", score: 74, status: "white_label", change: -2, plays: 289, notified: false },
  { rank: 5, title: "Club Classic Edit", artist: "Fred again..", score: 68, status: "unreleased", change: +7, plays: 201, notified: true },
  { rank: 6, title: "Midnight Protocol", artist: "Peggy Gou", score: 61, status: "unreleased", change: +3, plays: 178, notified: false },
  { rank: 7, title: "Steel Factory", artist: "Amelie Lens", score: 55, status: "unreleased", change: +1, plays: 134, notified: false },
  { rank: 8, title: "Berlin Calling (Bootleg)", artist: "Various", score: 48, status: "bootleg", change: -4, plays: 98, notified: false },
  { rank: 9, title: "Future Grooves", artist: "DJ Koze", score: 41, status: "released", change: +9, plays: 876, notified: false },
  { rank: 10, title: "Basement Sessions Vol 3", artist: "Bicep", score: 38, status: "released", change: +2, plays: 654, notified: false },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  unreleased: { label: "UNRELEASED", color: "#FF3366", bg: "rgba(255,51,102,0.1)" },
  white_label: { label: "WHITE LABEL", color: "#FF9500", bg: "rgba(255,149,0,0.1)" },
  bootleg: { label: "BOOTLEG", color: "#9B59B6", bg: "rgba(155,89,182,0.1)" },
  released: { label: "RELEASED", color: "#888", bg: "rgba(136,136,136,0.1)" },
};

export default function RadarPage() {
  return (
    <AppShell title="RADAR">
      {/* Header */}
      <div className="border-b border-[#222] px-4 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={18} className="text-[#E8FF47]" />
          <p className="text-xs tracking-[3px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
            UNDERGROUND RADAR
          </p>
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          WHAT&apos;S BLOWING UP
        </h1>
        <p className="mt-1 text-sm text-[#888]">
          Heat Score tracks every unreleased ID, white label, and bootleg. Updated every 6 hours.
        </p>
      </div>

      {/* Genre Filter */}
      <div className="flex gap-2 overflow-x-auto border-b border-[#222] px-4 py-3">
        {GENRES.map((genre, i) => (
          <button
            key={genre}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
              i === 0 ? "bg-[#E8FF47] text-black font-bold" : "border border-[#222] text-[#888] hover:border-[#333] hover:text-white"
            }`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Timeframe + Filter */}
      <div className="flex items-center justify-between border-b border-[#222] px-4 py-3">
        <div className="flex gap-3">
          {TIMEFRAMES.map((t, i) => (
            <button key={t} className={`text-xs ${i === 0 ? "text-white font-bold" : "text-[#888] hover:text-white"} transition-colors`}>
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors">
          <Filter size={12} /> Filter
        </button>
      </div>

      {/* Radar List */}
      <div>
        {RADAR_ENTRIES.map((entry) => {
          const status = STATUS_CONFIG[entry.status];
          return (
            <div key={entry.rank} className="flex items-center gap-3 border-b border-[#222] px-4 py-3.5 hover:bg-[#111]/50 transition-colors">
              {/* Rank */}
              <span className="w-6 text-center text-sm font-bold text-[#555]" style={{ fontFamily: "'DM Mono', monospace" }}>
                {entry.rank}
              </span>

              {/* Artwork placeholder */}
              <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#222]" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-bold">{entry.title}</p>
                <p className="text-xs text-[#888]">{entry.artist}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ color: status.color, backgroundColor: status.bg, fontFamily: "'DM Mono', monospace", border: `1px solid ${status.color}30` }}
                  >
                    {status.label}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] text-[#888]">
                    <TrendingUp size={9} />
                    {entry.plays.toLocaleString()} plays
                  </span>
                </div>
              </div>

              {/* Change */}
              <span
                className={`text-xs font-bold ${entry.change > 0 ? "text-[#E8FF47]" : entry.change < 0 ? "text-[#FF3366]" : "text-[#888]"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {entry.change > 0 ? `+${entry.change}` : entry.change}
              </span>

              {/* Heat Score */}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  entry.score >= 90 ? "border-[#E8FF47] text-[#E8FF47] heat-90plus" :
                  entry.score >= 70 ? "border-[#FF9500] text-[#FF9500]" :
                  entry.score >= 50 ? "border-[#FF3366] text-[#FF3366]" : "border-[#333] text-[#888]"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {entry.score}
              </div>

              {/* Notify */}
              <button
                className={`flex-shrink-0 rounded-full border px-2 py-1 text-[10px] transition-colors ${
                  entry.notified
                    ? "border-[#E8FF47] text-[#E8FF47] bg-[#E8FF47]/10"
                    : "border-[#333] text-[#888] hover:border-[#E8FF47] hover:text-[#E8FF47]"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Bell size={10} className="inline" />
                {entry.notified ? " ON" : ""}
              </button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
