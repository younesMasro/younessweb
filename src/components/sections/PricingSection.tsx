"use client";

import { useLocale, useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pricingComparisonRows } from "@/config/pricing";
import { PricingCards } from "@/components/sections/PricingCards";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const t = useTranslations("PricingPage");
  const locale = useLocale() as Locale;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("hero.badge")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("hero.title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>

        <PricingCards />

        <FadeIn delay={0.3}>
          <div className="mx-auto mt-20 max-w-4xl text-center">
            <h2 className="text-balance text-xl font-semibold sm:text-2xl">
              {t("comparison.title")}
            </h2>
            <p className="mt-3 text-balance text-muted-foreground">
              {t("comparison.subtitle")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="glass mx-auto mt-10 max-w-4xl overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    {t("comparison.feature")}
                  </th>
                  <th className="p-4 text-left font-medium text-primary">
                    {t("comparison.wordpress")}
                  </th>
                  <th className="p-4 text-left font-medium text-secondary">
                    {t("comparison.custom")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      i !== pricingComparisonRows.length - 1 &&
                        "border-b border-white/5",
                    )}
                  >
                    <td className="p-4 font-medium text-foreground/90">
                      {row.feature[locale]}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {row.wordpress[locale]}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {row.custom[locale]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="glow-border glass mx-auto mt-14 max-w-2xl rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold">
              {t("helpChoose.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("helpChoose.description")}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-5 rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/contact">{t("helpChoose.cta")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
