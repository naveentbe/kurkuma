"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import InstagramIcon from "@/components/ui/InstagramIcon";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { IMAGES, SITE } from "@/lib/constants";

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-32 bg-kurkuma-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Galerie"
          title="Suivez l'atmosphère."
          subtitle="Des assiettes fraîches, des soirées chaleureuses et les moments du quotidien chez Kurkuma."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {IMAGES.gallery.map((src, i) => (
            <motion.a
              key={src}
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`image-zoom-container relative overflow-hidden rounded-sm group ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              variants={scaleIn}
            >
              <div
                className={`relative ${
                  i === 0 ? "aspect-square md:aspect-auto md:h-full min-h-[200px]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Galerie Kurkuma ${i + 1}`}
                  fill
                  className="zoom-image object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-kurkuma-charcoal/0 group-hover:bg-kurkuma-charcoal/30 transition-colors duration-500 flex items-center justify-center">
                  <InstagramIcon
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={32}
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button href={SITE.instagram} variant="outline" external>
            <InstagramIcon size={16} />
            {SITE.instagramHandle}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
