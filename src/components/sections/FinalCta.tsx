"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function FinalCta() {
  const t = useTranslations("Home.finalCta");

  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-r from-glow-cyan/25 to-glow-purple/25 blur-[120px]"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button
            asChild
            size="lg"
            className="glow-cyan group mt-9 h-12 gap-2 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/contact">
              {t("cta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
