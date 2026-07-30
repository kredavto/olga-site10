"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./motion";
import type { Faq } from "@/lib/data";

export default function FaqAccordion({
  items,
  withFilter = true,
}: {
  items: Faq[];
  withFilter?: boolean;
}) {
  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [cat, setCat] = useState("Все");
  const [open, setOpen] = useState<number | null>(0);

  const list = cat === "Все" ? items : items.filter((i) => i.category === cat);

  return (
    <div>
      {withFilter && (
        <Reveal>
          <div className="mb-9 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setOpen(0);
                }}
                className={`relative rounded-full px-4 py-2 text-[0.87rem] font-medium transition-colors ${
                  cat === c
                    ? "text-white"
                    : "border border-line bg-white text-slate hover:border-royal-300"
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="faq-pill"
                    className="absolute inset-0 rounded-full bg-graphite"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <ul className="divide-y divide-line border-y border-line">
        {list.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-8 py-7 text-left"
                aria-expanded={isOpen}
              >
                <span className="flex-1">
                  <span className="block text-[0.74rem] uppercase tracking-[0.14em] text-muted">
                    {f.category}
                  </span>
                  <span
                    className={`mt-2.5 block text-[1.1rem] font-semibold leading-snug tracking-tight transition-colors sm:text-[1.2rem] ${
                      isOpen ? "text-royal-700" : "group-hover:text-royal-700"
                    }`}
                  >
                    {f.q}
                  </span>
                </span>
                <span
                  className={`mt-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen
                      ? "rotate-135 border-royal-600 bg-royal-600 text-white"
                      : "border-line text-slate group-hover:border-royal-300"
                  }`}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-8 pr-12 text-[1.02rem] leading-relaxed text-slate">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
