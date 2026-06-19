"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { useReservation } from "@/contexts/ReservationContext";
import Logo from "@/components/ui/Logo";
import { IMAGES, SITE } from "@/lib/constants";

const heroButtonClasses =
  "font-nav !font-semibold !text-xs sm:!text-sm !tracking-[0.14em] !uppercase !whitespace-nowrap !rounded-md !border !border-kurkuma-yellow !bg-transparent !text-kurkuma-yellow hover:!bg-kurkuma-yellow/10 !px-8 sm:!px-10 !py-3.5 !min-h-[48px] !w-full sm:!w-auto !shadow-none antialiased";

export default function HeroSection() {
  const { open } = useReservation();
  return (
    <section id="accueil" className="relative w-full min-h-[100svh] min-h-[100dvh] flex items-center justify-center overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={IMAGES.hero}
          alt="Intérieur du restaurant Kurkuma à Ettelbruck"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-overlay-black" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 text-center pt-[calc(4.5rem+env(safe-area-inset-top))] pb-20 sm:pb-24">
        <motion.div
          className="flex flex-col items-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Logo
            variant="horizontal"
            priority
            className="!h-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px]"
          />
        </motion.div>

        <motion.h1
          className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-kurkuma-cream leading-snug mb-4 sm:mb-5 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {SITE.heroHeadline}
        </motion.h1>

        <motion.p
          className="max-w-lg mx-auto text-base sm:text-lg text-kurkuma-cream/90 leading-relaxed mb-8 sm:mb-10 px-1 font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          {SITE.heroDescription}
        </motion.p>

        <motion.div
          className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            href={SITE.menuOrderUrl}
            variant="outline"
            external
            className={heroButtonClasses}
          >
            Voir le Menu
          </Button>
          <Button
            onClick={open}
            variant="outline"
            className={heroButtonClasses}
          >
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
