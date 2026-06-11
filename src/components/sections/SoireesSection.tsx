"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";

export default function SoireesSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.cocktails}
          alt="Cocktails et soirées chez Kurkuma"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-kurkuma-burgundy-dark/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-kurkuma-gold mb-4 block">
            Soirées & Cocktails
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-kurkuma-cream font-light mb-6">
            Les soirées chez Kurkuma.
          </h2>
          <div className="decorative-line mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-kurkuma-cream/80 text-lg leading-relaxed mb-4">
            Cocktails signatures, lumières chaleureuses et cuisine pleine de
            caractère donnent le ton des soirées chez Kurkuma.
          </p>
          <p className="max-w-xl mx-auto text-kurkuma-gold italic mb-10">
            Un lieu pour ralentir, partager et profiter du moment.
          </p>
          <Button href="/menu#boissons" variant="primary">
            Découvrir les Cocktails et Boissons
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
