import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export type BreadcrumbItem = { name: string; href: string };

const ariaLabels: Record<Locale, string> = {
  fr: "Fil d'Ariane",
  en: "Breadcrumb",
  ar: "مسار التنقل",
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const locale = useLocale() as Locale;
  const jsonLd = breadcrumbJsonLd(
    items.map((item) => ({
      name: item.name,
      url: `${siteConfig.url}${item.href}`,
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label={ariaLabels[locale]} className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="size-3.5" />}
              {index === items.length - 1 ? (
                <span className="text-foreground">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
