import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { SITE, HOURS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-kurkuma-charcoal text-kurkuma-cream/80 grain-overlay">
      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl text-kurkuma-cream mb-2">
              Kurkuma
            </h3>
            <p className="text-xs tracking-[0.25em] uppercase text-kurkuma-gold mb-6">
              {SITE.tagline}
            </p>
            <p className="text-sm leading-relaxed text-kurkuma-cream/60">
              Cuisine fraîche • Tables partagées • Hospitalité chaleureuse
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-kurkuma-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-kurkuma-gold mt-0.5 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 hover:text-kurkuma-gold transition-colors"
                >
                  <Phone size={16} className="text-kurkuma-gold shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 hover:text-kurkuma-gold transition-colors"
                >
                  <Mail size={16} className="text-kurkuma-gold shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-kurkuma-gold mb-6">
              Horaires
            </h4>
            <ul className="space-y-3 text-sm">
              {HOURS.map((hour) => (
                <li key={hour.days} className="flex items-start gap-3">
                  <Clock size={16} className="text-kurkuma-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-kurkuma-cream">{hour.days}</span>
                    <span className="text-kurkuma-cream/60">{hour.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-kurkuma-cream/50 leading-relaxed">
              {SITE.parking}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-kurkuma-gold mb-6">
              Suivez-nous
            </h4>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm hover:text-kurkuma-gold transition-colors"
            >
              <InstagramIcon size={18} className="text-kurkuma-gold" />
              {SITE.instagramHandle}
            </a>
            <div className="mt-8 flex gap-4">
              <Link
                href="/menu"
                className="text-xs tracking-widest uppercase text-kurkuma-cream/60 hover:text-kurkuma-gold transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/#contact"
                className="text-xs tracking-widest uppercase text-kurkuma-cream/60 hover:text-kurkuma-gold transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="section-divider my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-kurkuma-cream/40">
          <p>
            Kurkuma — cuisine indienne contemporaine, Ettelbruck, Luxembourg
          </p>
          <p>© {new Date().getFullYear()} Kurkuma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
