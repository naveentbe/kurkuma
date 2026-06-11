"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-kurkuma-yellow text-kurkuma-green hover:bg-kurkuma-yellow-light shadow-lg shadow-kurkuma-yellow/25",
  secondary:
    "bg-kurkuma-green text-kurkuma-cream hover:bg-kurkuma-green-dark shadow-lg shadow-kurkuma-green/20",
  outline:
    "border border-kurkuma-yellow bg-transparent text-kurkuma-yellow hover:bg-kurkuma-yellow/10",
  ghost:
    "text-kurkuma-cream hover:text-kurkuma-yellow border border-white/20 hover:border-kurkuma-yellow/50",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  external = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-sm min-h-[44px] w-full sm:w-auto";

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={combinedClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
