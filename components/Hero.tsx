"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { Magnetic, SplitText, Counter } from "./motion";
import { openBooking } from "@/lib/booking";
import { site } from "@/lib/site";

const facts = [
  { value: "55 000 ₽", label: "имплантация — от этой суммы под ключ" },
  { value: "2009", label: "год основания клиники" },
  { value: "15 400+", label: "пациентов прошли лечение" },
  { value: "98,7%", label: "успешных операций имплантации" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(7px)"]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[136px] lg:pb-16"
    >
      {/* --- background stack --- */}
      {/* photograph first, then the scrims that make the type legible on it */}
      <Image
        src="/media/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
        className="pointer-events-none object-cover object-[24%_74%] lg:object-[50%_82%]"
        aria-hidden
      />
      {/* The frame is wide and its lit ridges sit along the bottom, so the
          crop is pulled down: centred, a tall viewport showed only the dark
          middle and the photograph read as a black field. On phones it is
          pulled left as well — a 390px-wide crop of a 1.9:1 frame is a narrow
          strip, and in the middle that strip is the dark valley between the
          two ridges. */}
      {/* Light flat scrim — enough to hold the photograph together, little
          enough to leave the picture visible. This shot is dark to begin
          with, so it takes far less than the previous one. */}
      <div className="pointer-events-none absolute inset-0 bg-[#040a18]/30 lg:bg-[#040a18]/18" />
      {/* The weight the type needs is put under the text column only, so the
          right half of the frame stays bright. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040a18]/88 via-[#040a18]/55 via-45% to-transparent" />
      {/* No fade into the section below: a gradient tall enough to read as a
          transition also reached the figures and bleached them. The hero ends
          on a clean edge instead. */}
      <div className="med-grid" />
      <HeroCanvas tone="dark" />
      <div className="noise" />

      {/* cinematic video slot — drop hero.mp4 into /public/media to enable;
          it plays over the photograph, under the scrims */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 [&[data-ready='1']]:opacity-[0.38]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        onCanPlay={(e) => e.currentTarget.setAttribute("data-ready", "1")}
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* floating glass panels */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -90]) }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="glass-dark float-slow absolute bottom-[8%] left-[2%] h-36 w-52 rounded-[28px] opacity-70" />
        <div className="glass-dark float-slower absolute right-[4%] top-[12%] h-28 w-44 rounded-[24px] opacity-70" />
        <div className="glass-dark float-slow absolute bottom-[6%] right-[46%] h-20 w-20 rounded-[22px] opacity-60" />
      </motion.div>

      {/* AI data flow */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#93B4FD" stopOpacity="0" />
            <stop offset="50%" stopColor="#BFD3FE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D8BE8A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[180, 340, 560, 720].map((yy, i) => (
          <path
            key={yy}
            d={`M-50 ${yy} C 320 ${yy - 70}, 620 ${yy + 80}, 900 ${yy - 30} S 1300 ${yy + 50}, 1500 ${yy - 10}`}
            stroke="url(#flow)"
            strokeWidth="1.2"
            fill="none"
            className="data-flow"
            style={{ animationDelay: `${i * -2.4}s` }}
          />
        ))}
      </svg>

      {/* --- content --- */}
      <motion.div
        style={{ y, opacity: fade, filter: blur }}
        className="shell relative z-10 w-full"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="chip">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-soft" />
                Работаем с {site.founded} года
              </span>
              <span className="chip chip-gold">Nobel Biocare · Straumann</span>
              <span className="chip">Микроскоп Leica на каждом кресле</span>
            </motion.div>

            <h1 className="t-h1 mt-7 font-bold text-white [text-shadow:0_2px_28px_rgba(4,10,24,0.55)]">
              <SplitText text="Имплантация зубов" delay={0.25} />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-shimmer inline-block"
              >
                под ключ за один визит
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="t-lead mt-7 max-w-xl text-white/82"
            >
              3D-планирование, хирургический шаблон и временная коронка в день
              операции. Стоимость под ключ — 55 000–120 000 ₽ вместе с коронкой,
              без доплат по ходу лечения.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic strength={0.28}>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    openBooking({
                      service: "implantaciya",
                      title: "Узнать стоимость лечения",
                      subtitle:
                        "Назовём диапазон по вашей ситуации и запишем на диагностику с 3D КТ.",
                    })
                  }
                >
                  Узнать стоимость
                  <Arrow />
                </button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    openBooking({ title: "Получить консультацию" })
                  }
                >
                  Получить консультацию
                </button>
              </Magnetic>

              <a
                href={`tel:${site.phoneHref}`}
                className="ml-1 hidden text-[1.05rem] font-semibold tracking-tight text-white transition-colors hover:text-royal-200 sm:block"
              >
                {site.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-11 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {facts.map((f) => (
                <div key={f.label}>
                  <p className="t-h4 font-bold tracking-tight text-white">
                    {f.value}
                  </p>
                  <p className="mt-1.5 text-[0.86rem] leading-snug text-white/72">
                    {f.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* quick booking panel */}
          <motion.aside
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="panel-dark glass-refract hairline relative overflow-hidden rounded-[30px] p-7 lg:ml-8 lg:p-8 xl:ml-14"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="t-eyebrow text-royal-200">Свободные окна</p>
                <p className="mt-2 text-[1.32rem] font-bold leading-tight text-white">
                  Ближайшая консультация — сегодня
                </p>
              </div>
              <span className="relative mt-1 flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-soft opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-soft" />
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                ["Консультация имплантолога", "18:40"],
                ["Диагностика 3D КТ", "19:10"],
                ["Второе мнение по плану", "20:00"],
              ].map(([what, when]) => (
                <li
                  key={what}
                  className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-[0.95rem] text-white/88"
                >
                  <span>{what}</span>
                  <span className="tnum font-semibold text-royal-200">{when}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => openBooking({ title: "Онлайн-запись" })}
              className="btn btn-primary mt-6 w-full"
            >
              Записаться онлайн
            </button>

            <a
              href={`tel:${site.phoneHref}`}
              className="btn btn-ghost mt-3 w-full !py-3 text-[0.9rem]"
            >
              Позвонить {site.phone}
            </a>

            <p className="mt-5 flex items-baseline gap-2 text-[0.84rem] text-white/68">
              <Counter to={site.stats.reviews} className="font-semibold text-white" />
              отзывов, средняя оценка {site.stats.rating}
            </p>
          </motion.aside>
        </div>
      </motion.div>

      {/* anchored right, not centred: on tall screens a centred cue lands on
          top of the fourth figure in the stats row */}
      <Link
        href="#trust"
        aria-label="К следующему разделу"
        className="absolute bottom-8 right-[4%] z-10 hidden flex-col items-center gap-2 text-white/70 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[0.72rem] uppercase tracking-[0.2em]">Листайте</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-9 w-[1px] bg-gradient-to-b from-white/70 to-transparent"
        />
      </Link>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 6h13M9.5 1.5L14 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
