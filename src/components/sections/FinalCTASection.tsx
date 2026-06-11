"use client";

import { motion } from "framer-motion";
import InstagramIcon from "@/components/ui/InstagramIcon";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <section className="py-20 md:py-32 bg-kurkuma-charcoal grain-overlay">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs tracking-[0.25em] uppercase text-kurkuma-gold mb-4 block"
          >
            Ettelbruck
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-5xl lg:text-6xl text-kurkuma-cream font-light mb-6"
          >
            Rejoignez-nous à Ettelbruck.
          </motion.h2>
          <motion.div variants={fadeInUp} className="decorative-line mx-auto mb-8" />
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-kurkuma-cream/70 text-lg leading-relaxed mb-12"
          >
            Une cuisine indienne contemporaine pensée autour de produits frais,
            du partage et d&apos;une hospitalité chaleureuse.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/#contact" variant="primary">
              Réserver une Table
            </Button>
            <Button href="/menu" variant="outline">
              Voir le Menu
            </Button>
            <Button href={SITE.instagram} variant="ghost" external>
              <InstagramIcon size={16} />
              Suivre sur Instagram
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
