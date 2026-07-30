import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import BookCta from "@/components/BookCta";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Карьера в клинике",
  description:
    "Вакансии клиники AURUM: врач-стоматолог, ассистент, гигиенист, зубной техник. Оплачиваемое обучение, современное оборудование, прозрачная система мотивации.",
  alternates: { canonical: "/careers" },
};

const jobs = [
  {
    title: "Врач стоматолог-терапевт (эндодонтист)",
    type: "Полная занятость · сменный график",
    income: "от 250 000 ₽",
    req: [
      "опыт работы с микроскопом от 2 лет",
      "владение коффердамом обязательно",
      "действующий сертификат специалиста",
    ],
  },
  {
    title: "Врач-ортодонт",
    type: "Частичная занятость · 2–3 дня в неделю",
    income: "от 220 000 ₽",
    req: [
      "опыт работы с элайнерами и самолигирующими системами",
      "понимание гнатологии и диагностики ВНЧС",
      "готовность вести пациента до ретенции",
    ],
  },
  {
    title: "Ассистент стоматолога",
    type: "Полная занятость · сменный график 2/2",
    income: "от 95 000 ₽",
    req: [
      "работа в четыре руки",
      "аккуратность в стерилизационном цикле",
      "опыт от года или готовность учиться у нас",
    ],
  },
  {
    title: "Зубной техник (CAD/CAM)",
    type: "Полная занятость · собственная лаборатория",
    income: "от 180 000 ₽",
    req: [
      "моделирование в exocad или 3Shape",
      "опыт работы с диоксидом циркония и E.max",
      "готовность выходить на примерки к пациенту",
    ],
  },
];

const perks = [
  ["Обучение", "Два международных курса в год за счёт клиники, плюс внутренние разборы клинических случаев каждую неделю."],
  ["Оборудование", "Микроскоп на каждом кресле, 3D КТ, цифровые сканеры, собственная лаборатория. Ничего не нужно «докупать самому»."],
  ["Время на пациента", "Приём от 40 минут. Мы не ставим по 20 пациентов в смену — это ломает и врача, и результат."],
  ["Прозрачная мотивация", "Понятный процент без штрафов и планов продаж. Врач не обязан ничего «допродавать»."],
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Карьера", href: "/careers" }]}
        eyebrow="Работа у нас"
        title="Карьера в AURUM"
        lead="Мы ищем врачей, которым важно доводить работу до конца, а не закрывать план. У нас нет продажных скриптов и штрафов — есть время на пациента и оборудование, которое не мешает работать."
        metrics={[
          { value: "40 минут", label: "минимальная длительность приёма" },
          { value: "2 курса", label: "обучения в год за счёт клиники" },
          { value: "17 лет", label: "клиника на рынке" },
          { value: "4", label: "открытые вакансии" },
        ]}
        actions={
          <BookCta title="Отклик на вакансию" subtitle="Оставьте контакты — свяжемся и обсудим детали.">
            Откликнуться
          </BookCta>
        }
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading eyebrow="Вакансии" title="Открытые позиции" />
          <div className="mt-14 space-y-5">
            {jobs.map((j, i) => (
              <Reveal key={j.title} delay={(i % 3) * 0.06}>
                <article className="card grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <h2 className="t-h4 font-bold leading-snug">{j.title}</h2>
                    <p className="mt-2.5 text-[0.9rem] text-muted">{j.type}</p>
                    <p className="tnum mt-4 text-[1.2rem] font-bold text-royal-700">
                      {j.income}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.78rem] uppercase tracking-wider text-muted">
                      Требования
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {j.req.map((r) => (
                        <li key={r} className="flex gap-3 text-[0.95rem] leading-relaxed">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-soft" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <BookCta
                        title={`Отклик: ${j.title}`}
                        subtitle="Оставьте контакты — главный врач свяжется с вами лично."
                        className="btn btn-ghost !py-3.5 text-[0.92rem]"
                        magnetic={false}
                      >
                        Откликнуться
                      </BookCta>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <SectionHeading eyebrow="Условия" title="Что мы даём взамен" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {perks.map(([t, x], i) => (
              <Reveal key={t} delay={(i % 2) * 0.07} className="h-full">
                <div className="card h-full p-8">
                  <h3 className="t-h4 font-bold">{t}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-slate">{x}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 text-[0.95rem] text-slate">
              Не нашли свою позицию? Присылайте резюме на{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-royal-700 underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              — хорошим специалистам мы находим место.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
