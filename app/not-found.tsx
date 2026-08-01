import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-[136px]">
      <div className="absolute inset-0 bg-gradient-to-b from-pearl to-white" />
      <div className="mesh" />
      <div className="med-grid" />

      <div className="shell relative">
        <p className="t-eyebrow text-royal-700">Ошибка 404</p>
        <h1 className="t-h1 mt-5 font-bold">Такой страницы нет</h1>
        <p className="t-lead mt-6 max-w-xl text-slate">
          Возможно, страница переехала или в адресе опечатка. Вот куда чаще всего
          заходят пациенты — или позвоните {site.phone}, подскажем.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            На главную
          </Link>
          <Link href="/prices" className="btn btn-ghost">
            Цены
          </Link>
          <Link href="/contacts" className="btn btn-ghost">
            Контакты
          </Link>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card card-lift group flex items-center justify-between gap-4 p-5"
            >
              <span className="font-semibold transition-colors group-hover:text-royal-700">
                {s.nav}
              </span>
              <span className="tnum text-[0.84rem] text-muted">
                {s.priceFrom.toLocaleString("ru-RU")}–
                {s.priceTo.toLocaleString("ru-RU")} ₽
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
