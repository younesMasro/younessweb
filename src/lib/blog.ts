import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

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

function readMdxFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
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

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const { data, content } = readMdxFile(slug);
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

export function getAllPosts(): PostSummary[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data, content } = readMdxFile(slug);
      const frontmatter = data as PostFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): PostSummary[] {
  return getAllPosts().filter(
    (post) => slugify(post.category) === slugify(category),
  );
}

export function getPostsByTag(tag: string): PostSummary[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => slugify(t) === slugify(tag)),
  );
}

export function getRelatedPosts(post: PostSummary, limit = 3): PostSummary[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);

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

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set(getAllPosts().flatMap((post) => post.tags));
  return Array.from(tags);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
