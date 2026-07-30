import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import BeforeAfter from "@/components/BeforeAfter";
import FinalCta from "@/components/FinalCta";
import SectionHeading from "@/components/SectionHeading";
import BookCta from "@/components/BookCta";
import { Reveal } from "@/components/motion";
import { cases, getDoctor } from "@/lib/data";
import { getService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Работы до и после",
  description:
    "Клинические случаи клиники AURUM: имплантация, виниры, элайнеры, полная реабилитация челюсти. Диагноз, решение, технологии, срок лечения и результат по каждому случаю.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "До и после", href: "/cases" }]}
        eyebrow="Портфолио"
        title="Работы клиники: до и после"
        lead="Каждый случай — с диагнозом, применёнными технологиями и реальным сроком лечения. Мы не показываем чужие работы и не ретушируем результат."
        metrics={[
          { value: String(cases.length), label: "разобранных случая" },
          { value: "41 200+", label: "процедур выполнено всего" },
          { value: "5 лет", label: "наблюдения за результатом" },
          { value: "4", label: "направления в подборке" },
        ]}
        actions={
          <BookCta title="Обсудить мой случай">Обсудить мой случай</BookCta>
        }
      />

      <BeforeAfter />

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <SectionHeading eyebrow="Разбор" title="Детали по каждому случаю" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cases.map((c, i) => {
              const doctor = getDoctor(c.doctorId);
              const service = getService(c.serviceSlug);
              return (
                <Reveal key={c.id} delay={(i % 2) * 0.07} className="h-full">
                  <article className="card h-full p-8">
                    <h2 className="t-h4 font-bold leading-snug">{c.title}</h2>
                    <dl className="mt-6 space-y-4 text-[0.96rem]">
                      <Row label="Диагноз" value={c.diagnosis} />
                      <Row label="Решение" value={c.solution} />
                      <Row label="Срок лечения" value={c.duration} />
                      <Row label="Результат" value={c.result} />
                      {doctor && <Row label="Врач" value={doctor.name} />}
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    {service && (
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-6 inline-block font-semibold text-royal-700"
                      >
                        Об услуге «{service.nav}» →
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-[0.86rem] leading-relaxed text-muted">
              Результат лечения индивидуален и зависит от исходной клинической
              картины, соблюдения рекомендаций и регулярности профилактических
              осмотров. Представленные случаи не являются гарантией аналогичного
              результата.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line/70 pb-4 last:border-0 last:pb-0">
      <dt className="text-[0.76rem] uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 leading-relaxed">{value}</dd>
    </div>
  );
}
