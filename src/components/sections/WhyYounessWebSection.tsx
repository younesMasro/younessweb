"use client";

import { useTranslations } from "next-intl";
import {
  Gauge,
  Headset,
  MessageCircle,
  Palette,
  Search,
  Smartphone,
  Target,
  Video,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const points = [
  { key: "clearCommunication", icon: MessageCircle },
  { key: "modernDirection", icon: Palette },
  { key: "conversionFocused", icon: Target },
  { key: "mobileFirst", icon: Smartphone },
  { key: "seoReady", icon: Search },
  { key: "fastSecure", icon: Gauge },
  { key: "supportAfterLaunch", icon: Headset },
  { key: "tutorialVideos", icon: Video },
] as const;

export function WhyYounessWebSection({
  namespace = "WhyYounessWeb",
  showCta = false,
}: {
  namespace?: string;
  showCta?: boolean;
}) {
  const t = useTranslations(namespace);
  const tc = useTranslations("ContactPage");

  return (
    <section className="relative py-20 sm:py-28">
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ key, icon: Icon }, i) => (
            <FadeIn key={key} delay={0.05 * i}>
              <div className="glass flex h-full items-center gap-3 rounded-2xl p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <Icon className="size-4.5" />
                </div>
                <p className="text-sm font-medium text-foreground/90">
                  {t(`points.${key}`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {showCta && (
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="glow-cyan h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="#contact-form">{tc("startProject")}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 hover:bg-white/10"
              >
                <Link href="/services">{tc("why.ctaServices")}</Link>
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
