import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import { Reveal } from "@/components/motion";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Блог о стоматологии",
  description:
    "Статьи врачей клиники AURUM: как выбрать имплант, мифы о винирах, зачем нужна 3D-томограмма, домашняя гигиена, детский страх и налоговый вычет за лечение зубов.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHeader
        trail={[{ name: "Блог", href: "/blog" }]}
        eyebrow="Материалы"
        title="Блог клиники"
        lead="Пишут врачи, а не копирайтеры. Разбираем то, о чём обычно молчат на приёме, потому что не хватает времени."
        metrics={[
          { value: String(posts.length), label: "статей в блоге" },
          { value: "5–9 мин", label: "среднее время чтения" },
          { value: "0", label: "рекламных статей" },
          { value: "6", label: "тематических рубрик" },
        ]}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="card card-lift group grid gap-8 p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-12"
            >
              <div>
                <span className="chip">{lead.category}</span>
                <h2 className="t-h3 mt-6 font-bold leading-snug transition-colors group-hover:text-royal-700">
                  {lead.title}
                </h2>
                <p className="t-lead mt-5 text-slate">{lead.excerpt}</p>
                <p className="mt-6 text-[0.85rem] text-muted">
                  {new Date(lead.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {lead.read}
                </p>
              </div>
              <div
                className="hidden aspect-[4/3] rounded-[24px] lg:block"
                style={{
                  background:
                    "linear-gradient(140deg,#eff4ff,#bfd3fe 55%,#e7dccb)",
                }}
                aria-hidden
              />
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="card card-lift group flex h-full flex-col p-8"
                >
                  <span className="chip w-fit">{p.category}</span>
                  <h2 className="mt-5 text-[1.2rem] font-bold leading-snug tracking-tight transition-colors group-hover:text-royal-700">
                    {p.title}
                  </h2>
                  <p className="mt-3.5 text-[0.95rem] leading-relaxed text-slate">
                    {p.excerpt}
                  </p>
                  <p className="mt-auto pt-7 text-[0.82rem] text-muted">
                    {new Date(p.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {p.read}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
