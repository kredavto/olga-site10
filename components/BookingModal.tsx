"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookingForm from "./BookingForm";
import { BOOKING_EVENT, type BookingIntent } from "@/lib/booking";
import { site } from "@/lib/site";

export default function BookingModal() {
  const [intent, setIntent] = useState<BookingIntent | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) =>
      setIntent((e as CustomEvent<BookingIntent>).detail ?? {});
    window.addEventListener(BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIntent(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = intent ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [intent]);

  return (
    <AnimatePresence>
      {intent && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Запись на консультацию"
        >
          <div
            className="absolute inset-0 bg-graphite/40 backdrop-blur-md"
            onClick={() => setIntent(null)}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-refract relative w-full max-w-[520px] overflow-hidden rounded-t-[32px] sm:rounded-[32px]"
          >
            <div className="mesh opacity-70" />
            <button
              onClick={() => setIntent(null)}
              aria-label="Закрыть"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-white/70 text-lg transition-colors hover:bg-white"
            >
              ×
            </button>

            <div className="relative px-6 py-9 sm:px-10 sm:py-11">
              <p className="t-eyebrow text-royal-600">AURUM</p>
              <h2 className="t-h3 mt-3 font-bold">
                {intent.title ?? "Запись на консультацию"}
              </h2>
              <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-slate">
                {intent.subtitle ??
                  "Оставьте имя и телефон — координатор перезвонит, уточнит запрос и подберёт врача под вашу задачу."}
              </p>

              <div className="mt-7">
                <BookingForm defaultService={intent.service} />
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-6 text-[0.86rem]">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="font-semibold text-graphite"
                >
                  {site.phone}
                </a>
                <span className="text-muted">{site.hours}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
