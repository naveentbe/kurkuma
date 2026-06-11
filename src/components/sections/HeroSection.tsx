"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Cuisine indienne contemporaine chez Kurkuma"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kurkuma-charcoal/70 via-kurkuma-charcoal/50 to-kurkuma-charcoal/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.span
          className="inline-block text-xs md:text-sm tracking-[0.35em] uppercase text-kurkuma-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ettelbruck, Luxembourg
        </motion.span>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-kurkuma-cream mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="hero-title">Kurkuma</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-kurkuma-cream/90 font-light italic mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          cuisine indienne contemporaine
        </motion.p>

        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg text-kurkuma-cream/70 leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Déjeuners frais, tables à partager et soirées chaleureuses.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button href="/menu" variant="primary">
            Voir le Menu
          </Button>
          <Button href="/#contact" variant="ghost">
            Réserver une Table
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-kurkuma-cream/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { delay: 1.5, duration: 2, repeat: Infinity },
        }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
