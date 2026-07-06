"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { services } from "@/config/services";
import { serviceIcons } from "@/lib/service-icons";
import type { Locale } from "@/i18n/routing";

export function ServicesPreview({
  namespace = "Home.servicesPreview",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);
  const locale = useLocale() as Locale;
  const featured = services.filter((s) => s.featured).slice(0, 6);

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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <FadeIn key={service.id} delay={0.05 * i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {service.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description[locale]}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="glass group rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/services">
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
