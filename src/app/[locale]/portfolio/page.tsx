import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "portfolio");
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <PortfolioSection />
      <LogoMarquee />
      <PageCtaBanner namespace="PortfolioPage.cta" />
    </div>
  );
}
