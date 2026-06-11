"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import BrandDivider from "@/components/ui/BrandDivider";
import { fadeInUp } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";

export default function SoireesSection() {
  return (
    <section id="soirees" className="relative py-14 sm:py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.cocktails}
          alt="Cocktails et soirées chez Kurkuma"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-kurkuma-green-dark/88" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow mb-3 sm:mb-4 block">
            Soirées & Cocktails
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-kurkuma-cream font-light mb-5 sm:mb-6 px-2">
            Les soirées chez Kurkuma.
          </h2>
          <div className="flex justify-center mb-6 sm:mb-8">
            <BrandDivider light />
          </div>
          <p className="max-w-2xl mx-auto text-kurkuma-cream/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4 px-2">
            Cocktails signatures, lumières chaleureuses et cuisine pleine de
            caractère donnent le ton des soirées chez Kurkuma.
          </p>
          <p className="max-w-xl mx-auto text-kurkuma-yellow italic mb-8 sm:mb-10 text-sm sm:text-base px-2">
            Un lieu pour ralentir, partager et profiter du moment.
          </p>
          <Button href="/menu#boissons" variant="primary" className="max-w-xs sm:max-w-none mx-auto">
            Découvrir les Cocktails
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
