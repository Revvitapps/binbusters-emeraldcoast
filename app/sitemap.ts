import type { MetadataRoute } from "next";
import { lastUpdated, siteUrl, towns } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(lastUpdated);
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/pricing", 0.9),
    page("/book", 0.9),
    page("/vacation-rentals", 0.8),
    page("/neighborhoods", 0.7),
    page("/service-areas", 0.8),
    ...towns.map((t) => page(`/service-areas/${t.slug}`, 0.8)),
    page("/faq", 0.7),
    page("/about", 0.6),
    page("/contact", 0.6),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
