import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { siteConfig } from "@/config/site";
import { routing, defaultLocale, type Locale } from "@/i18n/routing";
import { getAllTags, getPostsByTag, slugify } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllTags(locale).map((tag) => ({ locale, tag: slugify(tag) })),
  );
}

export const dynamicParams = false;

function findTag(locale: Locale, tagSlug: string) {
  return getAllTags(locale).find((t) => slugify(t) === tagSlug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}): Promise<Metadata> {
  const { locale: raw, tag: tagSlug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  const tag = findTag(locale, tagSlug);
  if (!tag) return {};

  const title = `#${tag} — Youness Web`;
  const canonical = `${siteConfig.url}${locale === defaultLocale ? "" : `/${locale}`}/blog/tag/${tagSlug}`;

  return {
    title,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale: raw, tag: tagSlug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  setRequestLocale(locale);

  const tag = findTag(locale, tagSlug);
  if (!tag) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getPostsByTag(locale, tag);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { name: t("breadcrumbHome"), href: "/" },
            { name: t("breadcrumbBlog"), href: "/blog" },
            { name: `#${tag}`, href: `/blog/tag/${tagSlug}` },
          ]}
        />
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          #{tag}
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
