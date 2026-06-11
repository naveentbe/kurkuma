"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MENU_CATEGORIES, type MenuCategory } from "@/lib/menu";

function MenuCategoryBlock({ category }: { category: MenuCategory }) {
  return (
    <motion.div
      id={category.id}
      variants={fadeInUp}
      className="scroll-mt-32"
    >
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-kurkuma-charcoal font-light">
          {category.title}
        </h2>
        {category.subtitle && (
          <p className="text-kurkuma-warm-gray text-sm mt-1 italic">
            {category.subtitle}
          </p>
        )}
        <div className="decorative-line mt-4" />
      </div>

      <div className="space-y-6">
        {category.items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-6 border-b border-kurkuma-cream-dark last:border-0"
          >
            <div className="flex-1">
              <h3 className="text-kurkuma-charcoal font-medium">{item.name}</h3>
              {item.description && (
                <p className="text-kurkuma-warm-gray text-sm mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            {item.price && (
              <span className="text-kurkuma-gold font-medium whitespace-nowrap sm:ml-6">
                {item.price}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  return (
    <section className="py-16 sm:py-20 md:py-32 bg-kurkuma-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow mb-3 sm:mb-4 block">
            Notre Carte
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-kurkuma-green font-light mb-5 sm:mb-6">
            Le Menu
          </h1>
          <p className="max-w-xl mx-auto text-kurkuma-warm-gray leading-relaxed">
            Une cuisine indienne contemporaine, pensée pour le partage et les
            saveurs authentiques. Tous nos plats sont préparés avec des
            ingrédients frais.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {MENU_CATEGORIES.map((category) => (
            <MenuCategoryBlock key={category.id} category={category} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-xs text-kurkuma-warm-gray/60 mt-16 max-w-lg mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Les prix et la disponibilité des plats peuvent varier. Merci de nous
          informer de toute allergie ou intolérance alimentaire.
        </motion.p>
      </div>
    </section>
  );
}
