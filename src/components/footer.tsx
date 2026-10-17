import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-24 md:px-12 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <Image src="/brand/wordmark-white.png" alt={site.name} width={513} height={265} className="h-20 w-auto md:h-24" />
          <p className="mt-8 font-display text-2xl font-light italic text-paper/80 md:text-3xl">{site.tagline}</p>
        </div>

        <div className="mt-20 grid border-y border-paper/15 md:grid-cols-3">
          <div className="border-b border-paper/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10">
            <p className="eyebrow text-paper/65">Order</p>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="link-draw mt-4 inline-block font-display text-2xl [font-variant-numeric:lining-nums]">
              {site.whatsapp.display}
            </a>
            <p className="mt-2 text-sm text-paper/60">WhatsApp or Instagram DM</p>
          </div>
          <div className="border-b border-paper/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10">
            <p className="eyebrow text-paper/65">Pickup &amp; delivery</p>
            <p className="mt-4 font-display text-2xl">{site.location}</p>
            <p className="mt-2 text-sm text-paper/60">{site.fulfilment}</p>
          </div>
          <div className="py-8 md:px-8 md:py-10">
            <p className="eyebrow text-paper/65">Follow</p>
            <ul className="mt-4 space-y-1 font-display text-2xl">
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener" className="link-draw">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.linktree} target="_blank" rel="noopener" className="link-draw">
                  Linktree
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs tracking-[0.08em] text-paper/65 md:flex-row">
          <p>
            © {site.legalName} · Est. {site.established}
          </p>
          <Link href="/#menu" className="link-draw">
            Back to the menu
          </Link>
        </div>
      </div>
    </footer>
  );
}
