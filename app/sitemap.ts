import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { doctors, posts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${site.url}${p}`;

  const staticPages = [
    ["", 1],
    ["/services", 0.9],
    ["/prices", 0.9],
    ["/doctors", 0.8],
    ["/cases", 0.8],
    ["/about", 0.7],
    ["/reviews", 0.7],
    ["/promo", 0.7],
    ["/diagnostics", 0.6],
    ["/laboratory", 0.6],
    ["/faq", 0.6],
    ["/blog", 0.6],
    ["/licenses", 0.5],
    ["/contacts", 0.8],
    ["/careers", 0.4],
    ["/privacy", 0.2],
  ] as const;

  return [
    ...staticPages.map(([p, priority]) => ({
      url: url(p),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...doctors.map((d) => ({
      url: url(`/doctors/${d.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
