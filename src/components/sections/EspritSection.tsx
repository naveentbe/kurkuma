"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ImageCard from "@/components/ui/ImageCard";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";

export default function EspritSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeader
              eyebrow="L'esprit de Kurkuma"
              title="Un lieu pour tous."
              align="left"
            />
            <div className="space-y-6 text-kurkuma-warm-gray leading-relaxed">
              <motion.p variants={fadeInUp}>
                Kurkuma est une cuisine et bar indien contemporain imaginé
                autour du goût, du partage et de l&apos;hospitalité.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Des déjeuners rapides en semaine aux dîners en famille et
                soirées entre amis, le lieu suit naturellement le rythme de la
                journée — toujours chaleureux, vivant et accueillant. À
                l&apos;intérieur comme en terrasse, Kurkuma invite à prendre son
                temps — entre déjeuners ensoleillés, dîners détendus et longues
                soirées d&apos;été.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-kurkuma-burgundy font-medium">
                Une cuisine sincère, des assiettes à partager et des ingrédients
                frais sont au cœur de tout ce que nous faisons.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <ImageCard
              src={IMAGES.esprit}
              alt="L'ambiance chaleureuse de Kurkuma"
              className="aspect-[4/5] shadow-2xl"
              overlay
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
