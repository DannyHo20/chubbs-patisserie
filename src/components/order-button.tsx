"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./icons";

/** Discreet floating order pill for small screens, shown once the hero is passed. */
export function OrderButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/menu/")) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`eyebrow fixed bottom-5 right-5 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-red px-5 text-paper shadow-[0_10px_30px_-12px_rgb(42_23_20/0.5)] transition-[opacity,transform] duration-500 ease-luxe md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      Order
    </a>
  );
}
