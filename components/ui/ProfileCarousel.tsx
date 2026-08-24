"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { carouselSlides } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;

export function ProfileCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % carouselSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [isPaused, next]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "4/3", maxHeight: "45vh", borderRadius: 16 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="absolute inset-0"
        >
          {/* Placeholder visível atrás da imagem */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg,
                hsl(${320 + current * 18}, 40%, 15%) 0%,
                hsl(${295 + current * 12}, 30%, 10%) 100%)`,
            }}
          />
          <Image
            src={carouselSlides[current]}
            alt={`Slide ${current + 1}`}
            fill
            className="object-cover object-center"
            priority={current === 0}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay inferior */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background: "linear-gradient(to top, var(--panel-left) 0%, transparent 100%)",
        }}
      />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 999,
              background: i === current ? "var(--accent)" : "rgba(255,255,255,0.25)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
