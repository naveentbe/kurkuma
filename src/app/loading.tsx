import Image from "next/image";
import { LOGOS } from "@/lib/constants";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-kurkuma-green">
      <div className="text-center">
        <Image
          src={LOGOS.icon}
          alt="Kurkuma"
          width={64}
          height={64}
          className="mx-auto mb-6 h-14 w-14 sm:h-16 sm:w-16 animate-pulse"
          priority
        />
        <div className="w-12 h-0.5 bg-kurkuma-yellow/30 mx-auto overflow-hidden rounded-full">
          <div className="w-full h-full bg-kurkuma-yellow animate-[shimmer_1.5s_ease-in-out_infinite] origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
