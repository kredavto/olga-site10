import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import BookingModal from "@/components/BookingModal";
import MobileDock from "@/components/MobileDock";
import JsonLd from "@/components/JsonLd";

import { site } from "@/lib/site";
import { clinicSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "AURUM — стоматологическая клиника в Москве: имплантация, виниры, лечение под микроскопом",
    template: "%s — клиника AURUM",
  },
  description:
    "Премиальная стоматология на Пресненской набережной. Имплантация 55 000–120 000 ₽, виниры 38 000–62 000 ₽, лечение под микроскопом Leica. С 2009 года, 15 400 пациентов, приживаемость имплантов 98,7%.",
  keywords: [
    "стоматология Москва",
    "имплантация зубов",
    "виниры",
    "лечение зубов под микроскопом",
    "исправление прикуса",
    "брекеты",
    "детская стоматология",
  ],
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.legalName,
    title: "AURUM — цифровая стоматология премиального уровня в Москве",
    description:
      "Имплантация, виниры и лечение под микроскопом по цифровому протоколу. 3D-диагностика, собственная CAD/CAM-лаборатория, гарантия в договоре.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM — стоматологическая клиника в Москве",
    description:
      "Цифровая стоматология полного цикла: имплантация, виниры, микроскоп, ортодонтия.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <CursorGlow />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileDock />
        <BookingModal />
        <JsonLd data={clinicSchema} />
        <JsonLd data={websiteSchema} />
      </body>
    </html>
  );
}
