import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getAllTags, getPostsByTag, slugify } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ locale: "fr", tag: slugify(tag) }));
}

export const dynamicParams = false;

function findTag(tagSlug: string) {
  return getAllTags().find((t) => slugify(t) === tagSlug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = findTag(tagSlug);
  if (!tag) return {};

  const title = `#${tag} — Blog Youness Web`;
  const description = `Articles Youness Web associés au tag ${tag}.`;
  const canonical = `${siteConfig.url}/blog/tag/${tagSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag: tagSlug } = await params;
  setRequestLocale(locale);

  const tag = findTag(tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { name: "Accueil", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: `#${tag}`, href: `/blog/tag/${tagSlug}` },
          ]}
        />
        <h1 className="mt-6 text-3xl font-semibold text-foreground sm:text-4xl">
          #{tag}
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
