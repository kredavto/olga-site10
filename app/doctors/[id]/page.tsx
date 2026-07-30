import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import JsonLd from "@/components/JsonLd";
import { Portrait } from "@/components/DoctorCard";
import { Reveal } from "@/components/motion";

import { doctors, getDoctor, cases } from "@/lib/data";
import { services } from "@/lib/services";
import { doctorSchema } from "@/lib/schema";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const d = getDoctor(id);
  if (!d) return {};
  return {
    title: `${d.name} — ${d.role}`,
    description: `${d.name}, ${d.role}. Стаж с ${d.since} года, ${d.procedures}. Образование, сертификаты и направления работы.`,
    alternates: { canonical: `/doctors/${d.id}` },
  };
}

export default async function DoctorPage({ params }: Params) {
  const { id } = await params;
  const d = getDoctor(id);
  if (!d) notFound();

  const years = new Date().getFullYear() - d.since;
  const own = services.filter((s) => d.services.includes(s.slug));
  const work = cases.filter((c) => c.doctorId === d.id);

  return (
    <>
      <PageHeader
        trail={[
          { name: "Врачи", href: "/doctors" },
          { name: d.name, href: `/doctors/${d.id}` },
        ]}
        eyebrow={d.role}
        title={d.name}
        lead={`«${d.philosophy}»`}
        metrics={[
          { value: `${years} лет`, label: "клинический стаж" },
          { value: d.procedures.split(" ")[0], label: "выполненных процедур" },
          { value: String(d.certificates.length), label: "международных сертификата" },
          { value: String(own.length), label: "профильных направления" },
        ]}
        actions={
          <>
            <BookCta
              title="Запись к врачу"
              subtitle={`${d.name} — ${d.role}.`}
            >
              Записаться на приём
            </BookCta>
            <Link href="/doctors" className="btn btn-ghost">
              Все врачи
            </Link>
          </>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div className="card overflow-hidden">
              <Portrait doctor={d} className="aspect-[4/5] w-full" />
              <div className="p-7">
                <p className="t-eyebrow text-muted">Направления</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.focus.map((f) => (
                    <span key={f} className="chip">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.08}>
              <div className="card p-8">
                <h2 className="t-h4 font-bold">Образование</h2>
                <ul className="mt-6 space-y-4">
                  {d.education.map((e) => (
                    <li key={e} className="flex gap-4">
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-royal-600" />
                      <span className="text-[1rem] leading-relaxed">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="card p-8">
                <h2 className="t-h4 font-bold">Сертификаты и повышение квалификации</h2>
                <ul className="mt-6 space-y-4">
                  {d.certificates.map((c) => (
                    <li key={c} className="flex gap-4">
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-deep" />
                      <span className="text-[1rem] leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card p-8">
                <h2 className="t-h4 font-bold">Услуги врача</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {own.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-royal-300 hover:bg-royal-50"
                    >
                      <span>
                        <span className="block font-semibold transition-colors group-hover:text-royal-700">
                          {s.nav}
                        </span>
                        <span className="tnum mt-0.5 block text-[0.82rem] text-muted">
                          {s.priceFrom.toLocaleString("ru-RU")}–
                          {s.priceTo.toLocaleString("ru-RU")} ₽
                        </span>
                      </span>
                      <span aria-hidden className="text-muted">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="section-tight relative overflow-hidden bg-pearl">
          <div className="shell relative">
            <SectionHeading eyebrow="Практика" title="Клинические случаи врача" />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {work.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.08} className="h-full">
                  <div className="card h-full p-8">
                    <h3 className="text-[1.16rem] font-bold leading-snug">
                      {c.title}
                    </h3>
                    <dl className="mt-5 space-y-4 text-[0.95rem]">
                      <div>
                        <dt className="text-[0.78rem] uppercase tracking-wider text-muted">
                          Диагноз
                        </dt>
                        <dd className="mt-1 leading-relaxed">{c.diagnosis}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.78rem] uppercase tracking-wider text-muted">
                          Решение
                        </dt>
                        <dd className="mt-1 leading-relaxed">{c.solution}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.78rem] uppercase tracking-wider text-muted">
                          Срок
                        </dt>
                        <dd className="mt-1">{c.duration}</dd>
                      </div>
                    </dl>
                    <Link
                      href="/cases"
                      className="mt-6 inline-block font-semibold text-royal-700"
                    >
                      Смотреть до и после →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
      <JsonLd data={doctorSchema(d.id)} />
    </>
  );
}
