"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Layers, MousePointerClick, Rocket } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HeroConversionCard() {
  const t = useTranslations("Home.conversionCard");

  return (
    <FadeIn delay={0.3} direction="left" className="w-full">
      <div className="glow-border glass relative overflow-hidden rounded-3xl p-6 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl"
        />

        <h2 className="text-lg font-semibold sm:text-xl">{t("title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>

        {/* Mini project-starter visual — decorative only */}
        <div className="glass mt-6 rounded-2xl border border-white/10 p-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-destructive/60" />
            <span className="size-2 rounded-full bg-primary/60" />
            <span className="size-2 rounded-full bg-secondary/60" />
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-primary/40 to-transparent" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <MousePointerClick className="size-3.5 text-primary" />
            <Layers className="size-3.5 text-secondary" />
            <Rocket className="size-3.5 text-primary" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            asChild
            className="glow-cyan h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/contact" className="group">
              {t("ctaStart")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/services">{t("ctaServices")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/portfolio">{t("ctaPortfolio")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
