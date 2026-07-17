import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Never guess the locale from the browser's Accept-Language header or a
  // stale NEXT_LOCALE cookie. Without this, a visitor whose browser prefers
  // English (or who previously switched language) gets silently redirected
  // to /en/... for prefix-less URLs — which 404s for the blog and local-SEO
  // pages, since those only exist in French. It also better matches the
  // business goal: Moroccan visitors should land on the French site by
  // default regardless of their device's language.
  localeDetection: false,
});
