import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { cities } from "@/config/cities";
import {
  CityLandingContent,
  buildCityMetadata,
} from "@/components/local-seo/CityLandingContent";

const city = cities.marrakech;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export const dynamicParams = false;

export const metadata: Metadata = buildCityMetadata(city);

export default async function MarrakechPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CityLandingContent city={city} />;
}
