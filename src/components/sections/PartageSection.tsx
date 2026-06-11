"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ui/ImageCard";
import BrandDivider from "@/components/ui/BrandDivider";
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
    <section className="py-14 sm:py-20 md:py-32 bg-kurkuma-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
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
            <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow-dark mb-3 sm:mb-4 block">
              Le partage
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-kurkuma-green font-light mb-5 sm:mb-6">
              Tables partagées,
              <br />
              moments simples.
            </h2>
            <BrandDivider className="mb-6 sm:mb-8 !mx-0" />
            <p className="text-kurkuma-warm-gray leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Kurkuma a été créé comme un lieu de quartier où chacun se sent le
              bienvenu. Étudiants, familles, collègues, couples et les habitués
              du quartier s&apos;y retrouvent autour d&apos;une cuisine
              généreuse et d&apos;une hospitalité détendue.
            </p>
            <p className="text-kurkuma-green font-medium italic mb-8 sm:mb-10 text-sm sm:text-base">
              Pour un déjeuner rapide, un dîner en famille ou une soirée entre
              amis, il y a toujours une place à table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-center sm:text-left p-4 sm:p-0 rounded-sm bg-white/60 sm:bg-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * i }}
                >
                  <item.icon
                    className="text-kurkuma-yellow mx-auto sm:mx-0 mb-3"
                    size={24}
                  />
                  <h4 className="text-sm font-medium text-kurkuma-green mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-kurkuma-warm-gray leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
