"use client";

import SectionHeading from "./SectionHeading";
import Icon from "./Icons";
import { Stagger, StaggerItem, TiltCard } from "./motion";
import { advantages } from "@/lib/data";
import { openBooking } from "@/lib/booking";

export default function Advantages() {
  return (
    <section id="advantages" className="section relative overflow-hidden">
      <div className="mesh opacity-50" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Почему AURUM"
          title="Десять причин, по которым к нам возвращаются"
          text="Мы не экономим на том, что определяет результат: оптике, диагностике, материалах и времени врача на планирование."
          aside={
            <button
              className="btn btn-ghost"
              onClick={() => openBooking({ title: "Экскурсия по клинике" })}
            >
              Записаться на экскурсию
            </button>
          }
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {advantages.map((a, i) => (
            <StaggerItem
              key={a.title}
              className={`group ${i === 0 ? "sm:col-span-2 xl:col-span-2" : ""}`}
            >
              <TiltCard
                intensity={7}
                className="card card-lift relative h-full overflow-hidden p-7"
              >
                <div className="relative z-10">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-royal-50 p-3.5 text-royal-600 transition-colors duration-500 group-hover:bg-royal-600 group-hover:text-white">
                    <Icon name={a.icon} />
                  </span>
                  <h3 className="mt-6 text-[1.13rem] font-bold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-slate">
                    {a.text}
                  </p>
                </div>
                <span className="pointer-events-none absolute -bottom-14 -right-10 text-[9rem] font-bold leading-none text-mist/60 transition-transform duration-700 group-hover:-translate-y-2 group-hover:text-royal-100/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
