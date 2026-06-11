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
          className={`inline-block text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 ${
            light ? "text-kurkuma-yellow" : "text-kurkuma-yellow-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 sm:mb-6 ${
          light ? "text-kurkuma-cream" : "text-kurkuma-green"
        }`}
      >
        {title}
      </h2>
      <div className={align === "center" ? "flex justify-center mb-4 sm:mb-6" : "mb-4 sm:mb-6"}>
        <BrandDivider light={light} className={align === "left" ? "mx-0" : ""} />
      </div>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            light ? "text-kurkuma-cream/80" : "text-kurkuma-warm-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
