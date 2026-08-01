import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Стоматология AURUM: ${site.address.city}, ${site.address.street}. ${site.address.metro}. Телефон ${site.phone}, ежедневно 08:00–22:00.`,
  alternates: { canonical: "/contacts" },
};

const routes = [
  {
    title: "На метро",
    text: "Станция «Деловой центр» или «Выставочная» — 4 минуты пешком по набережной. Выход к башне «Империя».",
  },
  {
    title: "На автомобиле",
    text: "Подземный паркинг для пациентов, первые 3 часа бесплатно. Въезд с Пресненской набережной, уровень −2, сектор C.",
  },
  {
    title: "Такси",
    text: "Точка высадки — центральный вход со стороны набережной. Скажите водителю «Пресненская набережная, 12, вход A».",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Контакты", href: "/contacts" }]}
        eyebrow="Как нас найти"
        title="Контакты и запись"
        lead={`${site.address.city}, ${site.address.street}. ${site.address.metro}. Работаем ежедневно с 08:00 до 22:00, включая выходные и праздники.`}
        metrics={[
          { value: "08:00 — 22:00", label: "ежедневно, без выходных" },
          { value: "4 минуты", label: "пешком от метро" },
          { value: "3 часа", label: "бесплатной парковки" },
          { value: "12 минут", label: "среднее время до ответного звонка" },
        ]}
      />

      <section className="section-tight relative overflow-hidden">
        <div className="shell relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <Reveal>
              <div className="card p-8">
                <h2 className="t-h4 font-bold">Клиника</h2>
                <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                  <Item label="Адрес">
                    {site.address.city}, {site.address.street}
                    <span className="mt-1 block text-[0.86rem] text-muted">
                      {site.address.metro}
                    </span>
                  </Item>
                  <Item label="Телефон">
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="transition-colors hover:text-royal-700"
                    >
                      {site.phone}
                    </a>
                  </Item>
                  <Item label="Почта">
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-colors hover:text-royal-700"
                    >
                      {site.email}
                    </a>
                  </Item>
                  <Item label="Режим работы">{site.hours}</Item>
                  <Item label="Лицензия">{site.license}</Item>
                  <Item label="Парковка">
                    Подземный паркинг, первые 3 часа бесплатно
                  </Item>
                </dl>
              </div>
            </Reveal>

            {/* map placeholder — swap for the clinic's map embed */}
            <Reveal delay={0.08}>
              <div className="card relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(150deg,#f9f0da,#efe2c4 55%,#e0d0aa)",
                  }}
                />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 800 500"
                  fill="none"
                  aria-hidden
                >
                  {/* river */}
                  <path
                    d="M-20 340 C 160 300, 300 380, 460 330 S 720 250, 830 290"
                    stroke="#a9c4d8"
                    strokeWidth="46"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* streets */}
                  {[90, 190, 430, 520].map((y) => (
                    <line
                      key={y}
                      x1="-20"
                      y1={y}
                      x2="830"
                      y2={y - 30}
                      stroke="#fffcf5"
                      strokeWidth="10"
                    />
                  ))}
                  {[120, 300, 500, 660].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="-20"
                      x2={x - 40}
                      y2="520"
                      stroke="#fffcf5"
                      strokeWidth="8"
                    />
                  ))}
                  {/* blocks */}
                  {[
                    [150, 60],
                    [340, 120],
                    [560, 80],
                    [200, 400],
                    [600, 400],
                  ].map(([x, y]) => (
                    <rect
                      key={`${x}-${y}`}
                      x={x}
                      y={y}
                      width="90"
                      height="60"
                      rx="8"
                      fill="#fffcf5"
                      opacity="0.65"
                    />
                  ))}
                  {/* clinic pin */}
                  <g transform="translate(400 230)">
                    <circle r="34" fill="rgba(37,99,235,0.16)" />
                    <circle r="18" fill="#2563EB" />
                    <circle r="6" fill="#fff" />
                  </g>
                </svg>
                <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-4">
                  <p className="text-[0.78rem] uppercase tracking-wider text-muted">
                    Клиника AURUM
                  </p>
                  <p className="mt-1 font-semibold">{site.address.street}</p>
                  <p className="mt-0.5 text-[0.84rem] text-muted">
                    {site.address.metro}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:sticky lg:top-28">
            <div className="glass hairline relative overflow-hidden rounded-[30px] p-8">
              <div className="mesh opacity-60" />
              <div className="relative">
                <h2 className="t-h4 font-bold">Записаться на приём</h2>
                <p className="mt-2.5 text-[0.95rem] text-slate">
                  Координатор перезвонит, подберёт врача и время.
                </p>
                <div className="mt-7">
                  <BookingForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight relative overflow-hidden bg-pearl">
        <div className="shell relative">
          <SectionHeading eyebrow="Дорога" title="Как добраться" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {routes.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07} className="h-full">
                <div className="card h-full p-7">
                  <h3 className="text-[1.14rem] font-bold">{r.title}</h3>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-slate">
                    {r.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="card mt-8 p-8">
              <h2 className="t-h4 font-bold">Реквизиты</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Item label="Наименование">{site.legalName}</Item>
                <Item label="Лицензия">{site.license}</Item>
                <Item label="Юридический адрес">
                  {site.address.postal}, {site.address.city},{" "}
                  {site.address.street}
                </Item>
                <Item label="Электронная почта">{site.email}</Item>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Item({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[0.78rem] uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-[1rem] font-medium leading-relaxed">
        {children}
      </dd>
    </div>
  );
}
