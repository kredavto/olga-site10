"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Calculator from "./Calculator";
import { Reveal } from "./motion";
import { services } from "@/lib/services";
import { openBooking, rub } from "@/lib/booking";

const featured = ["implantaciya", "estetika", "ortodontiya", "terapiya"];

export default function PricingCenter() {
  const [open, setOpen] = useState<string | null>("implantaciya");

  return (
    <section id="prices" className="section relative overflow-hidden">
      <div className="shell relative">
        <SectionHeading
          eyebrow="Стоимость"
          title="Честный диапазон вместо слова «от»"
          text="Нижняя граница — реальная минимальная цена, верхняя — сложный случай со всеми этапами. Ваша сумма всегда внутри диапазона и фиксируется в плане лечения."
          aside={
            <Link href="/prices" className="btn btn-ghost">
              Полный прайс-лист
            </Link>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* expandable price cards */}
          <div className="space-y-4">
            {featured.map((slug, i) => {
              const s = services.find((x) => x.slug === slug)!;
              const isOpen = open === slug;
              return (
                <Reveal key={slug} delay={i * 0.06}>
                  <div
                    className={`card overflow-hidden transition-shadow duration-500 ${
                      isOpen ? "shadow-[var(--shadow-float)]" : ""
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : slug)}
                      className="flex w-full items-start justify-between gap-6 p-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <div>
                        <p className="t-eyebrow text-muted">{s.category}</p>
                        <h3 className="mt-2.5 text-[1.28rem] font-bold tracking-tight">
                          {s.h1}
                        </h3>
                        <p className="tnum mt-3 text-[1.42rem] font-bold text-royal-700">
                          {rub(s.priceFrom)} — {rub(s.priceTo)}
                        </p>
                        <p className="mt-1 text-[0.86rem] text-muted">
                          {s.priceLabel}
                        </p>
                      </div>
                      <span
                        className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isOpen
                            ? "rotate-45 border-royal-600 bg-royal-600 text-white"
                            : "border-line text-slate"
                        }`}
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 1v12M1 7h12"
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
                          <div className="border-t border-line px-7 pb-7 pt-6">
                            <dl className="grid gap-5 sm:grid-cols-3">
                              <Spec label="Срок лечения" value={s.duration} />
                              <Spec label="Гарантия" value={s.warranty} />
                              <Spec
                                label="Врачи"
                                value={`${s.doctorIds.length} специалиста`}
                              />
                            </dl>

                            <p className="mt-6 text-[0.86rem] font-medium text-muted">
                              Что входит
                            </p>
                            <ul className="mt-3 space-y-2.5">
                              {s.prices.slice(0, 4).map((p) => (
                                <li
                                  key={p.name}
                                  className="flex items-baseline justify-between gap-6 border-b border-line/70 pb-2.5 text-[0.94rem]"
                                >
                                  <span>
                                    {p.name}
                                    {p.note && (
                                      <span className="mt-0.5 block text-[0.8rem] text-muted">
                                        {p.note}
                                      </span>
                                    )}
                                  </span>
                                  <span className="tnum shrink-0 font-semibold">
                                    {p.from.toLocaleString("ru-RU")}–
                                    {p.to.toLocaleString("ru-RU")} ₽
                                  </span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 flex flex-wrap gap-3">
                              <button
                                className="btn btn-primary !py-3.5 text-[0.92rem]"
                                onClick={() =>
                                  openBooking({
                                    service: s.slug,
                                    title: `${s.h1} — расчёт стоимости`,
                                  })
                                }
                              >
                                Рассчитать мой случай
                              </button>
                              <Link
                                href={`/services/${s.slug}`}
                                className="btn btn-ghost !py-3.5 text-[0.92rem]"
                              >
                                Подробнее об услуге
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <Calculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.8rem] uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.98rem] font-medium">{value}</dd>
    </div>
  );
}
