import Link from "next/link";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Advantages from "@/components/Advantages";
import ServicesGrid from "@/components/ServicesGrid";
import Process from "@/components/Process";
import PricingCenter from "@/components/PricingCenter";
import Packages from "@/components/Packages";
import DoctorsSection from "@/components/DoctorsSection";
import BeforeAfter from "@/components/BeforeAfter";
import Reviews from "@/components/Reviews";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCta from "@/components/FinalCta";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/motion";
import { faqs, posts } from "@/lib/data";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Advantages />
      <ServicesGrid />
      <Process />
      <PricingCenter />
      <Packages />
      <DoctorsSection />
      <BeforeAfter />
      <Reviews />

      <section id="faq" className="section relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Вопросы и ответы"
            title="Отвечаем прямо, без медицинского тумана"
            text="Двенадцать вопросов, которые пациенты задают на первой консультации чаще всего."
          />
          <div className="mt-14">
            <FaqAccordion items={faqs} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 text-[0.98rem] text-slate">
              Не нашли свой вопрос?{" "}
              <Link
                href="/faq"
                className="font-semibold text-royal-800 underline underline-offset-4"
              >
                Полный список вопросов
              </Link>{" "}
              или позвоните — ответим сразу.
            </p>
          </Reveal>
        </div>
        <JsonLd data={faqSchema(faqs)} />
      </section>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <SectionHeading
            eyebrow="Блог"
            title="Разбираем то, о чём обычно молчат"
            aside={
              <Link href="/blog" className="btn btn-ghost">
                Все статьи
              </Link>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="card card-lift group flex h-full flex-col p-7"
                >
                  <span className="chip w-fit">{p.category}</span>
                  <h3 className="mt-5 text-[1.16rem] font-bold leading-snug tracking-tight transition-colors group-hover:text-royal-800">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-slate">
                    {p.excerpt}
                  </p>
                  <p className="mt-auto pt-6 text-[0.82rem] text-muted">
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
