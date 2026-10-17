import Image from "next/image";
import Link from "next/link";
import { ImageReveal, MaskedLines, Reveal } from "@/components/reveal";
import { MenuGrid } from "@/components/menu-grid";
import { LayersExplorer } from "@/components/layers-explorer";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

const steps = [
  { title: "Choose your cake", body: "Browse the menu and look inside each cake, layer by layer." },
  { title: "Message us on WhatsApp", body: "Tap any order button. The name of your cake is filled in for you." },
  { title: "Confirm the details", body: "We confirm availability, size and timing with you directly." },
  { title: "Pickup or delivery", body: `Collect from ${site.location}, or have it delivered to you.` },
];

const gallery = [
  { src: "/images/matcha-cover.jpg", alt: "Matcha Jasmine Grape Cake topped with glazed green grapes" },
  { src: "/images/lab-2.jpg", alt: "The Chubbs kitchen under construction, with illustrated bakers" },
  { src: "/images/black-forest-tart-overhead.jpg", alt: "Black Forest Tart seen from above" },
  { src: "/images/black-forest-cake-cover.jpg", alt: "Black Forest Cake crowned with cherries and a chocolate lattice" },
  { src: "/images/lab-4.jpg", alt: "The finished Chubbs kitchen with an illustration of a baker carrying a cake" },
  { src: "/images/tiramisu-tart.jpg", alt: "Tiramisu Tart with piped mascarpone ganache" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="on-dark bg-ink text-paper">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-14 pt-12 md:px-12 lg:min-h-[calc(100dvh-106px)] lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-10">
          <div className="flex flex-col justify-between lg:col-span-6 lg:py-4">
            <p className="eyebrow text-paper/70">
              {site.name} · Petaling Jaya
            </p>

            <div className="mt-10 lg:mt-0">
              <h1 className="font-display text-[clamp(4rem,9.5vw,9.5rem)] font-light leading-[0.9] tracking-[-0.03em]">
                <MaskedLines lines={["Layer", <em key="l" className="italic">by layer.</em>]} delay={0.05} />
              </h1>
              <p className="mt-8 max-w-[26rem] text-[1.05rem] leading-[1.75] text-paper/75">
                Chiffon, pudding, pastry cream and whipped ganache, stacked into cakes and tarts made to order in our
                little pastry lab.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener"
                  className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-paper px-7 text-ink transition-colors duration-200 ease-ui hover:bg-cream"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Order on WhatsApp
                </a>
                <Link href="#menu" className="eyebrow group inline-flex items-center gap-3 text-paper">
                  <span className="link-draw">Explore the cakes</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-5 border-t border-paper/15 pt-5 lg:mt-14 lg:gap-8">
              <Image
                src="/brand/chubbs-badge.png"
                alt=""
                width={512}
                height={512}
                sizes="(min-width: 1024px) 88px, 72px"
                className="h-18 w-18 shrink-0 lg:h-22 lg:w-22"
              />
              <dl className="grid min-w-0 flex-1 grid-cols-3 gap-2 text-sm">
                {[
                  ["Made", "To order"],
                  ["Collect", site.location.replace(", Petaling Jaya", "")],
                  ["Or", "Delivered"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-[0.62rem] text-paper/55">{k}</dt>
                    <dd className="mt-1.5 font-display text-base sm:text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <figure className="lg:col-span-6 lg:flex lg:flex-col lg:items-end lg:justify-center">
            <Link
              href="/menu/black-forest-cake"
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink-soft/30 lg:h-[min(calc(100dvh-200px),780px)] lg:w-auto"
            >
              <Image
                src="/images/black-forest-cake.jpg"
                alt="Black Forest Cake with glazed cherries, cream and a chocolate lattice, on a black board"
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-opacity duration-700 ease-ui"
              />
              <Image
                src="/images/black-forest-cake-layers.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-0 transition-opacity duration-700 ease-ui group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="sr-only">See the Black Forest Cake</span>
            </Link>
            <figcaption className="mt-4 flex w-full items-baseline justify-between gap-4 text-sm text-paper/70 lg:max-w-[min(calc((100dvh-200px)*0.8),624px)]">
              <span>
                <span className="font-display text-lg italic text-paper">Black Forest Cake</span>
                <span className="ml-3 hidden sm:inline">Seven layers, chocolate &amp; cherry</span>
              </span>
              <span className="eyebrow hidden text-[0.62rem] text-paper/55 lg:inline">Hover to look inside</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-[1100px] px-6 py-28 text-center md:py-40">
        <Reveal>
          <div className="dotted-rule mx-auto w-40 text-red" aria-hidden />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-12 font-display text-[clamp(1.75rem,3.4vw,2.9rem)] font-light leading-[1.3]">
            A small pastry lab for those who believe life is a little sweeter with dessert. Indulgent, beautifully
            crafted, <em className="italic text-red">and made to make you smile.</em>
          </p>
        </Reveal>
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-24 border-t border-line bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow text-ink-soft">The menu</p>
              <h2 className="mt-4 font-display text-5xl font-light leading-none tracking-[-0.01em] md:text-6xl">
                Cakes &amp; tarts
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm text-ink-soft">
              <p>
                {products.length} pastries, each made to order. Hover or tap a cake to see inside it.
              </p>
            </Reveal>
          </div>
          <MenuGrid />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-line bg-cream py-6" aria-hidden>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <p key={k} className="flex shrink-0 items-center font-display text-3xl font-light italic md:text-4xl">
              {products.map((p) => (
                <span key={p.slug} className="flex items-center">
                  <span className="px-8">{p.name}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Layers */}
      <section id="layers" className="scroll-mt-24 bg-stone">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <Reveal className="mb-16 max-w-2xl">
            <p className="eyebrow text-ink-soft">Anatomy of a Chubbs</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-[-0.01em] md:text-6xl">
              Every cake, <em className="italic">layer by layer.</em>
            </h2>
          </Reveal>
          <LayersExplorer />
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-24 bg-cream">
        <div className="checker h-4 w-full opacity-90" aria-hidden />
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 md:px-12 md:py-36 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <ImageReveal className="aspect-[4/5] bg-stone">
              <Image
                src="/images/lab-1.jpg"
                alt="Black-and-white photo of the Chubbs kitchen with an illustrated baker carrying a cake, captioned Coming Soon"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal delay={0.3} className="absolute -bottom-10 -right-2 w-[44%] md:-right-8">
              <div className="border-[6px] border-cream">
                <Image
                  src="/images/brand-card.jpg"
                  alt="Chubb’s brand card with a red and white checkerboard"
                  width={1200}
                  height={1600}
                  sizes="(min-width: 1024px) 20vw, 44vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-ink-soft">Our story</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-8 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.1]">
                It all started with a simple question: <em className="italic">“Am I fat?”</em>
                <span className="mt-4 block">
                  The answer? <em className="italic text-red">“A little chubby.”</em>
                </span>
              </blockquote>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 space-y-5 text-[1.05rem] leading-[1.85] text-ink-soft">
              <p>
                Somehow, that little moment became the inspiration behind Chubb’s, a pastry lab created for those who
                believe life is a little sweeter with dessert.
              </p>
              <p>
                We love creating pastries that are indulgent, beautifully crafted and made to make you smile. From our
                kitchen to your table, every Chubbs is made with care, a little personality, and lots of love.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <div className="dotted-rule w-32 text-red" aria-hidden />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kind words */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1000px] px-6 py-28 text-center md:py-36">
          <Reveal>
            <p className="eyebrow text-paper/65">Kind words</p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-10 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-light italic leading-[1.25]">
              “It’s sooo soft and pillowy, it literally melts in my mouth. Definitely suitable for everyone, because it’s
              not too sweet.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow mt-10 text-paper/60">A customer, shared on our Instagram</p>
          </Reveal>
        </div>
      </section>

      {/* How to order */}
      <section id="order" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-ink-soft">How to order</p>
              <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-[-0.01em] md:text-6xl">
                Made to order, <em className="italic">just for you.</em>
              </h2>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="eyebrow mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-red px-7 text-paper transition-colors duration-300 ease-ui hover:bg-red-deep"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message {site.whatsapp.display}
              </a>
            </Reveal>
            <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-line py-8 md:grid-cols-[6rem_1fr]">
                  <span className="font-display text-4xl font-light italic text-red md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-28">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-ink-soft">From the lab</p>
              <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">{site.instagram.handle}</h2>
            </div>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="eyebrow group inline-flex items-center gap-3">
              <span className="link-draw">Follow on Instagram</span>
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
            </a>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {gallery.map((g, i) => (
              <Reveal as="li" key={g.src} delay={i * 0.06}>
                <a href={site.instagram.url} target="_blank" rel="noopener" className="group relative block aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
