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
    "border-2 border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10",
  ghost:
    "border-2 border-white/30 bg-transparent text-kurkuma-cream hover:border-kurkuma-yellow/50 hover:text-kurkuma-yellow",
  header:
    "border-2 border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10 !px-5 !py-2.5 !text-xs xl:!text-sm !min-h-[40px] !tracking-[0.06em] font-nav font-semibold uppercase",
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
    "inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold tracking-[0.08em] sm:tracking-wide uppercase transition-all duration-300 rounded-sm min-h-[48px] w-full sm:w-auto";

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
