"use client";

import SectionHeading from "./SectionHeading";
import { Reveal, TiltCard } from "./motion";
import { packages } from "@/lib/data";
import { openBooking } from "@/lib/booking";

export default function Packages() {
  return (
    <section id="packages" className="section relative overflow-hidden bg-graphite">
      <div className="med-grid opacity-25" />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.5), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(216,190,138,0.4), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <SectionHeading
          invert
          eyebrow="Пакеты лечения"
          title="Комплексные решения с фиксированной стоимостью"
          text="Всё, что нужно для результата, собрано в один пакет: этапы, материалы, визиты, гарантия и рассрочка. Ничего не всплывает по ходу."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {packages.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07} className="group h-full">
              <TiltCard
                intensity={6}
                glow={false}
                className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 transition-colors duration-500 ${
                  p.highlight
                    ? "border-champagne/40 bg-white/[0.07]"
                    : "border-white/12 bg-white/[0.035] hover:border-white/25"
                }`}
              >
                <div className="glass-refract absolute inset-0 rounded-[28px]" />

                {p.badge && (
                  <span
                    className={`relative mb-5 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[0.74rem] font-semibold uppercase tracking-wider ${
                      p.highlight
                        ? "bg-champagne text-[#2b2311]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}

                <h3 className="relative text-[1.3rem] font-bold leading-tight text-white">
                  {p.name}
                </h3>
                <p className="relative mt-2.5 text-[0.92rem] leading-relaxed text-white/55">
                  {p.subtitle}
                </p>

                <p className="tnum relative mt-6 text-[1.35rem] font-bold text-white">
                  {p.price}
                </p>
                <p className="relative mt-1 text-[0.88rem] text-champagne">
                  {p.monthly} · рассрочка 0%
                </p>

                <ul className="relative mt-7 space-y-2.5 border-t border-white/10 pt-6">
                  {p.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2.5 text-[0.89rem] leading-snug text-white/70"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="mt-[5px] shrink-0"
                        aria-hidden
                      >
                        <path
                          d="M2 7.5l3.2 3.2L12 3.8"
                          stroke="#4FAE92"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>

                <dl className="relative mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-[0.82rem]">
                  <div>
                    <dt className="text-white/40">Срок</dt>
                    <dd className="mt-1 text-white/80">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40">Гарантия</dt>
                    <dd className="mt-1 text-white/80">{p.warranty}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-white/40">Материалы</dt>
                    <dd className="mt-1 text-white/80">{p.materials}</dd>
                  </div>
                </dl>

                <button
                  onClick={() =>
                    openBooking({
                      title: p.name,
                      subtitle: `Расскажем, подходит ли пакет в вашей ситуации, и что войдёт в вашу смету. Стоимость пакета: ${p.price}.`,
                    })
                  }
                  className={`relative mt-7 w-full rounded-full py-3.5 text-[0.93rem] font-semibold transition-all duration-400 ${
                    p.highlight
                      ? "bg-champagne text-[#2b2311] hover:brightness-105"
                      : "border border-white/20 text-white hover:bg-white hover:text-graphite"
                  }`}
                >
                  Обсудить пакет
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
