"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/tracking";

const CONSENT_KEY = "cookie_consent";

type ConsentState = "accepted" | "declined" | null;

function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentState) ?? null;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
    } else {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    track.custom("cookie_consent", { action: "accepted" });
    // Allow GTM to fire analytics tags
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "consent_accepted" });
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
    track.custom("cookie_consent", { action: "declined" });
  }

  // Suppress unused variable warning
  void consent;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Aviso de cookies"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md"
        >
          <p className="text-sm leading-relaxed text-zinc-300">
            Usamos cookies e tecnologias similares para analisar o uso do site,
            personalizar conteúdo e exibir anúncios relevantes. Ao continuar,
            você concorda com nossa{" "}
            <a
              href="/politica-de-privacidade"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              Política de Privacidade
            </a>
            {" "}(LGPD).
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={accept}
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
            >
              Aceitar todos
            </button>
            <button
              onClick={decline}
              className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/30 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              Recusar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
