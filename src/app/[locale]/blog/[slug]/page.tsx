import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { routing, defaultLocale, type Locale } from "@/i18n/routing";
import { localizedUrl, articleJsonLd } from "@/lib/seo";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

const dateLocales: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  ar: "ar-MA",
};

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  const canonical = localizedUrl(locale, `/blog/${slug}`);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    if (getPostBySlug(loc, slug)) {
      languages[loc] = localizedUrl(loc, `/blog/${slug}`);
    }
  }
  if (languages[defaultLocale]) {
    languages["x-default"] = languages[defaultLocale];
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical, languages },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : defaultLocale) as Locale;
  setRequestLocale(locale);

  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const related = getRelatedPosts(locale, post);
  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedDate,
    author: post.author,
    locale,
  });

  return (
    <article className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumbs
          items={[
            { name: t("breadcrumbHome"), href: "/" },
            { name: t("breadcrumbBlog"), href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <div className="mt-6">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span aria-hidden>&bull;</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span aria-hidden>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTimeMinutes} {t("minRead")}
            </span>
          </div>
        </div>

        <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {post.toc.length > 0 && (
          <div className="mt-8 lg:hidden">
            <TableOfContents items={post.toc} />
          </div>
        )}

        <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {post.toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={post.toc} />
              </div>
            </aside>
          )}
        </div>

        <RelatedPosts posts={related} locale={locale} />
      </div>

      <div className="mt-16">
        <PageCtaBanner namespace="ServicesPage.cta" />
      </div>
    </article>
  );
}
