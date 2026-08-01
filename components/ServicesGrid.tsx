"use client";

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Icon from "./Icons";
import { Reveal, TiltCard } from "./motion";
import { services } from "@/lib/services";

const iconFor: Record<string, string> = {
  implantaciya: "tooth",
  estetika: "certificate",
  terapiya: "microscope",
  ortodontiya: "cube",
  ortopediya: "lab",
  hirurgiya: "shield",
  parodontologiya: "warranty",
  gigiena: "scan",
  detskaya: "clock",
};

export default function ServicesGrid({
  title = "Направления клиники",
  eyebrow = "Услуги",
  text = "Полный цикл в одном здании: от профилактики до полной реабилитации челюсти. До любой услуги — не более трёх кликов.",
}: {
  title?: string;
  eyebrow?: string;
  text?: string;
}) {
  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="shell relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          text={text}
          aside={
            <Link href="/prices" className="btn btn-ghost">
              Смотреть цены по всем услугам
            </Link>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06} className="group h-full">
              <TiltCard
                intensity={6}
                className="card card-lift relative h-full overflow-hidden"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="flex h-full flex-col p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                        s.accent === "champagne"
                          ? "bg-beige/50 text-[#8a6f3c] group-hover:bg-champagne group-hover:text-white"
                          : s.accent === "emerald"
                            ? "bg-emerald-soft/12 text-emerald-soft group-hover:bg-emerald-soft group-hover:text-white"
                            : "bg-royal-50 text-royal-800 group-hover:bg-royal-600 group-hover:text-white"
                      }`}
                    >
                      <Icon name={iconFor[s.slug]} size={26} />
                    </span>
                    <span className="t-eyebrow pt-2 text-muted">{s.category}</span>
                  </div>

                  <h3 className="mt-7 text-[1.3rem] font-bold leading-snug tracking-tight">
                    {s.h1}
                  </h3>
                  <p className="clamp-3 mt-3.5 text-[0.95rem] leading-relaxed text-slate">
                    {s.lead}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <div>
                      <p className="tnum text-[1.14rem] font-bold text-royal-800">
                        {s.priceFrom.toLocaleString("ru-RU")}–
                        {s.priceTo.toLocaleString("ru-RU")} ₽
                      </p>
                      <p className="mt-0.5 text-[0.8rem] text-muted">
                        {s.priceLabel}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-royal-600 group-hover:bg-royal-600 group-hover:text-white">
                      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
                        <path
                          d="M1 6h12M9 1.5L13.5 6 9 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
