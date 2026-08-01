import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import DoctorsSection from "@/components/DoctorsSection";
import Advantages from "@/components/Advantages";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import { Reveal, TiltCard } from "@/components/motion";
import { site, partners } from "@/lib/site";

export const metadata: Metadata = {
  title: "О клинике",
  description:
    "Стоматологическая клиника AURUM на Пресненской набережной: с 2009 года, 15 400 пациентов, собственная CAD/CAM-лаборатория, 3D-диагностика и микроскопы Leica.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    year: "2009",
    title: "Открытие клиники",
    text: "Три кресла на Пресненской набережной, четыре врача и один принцип: не делать пациенту того, чего не сделали бы себе.",
  },
  {
    year: "2013",
    title: "Первый микроскоп Leica",
    text: "Перешли на эндодонтию под увеличением. Доля сохранённых зубов при перелечивании выросла с 71% до 89%.",
  },
  {
    year: "2016",
    title: "Собственная лаборатория",
    text: "Запустили CAD/CAM-производство. Срок изготовления коронки сократился с трёх недель до пяти дней.",
  },
  {
    year: "2019",
    title: "Цифровой протокол имплантации",
    text: "3D-планирование и хирургические шаблоны стали обязательными для каждой операции — без исключений.",
  },
  {
    year: "2023",
    title: "Отделение детской стоматологии",
    text: "Отдельный вход, своя игровая, бесплатный адаптационный визит и анестезиолог в штате.",
  },
  {
    year: "2026",
    title: "6 200 имплантов",
    text: "Приживаемость 98,7% по данным пятилетнего наблюдения. Каждый случай — в собственном клиническом реестре.",
  },
];

const principles = [
  {
    title: "Сначала диагноз, потом прайс",
    text: "Мы не называем стоимость до КТ и осмотра. Цифра, названная по телефону, — это не расчёт, а приманка.",
  },
  {
    title: "Минимальное вмешательство",
    text: "Живой зуб всегда лучше самой дорогой коронки. Если можно сохранить — сохраняем, даже когда переделка была бы выгоднее клинике.",
  },
  {
    title: "Второе мнение — бесплатно",
    text: "Приходите с чужим планом лечения и КТ. Скажем прямо, что там обосновано, а что можно не делать.",
  },
  {
    title: "Гарантия в договоре",
    text: "Не «гарантия качества» на словах, а конкретные сроки по каждому виду работ, зафиксированные документально.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "О клинике", href: "/about" }]}
        eyebrow="О нас"
        title="Клиника, которой доверяют здоровье с 2009 года"
        lead="Мы построили клинику, в которую сами хотели бы прийти лечиться: с честной диагностикой, оптикой на каждом кресле и врачами, которые говорят «этого делать не нужно», когда этого делать не нужно."
        metrics={[
          { value: `${site.stats.years} лет`, label: "непрерывной практики" },
          { value: "15 400+", label: "пациентов" },
          { value: "62%", label: "приходят по рекомендации" },
          { value: "8", label: "кресел, 2 операционные" },
        ]}
        actions={
          <>
            <BookCta title="Экскурсия по клинике">
              Записаться на экскурсию
            </BookCta>
            <Link href="/licenses" className="btn btn-ghost">
              Лицензии и сертификаты
            </Link>
          </>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Принципы"
            title="Четыре правила, от которых не отступаем"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08} className="group h-full">
                <TiltCard intensity={5} className="card card-lift h-full overflow-hidden p-8">
                  <h3 className="t-h4 font-bold leading-snug">{p.title}</h3>
                  <p className="mt-4 text-[1rem] leading-relaxed text-slate">
                    {p.text}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-pearl">
        <div className="med-grid opacity-50" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="История"
            title="Как менялась клиника"
            text="Каждый шаг — это оборудование или протокол, который изменил результат лечения, а не косметический ремонт."
          />
          <ol className="mt-14 space-y-3">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={(i % 3) * 0.06}>
                <li className="card grid gap-5 p-7 sm:grid-cols-[7rem_1fr] sm:items-baseline">
                  <span className="text-[1.7rem] font-bold tracking-tight text-royal-800">
                    {t.year}
                  </span>
                  <div>
                    <h3 className="text-[1.14rem] font-bold tracking-tight">
                      {t.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-slate">
                      {t.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Advantages />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Партнёры"
            title="С чьими материалами мы работаем"
            text="Все системы имеют регистрационные удостоверения Росздравнадзора. Сертификат на использованные материалы выдаём по запросу."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 0.05} className="h-full">
                <div className="card h-full p-6">
                  <p
                    className="text-[1.16rem] font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-[0.86rem] text-muted">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DoctorsSection />
      <FinalCta />
    </>
  );
}
