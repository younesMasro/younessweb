"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  featuredProjectIds,
  portfolioCategories,
  portfolioProjects,
} from "@/config/portfolio";
import type { Locale } from "@/i18n/routing";

export function PortfolioPreview({
  namespace = "Home.portfolioPreview",
  limit = 6,
  showStartProject = false,
}: {
  namespace?: string;
  limit?: number;
  showStartProject?: boolean;
}) {
  const t = useTranslations(namespace);
  const tc = useTranslations("ContactPage");
  const locale = useLocale() as Locale;
  const featured = featuredProjectIds
    .slice(0, limit)
    .map((id) => portfolioProjects.find((p) => p.id === id))
    .filter((p): p is (typeof portfolioProjects)[number] => !!p);

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={0.08 * i}>
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-card/60 transition-all duration-300 hover:border-primary/30"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                </div>
                <div className="p-5">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {project.categories
                      .map(
                        (c) =>
                          portfolioCategories.find((pc) => pc.key === c)
                            ?.label[locale] ?? c,
                      )
                      .join(", ")}
                  </Badge>
                  <h3 className="mt-3 flex items-center gap-1.5 text-base font-semibold">
                    {project.title}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description[locale]}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {showStartProject && (
              <Button
                asChild
                className="glow-cyan h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="#contact-form">{tc("startProject")}</a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="glass group rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/portfolio">
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
