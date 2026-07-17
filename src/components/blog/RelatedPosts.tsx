import { getTranslations } from "next-intl/server";
import type { PostSummary } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { BlogCard } from "@/components/blog/BlogCard";

export async function RelatedPosts({
  posts,
  locale,
}: {
  posts: PostSummary[];
  locale: Locale;
}) {
  if (posts.length === 0) return null;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
        {t("relatedArticles")}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
