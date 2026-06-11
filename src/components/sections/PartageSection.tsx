"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ui/ImageCard";
import { fadeInUp, slideInRight } from "@/lib/animations";
import { IMAGES } from "@/lib/constants";
import { Users, Heart, Coffee } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Étudiants & familles",
    text: "Un lieu de quartier où chacun se sent le bienvenu.",
  },
  {
    icon: Heart,
    title: "Collègues & couples",
    text: "Cuisine généreuse et hospitalité détendue.",
  },
  {
    icon: Coffee,
    title: "Les habitués",
    text: "Il y a toujours une place à table.",
  },
];

export default function PartageSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 lg:order-1"
          >
            <ImageCard
              src={IMAGES.sharing}
              alt="Tables partagées chez Kurkuma"
              className="aspect-[4/3] shadow-2xl"
              overlay
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-kurkuma-burgundy mb-4 block">
              Le partage
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-kurkuma-charcoal font-light mb-6">
              Tables partagées,
              <br />
              moments simples.
            </h2>
            <div className="decorative-line mb-8" />
            <p className="text-kurkuma-warm-gray leading-relaxed mb-8">
              Kurkuma a été créé comme un lieu de quartier où chacun se sent le
              bienvenu. Étudiants, familles, collègues, couples et les habitués
              du quartier s&apos;y retrouvent autour d&apos;une cuisine
              généreuse et d&apos;une hospitalité détendue.
            </p>
            <p className="text-kurkuma-burgundy font-medium italic mb-10">
              Pour un déjeuner rapide, un dîner en famille ou une soirée entre
              amis, il y a toujours une place à table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-center sm:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * i }}
                >
                  <item.icon
                    className="text-kurkuma-gold mx-auto sm:mx-0 mb-3"
                    size={24}
                  />
                  <h4 className="text-sm font-medium text-kurkuma-charcoal mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-kurkuma-warm-gray">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
