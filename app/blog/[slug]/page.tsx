import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/motion";
import { posts } from "@/lib/data";
import { getPostBody } from "@/lib/posts";
import { fitTitle } from "@/lib/meta";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    /* У длинных названий берём часть до двоеточия: она несёт тему, а
       уточнение после него при обрезке терялось бы всё равно. */
    title: fitTitle(p.title, p.title.split(":")[0].trim()),
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((x) => x.slug === slug);
  const body = getPostBody(slug);
  if (!post || !body) notFound();

  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        trail={[
          { name: "Блог", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        eyebrow={`${post.category} · ${post.read}`}
        title={post.title}
        lead={body.summary}
      />

      <article className="section-tight relative overflow-hidden">
        <div className="shell relative max-w-3xl">
          {body.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <section className="mb-12">
                <h2 className="t-h3 font-bold leading-snug">{s.h}</h2>
                {s.p.map((par) => (
                  <p
                    key={par.slice(0, 40)}
                    className="mt-5 text-[1.08rem] leading-[1.75] text-slate"
                  >
                    {par}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}

          <Reveal>
            <div className="card mt-4 p-8">
              <p className="t-eyebrow text-royal-800">Остались вопросы</p>
              <p className="mt-3 text-[1.08rem] leading-relaxed">
                Позвоните {site.phone} — координатор соединит с профильным врачом,
                или приходите на консультацию с готовым планом из другой клиники:
                второе мнение бесплатно.
              </p>
            </div>
          </Reveal>

          <p className="mt-8 text-[0.84rem] leading-relaxed text-muted">
            Материал носит справочный характер и не заменяет очную консультацию.
            Имеются противопоказания, необходима консультация специалиста.
          </p>
        </div>
      </article>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <h2 className="t-h3 font-bold">Читать дальше</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="card card-lift group flex h-full flex-col p-7"
                >
                  <span className="chip w-fit">{p.category}</span>
                  <h3 className="mt-5 text-[1.12rem] font-bold leading-snug transition-colors group-hover:text-royal-800">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-slate">
                    {p.excerpt}
                  </p>
                  <p className="mt-auto pt-6 text-[0.8rem] text-muted">{p.read}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          author: { "@type": "Organization", name: site.legalName },
          publisher: {
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
          },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }}
      />
    </>
  );
}
