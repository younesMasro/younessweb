import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContactLandingHero } from "@/components/sections/ContactLandingHero";
import { WhyYounessWebSection } from "@/components/sections/WhyYounessWebSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ReviewsPreview } from "@/components/sections/ReviewsPreview";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <ContactLandingHero />
      <WhyYounessWebSection showCta />
      <CapabilitiesSection variant="compact" />
      <PricingPreview
        namespace="ContactPage.pricing"
        showStartProject
        featureLimit={10}
      />
      <PortfolioPreview
        namespace="ContactPage.portfolio"
        showStartProject
      />
      <ReviewsPreview namespace="ContactPage.reviews" />
      <PageCtaBanner namespace="ContactPage.finalCta" anchorHref="#contact-form" />
    </div>
  );
}
