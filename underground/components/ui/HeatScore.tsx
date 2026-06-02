"use client";

import { cn } from "@/lib/utils";

interface HeatScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function HeatScore({ score, size = "md", showLabel = false }: HeatScoreProps) {
  const isHot = score >= 90;
  const color =
    score >= 90
      ? "#E8FF47"
      : score >= 70
      ? "#FF9500"
      : score >= 50
      ? "#FF3366"
      : "#888";

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-2 font-bold",
          sizes[size],
          isHot && "heat-90plus"
        )}
        style={{
          borderColor: color,
          color,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {score}
        {isHot && (
          <span className="absolute -right-1 -top-1 text-[10px]">🔥</span>
        )}
      </div>
      {showLabel && (
        <span className="text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
          HEAT
        </span>
      )}
    </div>
  );
}

export function HeatRing({ score, children }: { score: number; children?: React.ReactNode }) {
  const isHot = score >= 90;
  const color =
    score >= 90 ? "#E8FF47" : score >= 70 ? "#FF9500" : score >= 50 ? "#FF3366" : "#333";

  return (
    <div
      className={cn("relative inline-flex", isHot && "heat-90plus")}
      style={{ borderRadius: "50%" }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-bold"
        style={{ borderColor: color, color, fontFamily: "'DM Mono', monospace" }}
      >
        {children ?? score}
      </div>
    </div>
  );
}
