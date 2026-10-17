"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Hides an element only if it starts below the fold, then reveals it when it scrolls into view.
 * The server HTML is always visible, so content never waits on JavaScript and nothing on screen
 * disappears at hydration. The `.reveal*` styles in globals.css drive the transition.
 */
function useReveal<T extends HTMLElement>(amount: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);
  return ref;
}

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
  const ref = useReveal<HTMLDivElement>(0.15);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Image container revealed with a rising clip and a gentle settle in scale. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  // The observer sits on an unclipped wrapper: IntersectionObserver ignores a fully clipped target.
  const ref = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`reveal-image relative ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      <div className="reveal-clip absolute inset-0 overflow-hidden">
        <div className="reveal-zoom relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}

/**
 * Splits a headline into lines that rise from behind a mask on page load. Pass each line as an array item.
 * A CSS animation runs as soon as the stylesheet loads, so the headline never waits on JavaScript.
 */
export function MaskedLines({ lines, className, delay = 0.15 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span className="rise-in block" style={{ animationDelay: `${delay + i * 0.09}s` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
