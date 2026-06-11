"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ui/ImageCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";
import { Sun, Moon } from "lucide-react";

export default function JourSoirSection() {
  return (
    <section className="py-20 md:py-32 bg-kurkuma-cream grain-overlay">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-kurkuma-burgundy mb-4 block">
            Du jour au soir
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-kurkuma-charcoal font-light">
            Frais tout au long de la journée.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="group bg-white rounded-sm overflow-hidden shadow-lg"
          >
            <ImageCard
              src={IMAGES.lunch}
              alt="Déjeuner frais chez Kurkuma"
              className="aspect-[16/10]"
            />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="text-kurkuma-gold" size={20} />
                <h3 className="font-display text-2xl text-kurkuma-charcoal">
                  Le jour
                </h3>
              </div>
              <p className="text-kurkuma-warm-gray leading-relaxed mb-4">
                Des déjeuners équilibrés, des plats préparés avec soin et des
                saveurs vibrantes pensés pour le quotidien.
              </p>
              <p className="text-kurkuma-burgundy text-sm font-medium italic">
                Rapide quand il le faut. Détendu quand on veut prendre son
                temps.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group bg-kurkuma-charcoal rounded-sm overflow-hidden shadow-lg"
          >
            <ImageCard
              src={IMAGES.evening}
              alt="Soirée chaleureuse chez Kurkuma"
              className="aspect-[16/10]"
            />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="text-kurkuma-gold" size={20} />
                <h3 className="font-display text-2xl text-kurkuma-cream">
                  Le soir
                </h3>
              </div>
              <p className="text-kurkuma-cream/80 leading-relaxed mb-4">
                Quand les lumières se tamisent, Kurkuma devient un lieu de
                partage autour de cocktails, de plats généreux et de longues
                soirées conviviales.
              </p>
              <p className="text-kurkuma-gold text-sm font-medium italic">
                Des saveurs audacieuses, une atmosphère chaleureuse et le
                plaisir d&apos;être ensemble.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
