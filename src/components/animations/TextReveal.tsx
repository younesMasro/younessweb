"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  wordDelay = 0.06,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            data-motion-reveal
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{
              duration: 0.6,
              delay: delay + i * wordDelay,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
          </motion.span>
        </span>
      )).reduce<ReactNode[]>(
        (acc, node, i) => (i === 0 ? [node] : [...acc, " ", node]),
        [],
      )}
    </motion.span>
  );
}
