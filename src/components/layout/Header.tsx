"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6",
          scrolled ? "glass py-2.5" : "py-1",
        )}
      >
        <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.name}>
          <Image
            src={siteConfig.logo.white}
            alt={siteConfig.name}
            width={140}
            height={32}
            className="h-7 w-auto object-contain sm:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/70",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Button
            asChild
            className="glow-cyan bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/contact">{t("cta")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="glass border-white/10 pt-16">
              <SheetTitle className="sr-only">{siteConfig.name}</SheetTitle>
              <nav className="flex flex-col gap-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 hover:bg-white/5 hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground"
                >
                  {t("cta")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
