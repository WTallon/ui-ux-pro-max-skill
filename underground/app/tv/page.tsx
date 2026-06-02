"use client";

import { Heart, MessageCircle, Share2, Plus, Music, Disc3 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

const TV_TABS = ["Following", "For You", "Live"];

const MOCK_VIDEOS = [
  {
    id: 1,
    creator: "Charlotte de Witte",
    handle: "charlottedewitte",
    role: "DJ",
    roleColor: "#00D4FF",
    caption: "Fabric closing set last Friday. The ID at 1:47:20 is about to drop 🔥",
    track: { title: "UNRELEASED ID", artist: "Charlotte de Witte", heat: 89 },
    likes: 12400,
    comments: 847,
    verified: true,
    has_id: true,
    gradient: "from-[#0D0D1A] via-[#111830] to-[#0D0D1A]",
  },
  {
    id: 2,
    creator: "FISHER",
    handle: "fisher",
    role: "Producer",
    roleColor: "#00D4FF",
    caption: "New one. Summer 2025. Heat Score already 74.",
    track: { title: "UNRELEASED TEASER", artist: "FISHER", heat: 74 },
    likes: 34200,
    comments: 2140,
    verified: true,
    has_id: false,
    gradient: "from-[#1A0D0D] via-[#301818] to-[#1A0D0D]",
  },
];

export default function TVPage() {
  const video = MOCK_VIDEOS[0];

  return (
    <div className="fixed inset-0 bg-[#080808]">
      {/* TV Tabs */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center gap-6 pt-12 pb-4">
        {TV_TABS.map((tab, i) => (
          <button
            key={tab}
            className={`text-sm font-bold transition-colors ${
              i === 1 ? "text-white" : "text-[#888]"
            }`}
            style={i === 1 ? { borderBottom: "2px solid #E8FF47", paddingBottom: "2px" } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Video placeholder (gradient) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient}`}>
        {/* Spinning record placeholder */}
        <div className="flex h-full items-center justify-center">
          <div className="relative">
            <Disc3
              size={120}
              className="animate-spin text-[#222]"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-[#111] border-2 border-[#333]" />
            </div>
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="absolute bottom-32 right-4 z-20 flex flex-col items-center gap-5">
        {/* Creator avatar */}
        <div className="relative">
          <div className="h-11 w-11 rounded-full bg-[#333] border-2 border-[#E8FF47] flex items-center justify-center text-xs font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
            {video.creator.slice(0, 2).toUpperCase()}
          </div>
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E8FF47]">
            <Plus size={10} className="text-black font-bold" />
          </button>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111]/80">
            <Heart size={20} className="text-white" />
          </button>
          <span className="text-[10px] text-white font-bold">{(video.likes / 1000).toFixed(1)}K</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111]/80">
            <MessageCircle size={20} className="text-white" />
          </button>
          <span className="text-[10px] text-white font-bold">{video.comments}</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111]/80">
            <Share2 size={20} className="text-white" />
          </button>
          <span className="text-[10px] text-white font-bold">Share</span>
        </div>

        {/* Spinning record */}
        <Disc3 size={40} className="animate-spin text-[#E8FF47]/60" style={{ animationDuration: "4s" }} />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-24 left-0 right-16 z-20 px-4">
        {/* Creator */}
        <div className="mb-2 flex items-center gap-2">
          <span className="font-bold text-sm">@{video.handle}</span>
          <span className="text-[#E8FF47] text-xs">✓</span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px]"
            style={{ fontFamily: "'DM Mono', monospace", backgroundColor: `${video.roleColor}20`, color: video.roleColor }}
          >
            {video.role.toUpperCase()}
          </span>
        </div>

        {/* Caption */}
        <p className="mb-3 text-sm text-[#ccc] leading-relaxed">{video.caption}</p>

        {/* Track overlay */}
        <div className="flex items-center gap-3 rounded-xl bg-[#111]/90 p-3 backdrop-blur-sm border border-[#222]">
          <Music size={14} className="text-[#E8FF47] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-bold">{video.track.title}</p>
            <p className="text-[10px] text-[#888]">{video.track.artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                video.track.heat >= 90 ? "border-[#E8FF47] text-[#E8FF47]" : "border-[#FF9500] text-[#FF9500]"
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {video.track.heat}
            </div>
            <button className="rounded-full bg-[#FF3366] px-2 py-1 text-[10px] font-bold text-white">
              MAKE AN ID
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav area spacer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent" />
    </div>
  );
}
