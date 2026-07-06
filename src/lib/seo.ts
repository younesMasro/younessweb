import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/i18n/routing";

export type PageKey =
  | "home"
  | "services"
  | "portfolio"
  | "pricing"
  | "reviews"
  | "contact";

const pages: Record<PageKey, { namespace: string; path: string }> = {
  home: { namespace: "HomeMeta", path: "" },
  services: { namespace: "ServicesMeta", path: "/services" },
  portfolio: { namespace: "PortfolioMeta", path: "/portfolio" },
  pricing: { namespace: "PricingMeta", path: "/pricing" },
  reviews: { namespace: "ReviewsMeta", path: "/reviews" },
  contact: { namespace: "ContactMeta", path: "/contact" },
};

function localizedUrl(locale: Locale, path: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export async function buildMetadata(
  locale: Locale,
  page: PageKey = "home",
): Promise<Metadata> {
  const { namespace, path } = pages[page];
  const t = await getTranslations({ locale, namespace });

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  const languages: Record<string, string> = {
    "x-default": localizedUrl("en", path),
  };
  for (const loc of locales) {
    languages[loc] = localizedUrl(loc, path);
  }

  const canonical = localizedUrl(locale, path);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
      images: [
        {
          url: "/images/logo/LogoIcon.png",
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo/LogoIcon.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description[locale],
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    image: `${siteConfig.url}/images/logo/LogoIcon.png`,
    areaServed: "Worldwide",
    sameAs: [siteConfig.instagram],
    priceRange: "2500 MAD - 10000+ MAD",
  };
}
