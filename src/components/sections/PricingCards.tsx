"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pricingPackages } from "@/config/pricing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function PricingCards({
  featureLimit,
  showStartProject = false,
}: {
  /** Cap the visible feature list (used for compact previews). Omit to show every feature. */
  featureLimit?: number;
  showStartProject?: boolean;
}) {
  const t = useTranslations("PricingPage");
  const tc = useTranslations("ContactPage");
  const locale = useLocale() as Locale;

  return (
    <div className="mx-auto mt-14 grid max-w-4xl items-start gap-8 lg:grid-cols-2">
      {pricingPackages.map((pkg, i) => {
        const features = featureLimit
          ? pkg.features[locale].slice(0, featureLimit)
          : pkg.features[locale];
        const hiddenCount = featureLimit
          ? pkg.features[locale].length - features.length
          : 0;

        return (
          <FadeIn key={pkg.id} delay={0.1 * i}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-8 transition-transform duration-300",
                pkg.popular
                  ? "glow-purple border-secondary/50 bg-gradient-to-b from-secondary/15 via-secondary/5 to-card/60 lg:-translate-y-3 lg:scale-[1.03]"
                  : "glass border-white/10",
              )}
            >
              {pkg.popular && (
                <Badge className="glow-purple absolute -top-3.5 left-8 bg-secondary text-secondary-foreground">
                  {t("popular")}
                </Badge>
              )}

              <h3 className="text-lg font-semibold sm:text-xl">
                {pkg.name[locale]}
              </h3>
              <p className="mt-2 text-sm font-medium text-foreground/80">
                {pkg.purpose[locale]}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pkg.description[locale]}
              </p>
              {pkg.valueStatement && (
                <p className="mt-3 rounded-xl border border-secondary/30 bg-secondary/10 px-3.5 py-2.5 text-sm font-medium text-foreground/90">
                  {pkg.valueStatement[locale]}
                </p>
              )}

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">
                  {t("startingFrom")}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "text-4xl font-bold tracking-tight",
                    pkg.popular && "text-gradient-brand",
                  )}
                >
                  {pkg.price.toLocaleString(locale === "ar" ? "ar-MA" : locale)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {t("currency")}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border",
                        pkg.popular
                          ? "border-secondary/30 bg-secondary/10 text-secondary"
                          : "border-primary/25 bg-primary/10 text-primary",
                      )}
                    >
                      <Check className="size-3" />
                    </span>
                    <span className="text-foreground/85">{feature}</span>
                  </li>
                ))}
                {hiddenCount > 0 && (
                  <li className="pt-1 text-xs text-muted-foreground">
                    {t("moreFeatures", { count: hiddenCount })}
                  </li>
                )}
              </ul>

              <div className="mt-8 flex flex-col gap-2.5">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "group h-12 rounded-full",
                    pkg.popular
                      ? "glow-purple bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "glow-cyan bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <Link href={`/contact?package=${pkg.engine}`}>
                    {pkg.engine === "essentiel"
                      ? t("ctaEssentiel")
                      : t("ctaPremium")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                {showStartProject && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/15 hover:bg-white/10"
                  >
                    <a href="#contact-form">{tc("startProject")}</a>
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
