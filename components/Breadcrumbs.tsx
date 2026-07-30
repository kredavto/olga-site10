import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ name: "Главная", href: "/" }, ...trail];
  return (
    <nav aria-label="Хлебные крошки" className="shell pt-[120px]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-muted">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span className="text-slate" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-royal-600">
                    {c.name}
                  </Link>
                  <span aria-hidden className="text-line">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}
