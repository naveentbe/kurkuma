"use client";

import { useZenchef } from "@/hooks/useZenchef";

type ZenchefBookingVariant = "primary" | "outline" | "ghost" | "header";

interface ZenchefBookingProps {
  label?: string;
  variant?: ZenchefBookingVariant;
  className?: string;
  onPress?: () => void;
}

const variantClasses: Record<ZenchefBookingVariant, string> = {
  primary:
    "bg-kurkuma-yellow text-kurkuma-green hover:bg-kurkuma-yellow-light shadow-lg shadow-kurkuma-yellow/25 border border-transparent",
  outline:
    "border border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10",
  ghost:
    "border border-white/20 bg-transparent text-kurkuma-cream hover:border-kurkuma-yellow/50 hover:text-kurkuma-yellow",
  header:
    "border border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10 !px-5 !py-2 !text-[11px] !min-h-[38px] !tracking-[0.15em] font-display",
};

export default function ZenchefBooking({
  label = "Réserver une Table",
  variant = "outline",
  className = "",
  onPress,
}: ZenchefBookingProps) {
  const { open, isConfigured } = useZenchef();

  const handleClick = () => {
    onPress?.();
    open();
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-sm min-h-[44px] w-full sm:w-auto";

  if (!isConfigured) {
    return (
      <button
        type="button"
        disabled
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        title="Zenchef restaurant ID is not configured"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-zc-action="open"
      onClick={handleClick}
      aria-label={label}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
