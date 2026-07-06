"use client";

import { useTranslations } from "next-intl";
import {
  Compass,
  Layers,
  Palette,
  Rocket,
  Code2,
  BadgeCheck,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const steps = [
  { key: "discover", icon: Compass },
  { key: "plan", icon: Layers },
  { key: "design", icon: Palette },
  { key: "build", icon: Code2 },
  { key: "test", icon: BadgeCheck },
  { key: "launch", icon: Rocket },
] as const;

export function ProcessSection() {
  const t = useTranslations("ServicesPage.process");

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

        <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ key, icon: Icon }, i) => (
            <FadeIn key={key} delay={0.07 * i}>
              <div className="glass relative h-full rounded-2xl p-6">
                <span className="text-4xl font-bold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
