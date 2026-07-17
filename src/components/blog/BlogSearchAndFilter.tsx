"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/BlogCard";
import { cn } from "@/lib/utils";
import type { PostSummary } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

export function BlogSearchAndFilter({
  posts,
  categories,
  locale,
}: {
  posts: PostSummary[];
  categories: string[];
  locale: Locale;
}) {
  const t = useTranslations("Blog");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory
        ? post.category === activeCategory
        : true;
      const matchesQuery = q
        ? post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveCategory(null)}>
            <Badge
              variant={activeCategory === null ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1 text-xs",
                activeCategory === null && "glow-cyan",
              )}
            >
              {t("allCategories")}
            </Badge>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
            >
              <Badge
                variant={activeCategory === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1 text-xs",
                  activeCategory === category && "glow-cyan",
                )}
              >
                {category}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t("noResults")}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
