import type { Metadata } from "next";
import Logo from "@/components/ui/Logo";
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
      <div className="pt-24 sm:pt-32 pb-6 sm:pb-8 bg-kurkuma-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-center">
          <Logo variant="vertical" className="h-28 sm:h-36" />
        </div>
      </div>
      <MenuSection />
      <FinalCTASection />
    </>
  );
}
