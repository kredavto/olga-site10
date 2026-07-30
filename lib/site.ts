/**
 * Central clinic configuration.
 * All values here are demo placeholders — replace with the real clinic's data
 * before launch (see README → «Что заменить перед запуском»).
 */

export const site = {
  name: "AURUM",
  legalName: "Стоматологическая клиника AURUM",
  tagline: "Цифровая стоматология премиального уровня",
  url: "https://aurum-clinic.ru",
  locale: "ru_RU",
  founded: 2009,

  phone: "+7 (495) 120-45-90",
  phoneHref: "+74951204590",
  whatsapp: "https://wa.me/74951204590",
  telegram: "https://t.me/aurum_clinic",
  email: "hello@aurum-clinic.ru",

  address: {
    street: "Пресненская набережная, 12",
    city: "Москва",
    postal: "123112",
    country: "RU",
    metro: "Деловой центр · 4 минуты пешком",
    geo: { lat: 55.749, lng: 37.5397 },
  },

  hours: "Ежедневно 08:00 — 22:00",
  license: "ЛО-77-01-019842 от 14.03.2019",

  stats: {
    patients: 15400,
    procedures: 41200,
    implantSuccess: 98.7,
    years: new Date().getFullYear() - 2009,
    rating: 4.9,
    reviews: 1870,
  },
} as const;

export const ratings = [
  { source: "Яндекс Карты", score: "4.9", count: "812 отзывов" },
  { source: "Google", score: "4.9", count: "465 отзывов" },
  { source: "2ГИС", score: "4.8", count: "593 отзыва" },
  { source: "ПроДокторов", score: "9.6", count: "310 отзывов" },
];

export const partners = [
  { name: "Nobel Biocare", note: "Швейцария · импланты" },
  { name: "Straumann", note: "Швейцария · импланты" },
  { name: "Osstem", note: "Южная Корея · импланты" },
  { name: "Invisalign", note: "США · элайнеры" },
  { name: "Leica", note: "Германия · микроскопы" },
  { name: "Sirona", note: "Германия · 3D КТ и CAD/CAM" },
  { name: "Ivoclar", note: "Лихтенштейн · керамика" },
  { name: "3Shape", note: "Дания · цифровые слепки" },
];
