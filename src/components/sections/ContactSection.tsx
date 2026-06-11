"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Car } from "lucide-react";
import PhoneIcon from "@/components/ui/PhoneIcon";
import ZenchefBooking from "@/components/zenchef/ZenchefBooking";
import BrandDivider from "@/components/ui/BrandDivider";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE, HOURS } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="py-14 sm:py-20 md:py-32 bg-kurkuma-cream scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-kurkuma-yellow-dark mb-3 sm:mb-4 block">
            Contact & Réservation
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-kurkuma-green font-light px-2">
            Venez nous rendre visite
          </h2>
          <div className="flex justify-center mt-5 sm:mt-6">
            <BrandDivider />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUp} className="brand-card p-6 sm:p-8 md:p-10 rounded-sm">
            <MapPin className="text-kurkuma-yellow mb-4" size={24} />
            <h3 className="font-display text-lg sm:text-xl text-kurkuma-green mb-3">
              Adresse
            </h3>
            <p className="text-kurkuma-warm-gray leading-relaxed text-sm sm:text-base">
              {SITE.address}
            </p>
            <a
              href="https://maps.google.com/?q=5+rue+Tschiderer+Ettelbruck+Luxembourg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-sm text-kurkuma-green hover:text-kurkuma-yellow transition-colors underline underline-offset-4 min-h-[44px]"
            >
              Voir sur Google Maps
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="brand-card p-6 sm:p-8 md:p-10 rounded-sm">
            <PhoneIcon size={24} className="mb-4" />
            <h3 className="font-display text-lg sm:text-xl text-kurkuma-green mb-3">
              Réservation
            </h3>
            <p className="text-kurkuma-warm-gray mb-4 text-sm sm:text-base">
              Réservez en ligne ou appelez-nous directement.
            </p>
            <ZenchefBooking
              label="Réserver en ligne"
              variant="outline"
              className="mb-4 !w-full sm:!w-auto"
            />
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-base sm:text-lg text-kurkuma-green hover:text-kurkuma-yellow transition-colors font-medium min-h-[44px]"
            >
              {SITE.phone}
            </a>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <Mail className="text-kurkuma-yellow shrink-0" size={16} />
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-kurkuma-warm-gray hover:text-kurkuma-yellow transition-colors break-all"
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="brand-card p-6 sm:p-8 md:p-10 rounded-sm md:col-span-2 lg:col-span-1"
          >
            <Clock className="text-kurkuma-yellow mb-4" size={24} />
            <h3 className="font-display text-lg sm:text-xl text-kurkuma-green mb-3">
              Horaires
            </h3>
            <ul className="space-y-3">
              {HOURS.map((hour) => (
                <li
                  key={hour.days}
                  className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-center text-sm text-kurkuma-warm-gray"
                >
                  <span>{hour.days}</span>
                  <span className="text-kurkuma-green font-medium sm:text-right">
                    {hour.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 text-xs text-kurkuma-warm-gray">
              <Car className="text-kurkuma-yellow shrink-0 mt-0.5" size={14} />
              <span>{SITE.parking}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
