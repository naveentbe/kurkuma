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
    "bg-kurkuma-gold text-kurkuma-charcoal hover:bg-kurkuma-gold-light shadow-lg shadow-kurkuma-gold/20",
  secondary:
    "bg-kurkuma-burgundy text-white hover:bg-kurkuma-burgundy-dark shadow-lg shadow-kurkuma-burgundy/20",
  outline:
    "border-2 border-kurkuma-gold text-kurkuma-gold hover:bg-kurkuma-gold hover:text-kurkuma-charcoal",
  ghost:
    "text-kurkuma-cream hover:text-kurkuma-gold border border-white/20 hover:border-kurkuma-gold/50",
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
    "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide uppercase transition-colors duration-300 rounded-sm";

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
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
