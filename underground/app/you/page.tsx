import { AppShell } from "@/components/layout/AppShell";
import { Settings, Bell, Bookmark, Music, Calendar, BarChart2, Zap, ChevronRight } from "lucide-react";

const XP_ACTIONS = [
  { action: "Solve a community ID", xp: "+50 XP" },
  { action: "Correct ID confirmed by community", xp: "+100 XP" },
  { action: "First correct ID on a track", xp: "+200 XP" },
  { action: "ID confirmed by artist", xp: "+500 XP" },
  { action: "Daily login streak", xp: "+5 XP" },
];

export default function YouPage() {
  // Mock logged-out state for now
  return (
    <AppShell title="YOU">
      {/* Profile header */}
      <div className="border-b border-[#222] px-4 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#222] flex items-center justify-center text-xl font-bold text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
              ?
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                SIGN IN TO JOIN
              </h2>
              <p className="text-sm text-[#888]">Track IDs. Events. The scene.</p>
            </div>
          </div>
          <button className="text-[#888] hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>

        <div className="mt-4 flex gap-3">
          <a href="/signup" className="flex-1 rounded-full bg-[#E8FF47] py-2.5 text-center text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors">
            Join free
          </a>
          <a href="/login" className="flex-1 rounded-full border border-[#222] py-2.5 text-center text-sm text-[#888] hover:border-[#333] hover:text-white transition-colors">
            Sign in
          </a>
        </div>
      </div>

      {/* Reputation teaser */}
      <div className="border-b border-[#222] px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-[#E8FF47]" />
          <span className="text-xs tracking-[3px] text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>
            FAN REPUTATION SYSTEM
          </span>
        </div>
        <div className="space-y-2">
          {[
            { level: "LVL 1", name: "ID Hunter", xp: "0–500 XP", color: "#888" },
            { level: "LVL 2", name: "Crate Digger", xp: "500–2K XP", color: "#00D4FF" },
            { level: "LVL 3", name: "Underground Expert", xp: "2K–10K XP", color: "#E8FF47" },
            { level: "LVL 4", name: "Scene Legend", xp: "10K+ XP", color: "#FF9500" },
          ].map((level) => (
            <div key={level.level} className="flex items-center gap-3 rounded-lg bg-[#111] px-3 py-2">
              <span className="text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>{level.level}</span>
              <span className="flex-1 text-sm font-bold" style={{ color: level.color }}>{level.name}</span>
              <span className="text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>{level.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="border-b border-[#222] px-4 py-4">
        <p className="mb-3 text-xs text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>QUICK ACCESS</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Music, label: "My Crates", href: "/crates" },
            { icon: Bookmark, label: "Saved Tracks", href: "/saved" },
            { icon: Calendar, label: "Events", href: "/events" },
            { icon: Bell, label: "Notifications", href: "/notifications" },
            { icon: BarChart2, label: "Dashboard", href: "/dashboard" },
            { icon: Zap, label: "Reputation", href: "/reputation" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2.5 rounded-xl border border-[#222] bg-[#111] p-3 hover:border-[#333] transition-colors"
            >
              <Icon size={16} className="text-[#888]" />
              <span className="text-sm">{label}</span>
              <ChevronRight size={14} className="ml-auto text-[#555]" />
            </a>
          ))}
        </div>
      </div>

      {/* How to earn XP */}
      <div className="px-4 py-4">
        <p className="mb-3 text-xs text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>HOW TO EARN XP</p>
        <div className="space-y-1">
          {XP_ACTIONS.map(({ action, xp }) => (
            <div key={action} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-[#111] transition-colors">
              <span className="text-sm text-[#ccc]">{action}</span>
              <span className="text-sm font-bold text-[#E8FF47]" style={{ fontFamily: "'DM Mono', monospace" }}>{xp}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
