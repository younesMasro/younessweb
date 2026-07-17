import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getAllCategories, getPostsByCategory, slugify } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    locale: "fr",
    category: slugify(category),
  }));
}

export const dynamicParams = false;

function findCategory(categorySlug: string) {
  return getAllCategories().find((c) => slugify(c) === categorySlug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) return {};

  const title = `${category} — Blog Youness Web`;
  const description = `Tous les articles Youness Web sur ${category}.`;
  const canonical = `${siteConfig.url}/blog/categorie/${categorySlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);

  const category = findCategory(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { name: "Accueil", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: category, href: `/blog/categorie/${categorySlug}` },
          ]}
        />
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          {category}
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
