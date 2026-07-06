import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyYounessWebSection } from "@/components/sections/WhyYounessWebSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <ServicesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WhyYounessWebSection />
      <PageCtaBanner namespace="ServicesPage.cta" />
    </div>
  );
}
