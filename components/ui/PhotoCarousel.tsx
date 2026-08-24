"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryPlaceholders } from "@/lib/links";

export function PhotoCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="mt-6"
    >
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {galleryPlaceholders.map((src, i) => (
          <div
            key={i}
            className="relative h-48 w-36 flex-shrink-0 snap-start overflow-hidden rounded-xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Placeholder gradient when no image */}
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, hsl(${290 + i * 15}, 30%, 12%) 0%, hsl(${310 + i * 15}, 20%, 8%) 100%)`,
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
