"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { links } from "@/lib/links";
import { PlatformIcon } from "./PlatformIcon";

const ease = [0.23, 1, 0.32, 1] as const;

const vip       = links.find((l) => l.id === "of-vip")!;
const secondary = links.filter((l) => ["of-free", "family"].includes(l.id));
const socials   = links.filter((l) =>
  ["ig-main", "ig-alt", "tiktok", "twitter", "pinterest", "reddit", "youtube"].includes(l.id)
);

export function LinksPanel() {
  return (
    <div className="flex flex-col px-6 pb-10 pt-8 lg:px-10 lg:pt-12">

      {/* ── VIP hero ─────────────────────────────── */}
      <motion.a
        href={vip.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
        whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
        className="shimmer-vip group relative block overflow-hidden rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(110deg, rgba(232,121,160,0.09) 0%, rgba(200,70,130,0.15) 45%, rgba(232,121,160,0.18) 60%, rgba(200,70,130,0.15) 75%, rgba(232,121,160,0.09) 100%)",
          border: "1px solid var(--accent-border)",
          boxShadow: "0 0 40px rgba(232,121,160,0.08)",
        }}
      >
        {/* Hover overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
          style={{ background: "rgba(232,121,160,0.05)" }}
        />
        <div className="relative flex items-center gap-4">
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(232,121,160,0.18)", color: "var(--accent)" }}
          >
            <PlatformIcon platform={vip.platform} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(232,121,160,0.6)" }}>
              Premium Access
            </p>
            <p className="text-base font-bold" style={{ color: "var(--accent)" }}>
              {vip.label}
            </p>
          </div>
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ background: "rgba(232,121,160,0.15)", color: "var(--accent)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </motion.a>

      {/* ── Secondary (2 col) ───────────────────── */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {secondary.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 + i * 0.06, ease }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "rgba(255,255,255,0.025)" }}
            />
            <span className="relative" style={{ color: "rgba(255,255,255,0.35)" }}>
              <PlatformIcon platform={item.platform} size={17} />
            </span>
            <span className="relative text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* ── Divider ────────────────────────────── */}
      <div className="my-8 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
          find me everywhere
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── Social grid — avatar grande + nome + handle ── */}
      <div className="grid grid-cols-2 gap-3">
        {socials.map((item, i) => {
          const isLastOdd = i === socials.length - 1 && socials.length % 2 !== 0;
          return (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.42 + i * 0.04, ease }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl py-5 px-3${isLastOdd ? " col-span-2 flex-row py-4 px-5" : ""}`}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "rgba(255,255,255,0.025)" }}
              />

              {/* Avatar — espaço reservado pra foto real */}
              <div
                className="relative flex-shrink-0 overflow-hidden rounded-full"
                style={{
                  width: isLastOdd ? 48 : 56,
                  height: isLastOdd ? 48 : 56,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src={item.profilePhoto ?? ""}
                  alt={item.handle ?? item.label}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Placeholder até a foto chegar */}
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }}
                >
                  <PlatformIcon platform={item.platform} size={isLastOdd ? 18 : 22} />
                </div>
              </div>

              {/* Nome + handle */}
              <div className={`relative min-w-0 ${isLastOdd ? "flex-1 text-left" : "w-full text-center"}`}>
                <p
                  className="truncate text-xs font-semibold"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item.label}
                </p>
                <p
                  className="truncate text-[10px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {item.handle}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* ── Footer ─────────────────────────────── */}
      <div className="mt-10 text-center text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
        <div className="mb-1.5 flex justify-center gap-5">
          <a href="/politica-de-privacidade" className="transition-opacity hover:opacity-60">Privacy Policy</a>
          <a href="#" className="transition-opacity hover:opacity-60">Terms of Service</a>
        </div>
        <p>© {new Date().getFullYear()} Ana Verse</p>
      </div>
    </div>
  );
}
