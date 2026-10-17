import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { getProduct, orderMessage, products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

export async function ProductDetails({ params }: Pick<PageProps<"/menu/[slug]">, "params">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const images = [
    { src: product.image, alt: `${product.name}, whole, on a black cake board` },
    { src: product.layersImage, alt: `Cross-section of the ${product.name} with each layer labelled` },
    ...product.gallery.map((src) => ({ src, alt: `${product.name}, close up` })),
  ];
  const orderHref = whatsappLink(orderMessage(product));

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-8 md:px-12">
        <nav aria-label="Breadcrumb" className="eyebrow text-[0.64rem] text-ink-soft">
          <Link href="/#menu" className="link-draw">
            Menu
          </Link>
          <span className="mx-3" aria-hidden>
            /
          </span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <article className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 pt-8 md:px-12 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <div
          role="group"
          aria-label={`${product.name} photos`}
          className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 [scrollbar-width:none] lg:col-span-7 lg:mx-0 lg:block lg:space-y-3 lg:overflow-visible lg:px-0"
        >
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i === 0 ? 0 : 0.05} y={i === 0 ? 0 : 24} className="w-[85%] shrink-0 snap-center lg:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={12}>
              <p className="eyebrow text-ink-soft">{product.category}</p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.01em]">
                {product.name}
              </h1>
              <p className="mt-4 font-display text-2xl italic leading-snug text-ink-soft">{product.headline}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 border-y border-line py-5">
              <p className="flex items-baseline justify-between">
                <span className="eyebrow text-ink-soft">Price</span>
                <span className="font-display text-2xl tabular-nums">{product.price ?? "On enquiry"}</span>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 text-[1.05rem] leading-[1.85] text-ink-soft">{product.description}</p>
              <a
                id="order-primary"
                href={orderHref}
                target="_blank"
                rel="noopener"
                className="eyebrow mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-red text-paper transition-colors duration-300 ease-ui hover:bg-red-deep"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs tracking-[0.04em] text-ink-soft">
                Opens WhatsApp with the {product.name} filled in. We’ll confirm size, price and timing with you.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-12">
              <h2 className="eyebrow text-ink-soft">The layers, top to bottom</h2>
              <ol className="mt-4 border-t border-line">
                {product.layers.map((layer, i) => (
                  <li key={layer} className="flex items-baseline gap-6 border-b border-line py-3">
                    <span className="w-6 font-display text-base font-medium tabular-nums text-red">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] tracking-[0.02em]">{layer}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.25} className="mt-10 divide-y divide-line border-y border-line">
              <details className="group py-4">
                <summary className="eyebrow flex min-h-11 cursor-pointer list-none items-center justify-between">
                  Pickup &amp; delivery
                  <span aria-hidden className="text-lg transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-2 pt-2 leading-relaxed text-ink-soft">
                  Pickup from {site.location}, or delivery. We’re online-based, so all orders are arranged over WhatsApp
                  or Instagram DM.
                </p>
              </details>
              <details className="group py-4">
                <summary className="eyebrow flex min-h-11 cursor-pointer list-none items-center justify-between">
                  Allergens &amp; questions
                  <span aria-hidden className="text-lg transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-2 pt-2 leading-relaxed text-ink-soft">
                  Ask us about ingredients, allergens or sizes before ordering on{" "}
                  <a href={orderHref} target="_blank" rel="noopener" className="link-draw text-ink">
                    WhatsApp
                  </a>
                  .
                </p>
              </details>
            </Reveal>

            <Link href={`/menu/${next.slug}`} className="group mt-10 flex items-center justify-between gap-4 py-2">
              <span>
                <span className="eyebrow block text-ink-soft">Next</span>
                <span className="font-display text-2xl">{next.name}</span>
              </span>
              <ArrowIcon className="h-5 w-5 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
          <h2 className="font-display text-4xl font-light md:text-5xl">
            You may also <em className="italic">love</em>
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {others.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <StickyOrderBar name={product.name} price={product.price} href={orderHref} />
    </>
  );
}
