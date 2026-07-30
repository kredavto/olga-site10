import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import DoctorsSection from "@/components/DoctorsSection";
import FinalCta from "@/components/FinalCta";
import Calculator from "@/components/Calculator";
import Process from "@/components/Process";
import BookCta from "@/components/BookCta";
import JsonLd from "@/components/JsonLd";
import { Reveal, TiltCard } from "@/components/motion";

import { getService, services } from "@/lib/services";
import { doctors } from "@/lib/data";
import { procedureSchema, faqSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.title,
      description: s.description,
      url: `/services/${s.slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const team = doctors.filter((d) => s.doctorIds.includes(d.id));
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        trail={[
          { name: "Услуги", href: "/services" },
          { name: s.nav, href: `/services/${s.slug}` },
        ]}
        eyebrow={s.category}
        title={s.h1}
        lead={s.lead}
        metrics={s.metrics}
        actions={
          <>
            <BookCta
              service={s.slug}
              title={`${s.h1} — расчёт стоимости`}
              className="btn btn-primary"
            >
              Узнать стоимость
            </BookCta>
            <BookCta
              service={s.slug}
              title="Получить консультацию"
              className="btn btn-ghost"
            >
              Получить консультацию
            </BookCta>
          </>
        }
      >
        <div className="shell mt-14">
          <div className="card flex flex-wrap items-center justify-between gap-8 p-7">
            <Fact label="Стоимость под ключ">
              {s.priceFrom.toLocaleString("ru-RU")}–
              {s.priceTo.toLocaleString("ru-RU")} ₽
            </Fact>
            <Fact label="Срок лечения">{s.duration}</Fact>
            <Fact label="Гарантия">{s.warranty}</Fact>
            <Fact label="Рассрочка">0% на 6–24 месяца</Fact>
          </div>
        </div>
      </PageHeader>

      {/* advantages */}
      <section className="section relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Как мы работаем"
            title={`Что отличает ${s.nav.toLowerCase()} в AURUM`}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {s.advantages.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.08} className="group h-full">
                <TiltCard
                  intensity={5}
                  className="card card-lift h-full overflow-hidden p-8"
                >
                  <span className="t-eyebrow text-royal-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.24rem] font-bold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3.5 text-[0.98rem] leading-relaxed text-slate">
                    {a.text}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* protocol */}
      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="med-grid opacity-50" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Протокол"
            title="Этапы лечения"
            text="Каждый этап начинается только после того, как вы понимаете, что будет сделано и сколько это стоит."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {s.stages.map((st, i) => (
              <Reveal key={st.title} delay={i * 0.06} className="h-full">
                <li className="card h-full p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.1rem] font-bold leading-none text-royal-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.78rem] text-muted">{st.duration}</span>
                  </div>
                  <h3 className="mt-5 text-[1.08rem] font-bold leading-snug tracking-tight">
                    {st.title}
                  </h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-slate">
                    {st.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* prices + calculator */}
      <section className="section relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Стоимость"
            title="Прайс-лист по направлению"
            text="Диапазон, а не «от»: нижняя граница — простой случай, верхняя — сложный со всеми этапами."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal>
              <div className="card overflow-hidden">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Цены на услуги: {s.h1}
                  </caption>
                  <thead>
                    <tr className="border-b border-line text-[0.78rem] uppercase tracking-wider text-muted">
                      <th className="px-7 py-4 font-medium">Услуга</th>
                      <th className="px-7 py-4 text-right font-medium">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.prices.map((p) => (
                      <tr
                        key={p.name}
                        className="border-b border-line/70 last:border-0 transition-colors hover:bg-pearl/70"
                      >
                        <td className="px-7 py-5">
                          <span className="block font-medium">{p.name}</span>
                          {p.note && (
                            <span className="mt-1 block text-[0.84rem] text-muted">
                              {p.note}
                            </span>
                          )}
                        </td>
                        <td className="tnum whitespace-nowrap px-7 py-5 text-right font-semibold">
                          {p.from.toLocaleString("ru-RU")}–
                          {p.to.toLocaleString("ru-RU")} ₽
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:sticky lg:top-28">
              <Calculator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* indications */}
      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <h2 className="t-h4 font-bold">Когда это нужно</h2>
              <ul className="mt-6 space-y-3.5">
                {s.indications.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.98rem] leading-relaxed">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-soft" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <h2 className="t-h4 font-bold">Противопоказания</h2>
              <ul className="mt-6 space-y-3.5">
                {s.contraindications.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.98rem] leading-relaxed">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-deep" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[0.86rem] leading-relaxed text-muted">
                Список не исчерпывающий. Окончательное решение принимается после
                осмотра, 3D-диагностики и, при необходимости, консультации
                профильного специалиста.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Process />

      <DoctorsSection
        list={team}
        eyebrow="Кто лечит"
        title={`Врачи по направлению «${s.nav}»`}
        text="К вам попадёт специалист именно по этой процедуре, а не «универсальный» стоматолог."
      />

      {/* faq */}
      <section className="section relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Вопросы"
            title={`${s.nav}: частые вопросы`}
          />
          <div className="mt-12">
            <FaqAccordion
              items={s.faq.map((f) => ({ ...f, category: s.nav }))}
              withFilter={false}
            />
          </div>
        </div>
        <JsonLd data={faqSchema(s.faq)} />
      </section>

      {/* related */}
      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading eyebrow="Смотрите также" title="Другие направления" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07} className="h-full">
                <Link
                  href={`/services/${r.slug}`}
                  className="card card-lift group flex h-full flex-col p-7"
                >
                  <span className="t-eyebrow text-muted">{r.category}</span>
                  <h3 className="mt-4 text-[1.16rem] font-bold leading-snug tracking-tight transition-colors group-hover:text-royal-700">
                    {r.h1}
                  </h3>
                  <p className="clamp-3 mt-3 text-[0.93rem] leading-relaxed text-slate">
                    {r.lead}
                  </p>
                  <p className="tnum mt-auto pt-6 font-semibold text-royal-700">
                    {r.priceFrom.toLocaleString("ru-RU")}–
                    {r.priceTo.toLocaleString("ru-RU")} ₽
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={procedureSchema(s.slug)} />
    </>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[0.78rem] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="tnum mt-1.5 text-[1.16rem] font-bold tracking-tight">
        {children}
      </p>
    </div>
  );
}
