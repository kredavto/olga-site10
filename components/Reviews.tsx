"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion";
import { reviews } from "@/lib/data";
import { ratings } from "@/lib/site";

export default function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const scroll = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.75), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="section relative overflow-hidden bg-pearl">
      <div className="mesh opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят пациенты"
          text="Видеоотзывы записаны в клинике после завершения лечения. Текстовые собраны с площадок, где мы не можем ничего удалить."
          aside={
            <div className="flex gap-2.5">
              <NavButton dir={-1} onClick={() => scroll(-1)} />
              <NavButton dir={1} onClick={() => scroll(1)} />
            </div>
          }
        />

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-3">
            {ratings.map((r) => (
              <div
                key={r.source}
                className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
              >
                <span className="text-[1.2rem] font-bold text-royal-700">
                  {r.score}
                </span>
                <span className="text-[0.85rem] leading-tight">
                  {r.source}
                  <span className="block text-[0.76rem] text-muted">{r.count}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1280px)/2+3rem))] pb-4"
      >
        {reviews.map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-refract hairline flex w-[86vw] shrink-0 snap-start flex-col rounded-[28px] p-7 sm:w-[24rem]"
          >
            {r.video && (
              <button
                onClick={() => setPlaying(playing === r.id ? null : r.id)}
                className="group relative mb-6 aspect-video w-full overflow-hidden rounded-2xl"
                style={{
                  background:
                    "linear-gradient(140deg,#1e3a8a,#2563EB 55%,#4FAE92)",
                }}
                aria-label={`Смотреть видеоотзыв: ${r.name}`}
              >
                <span className="absolute inset-0 opacity-40" style={{
                  background:
                    "radial-gradient(60% 60% at 30% 25%, rgba(255,255,255,0.5), transparent 70%)",
                }} />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 transition-transform duration-500 group-hover:scale-110">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
                    <path d="M17 10L1 19V1l16 9Z" fill="#2563EB" />
                  </svg>
                </span>
                <span className="absolute bottom-3 left-4 text-[0.78rem] font-medium text-white/85">
                  {playing === r.id ? "Видео подключается…" : "Видеоотзыв · 1:24"}
                </span>
              </button>
            )}

            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-[0.9rem] font-bold text-white"
                style={{
                  background: "linear-gradient(140deg,#2563EB,#4FAE92)",
                }}
                aria-hidden
              >
                {r.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold leading-tight">{r.name}</p>
                <p className="text-[0.8rem] text-muted">
                  {r.city} · {r.service}
                </p>
              </div>
            </div>

            <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-slate">
              «{r.text}»
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 text-[0.8rem] text-muted">
              <span className="flex gap-0.5" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: r.rating }).map((_, s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="#D8BE8A" aria-hidden>
                    <path d="M6 0l1.6 3.9L12 4.3 8.7 7l1 4.2L6 9l-3.7 2.2 1-4.2L0 4.3l4.4-.4L6 0z" />
                  </svg>
                ))}
              </span>
              <span>{r.source}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function NavButton({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === -1 ? "Предыдущие отзывы" : "Следующие отзывы"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-royal-300 hover:text-royal-700"
    >
      <svg
        width="15"
        height="12"
        viewBox="0 0 15 12"
        fill="none"
        aria-hidden
        style={{ transform: dir === -1 ? "rotate(180deg)" : undefined }}
      >
        <path
          d="M1 6h12M9 1.5L13.5 6 9 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
