import { AppShell } from "@/components/layout/AppShell";
import { Upload, Link2, Music2, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const MOCK_SETLIST = [
  { time: "0:00", title: "Intro", artist: "Unknown", status: "unknown", confidence: 0 },
  { time: "2:14", title: "Acid Rain", artist: "FISHER", status: "identified", confidence: 98 },
  { time: "6:31", title: "WL#0412", artist: "Unknown Artist", status: "unreleased", confidence: 85 },
  { time: "11:02", title: "Modus Operandi", artist: "Charlotte de Witte", status: "unreleased", confidence: 91 },
  { time: "15:44", title: "UNID — make an ID", artist: "Unknown", status: "unknown", confidence: 0 },
  { time: "20:17", title: "Club Classic (Edit)", artist: "Fred again..", status: "unreleased", confidence: 76 },
  { time: "25:33", title: "Steel Factory", artist: "Amelie Lens", status: "unreleased", confidence: 88 },
  { time: "30:11", title: "In My Arms", artist: "Honey Dijon", status: "identified", confidence: 95 },
  { time: "34:58", title: "WL Edit #2", artist: "Unknown", status: "unknown", confidence: 0 },
  { time: "39:20", title: "Night Drive", artist: "DJ Koze", status: "identified", confidence: 97 },
];

const STATUS_CONFIG = {
  identified: { label: "IDENTIFIED", color: "#888", bg: "rgba(136,136,136,0.1)", icon: CheckCircle2 },
  unreleased: { label: "UNRELEASED", color: "#FF3366", bg: "rgba(255,51,102,0.1)", icon: Music2 },
  unknown: { label: "MAKE AN ID", color: "#FF9500", bg: "rgba(255,149,0,0.1)", icon: AlertCircle },
};

export default function SetlistPage() {
  const identified = MOCK_SETLIST.filter((t) => t.status === "identified").length;
  const unreleased = MOCK_SETLIST.filter((t) => t.status === "unreleased").length;
  const unknown = MOCK_SETLIST.filter((t) => t.status === "unknown").length;

  return (
    <AppShell title="SETLIST">
      {/* Header */}
      <div className="border-b border-[#222] px-4 py-5">
        <p className="mb-1 text-xs tracking-[3px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
          SETLIST INTELLIGENCE
        </p>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          UPLOAD ANY DJ SET.
          <br />GET THE FULL TRACKLIST.
        </h1>
        <p className="mt-2 text-sm text-[#888]">
          No other platform does this. Upload up to 3 hours. Released, unreleased, white labels — everything identified.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="border-b border-[#222] p-4">
        <div className="rounded-xl border-2 border-dashed border-[#333] bg-[#111] p-8 text-center hover:border-[#E8FF47]/40 transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto mb-3 text-[#888]" />
          <p className="font-bold text-sm">Drop your set here</p>
          <p className="mt-1 text-xs text-[#888]">MP3, WAV, FLAC, M4A · Up to 3 hours · 500MB max</p>
          <button className="mt-4 rounded-full bg-[#E8FF47] px-6 py-2 text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors">
            Choose file
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#222]" />
          <span className="text-xs text-[#555]">or paste a URL</span>
          <div className="h-px flex-1 bg-[#222]" />
        </div>

        <div className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="url"
              placeholder="SoundCloud or Mixcloud URL..."
              className="w-full rounded-full border border-[#222] bg-[#111] py-2.5 pl-9 pr-4 text-sm text-white placeholder-[#555] outline-none focus:border-[#E8FF47] transition-colors"
            />
          </div>
          <button className="rounded-full bg-[#E8FF47] px-4 py-2 text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors">
            Process
          </button>
        </div>
      </div>

      {/* Example setlist result */}
      <div className="border-b border-[#222] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-sm">Chris Stussy @ Fabric, London</p>
            <p className="text-xs text-[#888]">May 31 · 2:14:00 · {MOCK_SETLIST.length} tracks</p>
          </div>
          <button className="rounded-full border border-[#222] px-3 py-1.5 text-xs text-[#888] hover:border-[#E8FF47] hover:text-[#E8FF47] transition-colors">
            Export →
          </button>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#111] p-3 text-center">
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Mono', monospace" }}>{identified}</p>
            <p className="text-[10px] text-[#888]">IDENTIFIED</p>
          </div>
          <div className="rounded-xl bg-[#FF3366]/10 p-3 text-center">
            <p className="text-2xl font-bold text-[#FF3366]" style={{ fontFamily: "'DM Mono', monospace" }}>{unreleased}</p>
            <p className="text-[10px] text-[#FF3366]">UNRELEASED</p>
          </div>
          <div className="rounded-xl bg-[#FF9500]/10 p-3 text-center">
            <p className="text-2xl font-bold text-[#FF9500]" style={{ fontFamily: "'DM Mono', monospace" }}>{unknown}</p>
            <p className="text-[10px] text-[#FF9500]">NEED ID</p>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div>
        {MOCK_SETLIST.map((track, i) => {
          const config = STATUS_CONFIG[track.status as keyof typeof STATUS_CONFIG];
          const Icon = config.icon;
          return (
            <div key={i} className="flex items-center gap-3 border-b border-[#222] px-4 py-3 hover:bg-[#111]/50 transition-colors">
              {/* Timestamp */}
              <div className="flex w-12 flex-shrink-0 items-center gap-1 text-[#888]">
                <Clock size={10} />
                <span className="text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{track.time}</span>
              </div>

              {/* Track number */}
              <span className="w-5 text-center text-xs text-[#555]">{i + 1}</span>

              {/* Artwork placeholder */}
              <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-[#222] flex items-center justify-center">
                <Music2 size={12} className="text-[#555]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-bold">{track.title}</p>
                <p className="text-xs text-[#888]">{track.artist}</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                  className="hidden rounded-full px-1.5 py-0.5 text-[9px] font-bold sm:inline"
                  style={{ color: config.color, backgroundColor: config.bg, fontFamily: "'DM Mono', monospace", border: `1px solid ${config.color}30` }}
                >
                  {config.label}
                </span>
                <Icon size={14} style={{ color: config.color }} />
              </div>

              {/* Confidence */}
              {track.confidence > 0 && (
                <span className="text-[10px] text-[#555]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {track.confidence}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
