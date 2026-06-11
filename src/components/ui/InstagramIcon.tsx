import Image from "next/image";
import { LOGOS } from "@/lib/constants";

interface InstagramIconProps {
  size?: number;
  className?: string;
}

export default function InstagramIcon({
  size = 24,
  className = "",
}: InstagramIconProps) {
  return (
    <Image
      src={LOGOS.instagram}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
