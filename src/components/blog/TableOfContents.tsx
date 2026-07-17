"use client";

import { useTranslations } from "next-intl";
import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const t = useTranslations("Blog");
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={t("tableOfContents")}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <p className="text-sm font-semibold text-foreground">
        {t("tableOfContents")}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.depth === 3 && "pl-4")}
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", `#${item.id}`);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
