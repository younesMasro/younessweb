import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PricingSection } from "@/components/sections/PricingSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "pricing");
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <PricingSection />
      <CapabilitiesSection />
      <FaqSection namespace="PricingPage.faq" />
      <PageCtaBanner namespace="PricingPage.cta" />
    </div>
  );
}
