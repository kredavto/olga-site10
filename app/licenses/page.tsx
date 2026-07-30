import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";
import { doctors } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Лицензии и сертификаты",
  description:
    "Лицензия на медицинскую деятельность клиники AURUM, регистрационные удостоверения материалов и международные сертификаты врачей.",
  alternates: { canonical: "/licenses" },
};

const docs = [
  {
    title: "Лицензия на медицинскую деятельность",
    number: site.license,
    issued: "14.03.2019",
    authority: "Департамент здравоохранения города Москвы",
    scope:
      "Терапевтическая, хирургическая, ортопедическая, детская стоматология, ортодонтия, анестезиология и реаниматология, рентгенология.",
  },
  {
    title: "Санитарно-эпидемиологическое заключение",
    number: "77.01.16.000.М.001284.03.19",
    issued: "02.03.2019",
    authority: "Роспотребнадзор по городу Москве",
    scope:
      "Соответствие условий оказания медицинской помощи санитарным нормам и правилам.",
  },
  {
    title: "Регистрация рентгенологического кабинета",
    number: "РК-77-2019-0418",
    issued: "21.03.2019",
    authority: "Департамент здравоохранения города Москвы",
    scope:
      "Эксплуатация конусно-лучевого томографа и радиовизиографов, контроль дозовых нагрузок.",
  },
];

export default function LicensesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Лицензии", href: "/licenses" }]}
        eyebrow="Документы"
        title="Лицензии и сертификаты"
        lead="Оригиналы всех документов находятся на стойке администратора — попросите, и вам их покажут. Здесь опубликованы реквизиты и область действия каждого."
        metrics={[
          { value: "3", label: "разрешительных документа" },
          { value: "14", label: "международных сертификата врачей" },
          { value: "100%", label: "материалов с РУ Росздравнадзора" },
          { value: "класс B", label: "автоклавы с биоконтролем" },
        ]}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative">
          <SectionHeading eyebrow="Клиника" title="Разрешительные документы" />
          <div className="mt-14 space-y-5">
            {docs.map((d, i) => (
              <Reveal key={d.number} delay={i * 0.06}>
                <article className="card grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <h2 className="t-h4 font-bold leading-snug">{d.title}</h2>
                    <dl className="mt-6 space-y-4 text-[0.95rem]">
                      <div>
                        <dt className="text-[0.76rem] uppercase tracking-wider text-muted">
                          Номер
                        </dt>
                        <dd className="tnum mt-1 font-semibold">{d.number}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.76rem] uppercase tracking-wider text-muted">
                          Дата выдачи
                        </dt>
                        <dd className="mt-1">{d.issued}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.76rem] uppercase tracking-wider text-muted">
                          Выдан
                        </dt>
                        <dd className="mt-1">{d.authority}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <p className="text-[0.76rem] uppercase tracking-wider text-muted">
                        Область действия
                      </p>
                      <p className="mt-2 text-[1rem] leading-relaxed">{d.scope}</p>
                    </div>
                    {/* document preview placeholder — replace with a scan */}
                    <div
                      className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line"
                      style={{
                        background:
                          "linear-gradient(150deg,#f7f8fa,#eceef2 60%,#e7dccb)",
                      }}
                      aria-hidden
                    >
                      <div className="absolute inset-6 rounded-xl border border-line/80" />
                      <div className="absolute inset-x-10 top-12 space-y-2.5">
                        {[100, 82, 92, 64, 88, 46].map((w, k) => (
                          <div
                            key={k}
                            className="h-1.5 rounded-full bg-graphite/8"
                            style={{ width: `${w}%` }}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-8 right-10 h-14 w-14 rounded-full border-2 border-royal-600/25" />
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
          <SectionHeading
            eyebrow="Врачи"
            title="Сертификаты специалистов"
            text="Клиника оплачивает минимум два международных курса в год на каждого врача."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 0.06} className="h-full">
                <div className="card h-full p-7">
                  <p className="font-semibold">{d.name}</p>
                  <p className="mt-1 text-[0.86rem] text-muted">{d.role}</p>
                  <ul className="mt-5 space-y-3">
                    {d.certificates.map((c) => (
                      <li key={c} className="flex gap-3 text-[0.92rem] leading-relaxed">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-deep" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
