"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import BrandDivider from "@/components/ui/BrandDivider";

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
      className={`max-w-3xl mb-10 sm:mb-12 md:mb-16 ${alignClass}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs sm:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase mb-3 sm:mb-4 ${
            light ? "text-kurkuma-yellow" : "text-kurkuma-yellow-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-4 sm:mb-6 ${
          light ? "text-kurkuma-cream" : "text-kurkuma-green"
        }`}
      >
        {title}
      </h2>
      <div className="mb-4 sm:mb-6">
        <BrandDivider light={light} align={align} />
      </div>
      {subtitle && (
        <p
          className={`text-base sm:text-lg md:text-xl leading-relaxed ${
            light ? "text-kurkuma-cream/90" : "text-kurkuma-warm-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
