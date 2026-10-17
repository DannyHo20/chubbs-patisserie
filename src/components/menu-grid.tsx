"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products, type Category } from "@/data/products";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

const filters: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Cakes", value: "Cake" },
  { label: "Tarts", value: "Tart" },
];

export function MenuGrid() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = products.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter the menu" className="flex gap-6 border-b border-line">
        {filters.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={`eyebrow relative -mb-px h-12 transition-colors duration-300 ${active ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {f.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-500 ease-luxe ${active ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {shown.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 4) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
          <Reveal as="li">
            <Link href="#story" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-red">
                <Image
                  src="/images/brand-card.jpg"
                  alt="Chubb’s brand card reading Where Sweet Meets Chubby"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-5 font-display text-2xl italic leading-tight">Where sweet meets chubby</p>
              <p className="mt-3 border-t border-line pt-3 text-sm">
                <span className="eyebrow text-[0.64rem] text-red">
                  <span className="link-draw">Read our story</span>
                </span>
              </p>
            </Link>
          </Reveal>
      </ul>
    </>
  );
}
