import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { siteConfig } from "@/config/site";
import { routing, defaultLocale, type Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogSearchAndFilter } from "@/components/blog/BlogSearchAndFilter";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : defaultLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = localizedUrl(locale, "/blog");

  const languages: Record<string, string> = { "x-default": localizedUrl(defaultLocale, "/blog") };
  for (const loc of routing.locales) {
    languages[loc] = localizedUrl(loc, "/blog");
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getAllPosts(locale);
  const categories = getAllCategories(locale);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { name: t("breadcrumbHome"), href: "/" },
            { name: t("breadcrumbBlog"), href: "/blog" },
          ]}
        />

        <div className="mt-6 max-w-2xl">
          <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            {t("heading")}
          </h1>
          <p className="mt-4 text-balance text-muted-foreground">{t("intro")}</p>
        </div>

        <div className="mt-10">
          <BlogSearchAndFilter posts={posts} categories={categories} locale={locale} />
        </div>
      </div>
    </div>
  );
}
