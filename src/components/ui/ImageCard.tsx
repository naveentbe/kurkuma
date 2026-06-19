"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  overlay?: boolean;
  fit?: "cover" | "contain";
  position?: "center" | "top" | "bottom";
  imageClassName?: string;
}

const positionClasses = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export default function ImageCard({
  src,
  alt,
  className = "",
  priority = false,
  overlay = false,
  fit = "cover",
  position = "center",
  imageClassName = "",
}: ImageCardProps) {
  return (
    <motion.div
      className={`image-zoom-container relative h-96 w-full overflow-hidden rounded-sm ${className}`}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`zoom-image ${fit === "contain" ? "object-contain" : "object-cover"} ${positionClasses[position]} ${imageClassName}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-kurkuma-green/60 via-transparent to-transparent" />
      )}
    </motion.div>
  );
}
