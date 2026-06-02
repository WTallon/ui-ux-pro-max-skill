import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-[#E8FF47] text-black hover:bg-[#d4eb3d] font-bold",
    secondary: "bg-[#111] text-white border border-[#222] hover:border-[#333]",
    ghost: "text-[#888] hover:text-white hover:bg-[#111]",
    danger: "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30 hover:bg-[#FF3366]/20",
    outline: "border border-[#E8FF47] text-[#E8FF47] hover:bg-[#E8FF47] hover:text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-all",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
