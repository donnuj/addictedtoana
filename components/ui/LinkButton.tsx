"use client";

import { motion } from "framer-motion";
import type { LinkItem } from "@/lib/links";
import { PlatformIcon } from "./PlatformIcon";

type Props = { item: LinkItem; index: number };

export function LinkButton({ item, index }: Props) {
  if (item.featured) {
    return (
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
        className="group relative flex w-full flex-col items-center gap-1 overflow-hidden rounded-2xl px-6 py-5"
        style={{
          border: "1px solid rgba(232,121,160,0.3)",
          boxShadow: "0 0 40px rgba(232,121,160,0.12), 0 0 80px rgba(168,85,247,0.06)",
        }}
      >
        {/* Fundo gradiente com shimmer */}
        <div
          className="shimmer-btn absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(232,121,160,0.08) 0%, rgba(168,85,247,0.12) 30%, rgba(232,121,160,0.16) 50%, rgba(168,85,247,0.12) 70%, rgba(232,121,160,0.08) 100%)",
            backgroundSize: "200% auto",
          }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: "rgba(232,121,160,0.06)" }}
        />

        <div className="relative flex w-full items-center gap-4">
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(232,121,160,0.15)", color: "#e879a0" }}
          >
            <PlatformIcon platform={item.platform} size={20} />
          </span>

          <div className="flex-1 text-left">
            <div className="text-base font-bold tracking-wide" style={{ color: "#e879a0" }}>
              {item.label}
            </div>
            <div className="text-xs" style={{ color: "rgba(232,121,160,0.6)" }}>
              Exclusive content · Access now
            </div>
          </div>

          <span
            className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: "#e879a0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        delay: 0.25 + index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
      className="group relative flex w-full items-center gap-4 rounded-2xl px-5 py-3.5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Hover overlay */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.025)" }}
      />

      {/* Icon */}
      <span
        className="relative flex-shrink-0"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <PlatformIcon platform={item.platform} size={17} />
      </span>

      {/* Label */}
      <span
        className="relative flex-1 text-sm font-medium"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        {item.label}
      </span>

      {/* Arrow */}
      <span
        className="relative flex-shrink-0 opacity-25 transition-opacity duration-150 group-hover:opacity-50"
        style={{ color: "white" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </span>
    </motion.a>
  );
}
