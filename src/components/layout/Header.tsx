"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import PhoneIcon from "@/components/ui/PhoneIcon";
import ReserveButton from "@/components/reservation/ReserveButton";
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

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAV_LINKS.filter((link) => link.href.startsWith("/#")).map(
      (link) => link.href.replace("/#", "")
    );

    const updateActiveSection = () => {
      const headerOffset = 120;

      if (window.scrollY < 80) {
        setHash(window.location.hash || "");
        if (!window.location.hash) return;
      }

      let activeId = window.location.hash.replace("#", "");

      for (const id of [...sectionIds].reverse()) {
        const section = document.getElementById(id);
        if (!section) continue;

        const top = section.getBoundingClientRect().top;
        if (top <= headerOffset) {
          activeId = id;
          break;
        }
      }

      setHash(activeId ? `#${activeId}` : "");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
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

function HeaderNavLink({
  href,
  label,
  active,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`relative font-nav py-4 min-h-[48px] flex items-center border-b border-kurkuma-yellow/15 text-[17px] sm:text-lg transition-colors duration-300 ${
          active
            ? "text-kurkuma-yellow font-semibold pl-3"
            : "text-kurkuma-cream/90 hover:text-kurkuma-yellow pl-3"
        }`}
      >
        <span
          aria-hidden
          className={`absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-kurkuma-yellow transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative inline-flex flex-col items-center px-1 py-2"
    >
      <span
        className={`font-nav text-sm xl:text-[15px] tracking-[0.02em] whitespace-nowrap transition-colors duration-300 ${
          active
            ? "font-semibold text-kurkuma-yellow"
            : "font-medium text-kurkuma-cream/90 group-hover:text-kurkuma-yellow"
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden
        className={`mt-2 h-0.5 w-full rounded-full bg-kurkuma-yellow transition-transform duration-300 origin-center ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"
        }`}
      />
    </Link>
  );
}

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isActive = useActiveHref();
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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

  const phoneLinkClass =
    "flex items-center gap-2 text-kurkuma-yellow hover:text-kurkuma-yellow-light transition-colors font-sans font-semibold tracking-wide tabular-nums";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] overflow-x-hidden bg-kurkuma-green border-b border-kurkuma-yellow/10 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-2 sm:gap-3 h-14 sm:h-16 lg:h-[4.5rem] min-w-0">
          <Link href="/" className="shrink-0 min-w-0" onClick={closeMobileMenu}>
            <span className="sm:hidden">
              <Logo variant="icon" priority />
            </span>
            <span className="hidden sm:block">
              <Logo variant="vertical" priority className="h-8 md:h-9 lg:h-10" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 flex-1 px-4">
            {NAV_LINKS.map((link) => (
              <HeaderNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
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
            <ReserveButton
              label="Réserver"
              variant="header"
              className="!w-auto"
            />
          </div>

          <div className="flex lg:hidden items-center gap-0.5 sm:gap-1 shrink-0 min-w-0">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={`${phoneLinkClass} p-2 min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-2 justify-center sm:justify-start`}
              aria-label={`Appeler ${SITE.phone}`}
            >
              <PhoneIcon size={18} />
              <span className="hidden sm:inline truncate">{SITE.phone}</span>
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
                <HeaderNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActive(link.href)}
                  onClick={closeMobileMenu}
                  mobile
                />
              ))}
              <div className="pt-5 flex flex-col gap-4">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className={`${phoneLinkClass} text-base sm:text-lg py-2 min-h-[48px]`}
                >
                  <PhoneIcon size={18} />
                  <span>{SITE.phone}</span>
                </a>
                <ReserveButton
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
