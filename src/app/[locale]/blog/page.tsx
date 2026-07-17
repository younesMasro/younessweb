import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogSearchAndFilter } from "@/components/blog/BlogSearchAndFilter";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export const dynamicParams = false;

const title = "Blog Youness Web — Création de site web au Maroc";
const description =
  "Conseils, guides et actualités sur la création de sites web, le e-commerce et le référencement (SEO) pour les entreprises marocaines.";
const canonical = `${siteConfig.url}/blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: siteConfig.name,
    locale: "fr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Blog", href: "/blog" }]} />

        <div className="mt-6 max-w-2xl">
          <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            Le blog Youness Web
          </h1>
          <p className="mt-4 text-balance text-muted-foreground">
            Des guides pratiques pour créer, améliorer et faire connaître le
            site web de votre entreprise au Maroc — prix, e-commerce,
            WordPress, SEO local et bien plus.
          </p>
        </div>

        <div className="mt-10">
          <BlogSearchAndFilter posts={posts} categories={categories} />
        </div>
      </div>
    </div>
  );
}
