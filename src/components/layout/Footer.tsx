import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import InstagramIcon from "@/components/ui/InstagramIcon";
import FacebookIcon from "@/components/ui/FacebookIcon";
import PhoneIcon from "@/components/ui/PhoneIcon";
import BrandDivider from "@/components/ui/BrandDivider";
import { getHours, NAV_LINKS, SITE } from "@/lib/constants";

const FOOTER_QUICK_LINKS = [
  { label: "Menu", href: SITE.menuOrderUrl, external: true },
  ...NAV_LINKS.filter((link) => link.href !== "/"),
] as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-nav text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-kurkuma-yellow mb-4 sm:mb-5">
      {children}
    </h4>
  );
}

function FooterRow({
  icon,
  children,
  href,
  external,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const rowClass =
    "group flex items-start gap-3 text-sm leading-relaxed text-kurkuma-cream/85 transition-colors hover:text-kurkuma-yellow";

  const content = (
    <>
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-kurkuma-yellow">
        {icon}
      </span>
      <span className="min-w-0 pt-px">{children}</span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  return <div className={rowClass}>{content}</div>;
}

export default function Footer() {
  const hours = getHours("fr");

  return (
    <footer className="w-full overflow-x-hidden bg-kurkuma-green text-kurkuma-cream/80 grain-overlay pb-[env(safe-area-inset-bottom)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:items-start">
          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-4 lg:pr-6">
            <Logo variant="vertical" className="mb-5 h-36 sm:h-40 md:h-44 lg:h-48" />
            <p className="max-w-sm text-sm leading-relaxed text-kurkuma-cream/65">
              Cuisine fraîche • Tables partagées • Hospitalité chaleureuse
            </p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-4">
              <li>
                <FooterRow icon={<MapPin size={16} aria-hidden="true" />}>
                  {SITE.address}
                </FooterRow>
              </li>
              <li>
                <FooterRow
                  icon={<PhoneIcon size={16} />}
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                >
                  <span className="font-sans font-medium tabular-nums">
                    {SITE.phone}
                  </span>
                </FooterRow>
              </li>
              <li>
                <FooterRow
                  icon={<PhoneIcon size={16} />}
                  href={`tel:${SITE.phoneSecondary.replace(/\s/g, "")}`}
                >
                  <span className="font-sans font-medium tabular-nums">
                    {SITE.phoneSecondary}
                  </span>
                </FooterRow>
              </li>
              <li>
                <FooterRow
                  icon={<Mail size={16} aria-hidden="true" />}
                  href={`mailto:${SITE.email}`}
                >
                  <span className="break-all">{SITE.email}</span>
                </FooterRow>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2">
            <FooterHeading>Horaires</FooterHeading>
            <ul className="space-y-4">
              {hours.map((hour) => (
                <li key={hour.days}>
                  <FooterRow icon={<Clock size={16} aria-hidden="true" />}>
                    <span className="block font-medium text-kurkuma-cream">
                      {hour.days}
                    </span>
                    <span className="block text-kurkuma-cream/60">{hour.time}</span>
                  </FooterRow>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-kurkuma-cream/50 pl-8">
              {SITE.parking}
            </p>
          </div>

          {/* Social & links */}
          <div className="lg:col-span-3">
            <FooterHeading>Suivez-nous</FooterHeading>
            <ul className="space-y-4">
              <li>
                <FooterRow
                  icon={<InstagramIcon size={18} />}
                  href={SITE.instagram}
                  external
                >
                  {SITE.instagramHandle}
                </FooterRow>
              </li>
              <li>
                <FooterRow
                  icon={<FacebookIcon size={18} />}
                  href={SITE.facebook}
                  external
                >
                  Facebook
                </FooterRow>
              </li>
            </ul>

            <div className="mt-8 border-t border-kurkuma-yellow/10 pt-6">
              <FooterHeading>Liens rapides</FooterHeading>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-nav text-sm text-kurkuma-cream/70 transition-colors hover:text-kurkuma-yellow"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-nav text-sm text-kurkuma-cream/70 transition-colors hover:text-kurkuma-yellow"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-center sm:my-12">
          <BrandDivider light className="max-w-xs sm:max-w-sm" />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-kurkuma-yellow/10 pt-6 text-center text-[11px] text-kurkuma-cream/45 sm:flex-row sm:items-center sm:text-left sm:text-xs">
          <p className="max-w-xl">
            Kurkuma — cuisine indienne contemporaine, Ettelbruck, Luxembourg
          </p>
          <p className="shrink-0 tabular-nums">
            © {new Date().getFullYear()} Kurkuma. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
