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

// The local-SEO landing pages (/creation-site-web-*) only exist in French
// (see src/config/cities.ts) — switching language from one of these must
// fall back to that locale's homepage instead of a 404.
function isFrenchOnlyLandingPage(pathname: string) {
  return pathname.startsWith("/creation-site-web-");
}

export function LanguageSwitcher({ frenchOnlySlugs }: { frenchOnlySlugs: string[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Languages");
  const pathname = usePathname();
  const router = useRouter();

  // A specific blog post that hasn't been translated into every locale yet
  // (see getFrenchOnlySlugs) would 404 if we just re-prefixed the same
  // path — fall back to the blog index in the target locale instead.
  const isUntranslatedPost = frenchOnlySlugs.some(
    (slug) => pathname === `/blog/${slug}`,
  );

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
              if (loc === "fr") {
                router.replace(pathname, { locale: loc });
              } else if (isFrenchOnlyLandingPage(pathname)) {
                router.replace("/", { locale: loc });
              } else if (isUntranslatedPost) {
                router.replace("/blog", { locale: loc });
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
