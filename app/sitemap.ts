import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kmkgroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"];
  const pages = ["", "/about", "/activities", "/projects", "/invest", "/gallery", "/blog", "/contact"];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return routes;
}
