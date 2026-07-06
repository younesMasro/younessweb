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
          className="gap-1.5 text-foreground/80 hover:text-foreground"
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
            onClick={() => router.replace(pathname, { locale: loc })}
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
