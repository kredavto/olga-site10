"use client";

import { Counter, Reveal, Stagger, StaggerItem, TiltCard } from "./motion";
import { partners, ratings, site } from "@/lib/site";

const badges = [
  {
    title: "Лицензия Минздрава",
    value: site.license,
    note: "Бессрочная, все виды стоматологической помощи",
  },
  {
    title: "Международные протоколы",
    value: "ITI · EFP · ADA",
    note: "Работаем по стандартам, а не по привычке",
  },
  {
    title: "3D-диагностика на месте",
    value: "Sirona Orthophos",
    note: "КТ за 14 секунд, снимок остаётся у вас",
  },
  {
    title: "CAD/CAM-лаборатория",
    value: "В клинике",
    note: "Коронка за 3–5 дней, техник на примерке",
  },
];

const counters = [
  { to: site.stats.years, suffix: " лет", label: "на Пресненской набережной" },
  { to: site.stats.patients, suffix: "+", label: "пациентов с 2009 года" },
  { to: site.stats.procedures, suffix: "+", label: "выполненных процедур" },
  {
    to: site.stats.implantSuccess,
    decimals: 1,
    suffix: "%",
    label: "приживаемость имплантов",
  },
];

export default function TrustStrip() {
  return (
    <section id="trust" className="section-tight relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="shell">
        {/* counters */}
        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c) => (
            <StaggerItem key={c.label}>
              <p className="t-h2 font-bold tracking-tight">
                <Counter
                  to={c.to}
                  decimals={c.decimals ?? 0}
                  suffix={c.suffix}
                  duration={2.2}
                />
              </p>
              <p className="mt-2 max-w-[15rem] text-[0.95rem] leading-snug text-muted">
                {c.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* glass badges */}
        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {badges.map((b) => (
            <StaggerItem key={b.title} className="group">
              <TiltCard
                intensity={5}
                className="glass glass-refract hairline relative h-full overflow-hidden rounded-[26px] p-7"
              >
                <p className="t-eyebrow text-royal-800">{b.title}</p>
                <p className="mt-3.5 text-[1.28rem] font-bold leading-tight tracking-tight">
                  {b.value}
                </p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slate">
                  {b.note}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ratings */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {ratings.map((r) => (
              <div
                key={r.source}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
              >
                <Stars />
                <div>
                  <p className="text-[0.95rem] font-semibold leading-none">
                    {r.score}
                    <span className="ml-2 text-[0.8rem] font-normal text-muted">
                      {r.source}
                    </span>
                  </p>
                  <p className="mt-1 text-[0.76rem] text-muted">{r.count}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* partner marquee */}
      <Reveal delay={0.15}>
        <div className="relative mt-16 overflow-hidden border-y border-line/80 bg-pearl/60 py-7">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent"
            aria-hidden
          />
          <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-14 pr-14">
            {[...partners, ...partners].map((p, i) => (
              <div key={`${p.name}-${i}`} className="flex items-baseline gap-3">
                <span
                  className="text-[1.22rem] font-bold tracking-tight text-graphite/75"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.name}
                </span>
                <span className="whitespace-nowrap text-[0.78rem] text-muted">
                  {p.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#D8BE8A">
          <path d="M6 0l1.6 3.9L12 4.3 8.7 7l1 4.2L6 9l-3.7 2.2 1-4.2L0 4.3l4.4-.4L6 0z" />
        </svg>
      ))}
    </span>
  );
}
