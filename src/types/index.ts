import type { Locale } from "@/i18n/routing";

export type { Locale };

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface NavItem {
  key: string;
  href: string;
}

export type PricingEngine = "essentiel" | "premium";

export interface PricingComparisonRow {
  feature: LocalizedText;
  essentiel: LocalizedText;
  premium: LocalizedText;
}

export interface PricingPackage {
  id: string;
  engine: PricingEngine;
  /** Brand name, kept identical across locales on purpose (e.g. "Essentiel"). */
  name: LocalizedText;
  /** Short one-line positioning statement. */
  purpose: LocalizedText;
  /** Longer explanatory paragraph shown under the positioning line. */
  description: LocalizedText;
  /** Premium-only highlighted value statement. */
  valueStatement?: LocalizedText;
  price: number;
  currency: "MAD";
  popular: boolean;
  features: LocalizedList;
}

export interface ServiceItem {
  id: string;
  icon: string;
  featured: boolean;
  title: LocalizedText;
  description: LocalizedText;
}

export type PortfolioCategory =
  | "ecommerce"
  | "business"
  | "booking"
  | "education"
  | "travel"
  | "landing"
  | "portfolio"
  | "medical"
  | "community"
  | "blog";

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  /** One or more categories (most projects have exactly one). */
  categories: PortfolioCategory[];
  description: LocalizedText;
  image: string;
  /** External live URL, or null when unavailable (no "View project" CTA). */
  url: string | null;
}

export interface Review {
  id: string;
  featured: boolean;
  /** Screenshot image path in public/images/reviews. */
  image: string;
  alt: string;
  project?: string;
}

export interface ProjectLogo {
  name: string;
  src: string;
  alt: string;
}
