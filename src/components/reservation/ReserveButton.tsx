"use client";

import { useReservation } from "@/contexts/ReservationContext";

type ReserveButtonVariant = "primary" | "outline" | "ghost" | "header";

interface ReserveButtonProps {
  label?: string;
  variant?: ReserveButtonVariant;
  className?: string;
  onPress?: () => void;
}

const variantClasses: Record<ReserveButtonVariant, string> = {
  primary:
    "bg-kurkuma-yellow text-kurkuma-green hover:bg-kurkuma-yellow-light shadow-lg shadow-kurkuma-yellow/25 border border-transparent",
  outline:
    "border-2 border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10",
  ghost:
    "border-2 border-white/30 bg-transparent text-kurkuma-cream hover:border-kurkuma-yellow/50 hover:text-kurkuma-yellow",
  header:
    "border-2 border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10 !px-5 !py-2.5 !text-xs xl:!text-sm !min-h-[40px] !tracking-[0.06em] font-nav font-semibold uppercase",
};

export default function ReserveButton({
  label = "Réserver une Table",
  variant = "outline",
  className = "",
  onPress,
}: ReserveButtonProps) {
  const { open } = useReservation();

  const handleClick = () => {
    onPress?.();
    open();
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold tracking-[0.08em] sm:tracking-wide uppercase transition-all duration-300 rounded-sm min-h-[48px] w-full sm:w-auto";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
