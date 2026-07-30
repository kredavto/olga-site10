"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";
import { cases } from "@/lib/data";
import { getDoctor } from "@/lib/data";

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const c = cases[active];
  const doctor = getDoctor(c.doctorId);

  return (
    <section id="cases" className="section relative overflow-hidden">
      <div className="mesh opacity-40" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Работы клиники"
          title="До и после: реальные клинические случаи"
          text="Потяните ползунок, чтобы сравнить. Каждый случай — с диагнозом, применёнными технологиями и сроком лечения."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <Reveal>
            <Comparator caseId={c.id} />
          </Reveal>

          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="card p-8"
              >
                <h3 className="t-h4 font-bold leading-snug">{c.title}</h3>

                <dl className="mt-6 space-y-5 text-[0.95rem]">
                  <Row label="Диагноз" value={c.diagnosis} />
                  <Row label="Решение" value={c.solution} />
                  <Row label="Срок лечения" value={c.duration} />
                  <Row label="Результат" value={c.result} />
                  {doctor && <Row label="Врач" value={`${doctor.name}, ${doctor.role}`} />}
                </dl>

                <p className="mt-6 text-[0.8rem] uppercase tracking-wider text-muted">
                  Технологии
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {cases.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border px-4 py-3 text-left text-[0.85rem] leading-snug transition-all ${
                    i === active
                      ? "border-royal-600 bg-royal-50 text-royal-800"
                      : "border-line bg-white hover:border-royal-300"
                  }`}
                >
                  {x.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line/70 pb-4 last:border-0 last:pb-0">
      <dt className="text-[0.78rem] uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 leading-relaxed">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Comparator({ caseId }: { caseId: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const set = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const up = () => (dragging.current = false);
    const move = (e: PointerEvent) => dragging.current && set(e.clientX);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointermove", move);
    };
  }, [set]);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/11] w-full cursor-ew-resize select-none overflow-hidden rounded-[30px] border border-line shadow-[var(--shadow-lift)]"
      onPointerDown={(e) => {
        dragging.current = true;
        set(e.clientX);
      }}
    >
      <Smile key={`${caseId}-after`} variant="after" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Smile key={`${caseId}-before`} variant="before" />
      </div>

      {/* labels */}
      <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-graphite/70 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
        До
      </span>
      <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-royal-600/85 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
        После
      </span>

      {/* handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_24px_rgba(0,0,0,0.4)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
            <path
              d="M8 2L3 7l5 5M14 2l5 5-5 5"
              stroke="#202124"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="sr-only"
        aria-label="Сравнение до и после"
      />
    </div>
  );
}

/**
 * Designed illustration of the smile line. Swap for retouched clinical
 * photography by rendering <Image> here — the comparator is source-agnostic.
 */
function Smile({ variant }: { variant: "before" | "after" }) {
  const before = variant === "before";

  const teeth = [
    { w: 30, h: 42 },
    { w: 26, h: 38 },
    { w: 20, h: 32 },
    { w: 18, h: 30 },
    { w: 18, h: 30 },
    { w: 20, h: 32 },
    { w: 26, h: 38 },
    { w: 30, h: 42 },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        background: before
          ? "linear-gradient(160deg,#4a4038,#2b2521 62%,#1d1917)"
          : "linear-gradient(160deg,#e9eef7,#cbd7ea 58%,#93b4fd)",
      }}
    >
      <div className="noise opacity-[0.05]" />
      <svg
        viewBox="0 0 400 275"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* lips */}
        <path
          d="M40 138c40-46 90-66 160-66s120 20 160 66c-40 58-92 86-160 86s-120-28-160-86Z"
          fill={before ? "#8a5a54" : "#c98c86"}
        />
        <path
          d="M56 138c38-36 84-52 144-52s106 16 144 52c-36 46-84 68-144 68s-108-22-144-68Z"
          fill={before ? "#241d1b" : "#3a2f2c"}
        />

        {/* upper arch */}
        {teeth.map((t, i) => {
          const x = 200 + (i - 3.5) * 25;
          const drop = before ? [0, 3, -2, 5, 4, -3, 2, 0][i] : 0;
          const rot = before ? [-6, 4, -8, 6, -5, 7, -4, 5][i] : 0;
          const gap = before && i === 3 ? -5 : before && i === 4 ? 5 : 0;
          return (
            <rect
              key={`u${i}`}
              x={x - t.w / 2 + gap}
              y={116 + drop}
              width={t.w}
              height={t.h}
              rx={before ? 5 : 7}
              transform={`rotate(${rot} ${x} ${140})`}
              fill={before ? "#c9b48c" : "#ffffff"}
              opacity={before ? 0.92 : 1}
            />
          );
        })}

        {/* lower arch hint */}
        <path
          d="M96 186c30 18 66 26 104 26s74-8 104-26c-28 26-64 38-104 38s-76-12-104-38Z"
          fill={before ? "#a5946f" : "#eef2f9"}
          opacity="0.85"
        />

        {before && (
          <>
            {/* shadowing that reads as decay / staining */}
            <ellipse cx="238" cy="132" rx="9" ry="12" fill="#5d4a2c" opacity="0.7" />
            <ellipse cx="163" cy="136" rx="7" ry="10" fill="#5d4a2c" opacity="0.55" />
            <rect x="186" y="118" width="9" height="34" fill="#241d1b" opacity="0.65" />
          </>
        )}

        {!before && (
          <>
            {/* specular highlight on fresh ceramic */}
            <path
              d="M132 124c30-8 106-8 136 0-8 6-128 6-136 0Z"
              fill="#ffffff"
              opacity="0.85"
            />
            <ellipse cx="176" cy="128" rx="4" ry="7" fill="#ffffff" opacity="0.9" />
            <ellipse cx="224" cy="128" rx="4" ry="7" fill="#ffffff" opacity="0.9" />
          </>
        )}
      </svg>

      {/* clinical scan overlay */}
      {!before && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24"
          initial={{ top: "-20%" }}
          animate={{ top: ["-20%", "110%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.28), transparent)",
          }}
        />
      )}
    </div>
  );
}
