import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Cairo, Manrope, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { buildMetadata, localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getFrenchOnlySlugs } from "@/lib/blog";
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
  const orgJsonLd = organizationJsonLd();
  const frenchOnlySlugs = getFrenchOnlySlugs();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${manrope.variable} ${spaceGrotesk.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <body
        className={`min-h-full ${locale === "ar" ? "font-arabic" : "font-sans"}`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1575854934235328');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1575854934235328&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <RouteProgressBar />
            <ScrollToTop />
          </Suspense>
          <SmoothScrollProvider>
            <AnnouncementBar />
            <Header frenchOnlySlugs={frenchOnlySlugs} />
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
