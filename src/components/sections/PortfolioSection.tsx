"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { portfolioCategories, portfolioProjects } from "@/config/portfolio";
import type { Locale, PortfolioCategory } from "@/types";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const t = useTranslations("PortfolioPage");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<PortfolioCategory | null>(null);

  const projects = useMemo(
    () =>
      filter
        ? portfolioProjects.filter((p) => p.categories.includes(filter))
        : portfolioProjects,
    [filter],
  );

  const categoryLabel = (categories: PortfolioCategory[]) =>
    categories
      .map((c) => portfolioCategories.find((pc) => pc.key === c)?.label[locale] ?? c)
      .join(", ");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("hero.badge")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("hero.title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter(null)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                filter === null
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-white/10 text-muted-foreground hover:text-foreground",
              )}
            >
              {t("filters.all")}
            </button>
            {portfolioCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  filter === key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/10 text-muted-foreground hover:text-foreground",
                )}
              >
                {label[locale]}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={0.06 * i}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 transition-all duration-300 hover:border-primary/30">
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
                <div className="flex flex-1 flex-col p-6">
                  <Badge
                    variant="outline"
                    className="w-fit border-primary/30 text-primary"
                  >
                    {categoryLabel(project.categories)}
                  </Badge>
                  <h3 className="mt-3 text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {project.url && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="group/btn rounded-full border-white/15 hover:bg-white/10"
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {t("viewProject")}
                          <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      size="sm"
                      className="glow-cyan rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href="/contact">{t("requestSimilar")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
