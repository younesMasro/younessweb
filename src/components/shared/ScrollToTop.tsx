"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Forces every route change to land at the top of the new page. Without
 * this, a fixed-position header/scroll library combination can leave the
 * viewport at whatever scroll offset the previous page was at. Hash links
 * (e.g. "#contact-form") are left alone — the browser's native anchor
 * scrolling handles those.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, searchParams]);

  return null;
}
