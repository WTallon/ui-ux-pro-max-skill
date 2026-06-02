"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Play, Radio, User } from "lucide-react";

const tabs = [
  { href: "/feed", label: "FEED", icon: Home },
  { href: "/tonight", label: "TONIGHT", icon: MapPin },
  { href: "/tv", label: "TV", icon: Play },
  { href: "/radar", label: "RADAR", icon: Radio },
  { href: "/you", label: "YOU", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#222] bg-[#080808]/95 backdrop-blur-md pb-safe">
      <div className="flex items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-3 transition-colors ${
                active ? "text-[#E8FF47]" : "text-[#888]"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2 : 1.5}
                fill={active ? "currentColor" : "none"}
              />
              <span
                className="font-['DM_Mono'] text-[9px] font-medium tracking-widest"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
