import Image from "next/image";
import { LOGOS } from "@/lib/constants";

type LogoVariant = "horizontal" | "vertical" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const LOGO_CONFIG: Record<
  LogoVariant,
  { src: string; width: number; height: number; defaultClass: string }
> = {
  horizontal: {
    src: LOGOS.horizontal,
    width: 420,
    height: 520,
    defaultClass: "h-auto w-full max-w-[320px]",
  },
  vertical: {
    src: LOGOS.vertical,
    width: 180,
    height: 220,
    defaultClass: "h-32 w-auto sm:h-44 md:h-52",
  },
  icon: {
    src: LOGOS.icon,
    width: 512,
    height: 512,
    defaultClass: "h-9 w-9 sm:h-10 sm:w-10",
  },
};

export default function Logo({
  variant = "horizontal",
  className = "",
  priority = false,
}: LogoProps) {
  const config = LOGO_CONFIG[variant];

  return (
    <Image
      src={config.src}
      alt="Kurkuma"
      width={config.width}
      height={config.height}
      priority={priority}
      className={`object-contain ${config.defaultClass} ${className}`}
    />
  );
}
