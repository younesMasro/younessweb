import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale, "reviews");
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <ReviewsSection />
      <PageCtaBanner namespace="ReviewsPage.cta" />
    </div>
  );
}
