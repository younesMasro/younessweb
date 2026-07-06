"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PricingCards } from "@/components/sections/PricingCards";

export function PricingPreview({
  namespace = "Home.pricingPreview",
  showStartProject = false,
  featureLimit,
}: {
  namespace?: string;
  showStartProject?: boolean;
  /** Cap the visible feature list. Omit to show every feature (recommended on the homepage). */
  featureLimit?: number;
}) {
  const t = useTranslations(namespace);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("badge")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        <PricingCards featureLimit={featureLimit} showStartProject={showStartProject} />

        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="glass group rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/pricing">
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
