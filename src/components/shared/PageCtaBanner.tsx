"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function PageCtaBanner({
  namespace,
  anchorHref,
}: {
  namespace: string;
  /** Plain anchor href (e.g. "#contact-form") instead of a page Link */
  anchorHref?: string;
}) {
  const t = useTranslations(namespace);

  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-64 w-64 -translate-y-1/2 rounded-full bg-gradient-to-r from-glow-cyan/20 to-glow-purple/20 blur-[110px]"
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button
            asChild
            size="lg"
            className="glow-cyan group mt-8 h-12 gap-2 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            {anchorHref ? (
              <a href={anchorHref}>
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <Link href="/contact">
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
