import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ServicesGrid from "@/components/ServicesGrid";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { serviceGroups, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Все услуги стоматологии",
  description:
    "Девять направлений в одной клинике: имплантация, виниры, терапия под микроскопом, ортодонтия, протезирование, хирургия, гигиена и детская стоматология.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Услуги", href: "/services" }]}
        eyebrow="Направления"
        title="Все услуги клиники"
        lead="Полный цикл стоматологической помощи в одном здании — от профилактического осмотра до полной реабилитации челюсти на имплантах."
        metrics={[
          { value: "9", label: "клинических направлений" },
          { value: "5", label: "врачей с международными сертификатами" },
          { value: "3 клика", label: "до любой услуги" },
          { value: "0%", label: "рассрочка на любое лечение" },
        ]}
        actions={
          <>
            <BookCta title="Подобрать направление">
              Не знаю, что мне нужно
            </BookCta>
            <Link href="/prices" className="btn btn-ghost">
              Смотреть цены
            </Link>
          </>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Навигация"
            title="Структура направлений"
            text="Услуги сгруппированы по клинической задаче, а не по внутренней структуре клиники."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {serviceGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} className="h-full">
                <div className="card h-full p-8">
                  <h2 className="t-h4 font-bold">{g.title}</h2>
                  <ul className="mt-6 space-y-1">
                    {g.slugs.map((slug) => {
                      const s = services.find((x) => x.slug === slug)!;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="group flex items-baseline justify-between gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-royal-50"
                          >
                            <span className="font-medium transition-colors group-hover:text-royal-800">
                              {s.nav}
                            </span>
                            <span className="tnum shrink-0 text-[0.82rem] text-muted">
                              {s.priceFrom.toLocaleString("ru-RU")}+
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid
        eyebrow="Каталог"
        title="Каждая услуга — со своей страницей"
        text="Протокол, этапы, честные цены, врачи и ответы на вопросы по каждому направлению."
      />

      <FinalCta />
    </>
  );
}
