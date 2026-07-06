import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/sections/HomeHero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyYounessWebSection } from "@/components/sections/WhyYounessWebSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ReviewsPreview } from "@/components/sections/ReviewsPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <ServicesPreview />
      <StatsSection />
      <WhyYounessWebSection />
      <LogoMarquee />
      <PricingPreview />
      <PortfolioPreview />
      <ReviewsPreview />
      <FinalCta />
    </>
  );
}
