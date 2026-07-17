import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import type { Locale } from "@/i18n/routing";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  image: string;
  keywords: string[];
  author: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

export type Post = PostSummary & {
  content: string;
  toc: TocItem[];
};

function localeDir(locale: Locale) {
  return path.join(BLOG_ROOT, locale);
}

function readMdxFile(locale: Locale, slug: string) {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    toc.push({ id: slugger.slug(text), text, depth });
  }

  return toc;
}

export function getAllPostSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  try {
    const { data, content } = readMdxFile(locale, slug);
    const frontmatter = data as PostFrontmatter;

    return {
      ...frontmatter,
      slug,
      content,
      readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      toc: extractToc(content),
    };
  } catch {
    return null;
  }
}

export function getAllPosts(locale: Locale): PostSummary[] {
  return getAllPostSlugs(locale)
    .map((slug) => {
      const { data, content } = readMdxFile(locale, slug);
      const frontmatter = data as PostFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(locale: Locale, category: string): PostSummary[] {
  return getAllPosts(locale).filter(
    (post) => slugify(post.category) === slugify(category),
  );
}

export function getPostsByTag(locale: Locale, tag: string): PostSummary[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.some((t) => slugify(t) === slugify(tag)),
  );
}

export function getRelatedPosts(locale: Locale, post: PostSummary, limit = 3): PostSummary[] {
  const others = getAllPosts(locale).filter((p) => p.slug !== post.slug);

  const scored = others.map((other) => {
    let score = 0;
    if (other.category === post.category) score += 2;
    score += other.tags.filter((t) => post.tags.includes(t)).length;
    return { post: other, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function getAllCategories(locale: Locale): string[] {
  const categories = new Set(getAllPosts(locale).map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(locale: Locale): string[] {
  const tags = new Set(getAllPosts(locale).flatMap((post) => post.tags));
  return Array.from(tags);
}

// Slugs that exist in French but haven't been translated into every other
// locale yet. Used by the language switcher: navigating away from one of
// these to a locale where it doesn't exist would 404, so it falls back to
// the blog index in that locale instead.
export function getFrenchOnlySlugs(): string[] {
  const frSlugs = getAllPostSlugs("fr");
  const otherLocaleSlugs = (["en", "ar"] as Locale[]).map(
    (locale) => new Set(getAllPostSlugs(locale)),
  );
  return frSlugs.filter((slug) => otherLocaleSlugs.some((set) => !set.has(slug)));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
