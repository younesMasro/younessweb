"use client";

import { useTranslations } from "next-intl";
import { Bell, CreditCard, LayoutDashboard, Truck, Video } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const capabilities = [
  { key: "delivery", icon: Truck },
  { key: "notifications", icon: Bell },
  { key: "payments", icon: CreditCard },
  { key: "management", icon: LayoutDashboard },
  { key: "training", icon: Video },
] as const;

export function CapabilitiesSection({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const t = useTranslations("Capabilities");

  if (variant === "compact") {
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
              <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl">
                {t("title")}
              </h2>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map(({ key, icon: Icon }, i) => (
              <FadeIn key={key} delay={0.05 * i}>
                <div className="glass flex h-full items-start gap-3 rounded-2xl p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <p className="text-sm font-medium text-foreground/90">
                    {t(`items.${key}.title`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ key, icon: Icon }, i) => (
            <FadeIn key={key} delay={0.06 * i}>
              <div className="group relative flex h-full items-start gap-3.5 overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
