import NextLink from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/navigation";

// The local-SEO landing pages (/creation-site-web-*) only exist in French
// (see src/config/cities.ts) — unlike /blog, which is now fully translated.
// A link to them from an EN/AR article must stay a bare, unprefixed path
// rather than being locale-prefixed by next-intl's Link.
function isFrenchOnlyPath(href: string) {
  return href.startsWith("/creation-site-web-");
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 scroll-mt-28 text-2xl font-semibold text-foreground sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 scroll-mt-28 text-xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-primary"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/") && isFrenchOnlyPath(href)) {
      return (
        <NextLink
          href={href}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </NextLink>
      );
    }
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 rounded-r-lg border-l-4 border-primary bg-card px-5 py-4 text-foreground/90 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  table: ({ children, ...props }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-card text-foreground" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="border-b border-border px-4 py-3 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-border/60 px-4 py-3 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  img: ({ src, alt }) => (
    <span className="mt-6 block overflow-hidden rounded-xl">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt || ""}
        width={1200}
        height={630}
        className="h-auto w-full object-cover"
      />
    </span>
  ),
};
