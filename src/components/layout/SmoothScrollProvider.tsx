"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Deliberately not <ReactLenis>: that component renders a context wrapper
// around `children`, so toggling it on/off by device would swap the
// element type at this position in the tree and force React to unmount
// and remount the entire app (Header, page content, Footer) on the first
// render after hydration determines the device is mobile. Managing the
// Lenis instance imperatively in an effect keeps `children` untouched —
// mobile simply never constructs a Lenis instance (no wheel/touch
// listeners, no rAF loop), i.e. plain native scrolling.
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, [isMobile]);

  return <>{children}</>;
}
