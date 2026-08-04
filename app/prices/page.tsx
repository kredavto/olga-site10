import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Calculator from "@/components/Calculator";
import Packages from "@/components/Packages";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import { Reveal } from "@/components/motion";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Цены на стоматологические услуги",
  description:
    "Прайс-лист AURUM: имплантация 55 000–120 000 ₽, виниры 38 000–62 000 ₽, лечение кариеса 8 500–19 000 ₽. Диапазоны без формата «от», рассрочка 0%.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Цены", href: "/prices" }]}
        eyebrow="Прайс-лист"
        title="Цены на лечение"
        lead="Мы не пишем «от». Указан диапазон: нижняя граница — реальная минимальная цена простого случая, верхняя — сложный случай со всеми этапами. Ваша сумма фиксируется в плане лечения после диагностики."
        metrics={[
          { value: "0%", label: "рассрочка до 24 месяцев" },
          { value: "13%", label: "налоговый вычет, документы готовим сами" },
          { value: "100,4%", label: "средняя точность сметы за 2025 год" },
          { value: "0 ₽", label: "второе мнение по чужому плану" },
        ]}
        actions={
          <>
            <BookCta title="Рассчитать стоимость лечения">
              Рассчитать мой случай
            </BookCta>
            <Link href="/promo" className="btn btn-ghost">
              Действующие акции
            </Link>
          </>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="card p-8">
              <h2 className="t-h4 font-bold">Как формируется цена</h2>
              <ul className="mt-6 space-y-5">
                {[
                  [
                    "Диагностика",
                    "3D КТ и цифровое сканирование — от них зависит объём работы и её стоимость.",
                  ],
                  [
                    "Материал",
                    "Система импланта, тип керамики, вид брекетов. Мы показываем разницу и говорим, где переплата не оправдана.",
                  ],
                  [
                    "Объём этапов",
                    "Нужна ли костная пластика, временные конструкции, дополнительные визиты.",
                  ],
                  [
                    "Сложность",
                    "Перелечивание всегда дороже первичного лечения — работы больше, а прогноз требует контроля.",
                  ],
                ].map(([t, x]) => (
                  <li key={t}>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate">
                      {x}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Calculator />
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-pearl">
        <div className="med-grid opacity-50" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Полный прайс"
            title="Цены по всем направлениям"
            text="На мобильных таблицы превращаются в карточки — всё читается без горизонтальной прокрутки."
          />

          <div className="mt-14 space-y-8">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                <div className="card overflow-hidden">
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line px-7 py-6">
                    <div>
                      <p className="t-eyebrow text-muted">{s.category}</p>
                      <h3 className="mt-2 text-[1.24rem] font-bold tracking-tight">
                        <Link
                          href={`/services/${s.slug}`}
                          className="transition-colors hover:text-royal-800"
                        >
                          {s.h1}
                        </Link>
                      </h3>
                    </div>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[0.9rem] font-semibold text-royal-800"
                    >
                      Об услуге →
                    </Link>
                  </div>

                  {/* desktop table */}
                  <table className="hidden w-full text-left sm:table">
                    <caption className="sr-only">Цены: {s.h1}</caption>
                    <tbody>
                      {s.prices.map((p) => (
                        <tr
                          key={p.name}
                          className="border-b border-line/70 last:border-0 transition-colors hover:bg-pearl/70"
                        >
                          <td className="px-7 py-4">
                            <span className="block font-medium">{p.name}</span>
                            {p.note && (
                              <span className="mt-1 block text-[0.84rem] text-muted">
                                {p.note}
                              </span>
                            )}
                          </td>
                          <td className="tnum whitespace-nowrap px-7 py-4 text-right font-semibold">
                            {p.from.toLocaleString("ru-RU")}–
                            {p.to.toLocaleString("ru-RU")} ₽
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* mobile cards */}
                  <ul className="divide-y divide-line sm:hidden">
                    {s.prices.map((p) => (
                      <li key={p.name} className="px-6 py-5">
                        <p className="font-medium">{p.name}</p>
                        {p.note && (
                          <p className="mt-1 text-[0.84rem] text-muted">{p.note}</p>
                        )}
                        <p className="tnum mt-2 text-[1.05rem] font-bold text-royal-800">
                          {p.from.toLocaleString("ru-RU")}–
                          {p.to.toLocaleString("ru-RU")} ₽
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-[0.88rem] leading-relaxed text-muted">
              Цены действительны на дату публикации и не являются публичной
              офертой. Окончательная стоимость определяется планом лечения,
              который составляется после очной консультации и диагностики и
              фиксируется в договоре.
            </p>
          </Reveal>
        </div>
      </section>

      <Packages />
      <FinalCta />
    </>
  );
}
