"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ImageCard from "@/components/ui/ImageCard";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";

export default function CuisineSection() {
  return (
    <section id="cuisine" className="py-16 sm:py-20 md:py-32 bg-kurkuma-green text-kurkuma-cream overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          eyebrow="Notre cuisine"
          title="Fraîcheur et profondeur des saveurs."
          subtitle="Notre cuisine réunit les saveurs indiennes contemporaines, les épices équilibrées et des ingrédients soigneusement sélectionnés."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-8">
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <ImageCard
              src={IMAGES.cuisine}
              alt="Pakoras et chutney maison"
              className="aspect-square col-span-1"
            />
            <ImageCard
              src={IMAGES.spices}
              alt="Épices indiennes fraîches"
              className="aspect-square col-span-1 mt-8"
            />
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-kurkuma-cream/80 leading-relaxed text-lg"
            >
              Le menu est pensé pour être partagé, apprécié au quotidien et
              mémorable autant pour son goût que pour son atmosphère.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-kurkuma-cream/60 leading-relaxed"
            >
              Des classiques réconfortants aux assiettes plus modernes, chaque
              plat est préparé avec attention du déjeuner jusqu&apos;au dîner.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
              {[
                { label: "Frais", value: "100%" },
                { label: "Épices", value: "Authentiques" },
                { label: "Partage", value: "Au cœur" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block font-display text-xl sm:text-2xl text-kurkuma-yellow">
                    {stat.value}
                  </span>
                  <span className="text-xs tracking-widest uppercase text-kurkuma-cream/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
