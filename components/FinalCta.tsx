"use client";

import { motion } from "framer-motion";
import BookingForm from "./BookingForm";
import { SplitText, Reveal, Counter } from "./motion";
import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section id="booking" className="relative overflow-hidden bg-graphite py-24 lg:py-32">
      <div className="med-grid opacity-25" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 18% 20%, rgba(37,99,235,0.35), transparent 62%), radial-gradient(46rem 36rem at 85% 78%, rgba(216,190,138,0.22), transparent 62%)",
        }}
      />

      {/* ambient smile artwork */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 rounded-full lg:block"
        style={{
          background:
            "conic-gradient(from 140deg, rgba(37,99,235,0.35), rgba(79,174,146,0.28), rgba(216,190,138,0.32), rgba(37,99,235,0.35))",
          filter: "blur(70px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <p className="t-eyebrow text-champagne">Первый шаг</p>
          </Reveal>
          <SplitText
            as="h2"
            text="Начните с консультации, а не с лечения"
            className="t-h2 mt-5 font-bold text-white"
            stagger={0.015}
          />
          <Reveal delay={0.15}>
            <p className="t-lead mt-7 max-w-lg text-white/65">
              На консультации вы получите диагноз, план с фиксированной ценой и
              честный ответ, что действительно нужно делать сейчас, а что может
              подождать. Без давления и продажи лишнего.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                ["2 500 ₽", "стоимость консультации — засчитывается в лечение"],
                ["0 ₽", "второе мнение по плану из другой клиники"],
                ["12 минут", "среднее время до ответного звонка"],
                ["24 месяца", "максимальный срок рассрочки без переплаты"],
              ].map(([v, l]) => (
                <li key={l}>
                  <p className="text-[1.7rem] font-bold tracking-tight text-white">
                    {v}
                  </p>
                  <p className="mt-1.5 text-[0.9rem] leading-snug text-white/50">
                    {l}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-white/50">
              <a
                href={`tel:${site.phoneHref}`}
                className="text-[1.3rem] font-bold text-white transition-colors hover:text-champagne"
              >
                {site.phone}
              </a>
              <span>{site.hours}</span>
              <span>
                <Counter to={site.stats.reviews} className="text-white/80" /> отзывов
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="hairline relative overflow-hidden rounded-[32px] border border-white/40 bg-white p-8 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] lg:p-10">
            <h3 className="t-h4 font-bold">Записаться на консультацию</h3>
            <p className="mt-2.5 text-[0.95rem] text-slate">
              Три поля — остальное уточним по телефону.
            </p>
            <div className="mt-7">
              <BookingForm submitLabel="Получить консультацию" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
