"use client";

import { motion } from "framer-motion";
import { ProfileCarousel } from "./ProfileCarousel";
import { profileData } from "@/lib/links";

const ease = [0.23, 1, 0.32, 1] as const;

export function ProfilePanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className="flex h-full flex-col justify-between gap-5 px-8 pb-8 pt-10 lg:px-10 lg:pt-12"
    >
      {/* Carrossel — ocupa espaço proporcional, não domina */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
        className="flex-shrink-0"
      >
        <ProfileCarousel />
      </motion.div>

      {/* Nome + badge + bio */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18, ease }}
      >
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl" style={{ lineHeight: 1.05 }}>
            {profileData.name}
          </h1>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{
              background: "rgba(29,155,240,0.12)",
              border: "1px solid rgba(29,155,240,0.22)",
              color: "#60b8f8",
            }}
          >
            ✓ Verified
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {profileData.bio}
        </p>
      </motion.div>

      {/* Meta + tags + tagline — compacto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.26, ease }}
        className="space-y-2.5"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <span>{profileData.location}</span>
          <span>Since {profileData.since}</span>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>Top Creator</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {profileData.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg px-2.5 py-1 text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm font-semibold italic" style={{ color: "var(--accent)" }}>
          {profileData.tagline}
        </p>
      </motion.div>
    </motion.div>
  );
}
