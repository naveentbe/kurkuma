import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import InstagramIcon from "@/components/ui/InstagramIcon";
import PhoneIcon from "@/components/ui/PhoneIcon";
import BrandDivider from "@/components/ui/BrandDivider";
import { SITE, HOURS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-kurkuma-green text-kurkuma-cream/80 grain-overlay pb-[env(safe-area-inset-bottom)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Logo variant="vertical" className="mb-5 sm:mb-6 h-28 sm:h-36" />
            <p className="text-sm leading-relaxed text-kurkuma-cream/60 max-w-xs">
              Cuisine fraîche • Tables partagées • Hospitalité chaleureuse
            </p>
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-kurkuma-yellow mb-4 sm:mb-6">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-kurkuma-yellow mt-0.5 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 hover:text-kurkuma-yellow transition-colors min-h-[44px]"
                >
                  <PhoneIcon size={16} />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 hover:text-kurkuma-yellow transition-colors break-all min-h-[44px]"
                >
                  <Mail size={16} className="text-kurkuma-yellow shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-kurkuma-yellow mb-4 sm:mb-6">
              Horaires
            </h4>
            <ul className="space-y-3 text-sm">
              {HOURS.map((hour) => (
                <li key={hour.days} className="flex items-start gap-3">
                  <Clock size={16} className="text-kurkuma-yellow mt-0.5 shrink-0" />
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
            <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-kurkuma-yellow mb-4 sm:mb-6">
              Suivez-nous
            </h4>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm hover:text-kurkuma-yellow transition-colors min-h-[44px]"
            >
              <InstagramIcon size={20} />
              {SITE.instagramHandle}
            </a>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="text-xs tracking-widest uppercase text-kurkuma-cream/60 hover:text-kurkuma-yellow transition-colors min-h-[44px] flex items-center"
              >
                Menu
              </Link>
              <Link
                href="/#contact"
                className="text-xs tracking-widest uppercase text-kurkuma-cream/60 hover:text-kurkuma-yellow transition-colors min-h-[44px] flex items-center"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-10 sm:my-12">
          <BrandDivider light />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-kurkuma-cream/40 text-center sm:text-left">
          <p>
            Kurkuma — cuisine indienne contemporaine, Ettelbruck, Luxembourg
          </p>
          <p>© {new Date().getFullYear()} Kurkuma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
