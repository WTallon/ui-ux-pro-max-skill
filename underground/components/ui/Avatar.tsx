import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  className?: string;
}

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const pxSizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

export function Avatar({ src, alt = "User", size = "md", verified, className }: AvatarProps) {
  const initials = alt.slice(0, 2).toUpperCase();

  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-full bg-[#222] flex items-center justify-center font-bold text-[#888]",
          sizes[size]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={pxSizes[size]}
            height={pxSizes[size]}
            className="h-full w-full object-cover"
          />
        ) : (
          <span style={{ fontFamily: "'DM Mono', monospace" }}>{initials}</span>
        )}
      </div>
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E8FF47] text-[8px] text-black font-bold">
          ✓
        </span>
      )}
    </div>
  );
}
