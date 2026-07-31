import Link from "next/link";
import Logo from "./Logo";
import { services } from "@/lib/services";
import { site, ratings } from "@/lib/site";

const columns = [
  {
    title: "Клиника",
    links: [
      { href: "/about", label: "О клинике" },
      { href: "/doctors", label: "Врачи" },
      { href: "/diagnostics", label: "Диагностика" },
      { href: "/laboratory", label: "Лаборатория" },
      { href: "/licenses", label: "Лицензии" },
      { href: "/careers", label: "Карьера" },
    ],
  },
  {
    title: "Пациентам",
    links: [
      { href: "/prices", label: "Цены" },
      { href: "/promo", label: "Акции" },
      { href: "/cases", label: "До и после" },
      { href: "/reviews", label: "Отзывы" },
      { href: "/faq", label: "Частые вопросы" },
      { href: "/blog", label: "Блог" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-white/70">
      <div className="med-grid opacity-[0.18]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.45), transparent 70%)",
        }}
      />

      <div className="shell relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed">
              Цифровая стоматология полного цикла на Пресненской набережной.
              Работаем с {site.founded} года.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {ratings.map((r) => (
                <div
                  key={r.source}
                  className="rounded-2xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5"
                >
                  <p className="text-[0.7rem] uppercase tracking-wider text-white/45">
                    {r.source}
                  </p>
                  <p className="mt-0.5 text-[1.05rem] font-semibold text-white">
                    {r.score}
                    <span className="ml-1.5 text-[0.72rem] font-normal text-white/45">
                      {r.count}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="t-eyebrow mb-5 text-white/40">Услуги</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="t-eyebrow mb-5 text-white/40">{col.title}</p>
                <ul className="space-y-2.5 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="t-eyebrow mb-5 text-white/40">Контакты</p>
            <a
              href={`tel:${site.phoneHref}`}
              className="text-[1.45rem] font-bold tracking-tight text-white"
            >
              {site.phone}
            </a>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              {site.address.city}, {site.address.street}
              <br />
              {site.address.metro}
            </p>
            <p className="mt-3 text-[0.95rem]">{site.hours}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-[0.95rem] transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <p className="mt-6 text-[0.85rem] leading-relaxed text-white/45">
              Лицензия {site.license}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[0.8rem] leading-relaxed text-white/40">
            {site.legalName}. Лицензия на осуществление медицинской деятельности{" "}
            {site.license}. Имеются противопоказания, необходима консультация
            специалиста. Информация на сайте не является публичной офертой.
            Указанные диапазоны цен носят справочный характер; итоговая стоимость
            определяется планом лечения после очной консультации.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[0.82rem] text-white/40">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy" className="hover:text-white">
                Политика конфиденциальности
              </Link>
              <Link href="/contacts" className="hover:text-white">
                Реквизиты и контакты
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white">
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
