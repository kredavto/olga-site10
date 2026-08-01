import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icons";
import { Reveal, TiltCard } from "@/components/motion";

export const metadata: Metadata = {
  title: "Диагностика",
  description:
    "3D КТ Sirona за 14 секунд, цифровое сканирование 3Shape, фотопротокол, диагностика ВНЧС и пародонтограмма. Все данные остаются у пациента.",
  alternates: { canonical: "/diagnostics" },
};

const tools = [
  {
    icon: "scan",
    title: "Конусно-лучевая КТ Sirona",
    text: "Объёмная модель челюсти с шагом 75 микрон за 14 секунд. Видны объём кости, положение нервных каналов, кисты и непройденные каналы.",
    spec: "доза 40–90 мкЗв",
  },
  {
    icon: "cube",
    title: "Цифровой сканер 3Shape TRIOS",
    text: "Слепок без ложки и слепочной массы: без рвотного рефлекса, точность на порядок выше, модель сразу уходит в лабораторию.",
    spec: "точность 6,9 мкм",
  },
  {
    icon: "microscope",
    title: "Микроскоп Leica",
    text: "25-кратное увеличение при осмотре: трещины, микроподтекания под пломбами и начальный кариес видно до того, как появится боль.",
    spec: "увеличение ×25",
  },
  {
    icon: "chip",
    title: "Диагностика ВНЧС",
    text: "Анализ работы височно-нижнечелюстного сустава и жевательных мышц перед ортодонтическим лечением и полной реабилитацией.",
    spec: "перед каждым курсом",
  },
  {
    icon: "plan",
    title: "Фотопротокол",
    text: "Портретная и внутриротовая съёмка по стандартному протоколу — база для планирования эстетики и объективного сравнения результата.",
    spec: "12 стандартных ракурсов",
  },
  {
    icon: "warranty",
    title: "Пародонтограмма",
    text: "Замер глубины карманов в шести точках у каждого зуба. Динамика фиксируется в цифрах, а не в ощущениях.",
    spec: "6 точек на зуб",
  },
];

export default function DiagnosticsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Диагностика", href: "/diagnostics" }]}
        eyebrow="Технологии"
        title="Диагностика перед лечением"
        lead="Ни один план лечения в клинике не составляется без объективных данных. Мы не начинаем работу «по осмотру» — сначала снимок, скан и цифры."
        metrics={[
          { value: "14 секунд", label: "конусно-лучевая томограмма" },
          { value: "6,9 мкм", label: "точность цифрового слепка" },
          { value: "×25", label: "увеличение микроскопа" },
          { value: "DICOM", label: "снимок остаётся у вас" },
        ]}
        actions={
          <BookCta title="Записаться на диагностику">
            Записаться на диагностику
          </BookCta>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading eyebrow="Оборудование" title="Чем мы смотрим" />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.07} className="group h-full">
                <TiltCard
                  intensity={6}
                  className="card card-lift h-full overflow-hidden p-8"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-royal-800 transition-colors duration-500 group-hover:bg-royal-600 group-hover:text-white">
                    <Icon name={t.icon} />
                  </span>
                  <h2 className="mt-6 text-[1.2rem] font-bold leading-snug tracking-tight">
                    {t.title}
                  </h2>
                  <p className="mt-3.5 text-[0.96rem] leading-relaxed text-slate">
                    {t.text}
                  </p>
                  <p className="mt-6 border-t border-line pt-4 text-[0.84rem] text-muted">
                    {t.spec}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="med-grid opacity-50" />
        <div className="shell relative grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <h2 className="t-h4 font-bold">Данные принадлежат вам</h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-slate">
                Томограмма записывается на диск в формате DICOM и загружается в
                личный кабинет. Её откроет любая клиника — если вы решите лечиться
                в другом месте, повторно облучаться не придётся.
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-slate">
                Фотопротокол и цифровые модели передаём по запросу в течение одного
                рабочего дня.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <h2 className="t-h4 font-bold">Безопасность рентгена</h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-slate">
                Доза при стоматологической КТ — 40–90 микрозивертов, сопоставимо с
                несколькими часами авиаперелёта. Кабинет зарегистрирован, дозовые
                нагрузки фиксируются в карте.
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-slate">
                Беременным исследование проводим только по неотложным показаниям, с
                защитным фартуком и на визиографе с минимальной дозой.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
