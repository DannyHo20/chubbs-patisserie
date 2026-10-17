"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children once, as they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "h2" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Image container revealed with a rising clip and a gentle settle in scale. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  // The observer sits on an unclipped wrapper: IntersectionObserver ignores a fully clipped target.
  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{ hidden: { clipPath: "inset(100% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }}
        transition={{ duration: reduce ? 0 : 1.3, delay, ease }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{ hidden: { scale: 1.08 }, shown: { scale: 1 } }}
          transition={{ duration: reduce ? 0 : 1.6, delay, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Splits a headline into lines that rise from behind a mask. Pass each line as an array item. */
export function MaskedLines({ lines, className, delay = 0.15 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0.2 : 1.1, delay: reduce ? 0 : delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
