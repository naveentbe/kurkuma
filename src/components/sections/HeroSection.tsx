"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import BrandDivider from "@/components/ui/BrandDivider";
import { IMAGES, SITE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-[100svh] min-h-[100dvh] flex items-center justify-center overflow-hidden scroll-mt-24">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.esprit}
          alt="Intérieur du restaurant Kurkuma à Ettelbruck"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 sm:px-8 text-center pt-[calc(4.5rem+env(safe-area-inset-top))] pb-20 sm:pb-24">
        <motion.div
          className="flex flex-col items-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Logo
            variant="icon"
            priority
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-44 lg:w-44"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-kurkuma-yellow tracking-[0.15em] mt-5 sm:mt-6">
            KURKUMA
          </h2>
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-kurkuma-yellow/80 mt-2 sm:mt-3">
            Cuisine indienne contemporaine
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BrandDivider light className="max-w-[180px] sm:max-w-[220px]" />
        </motion.div>

        <motion.h1
          className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-kurkuma-cream font-light leading-snug mb-4 sm:mb-5 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {SITE.heroHeadline}
        </motion.h1>

        <motion.p
          className="max-w-lg mx-auto text-sm sm:text-base text-kurkuma-cream/75 leading-relaxed mb-8 sm:mb-10 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          {SITE.heroDescription}
        </motion.p>

        <motion.div
          className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button href="/menu" variant="outline" className="font-display !tracking-[0.12em] sm:!tracking-[0.15em]">
            Voir le Menu
          </Button>
          <Button href="/#contact" variant="outline" className="font-display !tracking-[0.12em] sm:!tracking-[0.15em]">
            Réserver une Table
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-kurkuma-yellow/50 pb-[env(safe-area-inset-bottom)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 2, repeat: Infinity },
        }}
      >
        <ChevronDown size={22} className="sm:w-6 sm:h-6" />
      </motion.div>
    </section>
  );
}
