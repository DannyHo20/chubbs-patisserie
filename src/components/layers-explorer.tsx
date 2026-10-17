"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import { ArrowIcon } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function LayersExplorer() {
  const [slug, setSlug] = useState(products[0].slug);
  const reduce = useReducedMotion();
  const product = products.find((p) => p.slug === slug)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink lg:col-span-6">
        {products.map((p) => {
          const active = p.slug === slug;
          return (
            <Image
              key={p.slug}
              src={p.layersImage}
              alt={active ? `Cross-section of the ${p.name} with each layer labelled` : ""}
              aria-hidden={!active}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-1000 ease-luxe ${
                active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          );
        })}
      </div>

      <div className="flex flex-col lg:col-span-6 lg:py-6">
        <p className="eyebrow text-ink-soft">Choose a cake</p>
        <div role="group" aria-label="Choose a cake to see its layers" className="mt-5 flex flex-wrap gap-2">
          {products.map((p) => {
            const active = p.slug === slug;
            return (
              <button
                key={p.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setSlug(p.slug)}
                className={`min-h-11 rounded-full border px-4 text-sm transition-colors duration-300 ease-ui ${
                  active ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
                }`}
              >
                {p.name.replace(/ Cake$/, "")}
              </button>
            );
          })}
        </div>

        <motion.div
          key={product.slug}
          className="mt-12"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.6, ease }}
        >
          <h3 className="font-display text-4xl font-light leading-tight md:text-5xl">{product.name}</h3>
          <p className="mt-3 font-display text-xl italic text-ink-soft">{product.headline}</p>
          <ol className="mt-8 border-t border-line">
            {product.layers.map((layer, i) => (
              <motion.li
                key={layer}
                className="flex items-baseline gap-6 border-b border-line py-3.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 + i * 0.05, ease }}
              >
                <span className="w-6 font-display text-sm tabular-nums text-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] tracking-[0.02em]">{layer}</span>
              </motion.li>
            ))}
          </ol>
          <Link href={`/menu/${product.slug}`} className="eyebrow group mt-8 inline-flex items-center gap-3 text-ink">
            <span className="link-draw">Discover the {product.name}</span>
            <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
