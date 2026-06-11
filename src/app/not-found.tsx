import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kurkuma-cream px-4 sm:px-6">
      <div className="text-center max-w-md">
        <Logo variant="icon" className="mx-auto mb-6 h-16 w-16 opacity-40" />
        <span className="font-display text-6xl sm:text-8xl text-kurkuma-yellow/30">
          404
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-kurkuma-green mt-4 mb-4">
          Page introuvable
        </h1>
        <p className="text-kurkuma-warm-gray mb-8 text-sm sm:text-base">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
