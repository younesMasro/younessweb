import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { getAllPostSlugs, getAllCategories, getAllTags, slugify } from "@/lib/blog";
import { cityKeys } from "@/config/cities";
import type { PageKey } from "@/lib/seo";

const corePages: { page: PageKey; path: string }[] = [
  { page: "home", path: "" },
  { page: "services", path: "/services" },
  { page: "portfolio", path: "/portfolio" },
  { page: "pricing", path: "/pricing" },
  { page: "reviews", path: "/reviews" },
  { page: "contact", path: "/contact" },
];

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localizedUrl(loc, path);
  }
  languages["x-default"] = localizedUrl(defaultLocale, path);
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path } of corePages) {
    for (const locale of locales as readonly Locale[]) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages: alternates(path) },
      });
    }
  }

  // The blog is fully translated (content/blog/{fr,en,ar}); the local-SEO
  // city pages remain French-only (see src/config/cities.ts).
  for (const locale of locales as readonly Locale[]) {
    entries.push({
      url: localizedUrl(locale, "/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alternates("/blog") },
    });

    for (const slug of getAllPostSlugs(locale)) {
      const path = `/blog/${slug}`;
      const languages: Record<string, string> = {};
      for (const loc of locales as readonly Locale[]) {
        if (getAllPostSlugs(loc).includes(slug)) {
          languages[loc] = localizedUrl(loc, path);
        }
      }
      if (languages[defaultLocale]) languages["x-default"] = languages[defaultLocale];

      entries.push({
        url: localizedUrl(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }

    for (const category of getAllCategories(locale)) {
      entries.push({
        url: localizedUrl(locale, `/blog/categorie/${slugify(category)}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }

    for (const tag of getAllTags(locale)) {
      entries.push({
        url: localizedUrl(locale, `/blog/tag/${slugify(tag)}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  }

  entries.push({
    url: `${siteConfig.url}/creation-site-web-maroc`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  });

  for (const city of cityKeys) {
    entries.push({
      url: `${siteConfig.url}/creation-site-web-${city}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  return entries;
}
