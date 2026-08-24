"use client";

import { motion } from "framer-motion";
import { links } from "@/lib/links";
import { PlatformIcon } from "./PlatformIcon";

const ease = [0.23, 1, 0.32, 1] as const;

const vip        = links.find((l) => l.id === "of-vip")!;
const secondary  = links.filter((l) => ["of-free", "family"].includes(l.id));
const socials    = links.filter((l) =>
  ["ig-main", "ig-alt", "tiktok", "twitter", "pinterest", "reddit", "youtube"].includes(l.id)
);

export function BentoLinks() {
  return (
    <div className="mt-8 flex flex-col gap-3">

      {/* ── VIP hero card ─────────────────────────────────── */}
      <motion.a
        href={vip.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
        className="group relative overflow-hidden rounded-3xl p-6"
        style={{
          border: "1px solid rgba(232,121,160,0.35)",
          boxShadow: "0 0 60px rgba(232,121,160,0.1), 0 0 120px rgba(168,85,247,0.06)",
        }}
      >
        {/* Shimmer background */}
        <div
          className="shimmer-btn absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(232,121,160,0.07) 0%, rgba(168,85,247,0.14) 40%, rgba(232,121,160,0.18) 55%, rgba(168,85,247,0.14) 70%, rgba(232,121,160,0.07) 100%)",
            backgroundSize: "200% auto",
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(232,121,160,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "rgba(232,121,160,0.2)", color: "#e879a0" }}
            >
              <PlatformIcon platform={vip.platform} size={22} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "rgba(232,121,160,0.6)" }}>
                Premium Access
              </p>
              <p className="text-lg font-bold" style={{ color: "#e879a0" }}>
                {vip.label}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Exclusive content · Members only
              </p>
            </div>
          </div>
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ background: "rgba(232,121,160,0.15)", color: "#e879a0" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </motion.a>

      {/* ── Secondary row (2 colunas) ─────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {secondary.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "rgba(255,255,255,0.025)" }} />
            <span className="relative" style={{ color: "rgba(255,255,255,0.4)" }}>
              <PlatformIcon platform={item.platform} size={18} />
            </span>
            <span className="relative text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* ── Divisor ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        <span className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.18)" }}>
          follow me
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ── Grade de ícones sociais ────────────────────────── */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {socials.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.45 + i * 0.04, ease }}
            whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
            className="group flex flex-col items-center gap-1.5 rounded-2xl p-3 sm:p-3.5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "rgba(255,255,255,0.02)" }} />
            <span style={{ color: "rgba(255,255,255,0.5)" }} className="transition-colors duration-150 group-hover:text-white">
              <PlatformIcon platform={item.platform} size={20} />
            </span>
            <span className="text-center text-[10px] leading-tight"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {item.label.split(" ")[0]}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
