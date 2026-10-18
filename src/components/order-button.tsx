"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./icons";

/**
 * Discreet floating order pill for small screens. It stays out of the way while the hero, the ordering
 * section or the footer is on screen, since each of those already offers a WhatsApp link.
 */
export function OrderButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("hero"), document.getElementById("order"), document.querySelector("footer")].filter(
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
  }, [pathname]);

  // Product pages have their own order bar.
  const shown = visible && !pathname.startsWith("/menu/");

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`eyebrow fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-30 inline-flex h-11 items-center gap-2 rounded-full bg-red px-5 text-paper transition-[opacity,transform] duration-500 ease-luxe md:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      Order
      <span className="sr-only"> on WhatsApp</span>
    </a>
  );
}
