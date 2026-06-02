"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

interface TopBarProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function TopBar({
  title = "UNDERGROUND",
  showSearch = true,
  showNotifications = true,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#222] bg-[#080808]/95 px-4 py-3 backdrop-blur-md">
      <Link href="/">
        <span
          className="text-xl font-bold tracking-widest text-[#E8FF47]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px" }}
        >
          {title}
        </span>
      </Link>
      <div className="flex items-center gap-3">
        {showSearch && (
          <Link href="/search">
            <Search size={20} className="text-[#888] hover:text-white transition-colors" />
          </Link>
        )}
        {showNotifications && (
          <Link href="/notifications" className="relative">
            <Bell size={20} className="text-[#888] hover:text-white transition-colors" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E8FF47]" />
          </Link>
        )}
      </div>
    </header>
  );
}
