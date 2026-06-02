import { AppShell } from "@/components/layout/AppShell";
import { Heart, MessageCircle, Repeat2, Share2, Music, MapPin, Zap } from "lucide-react";

const CITY_PILLS = ["All Cities", "Berlin", "London", "NYC", "Miami", "Ibiza", "Chicago", "Detroit"];

const FEED_TABS = ["For You", "Following", "Releases", "Events", "Sets"];

const MOCK_POSTS = [
  {
    id: 1,
    author: "Chris Stussy",
    handle: "chrisstussy",
    role: "DJ",
    roleColor: "#00D4FF",
    avatar: null,
    verified: true,
    time: "2h",
    city: "Amsterdam",
    type: "event_share",
    content: "Playing Miami next Friday at Club Space. Gonna go deep. See you there 🔊",
    likes: 847,
    comments: 62,
    reposts: 124,
    event: { name: "Club Space Miami", date: "FRI JUN 6", tickets_left: 47 },
  },
  {
    id: 2,
    author: "Miss Monique",
    handle: "missmonique",
    role: "DJ",
    roleColor: "#00D4FF",
    avatar: null,
    verified: true,
    time: "4h",
    city: "Kyiv",
    type: "set",
    content: "Set from last night's Tresor show is up. Full tracklist auto-identified via Setlist Intelligence — including the two IDs everyone's been asking about.",
    likes: 1204,
    comments: 89,
    reposts: 341,
    set: { name: "Tresor Berlin Set", duration: "2:14:00", identified: 31, total: 33 },
  },
  {
    id: 3,
    author: "FISHER",
    handle: "fisher",
    role: "Producer",
    roleColor: "#00D4FF",
    avatar: null,
    verified: true,
    time: "6h",
    city: "Sydney",
    type: "teaser",
    content: "New one. Out this summer. Heat Score already at 74 and it hasn't even dropped yet 🔥",
    likes: 3891,
    comments: 214,
    reposts: 891,
    track: { title: "UNRELEASED ID", heat_score: 74, status: "unreleased" },
  },
  {
    id: 4,
    author: "Berghain Berlin",
    handle: "berghain",
    role: "Venue",
    roleColor: "#9B59B6",
    avatar: null,
    verified: true,
    time: "8h",
    city: "Berlin",
    type: "event_share",
    content: "Klubnacht this Saturday. Doors open midnight. Limited tickets remain.",
    likes: 2134,
    comments: 178,
    reposts: 567,
    event: { name: "Klubnacht", date: "SAT JUN 7", tickets_left: 23 },
  },
  {
    id: 5,
    author: "scene_hunter_99",
    handle: "scenehunter",
    role: "Fan",
    roleColor: "#888",
    avatar: null,
    verified: false,
    time: "10h",
    city: "London",
    type: "text",
    content: "That closing track Charlotte played at Fabric last night — someone please ID it. Posted the clip to community IDs. 4 suggestions so far, none confirmed.",
    likes: 312,
    comments: 47,
    reposts: 28,
  },
];

function PostCard({ post }: { post: (typeof MOCK_POSTS)[0] }) {
  const initials = post.author.slice(0, 2).toUpperCase();

  return (
    <article className="border-b border-[#222] px-4 py-4 hover:bg-[#111]/50 transition-colors">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm">{post.author}</span>
            {post.verified && <span className="text-[#E8FF47] text-xs">✓</span>}
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px]"
              style={{ fontFamily: "'DM Mono', monospace", backgroundColor: `${post.roleColor}15`, color: post.roleColor, border: `1px solid ${post.roleColor}20` }}
            >
              {post.role.toUpperCase()}
            </span>
            <span className="text-[#888] text-xs">@{post.handle}</span>
            <span className="text-[#555] text-xs">·</span>
            <span className="text-[#555] text-xs">{post.time}</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-[#555]">
              <MapPin size={10} />
              {post.city}
            </span>
          </div>

          {/* Content */}
          <p className="mt-1.5 text-sm text-[#ccc] leading-relaxed">{post.content}</p>

          {/* Attached cards */}
          {post.event && (
            <div className="mt-3 rounded-xl border border-[#222] bg-[#111] p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">{post.event.name}</p>
                <p className="text-[10px] text-[#888]">{post.event.date} · {post.event.tickets_left} tickets left</p>
              </div>
              <button className="rounded-full bg-[#E8FF47] px-3 py-1 text-xs font-bold text-black">
                Get tickets
              </button>
            </div>
          )}

          {post.set && (
            <div className="mt-3 rounded-xl border border-[#222] bg-[#111] p-3 flex items-center gap-3">
              <div className="flex items-center gap-[2px] h-8">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-[2px] rounded-full bg-[#E8FF47]/40" style={{ height: `${Math.abs(Math.sin(i * 0.6)) * 70 + 20}%` }} />
                ))}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{post.set.name}</p>
                <p className="text-[10px] text-[#888]">{post.set.duration} · {post.set.identified}/{post.set.total} tracks identified</p>
              </div>
              <button className="rounded-full border border-[#222] px-3 py-1 text-xs text-[#888] hover:border-[#E8FF47] hover:text-[#E8FF47] transition-colors">
                View setlist
              </button>
            </div>
          )}

          {post.track && (
            <div className="mt-3 rounded-xl border border-[#FF3366]/20 bg-[#FF3366]/5 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Music size={16} className="text-[#FF3366]" />
                <div>
                  <p className="text-xs font-bold">{post.track.title}</p>
                  <span className="text-[10px] text-[#FF3366]" style={{ fontFamily: "'DM Mono', monospace" }}>
                    UNRELEASED
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FF9500] text-[10px] font-bold text-[#FF9500]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {post.track.heat_score}
                </div>
                <button className="rounded-full border border-[#E8FF47]/30 px-2 py-1 text-[10px] text-[#E8FF47] hover:bg-[#E8FF47] hover:text-black transition-colors">
                  <Zap size={10} className="inline" /> NOTIFY ME
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center gap-6 text-[#888]">
            <button className="flex items-center gap-1.5 text-xs hover:text-[#FF3366] transition-colors">
              <Heart size={14} /> {post.likes.toLocaleString()}
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-[#00D4FF] transition-colors">
              <MessageCircle size={14} /> {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-[#E8FF47] transition-colors">
              <Repeat2 size={14} /> {post.reposts}
            </button>
            <button className="ml-auto text-xs hover:text-white transition-colors">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FeedPage() {
  return (
    <AppShell title="UNDERGROUND">
      {/* City Pill Scroller */}
      <div className="flex gap-2 overflow-x-auto border-b border-[#222] px-4 py-3 no-scrollbar">
        {CITY_PILLS.map((city, i) => (
          <button
            key={city}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
              i === 0
                ? "bg-[#E8FF47] text-black font-bold"
                : "border border-[#222] text-[#888] hover:border-[#333] hover:text-white"
            }`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Feed Tabs */}
      <div className="flex gap-0 border-b border-[#222]">
        {FEED_TABS.map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-xs font-medium transition-colors ${
              i === 0
                ? "border-b-2 border-[#E8FF47] text-[#E8FF47]"
                : "text-[#888] hover:text-white"
            }`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Compose Button (sticky) */}
      <div className="border-b border-[#222] p-4">
        <button className="flex w-full items-center gap-3 rounded-full border border-[#222] px-4 py-2.5 text-left text-sm text-[#888] hover:border-[#333] transition-colors">
          <div className="h-8 w-8 rounded-full bg-[#222]" />
          What&apos;s happening in the scene?
        </button>
      </div>

      {/* Posts */}
      <div>
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AppShell>
  );
}
