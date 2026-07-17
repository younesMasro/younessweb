import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { siteConfig } from "@/config/site";
import { routing, defaultLocale, type Locale } from "@/i18n/routing";
import { getAllCategories, getPostsByCategory, slugify } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCategories(locale).map((category) => ({
      locale,
      category: slugify(category),
    })),
  );
}

export const dynamicParams = false;

function findCategory(locale: Locale, categorySlug: string) {
  return getAllCategories(locale).find((c) => slugify(c) === categorySlug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale: raw, category: categorySlug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  const category = findCategory(locale, categorySlug);
  if (!category) return {};

  const title = `${category} — Youness Web`;
  const canonical = `${siteConfig.url}${locale === defaultLocale ? "" : `/${locale}`}/blog/categorie/${categorySlug}`;

  return {
    title,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: raw, category: categorySlug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  setRequestLocale(locale);

  const category = findCategory(locale, categorySlug);
  if (!category) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getPostsByCategory(locale, category);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { name: t("breadcrumbHome"), href: "/" },
            { name: t("breadcrumbBlog"), href: "/blog" },
            { name: category, href: `/blog/categorie/${categorySlug}` },
          ]}
        />
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          {category}
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
