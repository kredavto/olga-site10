import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DoctorsSection from "@/components/DoctorsSection";
import FinalCta from "@/components/FinalCta";
import BookCta from "@/components/BookCta";
import { doctors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Врачи клиники",
  description:
    "Пять специалистов клиники AURUM: челюстно-лицевой хирург, ортопед, эндодонтист, ортодонт и пародонтолог. Образование, сертификаты, количество выполненных процедур.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  const totalYears = doctors.reduce(
    (acc, d) => acc + (new Date().getFullYear() - d.since),
    0
  );

  return (
    <>
      <PageHeader
        trail={[{ name: "Врачи", href: "/doctors" }]}
        eyebrow="Команда"
        title="Врачи клиники AURUM"
        lead="Каждый врач ведёт узкое направление и продолжает учиться: клиника оплачивает минимум два международных курса в год на специалиста."
        metrics={[
          { value: String(doctors.length), label: "профильных специалистов" },
          { value: `${totalYears} лет`, label: "суммарный клинический стаж" },
          { value: "14", label: "международных сертификатов" },
          { value: "2 в год", label: "обучающих курса на врача" },
        ]}
        actions={
          <BookCta title="Запись к врачу">Записаться к специалисту</BookCta>
        }
      />

      <DoctorsSection
        eyebrow="Специалисты"
        title="Кто будет вас лечить"
        text="Наведите на карточку, чтобы прочитать профессиональную философию врача."
      />

      <FinalCta />
    </>
  );
}
