import Link from "next/link";
import SectionHeading from "./SectionHeading";
import DoctorCard from "./DoctorCard";
import { doctors, type Doctor } from "@/lib/data";

export default function DoctorsSection({
  list,
  title = "Врачи клиники",
  eyebrow = "Команда",
  text = "Пять специалистов, каждый — с международными сертификатами и узкой специализацией. По сложным случаям собираем консилиум.",
}: {
  list?: Doctor[];
  title?: string;
  eyebrow?: string;
  text?: string;
}) {
  const items = list ?? doctors;
  return (
    <section id="doctors" className="section relative overflow-hidden">
      <div className="mesh opacity-40" />
      <div className="shell relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          text={text}
          aside={
            <Link href="/doctors" className="btn btn-ghost">
              Все врачи и их работы
            </Link>
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((d, i) => (
            <DoctorCard key={d.id} doctor={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
