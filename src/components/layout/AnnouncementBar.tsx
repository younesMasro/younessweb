import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function AnnouncementBar() {
  const t = await getTranslations("AnnouncementBar");

  return (
    <div className="glass relative z-40 h-9 w-full overflow-hidden border-b border-white/10 sm:h-10">
      {/* Mobile: whole bar is one tap target, short copy, no separate CTA
          label — avoids any risk of overflow at 360px. */}
      <Link
        href="/contact"
        className="flex h-full items-center justify-center gap-1.5 px-4 text-xs font-medium text-foreground/90 sm:hidden"
      >
        <span className="truncate">{t("textShort")}</span>
        <ArrowRight className="size-3.5 shrink-0 text-primary" />
      </Link>

      {/* Desktop/tablet: full copy plus a distinct CTA pill. */}
      <div className="mx-auto hidden h-full max-w-6xl items-center justify-center gap-4 px-6 sm:flex">
        <p className="truncate text-sm text-foreground/90">{t("text")}</p>
        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-3.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/25"
        >
          {t("cta")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
