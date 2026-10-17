import type { Metadata } from "next";
import { Suspense } from "react";
import { getProduct, products } from "@/data/products";
import { ProductDetails } from "./product-details";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.headline} ${product.description}`,
    openGraph: { images: [product.image] },
  };
}

export default function ProductPage({ params }: PageProps<"/menu/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 pt-16 md:px-12 lg:grid-cols-12 lg:gap-16">
      <div className="aspect-[4/5] bg-stone/70 lg:col-span-7" />
      <div className="space-y-6 lg:col-span-5">
        <div className="h-3 w-16 bg-stone" />
        <div className="h-14 w-4/5 bg-stone" />
        <div className="h-6 w-3/5 bg-stone/70" />
      </div>
    </div>
  );
}
