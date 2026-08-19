"use client";

import { motion } from "framer-motion";
import { track } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const stagger = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  },
};

function handleCTAClick() {
  track.conversion("hero_cta_click");
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

function handleWhatsAppClick() {
  track.whatsappClick("hero");
  track.lead("whatsapp", "hero");
}

export function HeroSection() {
  const waText = encodeURIComponent(siteConfig.whatsappMessage);
  const waHref = `https://wa.me/${siteConfig.phone}?text=${waText}`;

  return (
    <section className="relative overflow-hidden bg-zinc-950 px-6 py-32 sm:py-44">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[500px] w-[800px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={stagger.item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {/* Customize badge text */}
              Bem-vindo
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={stagger.item}
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl sm:leading-[1.1]"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={stagger.item}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={stagger.item}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={handleCTAClick}
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
            >
              Fale com a gente
            </button>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-zinc-300 transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/30 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-[#25D366]"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
