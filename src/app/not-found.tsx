import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kurkuma-cream px-6">
      <div className="text-center max-w-md">
        <span className="font-display text-8xl text-kurkuma-gold/30">404</span>
        <h1 className="font-display text-3xl text-kurkuma-charcoal mt-4 mb-4">
          Page introuvable
        </h1>
        <p className="text-kurkuma-warm-gray mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
