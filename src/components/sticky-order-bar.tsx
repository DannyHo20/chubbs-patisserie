"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";

/** Mobile order bar shown whenever the main order button is off screen, and tucked away over the footer. */
export function StickyOrderBar({ name, price, href }: { name: string; price?: string; href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("order-primary"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md transition-transform duration-500 ease-luxe lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-display text-lg leading-tight">{name}</p>
          <p className="text-xs text-ink-soft">{price ?? "Price on enquiry"}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener"
          tabIndex={visible ? 0 : -1}
          className="eyebrow inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-red px-5 text-paper"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Order
        </a>
      </div>
    </div>
  );
}
