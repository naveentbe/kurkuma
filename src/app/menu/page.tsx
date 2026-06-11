import type { Metadata } from "next";
import MenuSection from "@/components/sections/MenuSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Découvrez le menu de Kurkuma — cuisine indienne contemporaine à Ettelbruck. Currys, grill tandoor, cocktails et plus.",
};

export default function MenuPage() {
  return (
    <>
      <div className="pt-32 pb-8 bg-kurkuma-cream">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="text-xs tracking-[0.35em] uppercase text-kurkuma-gold">
            Kurkuma
          </span>
        </div>
      </div>
      <MenuSection />
      <FinalCTASection />
    </>
  );
}
