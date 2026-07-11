"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type BarState = "idle" | "loading" | "done";

const SAFETY_TIMEOUT = 4000;
// Next.js can resolve a prefetched route's pathname within the same tick
// as the click. Without a floor, "loading" could be swapped for "done"
// before a single frame paints, making the bar invisible for exactly the
// fast, common case it exists to give feedback on.
const MIN_VISIBLE = 350;
const RESET_DELAY = 300;

/**
 * Slim top progress bar for route transitions. Static pages navigate near-
 * instantly, but with no feedback at all users tap links repeatedly
 * thinking nothing happened — this gives an immediate visual response on
 * tap, then resolves (or self-heals via the safety timeout) once the new
 * page's pathname/search params land.
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const [state, setState] = useState<BarState>("idle");
  const routeKeyRef = useRef(routeKey);
  const loadingStartRef = useRef(0);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const isSamePage =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (isSamePage) return;

      if (doneTimer.current) clearTimeout(doneTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      loadingStartRef.current = performance.now();
      setState("loading");
      safetyTimer.current = setTimeout(() => setState("idle"), SAFETY_TIMEOUT);
    }

    // Capture phase: must run before Next.js's <Link> handler, which calls
    // preventDefault() to do client-side routing. A bubble-phase listener
    // on document fires after that (Link's handler is attached closer to
    // the root), so it would never see the click for any real internal
    // navigation — only for links nothing else already intercepted.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // The new route landing means the transition finished — but hold
  // "loading" for a minimum visible time first (see MIN_VISIBLE above).
  useEffect(() => {
    if (routeKeyRef.current === routeKey) return;
    routeKeyRef.current = routeKey;
    if (state !== "loading") return;

    const elapsed = performance.now() - loadingStartRef.current;
    const wait = Math.max(0, MIN_VISIBLE - elapsed);
    const timer = setTimeout(() => setState("done"), wait);
    doneTimer.current = timer;
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `state` read intentionally without re-running per its own change
  }, [routeKey]);

  useEffect(() => {
    if (state !== "done") return;
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    const timer = setTimeout(() => setState("idle"), RESET_DELAY);
    resetTimer.current = timer;
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
    >
      <div
        className={cn(
          "route-progress-bar h-full",
          state === "loading" &&
            "w-[85%] opacity-100 transition-[width,opacity] duration-[1500ms] ease-out",
          state === "done" &&
            "w-full opacity-0 transition-[width,opacity] duration-300 ease-out",
          state === "idle" && "w-0 opacity-0",
        )}
      />
    </div>
  );
}
