"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/tracking";

interface LeadFormProps {
  title?: string;
  buttonLabel?: string;
  campaign?: string;
  onSuccess?: () => void;
}

type FormState = "idle" | "loading" | "success" | "error";

export function LeadForm({
  title = "Fale com a gente",
  buttonLabel = "Enviar mensagem",
  campaign,
  onSuccess,
}: LeadFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("loading");
    track.formSubmit(title);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, campaign }),
      });

      if (!res.ok) throw new Error("error");

      setState("success");
      track.lead("form", campaign);
      track.conversion("lead");
      onSuccess?.();
      formRef.current?.reset();
    } catch {
      setState("error");
    }
  }

  function handleFirstChange() {
    if (state === "idle") track.formStart(title);
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5";

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>

      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="py-8 text-center"
          >
            <div className="mb-3 text-3xl">✓</div>
            <p className="text-sm font-medium text-zinc-900">
              Mensagem enviada!
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Entraremos em contato em breve.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            onChange={handleFirstChange}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium text-zinc-700"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-xs font-medium text-zinc-700"
                >
                  WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-zinc-700"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com.br"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-medium text-zinc-700"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Como podemos ajudar?"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Generic email marketing embed slot */}
            <div id="email-marketing-embed" />

            {state === "error" && (
              <p className="text-xs text-red-500">
                Ocorreu um erro. Tente novamente ou entre em contato pelo
                WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-transform duration-150 ease-out disabled:opacity-60 active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-zinc-700"
            >
              {state === "loading" ? "Enviando..." : buttonLabel}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
