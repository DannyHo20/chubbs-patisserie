import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[1100px] flex-col items-center justify-center px-6 py-28 text-center">
      <p className="eyebrow text-ink-soft">Page not found</p>
      <h1 className="mt-6 font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
        This slice has <em className="italic">gone missing.</em>
      </h1>
      <p className="mt-6 max-w-md text-[1.05rem] leading-[1.75] text-ink-soft">
        The page you were looking for isn’t here. The cakes and tarts are all on the menu.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <Link
          href="/#menu"
          className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-paper transition-colors duration-200 ease-ui hover:bg-red"
        >
          See the menu
          <ArrowIcon className="h-4 w-4" />
        </Link>
        <a href={whatsappLink()} target="_blank" rel="noopener" className="eyebrow group inline-flex items-center gap-3 text-ink">
          <WhatsAppIcon className="h-4 w-4" />
          <span className="link-draw">Ask us on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
