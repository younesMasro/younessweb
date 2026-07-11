"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HeroConversionCard } from "@/components/sections/HeroConversionCard";

export function HomeHero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />

      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-glow-purple/25 blur-3xl sm:blur-[120px]"
        style={{ "--glow-pulse-min": 0.4, "--glow-pulse-max": 0.7 } as CSSProperties}
      />
      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-glow-cyan/25 blur-3xl sm:blur-[110px]"
        style={{ "--glow-pulse-min": 0.5, "--glow-pulse-max": 0.8, "--glow-pulse-delay": "1s" } as CSSProperties}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <FadeIn>
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80">
              <Sparkles className="size-3.5 text-primary" />
              {t("badge")}
            </div>
          </FadeIn>

          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <TextReveal text={t("titlePrefix")} />{" "}
            <TextReveal
              text={t("titleHighlight")}
              className="text-gradient-brand"
              delay={0.15}
            />{" "}
            <TextReveal text={t("titleSuffix")} delay={0.3} />
          </h1>

          <FadeIn delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg lg:mx-0">
              {t("subheadline")}
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="glow-cyan group h-12 gap-2 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/contact">
                  {t("ctaPrimary")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass h-12 rounded-full border-white/15 px-7 hover:bg-white/10"
              >
                <Link href="/portfolio">{t("ctaSecondary")}</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 lg:mx-0">
              {[
                ["60+", t("statProjects")],
                ["40+", t("statClients")],
                ["24/7", t("statSupport")],
              ].map(([value, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-semibold text-foreground sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto w-full max-w-md lg:mx-0">
          <HeroConversionCard />
        </div>
      </div>
    </section>
  );
}
