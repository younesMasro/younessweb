import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
