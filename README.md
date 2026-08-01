# AURUM — сайт стоматологической клиники

Премиальный сайт стоматологии в стиле **Luxury Medical Futurism**: стеклянные
панели, световые сетки, частицы на canvas, scroll-анимации и воронка, которая
ведёт пользователя от первого экрана к записи на консультацию.

## Стек

| Слой | Технология |
| --- | --- |
| Фреймворк | Next.js 16 (App Router, RSC, Turbopack) |
| Язык | TypeScript (strict) |
| Стили | Tailwind CSS v4 + собственная дизайн-система в `app/globals.css` |
| Анимация | Framer Motion, CSS-анимации, Canvas 2D |
| Плавный скролл | Lenis |
| Шрифты | Inter + Manrope через `next/font` (кириллица, variable, self-hosted) |

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшен-сборка
npm start
```

## Структура

```
app/
  layout.tsx            прелоадер, шапка, подвал, модалка записи, JSON-LD
  page.tsx              главная: Hero → доверие → преимущества → услуги →
                        процесс → цены → пакеты → врачи → до/после →
                        отзывы → FAQ → блог → CTA
  services/[slug]       9 продающих страниц услуг
  doctors/[id]          карточки врачей
  prices, promo, cases, reviews, faq, blog/[slug], about,
  diagnostics, laboratory, licenses, careers, contacts, privacy
  sitemap.ts, robots.ts, not-found.tsx, icon.svg
components/             UI и моушен-примитивы
lib/
  site.ts               контакты, лицензия, статистика клиники
  services.ts           каталог услуг: цены, этапы, показания, FAQ
  data.ts               врачи, пакеты, кейсы, отзывы, FAQ, блог
  posts.ts              тексты статей
  schema.ts             Schema.org разметка
```

## Дизайн-система

Токены объявлены в `@theme` (`app/globals.css`):

- акварельная розово-персиковая канва: `canvas / canvas-mid / canvas-end`
  собираются в фиксированный градиент на `body`, поверх — мягкие пятна и
  зерно бумаги; `white` — светлая поверхность карточек и стекла;
  `pearl` — полупрозрачная заливка чередующихся секций, сквозь неё
  просвечивает акварель; `mist`, `line`;
- заголовки h1–h6 наследуют кнопочный синий `royal-600`; правило
  объявлено в слое `base`, поэтому на тёмных секциях утилита `text-white`
  по-прежнему выигрывает и заголовки там остаются белыми;
- текст: `graphite / slate / muted`;
- основной `royal-50…900` (#2563EB);
- акценты `emerald-soft`, `beige`, `champagne`, `champagne-deep`;
- тени `soft / lift / float / glow`, easing `--ease-lux`.

Утилиты: `.glass`, `.glass-refract`, `.hairline`, `.mesh`, `.med-grid`,
`.scanline`, `.noise`, `.btn`, `.card`, `.chip`, `.field`, `.range`,
`.t-h1…t-eyebrow`, `.shell`, `.section`.

## Моушен

Прелоадер (логотип из ~4 200 частиц → медицинское сканирование → раскрытие
шторки), Lenis smooth scroll, cursor glow, split-text reveal, blur/scale
reveal, staggered появление, 3D-tilt карточки с подсветкой по курсору,
магнитные кнопки, счётчики, gradient mesh, анимированная медицинская сетка,
AI data flow, SVG-морфинг в таймлайне, marquee партнёров, glass refraction.

Всё уважает `prefers-reduced-motion`: анимации отключаются, контент остаётся.

## SEO

- метаданные и canonical на каждой странице, Open Graph и Twitter Card;
- Schema.org: `MedicalClinic` + `Dentist`, `Physician`, `MedicalProcedure`
  с `Offer` и диапазонами цен, `FAQPage`, `BreadcrumbList`, `Article`,
  `WebSite` + `SearchAction`, `AggregateRating`, лицензия через
  `EducationalOccupationalCredential`;
- `sitemap.xml` и `robots.txt` генерируются автоматически;
- один `h1` на страницу, семантические `h2–h4`, таблицы с `caption`;
- шрифты self-hosted с `display: swap`, изображений-блокеров нет,
  все страницы статические (SSG).

## Что заменить перед запуском

1. **Данные клиники** — `lib/site.ts`: название, телефон, адрес, лицензия,
   домен (`site.url` используется в canonical и Schema.org).
2. **Контент** — `lib/services.ts`, `lib/data.ts`, `lib/posts.ts`. Цены,
   врачи, кейсы и отзывы сейчас демонстрационные.
3. **Видео первого экрана** — положите `public/media/hero.mp4`; `<video>` в
   `components/Hero.tsx` подхватит его и проявится поверх градиента.
   Без файла первый экран работает на градиенте, сетке и частицах.
4. **Фотографии врачей** — сейчас отрисованы дизайнерские дуотон-плейсхолдеры
   (`Portrait` в `components/DoctorCard.tsx`). Замените на `next/image` с
   реальными портретами (не на белом фоне, в интерьере кабинета).
5. **Фотографии до/после** — компонент `Comparator`
   (`components/BeforeAfter.tsx`) не зависит от источника: подставьте
   `<Image>` вместо иллюстрации `Smile`.
6. **Видеоотзывы** — в `components/Reviews.tsx` кнопка сейчас заглушка;
   подключите плеер или ссылку на площадку.
7. **Приём заявок** — `components/BookingForm.tsx`, функция `submit`:
   демо-задержка. Замените на route handler и интеграцию с CRM/телефонией.
8. **Карта** — в `app/contacts/page.tsx` нарисована SVG-схема; замените на
   виджет Яндекс Карт или 2ГИС.
9. **Реквизиты и юридические тексты** — `app/privacy/page.tsx`,
   `app/licenses/page.tsx`, дисклеймер в подвале.

## Доступность

Skip-link, видимый focus-ring, `aria-expanded` у аккордеонов и меню, `aria-label`
у иконочных кнопок, закрытие модалок по Escape, поиск по `⌘/Ctrl + K`,
контрастность текста ≥ 4.5:1, тач-цели ≥ 44 px.
