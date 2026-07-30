"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Doctor } from "@/lib/data";
import { openBooking } from "@/lib/booking";

/**
 * Portrait frame. Drop a real photo at /public/doctors/<id>.jpg and pass
 * `photo` to swap the designed placeholder for the real image.
 */
export function Portrait({
  doctor,
  className = "",
}: {
  doctor: Doctor;
  className?: string;
}) {
  const [a, b] = doctor.tone;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
      }}
      aria-hidden
    >
      {/* studio light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 22%, rgba(255,255,255,0.42), transparent 68%)",
        }}
      />
      {/* consulting-room silhouette */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[72%] w-full"
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <circle cx="150" cy="96" r="58" fill="rgba(255,255,255,0.22)" />
        <path
          d="M22 300c0-70 57-127 128-127s128 57 128 127H22Z"
          fill="rgba(255,255,255,0.18)"
        />
        <path
          d="M150 173c-24 0-44 12-44 27 0 30 20 60 44 100 24-40 44-70 44-100 0-15-20-27-44-27Z"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
      <div className="noise opacity-[0.06]" />
      <span
        className="absolute right-5 top-5 text-[2.6rem] font-bold leading-none text-white/35"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {doctor.initials}
      </span>
    </div>
  );
}

export default function DoctorCard({
  doctor,
  index = 0,
}: {
  doctor: Doctor;
  index?: number;
}) {
  const years = new Date().getFullYear() - doctor.since;
  return (
    <motion.article
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.85, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group card card-lift relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Portrait
          doctor={doctor}
          className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-[1.1rem] font-bold leading-tight">{doctor.name}</p>
          <p className="mt-1.5 text-[0.86rem] text-white/75">{doctor.role}</p>
        </div>

        {/* hover overlay: philosophy */}
        <div className="absolute inset-0 flex items-end bg-royal-800/88 p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
          <div>
            <p className="t-eyebrow text-white/50">Профессиональная философия</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-white">
              «{doctor.philosophy}»
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <dl className="grid grid-cols-2 gap-4 text-[0.86rem]">
          <div>
            <dt className="text-muted">Стаж</dt>
            <dd className="mt-0.5 font-semibold">{years} лет</dd>
          </div>
          <div>
            <dt className="text-muted">Выполнено</dt>
            <dd className="mt-0.5 font-semibold">{doctor.procedures}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {doctor.focus.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-full bg-pearl px-2.5 py-1 text-[0.76rem] text-slate"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/doctors/${doctor.id}`}
            className="text-[0.92rem] font-semibold text-royal-700 transition-colors hover:text-royal-800"
          >
            Подробнее о враче →
          </Link>
          <button
            onClick={() =>
              openBooking({
                title: `Запись к врачу`,
                subtitle: `${doctor.name} — ${doctor.role}. Координатор подберёт удобное время.`,
              })
            }
            className="ml-auto rounded-full border border-line px-4 py-2 text-[0.85rem] transition-colors hover:border-royal-300 hover:text-royal-700"
          >
            Записаться
          </button>
        </div>
      </div>
    </motion.article>
  );
}
