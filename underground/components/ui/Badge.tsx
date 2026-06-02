import { type UserRole } from "@/types/database";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "pink" | "blue" | "orange" | "purple" | "ghost";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-[#222] text-[#888]",
    accent: "bg-[#E8FF47] text-black badge-accent",
    pink: "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30 badge-unreleased",
    blue: "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20",
    orange: "bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/20",
    purple: "bg-[#9B59B6]/10 text-[#9B59B6] border border-[#9B59B6]/20",
    ghost: "border border-[#222] text-[#888]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        "font-['DM_Mono']",
        variants[variant],
        className
      )}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {children}
    </span>
  );
}

const roleVariantMap: Record<UserRole, BadgeProps["variant"]> = {
  dj: "blue",
  producer: "blue",
  venue: "purple",
  label: "orange",
  promoter: "orange",
  fan: "ghost",
  admin: "accent",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge variant={roleVariantMap[role]}>
      {role.toUpperCase()}
    </Badge>
  );
}
