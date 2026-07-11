"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const distance = 28;

function getVariants(direction: FadeInProps["direction"]): Variants {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction ?? "up"];

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

// Callers stagger delay by list index (e.g. `delay={0.06 * i}`). On long
// lists (dozens of portfolio cards, reviews, etc.) that grows unbounded, so
// a fast scroll can reach an item before its delay elapses — it then sits
// at opacity 0 until the timer catches up, which reads as missing/black
// content. Capping the delay keeps the stagger feel without that risk.
const MAX_DELAY = 0.4;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      data-motion-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0, margin: "200px 0px 200px 0px" }}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay: Math.min(delay, MAX_DELAY),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
