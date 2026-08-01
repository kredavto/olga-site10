import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, TiltCard } from "@/components/motion";

export const metadata: Metadata = {
  title: "Акции и специальные предложения",
  description:
    "Действующие акции клиники AURUM: бесплатное второе мнение, комплексная диагностика, семейная программа профилактики, рассрочка 0% на 24 месяца.",
  alternates: { canonical: "/promo" },
};

const promos = [
  {
    tag: "Постоянно",
    title: "Второе мнение — бесплатно",
    price: "0 ₽",
    text: "Приходите с планом лечения и КТ из другой клиники. Разберём, что действительно необходимо, а что можно не делать. Без обязательства лечиться у нас.",
    terms: "Нужен снимок КТ не старше 12 месяцев или мы сделаем свой со скидкой 50%.",
    highlight: true,
  },
  {
    tag: "До конца квартала",
    title: "Комплексная диагностика перед имплантацией",
    price: "6 900 ₽ вместо 13 400 ₽",
    text: "3D КТ, цифровое сканирование, консультация хирурга и ортопеда, письменный план лечения с фиксированной стоимостью.",
    terms: "Сумма засчитывается в стоимость лечения при его начале в течение 60 дней.",
  },
  {
    tag: "Семьям",
    title: "Годовая программа профилактики",
    price: "22 000 – 30 000 ₽ на человека",
    text: "Две профессиональные чистки, два осмотра, фторирование и герметизация фиссур для детей. Напоминания о визитах берём на себя.",
    terms: "При оформлении на двух и более членов семьи — 15% на программу.",
  },
  {
    tag: "Постоянно",
    title: "Рассрочка 0% на 24 месяца",
    price: "без первого взноса",
    text: "Оформление за 15 минут в клинике по паспорту. Проценты банку компенсирует клиника — переплаты для вас нет.",
    terms: "Решение банка-партнёра приходит за 3–5 минут. Доступны сроки 6, 12 и 24 месяца.",
  },
  {
    tag: "Детям",
    title: "Адаптационный визит",
    price: "0 ₽",
    text: "Знакомство с кабинетом, врачом и инструментами в игровой форме. Без лечения — ребёнок сам решает, когда будет готов.",
    terms: "Для детей от 1 года до 12 лет, до трёх визитов.",
  },
  {
    tag: "Постоянно",
    title: "Налоговый вычет 13%",
    price: "документы бесплатно",
    text: "Готовим полный пакет для ФНС: справку установленной формы, копию лицензии и договор. По имплантации вычет не ограничен 150 000 ₽.",
    terms: "Срок подготовки 3–5 рабочих дней. Запросить можно в течение трёх лет после лечения.",
  },
];

export default function PromoPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Акции", href: "/promo" }]}
        eyebrow="Предложения"
        title="Акции клиники"
        lead="Мы не устраиваем распродаж лечения — скидка на медицину обычно означает, что цена была завышена. Наши предложения касаются диагностики, профилактики и условий оплаты."
        metrics={[
          { value: "0%", label: "рассрочка до 24 месяцев" },
          { value: "13%", label: "налоговый вычет" },
          { value: "0 ₽", label: "второе мнение и адаптация детей" },
          { value: "60 дней", label: "действие зачёта диагностики" },
        ]}
        actions={<BookCta title="Воспользоваться предложением">Записаться</BookCta>}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading eyebrow="Сейчас действуют" title="Актуальные предложения" />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {promos.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.07} className="group h-full">
                <TiltCard
                  intensity={5}
                  className={`card card-lift flex h-full flex-col overflow-hidden p-8 ${
                    p.highlight ? "border-royal-200" : ""
                  }`}
                >
                  <span
                    className={`w-fit rounded-full px-3.5 py-1.5 text-[0.74rem] font-semibold uppercase tracking-wider ${
                      p.highlight
                        ? "bg-royal-600 text-white"
                        : "bg-pearl text-slate"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <h2 className="mt-6 text-[1.24rem] font-bold leading-snug tracking-tight">
                    {p.title}
                  </h2>
                  <p className="tnum mt-4 text-[1.2rem] font-bold text-royal-800">
                    {p.price}
                  </p>
                  <p className="mt-4 text-[0.96rem] leading-relaxed text-slate">
                    {p.text}
                  </p>
                  <p className="mt-6 border-t border-line pt-5 text-[0.84rem] leading-relaxed text-muted">
                    {p.terms}
                  </p>
                  <div className="mt-6">
                    <BookCta
                      title={p.title}
                      subtitle={p.text}
                      className="btn btn-ghost w-full !py-3.5 text-[0.92rem]"
                      magnetic={false}
                    >
                      Записаться
                    </BookCta>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-[0.86rem] leading-relaxed text-muted">
              Предложения не суммируются между собой, не являются публичной офертой
              и могут быть изменены. Актуальные условия уточняйте у администратора
              при записи.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
