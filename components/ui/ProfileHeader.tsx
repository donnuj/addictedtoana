"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profileData } from "@/lib/links";

export function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col items-center gap-5 pb-2 pt-16 text-center"
    >
      {/* Avatar com anel girando */}
      <div className="relative">
        {/* Glow atmosférico */}
        <div
          className="pulse-glow absolute -inset-6 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
        />

        {/* Anel girando */}
        <div className="avatar-ring absolute -inset-1 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #e879a0, #a855f7, #6366f1, #e879a0)",
            borderRadius: "9999px",
          }}
        />

        {/* Espaçador branco entre anel e foto */}
        <div className="absolute -inset-0.5 rounded-full" style={{ background: "var(--bg)" }} />

        {/* Foto */}
        <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
          <Image
            src={profileData.avatarUrl}
            alt={profileData.name}
            fill
            className="object-cover"
            priority
          />
          <div
            className="flex h-full w-full items-center justify-center text-4xl font-bold"
            style={{ background: "rgba(88,28,135,0.3)", color: "#e879a0" }}
          >
            {profileData.name[0]}
          </div>
        </div>

        {/* Badge verificado */}
        <div
          className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: "#1d9bf0", border: "2.5px solid var(--bg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      {/* Nome — editorial, grande */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{
            background: "linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {profileData.name}
        </h1>
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {profileData.bio}
        </p>
      </div>

      {/* Meta row */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <span>📍 {profileData.location}</span>
        <span>🗓 Since {profileData.since}</span>
        <span style={{ color: "#e879a0", fontWeight: 600 }}>⭐ Top Creator</span>
      </div>

      {/* Tags como chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {profileData.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p
        className="text-sm font-semibold italic tracking-wide"
        style={{ color: "#e879a0" }}
      >
        {profileData.tagline}
      </p>
    </motion.div>
  );
}
