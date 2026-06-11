"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-kurkuma-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-kurkuma-warm-gray leading-relaxed font-light">
            Une cuisine indienne moderne, fraîche et pleine de saveurs, servie
            dans un lieu pensé pour les déjeuners du quotidien, les dîners
            détendus et les longues conversations autour de la table.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
