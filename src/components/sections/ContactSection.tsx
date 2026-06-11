"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE, HOURS } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-kurkuma-burgundy mb-4 block">
            Contact & Réservation
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-kurkuma-charcoal font-light">
            Venez nous rendre visite
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="bg-kurkuma-cream p-8 md:p-10 rounded-sm"
          >
            <MapPin className="text-kurkuma-gold mb-4" size={24} />
            <h3 className="font-display text-xl text-kurkuma-charcoal mb-3">
              Adresse
            </h3>
            <p className="text-kurkuma-warm-gray leading-relaxed">
              {SITE.address}
            </p>
            <a
              href="https://maps.google.com/?q=5+rue+Tschiderer+Ettelbruck+Luxembourg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-kurkuma-burgundy hover:text-kurkuma-gold transition-colors underline underline-offset-4"
            >
              Voir sur Google Maps
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-kurkuma-cream p-8 md:p-10 rounded-sm"
          >
            <Phone className="text-kurkuma-gold mb-4" size={24} />
            <h3 className="font-display text-xl text-kurkuma-charcoal mb-3">
              Réservation
            </h3>
            <p className="text-kurkuma-warm-gray mb-4">
              Appelez-nous pour réserver votre table.
            </p>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="text-lg text-kurkuma-burgundy hover:text-kurkuma-gold transition-colors font-medium"
            >
              {SITE.phone}
            </a>
            <div className="mt-4 flex items-center gap-2">
              <Mail className="text-kurkuma-gold" size={16} />
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-kurkuma-warm-gray hover:text-kurkuma-gold transition-colors"
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-kurkuma-cream p-8 md:p-10 rounded-sm md:col-span-2 lg:col-span-1"
          >
            <Clock className="text-kurkuma-gold mb-4" size={24} />
            <h3 className="font-display text-xl text-kurkuma-charcoal mb-3">
              Horaires
            </h3>
            <ul className="space-y-3">
              {HOURS.map((hour) => (
                <li
                  key={hour.days}
                  className="flex justify-between text-sm text-kurkuma-warm-gray"
                >
                  <span>{hour.days}</span>
                  <span className="text-kurkuma-charcoal font-medium">
                    {hour.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 text-xs text-kurkuma-warm-gray">
              <Car className="text-kurkuma-gold shrink-0 mt-0.5" size={14} />
              <span>{SITE.parking}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
