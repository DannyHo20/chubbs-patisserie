import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  return (
    <Link href={`/menu/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Image
          src={product.image}
          alt={`${product.name} on a black cake board`}
          fill
          preload={preload}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.03]"
        />
        <Image
          src={product.layersImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-0 transition-opacity duration-500 ease-ui group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[1.75rem] font-normal leading-tight">{product.name}</h3>
          <p className="mt-2 min-h-[2lh] text-base leading-relaxed text-ink-soft">{product.note}</p>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-between border-t border-line pt-4 text-[0.95rem]">
        <span className="tabular-nums text-ink-soft">{product.price ?? "Price on enquiry"}</span>
        <span className="eyebrow text-[0.68rem] text-ink">
          <span className="link-draw">View layers</span>
        </span>
      </p>
    </Link>
  );
}
