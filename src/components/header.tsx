"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./icons";

const nav = [
  { href: "/#menu", label: "Menu" },
  { href: "/#layers", label: "Layers" },
  { href: "/#story", label: "Our story" },
  { href: "/#order", label: "How to order" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Only the home page opens on the dark hero. Starting from the route keeps the server HTML in the right theme.
  const [overHero, setOverHero] = useState(pathname === "/");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // A menu link moves the page, so focus should not jump back to the toggle when it closes the menu.
  const closedByLinkRef = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const hero = document.getElementById("hero");
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 72);
      setHidden(y > 480 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const dark = overHero && !open;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    window.dispatchEvent(new CustomEvent("lenis:stop"));
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    // Everything behind the open menu leaves the tab order and the accessibility tree.
    const background = [...(panel?.parentElement?.children ?? [])].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== panel && !el.inert,
    );
    background.forEach((el) => (el.inert = true));
    const focusFrame = requestAnimationFrame(() => panel?.querySelector<HTMLElement>("nav a")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      background.forEach((el) => (el.inert = false));
      root.style.overflow = "";
      window.dispatchEvent(new CustomEvent("lenis:start"));
      window.removeEventListener("keydown", onKey);
      if (!closedByLinkRef.current) toggle?.focus();
      closedByLinkRef.current = false;
    };
  }, [open]);

  return (
    <>
      <div role="region" aria-label="Ordering" className="relative z-50 bg-ink text-paper">
        <p className="mx-auto max-w-[1440px] px-6 py-2.5 text-center text-[0.68rem] font-normal uppercase tracking-[0.22em] md:px-12">
          Made to order · Pickup in {site.location} or delivery
        </p>
      </div>
      <header
        className={`sticky top-0 z-40 transition-[transform,background-color,border-color,visibility] duration-500 ease-ui ${
          hidden && !open ? "invisible -translate-y-full" : "visible translate-y-0"
        } ${
          dark
            ? "on-dark border-b border-paper/10 bg-ink text-paper"
            : scrolled
              ? "border-b border-line bg-cream/90 backdrop-blur-md"
              : "border-b border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-6 xl:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="eyebrow link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="eyebrow -ml-3 flex h-11 items-center gap-3 px-3 lg:hidden"
          >
            <span aria-hidden className="flex w-6 flex-col gap-[6px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
            Menu
          </button>

          <Link href="/" aria-label={`${site.name}, home`} className="relative justify-self-center">
            <Image
              src="/brand/wordmark-ink.png"
              alt=""
              width={513}
              height={265}
              preload
              className={`h-10 w-auto transition-opacity duration-500 md:h-12 ${dark ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/brand/wordmark-white.png"
              alt=""
              width={513}
              height={265}
              preload
              className={`absolute inset-0 h-10 w-auto transition-opacity duration-500 md:h-12 ${dark ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <div className="flex justify-end">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="eyebrow group inline-flex h-11 items-center gap-2 rounded-full border border-current/70 px-5 transition-colors duration-300 ease-ui hover:border-red hover:bg-red hover:text-paper"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Order</span>
              <span className="sr-only sm:hidden">Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
        inert={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-cream transition-[opacity,visibility] ease-luxe lg:hidden ${
          open ? "visible opacity-100 duration-[700ms,0ms]" : "invisible opacity-0 duration-700"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-6">
          <Image src="/brand/wordmark-ink.png" alt="" width={513} height={265} className="h-10 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="eyebrow h-11 px-3">
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-6">
          <ul className="space-y-3">
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                className={`transition-[opacity,transform] duration-700 ease-luxe ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    closedByLinkRef.current = true;
                    setOpen(false);
                  }}
                  className="font-display text-5xl font-light leading-tight">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-6 py-6 text-sm text-ink-soft">
          <p>{site.location}</p>
          <a href={site.instagram.url} target="_blank" rel="noopener" className="link-draw">
            {site.instagram.handle}
          </a>
        </div>
      </div>
    </>
  );
}
