import type { Metadata } from "next";
import { Suspense } from "react";
import { Cairo, Manrope, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupportWidget } from "@/components/shared/FloatingSupportWidget";
import { RouteProgressBar } from "@/components/shared/RouteProgressBar";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return buildMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const jsonLd = localBusinessJsonLd(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${manrope.variable} ${spaceGrotesk.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <body
        className={`min-h-full ${locale === "ar" ? "font-arabic" : "font-sans"}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <RouteProgressBar />
            <ScrollToTop />
          </Suspense>
          <SmoothScrollProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingSupportWidget />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
