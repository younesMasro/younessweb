import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";

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

export function localizedUrl(locale: Locale, path: string) {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
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
    "x-default": localizedUrl(defaultLocale, path),
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
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description[locale],
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    image: `${siteConfig.url}/images/logo/LogoIcon.png`,
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    knowsLanguage: ["fr", "ar", "en"],
    sameAs: [siteConfig.instagram],
    priceRange: "2500 MAD - 10000+ MAD",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/LogoIcon.png`,
    email: siteConfig.email,
    sameAs: [siteConfig.instagram],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo/LogoIcon.png`,
      },
    },
    inLanguage: "fr",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
