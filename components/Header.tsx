"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { services, serviceGroups } from "@/lib/services";
import { site } from "@/lib/site";
import { openBooking } from "@/lib/booking";
import { Magnetic } from "./motion";

const clinicLinks = [
  { href: "/about", label: "О клинике" },
  { href: "/doctors", label: "Врачи" },
  { href: "/diagnostics", label: "Диагностика" },
  { href: "/laboratory", label: "Лаборатория" },
  { href: "/licenses", label: "Лицензии и сертификаты" },
  { href: "/careers", label: "Карьера" },
];

const infoLinks = [
  { href: "/prices", label: "Цены" },
  { href: "/promo", label: "Акции" },
  { href: "/cases", label: "Работы до и после" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
  { href: "/faq", label: "Частые вопросы" },
  { href: "/contacts", label: "Контакты" },
];

type SearchHit = { href: string; label: string; note: string };

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<null | "services" | "clinic" | "info">(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSearch(false);
        setMobile(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const index = useMemo<SearchHit[]>(
    () => [
      ...services.map((s) => ({
        href: `/services/${s.slug}`,
        label: s.h1,
        note: s.category,
      })),
      ...clinicLinks.map((l) => ({ ...l, note: "О клинике" })),
      ...infoLinks.map((l) => ({ ...l, note: "Информация" })),
    ],
    []
  );

  const hits = q.trim()
    ? index
        .filter((h) =>
          `${h.label} ${h.note}`.toLowerCase().includes(q.trim().toLowerCase())
        )
        .slice(0, 7)
    : index.slice(0, 6);

  /** At the top of the home page the header floats over the dark hero photo,
   *  so its ink has to flip to white until the user scrolls. */
  const overHero = pathname === "/" && !scrolled && !open;

  const hover = (menu: typeof open) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(menu);
  };
  const unhover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-royal-600 focus:px-5 focus:py-3 focus:text-white"
      >
        К основному содержанию
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line/70 bg-white/78 shadow-[0_8px_40px_-28px_rgba(32,33,36,0.4)] backdrop-blur-2xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
        onMouseLeave={unhover}
      >
        {/* top strip */}
        <div className="hidden border-b border-line/60 bg-graphite text-white/75 lg:block">
          <div className="shell flex h-9 items-center justify-between text-[0.78rem]">
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-soft" />
              {site.hours} · {site.address.metro}
            </p>
            <div className="flex items-center gap-5">
              <span className="text-white/55">Лицензия {site.license}</span>
              <a href={`tel:${site.phoneHref}`} className="hover:text-white">
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="shell flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label="AURUM — на главную">
            <Logo invert={overHero} />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
            <MenuTrigger
              label="Услуги"
              active={open === "services"}
              onHover={() => hover("services")}
              light={overHero}
            />
            <MenuTrigger
              label="Клиника"
              active={open === "clinic"}
              onHover={() => hover("clinic")}
              light={overHero}
            />
            <MenuTrigger
              label="Пациентам"
              active={open === "info"}
              onHover={() => hover("info")}
              light={overHero}
            />
            <Link
              href="/prices"
              className={`rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
                overHero
                  ? "text-white/85 hover:text-white"
                  : "text-slate hover:text-graphite"
              }`}
              onMouseEnter={() => hover(null)}
            >
              Цены
            </Link>
            <Link
              href="/contacts"
              className={`rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
                overHero
                  ? "text-white/85 hover:text-white"
                  : "text-slate hover:text-graphite"
              }`}
              onMouseEnter={() => hover(null)}
            >
              Контакты
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearch(true)}
              className={`hidden h-11 w-11 items-center justify-center rounded-full border transition-colors lg:flex ${
                overHero
                  ? "border-white/30 bg-white/10 text-white hover:border-white/60"
                  : "border-line bg-white/70 text-slate hover:border-royal-300 hover:text-royal-800"
              }`}
              aria-label="Поиск по сайту"
            >
              <SearchIcon />
            </button>

            <a
              href={`tel:${site.phoneHref}`}
              className={`hidden text-[1.02rem] font-semibold tracking-tight transition-colors md:block ${
                overHero
                  ? "text-white hover:text-royal-200"
                  : "text-graphite hover:text-royal-800"
              }`}
            >
              {site.phone}
            </a>

            {/* click-to-call is always reachable on phones */}
            <a
              href={`tel:${site.phoneHref}`}
              aria-label={`Позвонить ${site.phone}`}
              className={`flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${
                overHero
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-line bg-white/70 text-royal-800"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M4.5 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3c0 .8-.7 1.5-1.5 1.4C9.4 17.9 3.1 11.6 3.1 5c0-.8.6-1.5 1.4-1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <Magnetic strength={0.22} className="hidden sm:inline-block">
              <button
                className="btn btn-primary !px-6 !py-3 text-[0.95rem]"
                onClick={() =>
                  openBooking({ title: "Онлайн-запись на консультацию" })
                }
              >
                Записаться
              </button>
            </Magnetic>

            <button
              className={`flex h-11 w-11 items-center justify-center rounded-full border xl:hidden ${
                overHero
                  ? "border-white/30 bg-white/10"
                  : "border-line bg-white/70"
              }`}
              onClick={() => setMobile(true)}
              aria-label="Открыть меню"
            >
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] w-5 ${overHero ? "bg-white" : "bg-graphite"}`}
                />
                <span
                  className={`block h-[1.5px] w-5 ${overHero ? "bg-white" : "bg-graphite"}`}
                />
                <span
                  className={`block h-[1.5px] w-3.5 ${overHero ? "bg-white" : "bg-graphite"}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* ---------------- mega menu ---------------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-line/70 bg-white/92 backdrop-blur-2xl xl:block"
              onMouseEnter={() => hover(open)}
            >
              <div className="shell py-10">
                {open === "services" && (
                  <div className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-10">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <p className="t-eyebrow mb-4 text-muted">{group.title}</p>
                        <ul className="space-y-1">
                          {group.slugs.map((slug) => {
                            const s = services.find((x) => x.slug === slug)!;
                            return (
                              <li key={slug}>
                                <Link
                                  href={`/services/${slug}`}
                                  className="group flex flex-col rounded-2xl px-3 py-2.5 transition-colors hover:bg-royal-50"
                                >
                                  <span className="font-semibold tracking-tight transition-colors group-hover:text-royal-800">
                                    {s.nav}
                                  </span>
                                  <span className="text-[0.85rem] text-muted">
                                    {s.priceFrom.toLocaleString("ru-RU")}–
                                    {s.priceTo.toLocaleString("ru-RU")} ₽
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                    <div className="hairline rounded-3xl bg-gradient-to-br from-royal-600 to-royal-800 p-7 text-white">
                      <p className="t-eyebrow text-white/60">Не знаете, с чего начать</p>
                      <p className="mt-3 text-[1.35rem] font-bold leading-tight">
                        Бесплатное второе мнение по вашему плану лечения
                      </p>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-white/75">
                        Приходите с КТ из другой клиники — разберём план и скажем, что действительно необходимо.
                      </p>
                      <button
                        onClick={() =>
                          openBooking({
                            title: "Второе мнение — бесплатно",
                            subtitle: "Возьмите с собой КТ или снимок",
                          })
                        }
                        className="btn btn-gold mt-6 !py-3 !px-5 text-[0.9rem]"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                )}

                {open === "clinic" && (
                  <MegaSimple
                    links={clinicLinks}
                    title="О клинике"
                    text="17 лет, 5 врачей с международными сертификатами, собственная зуботехническая лаборатория и цифровой протокол на каждом этапе."
                  />
                )}

                {open === "info" && (
                  <MegaSimple
                    links={infoLinks}
                    title="Пациентам"
                    text="Честные диапазоны цен без «от», рассрочка 0%, налоговый вычет и гарантия, зафиксированная в договоре."
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---------------- search ---------------- */}
      <AnimatePresence>
        {search && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-graphite/35 backdrop-blur-sm"
              onClick={() => setSearch(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative w-full max-w-2xl overflow-hidden rounded-3xl"
            >
              <div className="flex items-center gap-3 border-b border-line/70 px-6 py-5">
                <SearchIcon />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Услуга, врач, вопрос…"
                  className="w-full bg-transparent text-[1.05rem] outline-none placeholder:text-muted"
                />
                <kbd className="rounded-md border border-line px-2 py-1 text-[0.7rem] text-muted">
                  ESC
                </kbd>
              </div>
              <ul className="max-h-[46vh] overflow-y-auto p-3">
                {hits.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-royal-50"
                      onClick={() => setSearch(false)}
                    >
                      <span className="font-medium">{h.label}</span>
                      <span className="text-[0.82rem] text-muted">{h.note}</span>
                    </Link>
                  </li>
                ))}
                {!hits.length && (
                  <li className="px-4 py-8 text-center text-muted">
                    Ничего не нашлось. Позвоните — подскажем: {site.phone}
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- mobile drawer ---------------- */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-[200] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-graphite/30 backdrop-blur-sm"
              onClick={() => setMobile(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <Logo />
                <button
                  onClick={() => setMobile(false)}
                  aria-label="Закрыть меню"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl"
                >
                  ×
                </button>
              </div>

              <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
                <p className="t-eyebrow mb-3 text-muted">Услуги</p>
                <ul className="mb-8 space-y-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-baseline justify-between gap-4 rounded-2xl px-3 py-3 hover:bg-pearl"
                      >
                        <span className="font-semibold tracking-tight">{s.nav}</span>
                        <span className="shrink-0 text-[0.82rem] text-muted">
                          {s.priceFrom.toLocaleString("ru-RU")}–
                          {s.priceTo.toLocaleString("ru-RU")} ₽
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="t-eyebrow mb-3 text-muted">Клиника</p>
                <ul className="mb-8 grid grid-cols-2 gap-1">
                  {clinicLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-3 py-2.5 text-[0.95rem] hover:bg-pearl">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="t-eyebrow mb-3 text-muted">Пациентам</p>
                <ul className="grid grid-cols-2 gap-1">
                  {infoLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-3 py-2.5 text-[0.95rem] hover:bg-pearl">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 border-t border-line px-6 py-5">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="block text-center text-[1.15rem] font-semibold"
                >
                  {site.phone}
                </a>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setMobile(false);
                    openBooking({});
                  }}
                >
                  Записаться на консультацию
                </button>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="btn btn-ghost w-full !py-3 text-[0.9rem]"
                >
                  Позвонить
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuTrigger({
  label,
  active,
  onHover,
  light = false,
}: {
  label: string;
  active: boolean;
  onHover: () => void;
  light?: boolean;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
        active
          ? "bg-royal-50 text-royal-800"
          : light
            ? "text-white/85 hover:text-white"
            : "text-slate hover:text-graphite"
      }`}
      aria-expanded={active}
    >
      {label}
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden
        className={`transition-transform duration-300 ${active ? "rotate-180" : ""}`}>
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function MegaSimple({
  links,
  title,
  text,
}: {
  links: { href: string; label: string }[];
  title: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[1.1fr_2fr] gap-14">
      <div>
        <p className="t-eyebrow text-muted">{title}</p>
        <p className="mt-4 max-w-xs text-[1.02rem] leading-relaxed text-slate">
          {text}
        </p>
      </div>
      <ul className="grid grid-cols-3 gap-x-6 gap-y-1 self-start">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-2xl px-3 py-2.5 font-medium transition-colors hover:bg-royal-50 hover:text-royal-800"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
