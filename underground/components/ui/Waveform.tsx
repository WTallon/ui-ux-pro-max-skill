"use client";

export function Waveform({ bars = 5, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="wave-bar h-4 w-[3px] rounded-full bg-[#E8FF47]"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

export function StaticWaveform({
  bars = 30,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-[2px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => {
        const height = Math.sin(i * 0.4) * 40 + 50;
        return (
          <div
            key={i}
            className="w-[2px] rounded-full bg-[#E8FF47]/40"
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}
