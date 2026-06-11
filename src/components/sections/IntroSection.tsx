"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import BrandDivider from "@/components/ui/BrandDivider";

export default function IntroSection() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-kurkuma-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <BrandDivider className="mb-8 sm:mb-10" />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-kurkuma-warm-gray leading-relaxed font-normal px-1">
            Une cuisine indienne moderne, fraîche et pleine de saveurs, servie
            dans un lieu pensé pour les déjeuners du quotidien, les dîners
            détendus et les longues conversations autour de la table.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
