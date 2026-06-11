"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import PhoneIcon from "@/components/ui/PhoneIcon";
import ZenchefBooking from "@/components/zenchef/ZenchefBooking";
import { SITE, NAV_LINKS } from "@/lib/constants";

function useActiveHref() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !hash;
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }
    return pathname === href;
  };

  return isActive;
}

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isActive = useActiveHref();
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, closeMobileMenu]);

  const navLinkClass = (href: string) =>
    `font-nav text-sm xl:text-[15px] font-medium tracking-[0.02em] transition-colors duration-300 py-2 whitespace-nowrap ${
      isActive(href)
        ? "text-kurkuma-yellow font-semibold border-b-2 border-kurkuma-yellow pb-1"
        : "text-kurkuma-cream/90 hover:text-kurkuma-yellow"
    }`;

  const phoneLinkClass =
    "flex items-center gap-2 text-kurkuma-yellow hover:text-kurkuma-yellow-light transition-colors font-sans font-semibold tracking-wide tabular-nums";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-kurkuma-green border-b border-kurkuma-yellow/10 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-3 h-14 sm:h-16 lg:h-[4.5rem]">
          <Link href="/" className="shrink-0 min-w-0" onClick={closeMobileMenu}>
            <span className="sm:hidden">
              <Logo variant="icon" priority />
            </span>
            <span className="hidden sm:block">
              <Logo variant="horizontal" priority className="h-8 md:h-9 lg:h-10" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 flex-1 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={`${phoneLinkClass} text-sm xl:text-base min-h-[44px]`}
            >
              <PhoneIcon size={16} />
              <span>{SITE.phone}</span>
            </a>
            <ZenchefBooking
              label="Réserver"
              variant="header"
              className="!w-auto"
            />
          </div>

          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={`${phoneLinkClass} text-xs sm:text-sm px-1.5 sm:px-2 min-h-[44px] max-w-[52vw] sm:max-w-none`}
              aria-label={`Appeler ${SITE.phone}`}
            >
              <PhoneIcon size={16} className="sm:hidden" />
              <PhoneIcon size={18} className="hidden sm:block" />
              <span className="truncate">{SITE.phone}</span>
            </a>
            <button
              type="button"
              className="text-kurkuma-yellow p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-kurkuma-green border-t border-kurkuma-yellow/10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <nav className="container mx-auto px-4 sm:px-6 py-6 flex flex-col gap-0">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${navLinkClass(link.href)} py-4 min-h-[48px] flex items-center border-b border-kurkuma-yellow/15 last:border-0 text-[17px] sm:text-lg`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-5 flex flex-col gap-4">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className={`${phoneLinkClass} text-base sm:text-lg py-2 min-h-[48px]`}
                >
                  <PhoneIcon size={18} />
                  <span>{SITE.phone}</span>
                </a>
                <ZenchefBooking
                  label="Réserver"
                  variant="outline"
                  onPress={closeMobileMenu}
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
