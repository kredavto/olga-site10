import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reviews from "@/components/Reviews";
import FinalCta from "@/components/FinalCta";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { reviews } from "@/lib/data";
import { ratings, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Отзывы пациентов",
  description:
    "Видеоотзывы и текстовые отзывы пациентов клиники AURUM с Яндекс Карт, Google, 2ГИС и ПроДокторов. Средняя оценка 4,9 из 5.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Отзывы", href: "/reviews" }]}
        eyebrow="Обратная связь"
        title="Отзывы пациентов"
        lead="Мы не собираем отзывы на своём сайте, где их можно отредактировать. Все оценки — на внешних площадках, откуда мы не можем удалить ни одного слова."
        metrics={[
          { value: String(site.stats.rating), label: "средняя оценка из 5" },
          { value: `${site.stats.reviews}`, label: "отзывов на площадках" },
          { value: "62%", label: "пациентов приходят по рекомендации" },
          { value: "4", label: "независимые площадки" },
        ]}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Площадки"
            title="Где нас оценивают"
            text="Ссылки ведут на внешние сервисы — там же можно оставить свой отзыв."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ratings.map((r, i) => (
              <Reveal key={r.source} delay={i * 0.06} className="h-full">
                <div className="card h-full p-7">
                  <p className="t-eyebrow text-muted">{r.source}</p>
                  <p className="mt-4 text-[2.2rem] font-bold leading-none text-royal-700">
                    {r.score}
                  </p>
                  <p className="mt-3 text-[0.9rem] text-slate">{r.count}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Все отзывы"
            title="Полные тексты"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={(i % 2) * 0.07} className="h-full">
                <article className="card h-full p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-[0.84rem] text-muted">
                        {r.city} · {r.service}
                      </p>
                    </div>
                    <span className="chip">{r.source}</span>
                  </div>
                  <p className="mt-5 text-[1rem] leading-relaxed text-slate">
                    «{r.text}»
                  </p>
                  <p className="mt-5 text-[0.82rem] text-muted">
                    {new Date(r.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {r.video && " · есть видеоотзыв"}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
