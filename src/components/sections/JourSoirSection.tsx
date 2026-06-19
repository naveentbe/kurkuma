"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ui/ImageCard";
import BrandDivider from "@/components/ui/BrandDivider";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";
import { Sun, Moon } from "lucide-react";

const cardBodyPadding = "p-7 sm:p-10 md:p-12";

export default function JourSoirSection() {
  return (
    <section className="py-14 sm:py-20 md:py-32 bg-kurkuma-cream grain-overlay">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow-dark mb-3 sm:mb-4 block">
            Du jour au soir
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-kurkuma-green font-medium px-2">
            Frais tout au long de la journée.
          </h2>
          <div className="flex justify-center mt-5 sm:mt-6">
            <BrandDivider />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="brand-card rounded-sm overflow-hidden">
            <ImageCard
              src={IMAGES.lunch}
              alt="Déjeuner frais chez Kurkuma"
              fit="cover"
              position="top"
              imageClassName="!-top-[25px] !h-[calc(100%+25px)]"
            />
            <div className={cardBodyPadding}>
              <div className="flex items-center gap-3 mb-4">
                <Sun className="text-kurkuma-yellow shrink-0" size={20} />
                <h3 className="font-display text-xl sm:text-2xl text-kurkuma-green">
                  Le jour
                </h3>
              </div>
              <p className="text-kurkuma-warm-gray leading-relaxed mb-4 text-sm sm:text-base">
                Des déjeuners équilibrés, des plats préparés avec soin et des
                saveurs vibrantes pensés pour le quotidien.
              </p>
              <p className="text-kurkuma-green text-sm font-medium italic">
                Rapide quand il le faut. Détendu quand on veut prendre son
                temps.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="brand-card-dark rounded-sm overflow-hidden">
            <ImageCard
              src={IMAGES.evening}
              alt="Soirée chaleureuse chez Kurkuma"
              fit="cover"
              position="top"
              imageClassName="!-top-[25px] !h-[calc(100%+25px)]"
            />
            <div className={cardBodyPadding}>
              <div className="flex items-center gap-3 mb-4">
                <Moon className="text-kurkuma-yellow shrink-0" size={20} />
                <h3 className="font-display text-xl sm:text-2xl text-kurkuma-cream">
                  Le soir
                </h3>
              </div>
              <p className="text-kurkuma-cream/80 leading-relaxed mb-4 text-sm sm:text-base">
                Quand les lumières se tamisent, Kurkuma devient un lieu de
                partage autour de cocktails, de plats généreux et de longues
                soirées conviviales.
              </p>
              <p className="text-kurkuma-yellow text-sm font-medium italic">
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
