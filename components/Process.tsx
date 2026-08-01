"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";
import { processSteps } from "@/lib/data";

export default function Process() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="process" className="section relative overflow-hidden bg-pearl">
      <div className="med-grid opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Как проходит лечение"
          title="Пять этапов от первого звонка до контрольного осмотра"
          text="Ни один этап не начинается, пока вы не понимаете, что происходит и сколько это стоит."
        />

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* timeline rail */}
          <div className="relative">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line" aria-hidden />
            <motion.div
              className="absolute left-[27px] top-2 w-px origin-top bg-gradient-to-b from-royal-600 to-emerald-soft"
              style={{ scaleY: progress, bottom: 8 }}
              aria-hidden
            />

            <ul className="space-y-2">
              {processSteps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-5 rounded-3xl px-3 py-4 text-left transition-colors hover:bg-white/70"
                      aria-expanded={on}
                    >
                      <span
                        className={`relative flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl border text-[0.92rem] font-bold tabular-nums transition-all duration-500 ${
                          on
                            ? "border-royal-600 bg-royal-600 text-white shadow-[0_16px_36px_-14px_rgba(37,99,235,0.75)]"
                            : "border-line bg-white text-muted group-hover:border-royal-300"
                        }`}
                      >
                        {s.n}
                        {on && (
                          <motion.span
                            layoutId="process-ring"
                            className="absolute -inset-1.5 rounded-[20px] border border-royal-300"
                          />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-[1.12rem] font-bold tracking-tight transition-colors ${
                            on ? "text-graphite" : "text-slate"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="mt-0.5 block text-[0.86rem] text-muted">
                          {s.duration}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <div className="glass hairline relative min-h-[26rem] overflow-hidden rounded-[30px] p-8 lg:p-11">
              <StageArt index={active} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <p className="t-eyebrow text-royal-700">
                    Этап {processSteps[active].n} · {processSteps[active].duration}
                  </p>
                  <h3 className="t-h3 mt-4 font-bold">
                    {processSteps[active].title}
                  </h3>
                  <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-slate">
                    {processSteps[active].text}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {processSteps[active].points.map((p, i) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                        className="flex items-start gap-3 text-[0.98rem]"
                      >
                        <span className="mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-soft/15">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-soft" />
                        </span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Animated SVG that morphs per stage — scan rings, grid, waveform. */
function StageArt({ index }: { index: number }) {
  return (
    <svg
      className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 opacity-[0.5]"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="stage-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4FAE92" />
        </linearGradient>
      </defs>

      {[0, 1, 2].map((r) => (
        <motion.circle
          key={r}
          cx="100"
          cy="100"
          r={38 + r * 22}
          stroke="url(#stage-g)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={false}
          animate={{ rotate: index % 2 === 0 ? 360 : -360, opacity: 0.35 + r * 0.12 }}
          transition={{
            rotate: { duration: 34 + r * 12, repeat: Infinity, ease: "linear" },
          }}
          style={{ transformOrigin: "100px 100px" }}
        />
      ))}

      <motion.path
        key={index}
        d={
          [
            "M40 100 h30 l8-22 12 44 10-30 8 14 h52",
            "M40 100 h20 l10-30 14 60 12-46 10 24 h54",
            "M40 100 h44 l10-18 10 36 8-24 h48",
            "M40 100 h26 l12-34 12 62 10-40 8 20 h52",
            "M40 100 h36 l8-14 12 30 10-22 6 8 h48",
          ][index]
        }
        stroke="url(#stage-g)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
