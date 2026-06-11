"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`max-w-3xl mb-12 md:mb-16 ${alignClass}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-medium tracking-[0.25em] uppercase mb-4 ${
            light ? "text-kurkuma-gold" : "text-kurkuma-burgundy"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 ${
          light ? "text-kurkuma-cream" : "text-kurkuma-charcoal"
        }`}
      >
        {title}
      </h2>
      <div
        className={`decorative-line mb-6 ${align === "center" ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            light ? "text-kurkuma-cream/80" : "text-kurkuma-warm-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
