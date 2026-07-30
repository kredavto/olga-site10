import { site } from "./site";
import { doctors } from "./data";
import { services } from "./services";

const abs = (path = "") => `${site.url}${path}`;

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "Dentist"],
  "@id": abs("/#clinic"),
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  description:
    "Стоматологическая клиника полного цикла в Москве: имплантация, виниры, лечение под микроскопом, ортодонтия. Собственная CAD/CAM-лаборатория и 3D-диагностика.",
  medicalSpecialty: "Dentistry",
  foundingDate: String(site.founded),
  priceRange: "₽₽₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Наличные, банковские карты, рассрочка",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postal,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.geo.lat,
    longitude: site.address.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.stats.rating,
    reviewCount: site.stats.reviews,
    bestRating: 5,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Лицензия на медицинскую деятельность",
    identifier: site.license,
  },
  availableService: services.map((s) => ({
    "@type": "MedicalProcedure",
    name: s.h1,
    url: abs(`/services/${s.slug}`),
  })),
  employee: doctors.map((d) => ({
    "@type": "Physician",
    name: d.name,
    jobTitle: d.role,
    url: abs(`/doctors/${d.id}`),
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: site.url,
  name: site.legalName,
  inLanguage: "ru-RU",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function doctorSchema(id: string) {
  const d = doctors.find((x) => x.id === id);
  if (!d) return null;
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "Dentist"],
    "@id": abs(`/doctors/${d.id}#physician`),
    name: d.name,
    jobTitle: d.role,
    url: abs(`/doctors/${d.id}`),
    worksFor: { "@id": abs("/#clinic") },
    medicalSpecialty: "Dentistry",
    knowsAbout: d.focus,
    alumniOf: d.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e,
    })),
    hasCredential: d.certificates.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
  };
}

export function procedureSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": abs(`/services/${s.slug}#procedure`),
    name: s.h1,
    description: s.description,
    url: abs(`/services/${s.slug}`),
    procedureType: "https://schema.org/TherapeuticProcedure",
    bodyLocation: "Полость рта",
    howPerformed: s.stages.map((st) => `${st.title}: ${st.text}`).join(" "),
    preparation: "Консультация, 3D-диагностика, составление плана лечения",
    followup: "Контрольные осмотры и профессиональная гигиена раз в 6 месяцев",
    provider: { "@id": abs("/#clinic") },
    offers: s.prices.map((p) => ({
      "@type": "Offer",
      name: p.name,
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: p.from,
        maxPrice: p.to,
        priceCurrency: "RUB",
      },
      availability: "https://schema.org/InStock",
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.href),
    })),
  };
}
