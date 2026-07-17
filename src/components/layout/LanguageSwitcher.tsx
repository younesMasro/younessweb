"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

// The blog and the local-SEO landing pages (/creation-site-web-*) only
// exist in French (see content/blog and src/config/cities.ts) — they
// aren't registered under the [locale] pathnames, so next-intl can't
// translate their URL. Switching language from one of these must fall
// back to that locale's homepage instead of a 404.
function isFrenchOnlyPath(pathname: string) {
  return pathname === "/blog" || pathname.startsWith("/blog/") || pathname.startsWith("/creation-site-web-");
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Languages");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-11 gap-1.5 text-foreground/80 hover:text-foreground lg:h-8"
          aria-label={t(locale)}
        >
          <Globe className="size-4" />
          {labels[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-white/10">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => {
              if (loc !== "fr" && isFrenchOnlyPath(pathname)) {
                router.replace("/", { locale: loc });
              } else {
                router.replace(pathname, { locale: loc });
              }
            }}
            className={cn(
              "cursor-pointer",
              loc === locale && "text-primary font-medium",
            )}
          >
            {t(loc)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
