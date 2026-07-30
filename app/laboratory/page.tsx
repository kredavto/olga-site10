import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Зуботехническая лаборатория",
  description:
    "Собственная CAD/CAM-лаборатория клиники AURUM: фрезеровка циркония, прессование керамики E.max, 3D-печать шаблонов. Коронка за 3–5 дней.",
  alternates: { canonical: "/laboratory" },
};

const stages = [
  {
    n: "01",
    title: "Цифровой слепок",
    text: "Сканер 3Shape передаёт модель в лабораторию по сети — без гипса, транспортировки и искажений на каждом переносе.",
  },
  {
    n: "02",
    title: "Моделирование",
    text: "Техник проектирует коронку в CAD с учётом прикуса, соседних зубов и артикуляции. Вы можете увидеть проект до изготовления.",
  },
  {
    n: "03",
    title: "Фрезеровка",
    text: "Пятиосевой станок вытачивает каркас из цельного блока диоксида циркония. Однородный материал прочнее любого спекания.",
  },
  {
    n: "04",
    title: "Керамическая облицовка",
    text: "Послойное нанесение массы вручную: прозрачный режущий край, опаловые эффекты, индивидуальные особенности вашей эмали.",
  },
  {
    n: "05",
    title: "Примерка и глазурование",
    text: "Техник приходит в кабинет на примерку, подбирает оттенок при дневном свете вместе с вами, затем работа глазуруется.",
  },
];

export default function LabPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Лаборатория", href: "/laboratory" }]}
        eyebrow="Производство"
        title="Собственная CAD/CAM-лаборатория"
        lead="Зубной техник работает в соседнем кабинете, а не в другом городе. Он приходит на примерку и подбирает оттенок при вас — это то, чего невозможно добиться перепиской с внешней лабораторией."
        metrics={[
          { value: "3–5 дней", label: "изготовление коронки" },
          { value: "9 400+", label: "работ изготовлено" },
          { value: "5 осей", label: "фрезерный станок" },
          { value: "0 км", label: "до техника" },
        ]}
        actions={<BookCta title="Экскурсия в лабораторию">Посмотреть лабораторию</BookCta>}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Процесс"
            title="Как рождается коронка"
            text="Пять этапов, из которых четыре проходят внутри клиники."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="h-full">
                <li className="card h-full p-7">
                  <span className="text-[2.1rem] font-bold leading-none text-royal-100">
                    {s.n}
                  </span>
                  <h2 className="mt-5 text-[1.08rem] font-bold leading-snug tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-slate">
                    {s.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative grid gap-8 lg:grid-cols-3">
          {[
            {
              t: "Материалы",
              x: "Диоксид циркония Kuraray Noritake, прессованная керамика Ivoclar E.max, полевошпатные массы для ручной работы. У каждой партии — регистрационное удостоверение.",
            },
            {
              t: "3D-печать",
              x: "Хирургические шаблоны для имплантации, модели для примерки, каппы и mock-up печатаем на месте — за несколько часов, а не за неделю.",
            },
            {
              t: "Гарантия",
              x: "5 лет на коронки и виниры, включая скол и расцементировку. Переделка при обоснованной претензии к форме или оттенку — за счёт клиники.",
            },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="h-full">
              <div className="card h-full p-8">
                <h2 className="t-h4 font-bold">{b.t}</h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-slate">
                  {b.x}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
