import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
import BookCta from "@/components/BookCta";
import { faqs } from "@/lib/data";
import { services } from "@/lib/services";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Ответы на вопросы о боли, стоимости, гарантии, материалах, имплантах, брекетах, противопоказаниях, сроках лечения и рассрочке в клинике AURUM.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const all = [
    ...faqs,
    ...services.flatMap((s) => s.faq.map((f) => ({ ...f, category: s.nav }))),
  ];

  return (
    <>
      <PageHeader
        trail={[{ name: "Частые вопросы", href: "/faq" }]}
        eyebrow="Пациентам"
        title="Частые вопросы"
        lead="Отвечаем прямо и с первой строки. Если вопроса нет в списке — позвоните, координатор соединит с профильным врачом."
        metrics={[
          { value: String(all.length), label: "вопросов с ответами" },
          { value: "12 минут", label: "среднее время до ответного звонка" },
          { value: "0 ₽", label: "второе мнение по чужому плану" },
          { value: "08:00–22:00", label: "ежедневно на связи" },
        ]}
        actions={<BookCta title="Задать вопрос врачу">Задать свой вопрос</BookCta>}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <FaqAccordion items={all} />
        </div>
        <JsonLd data={faqSchema(all)} />
      </section>

      <FinalCta />
    </>
  );
}
