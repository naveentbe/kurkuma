"use client";

import { motion } from "framer-motion";
import InstagramIcon from "@/components/ui/InstagramIcon";
import FacebookIcon from "@/components/ui/FacebookIcon";
import Button from "@/components/ui/Button";
import ReserveButton from "@/components/reservation/ReserveButton";
import BrandDivider from "@/components/ui/BrandDivider";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <section className="py-14 sm:py-20 md:py-32 bg-kurkuma-green grain-overlay">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeInUp}
            className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow mb-3 sm:mb-4 block"
          >
            Ettelbruck
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-kurkuma-cream font-medium mb-5 sm:mb-6 px-2"
          >
            Rejoignez-nous à Ettelbruck.
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex justify-center mb-6 sm:mb-8">
            <BrandDivider light />
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-kurkuma-cream/75 text-sm sm:text-base md:text-lg leading-relaxed mb-10 sm:mb-12 px-2"
          >
            Une cuisine indienne contemporaine pensée autour de produits frais,
            du partage et d&apos;une hospitalité chaleureuse.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
          >
            <ReserveButton label="Réserver une Table" variant="primary" />
            <Button href={SITE.menuOrderUrl} variant="outline" external>
              Voir le Menu
            </Button>
            <Button href={SITE.instagram} variant="ghost" external>
              <InstagramIcon size={16} />
              Instagram
            </Button>
            <Button href={SITE.facebook} variant="ghost" external>
              <FacebookIcon size={16} />
              Facebook
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
