import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OrderButton } from "@/components/order-button";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chubbs-patisserie.pages.dev"),
  title: { default: `${site.name} · Cakes & tarts in Petaling Jaya`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: "/brand/chubbs-badge.png", apple: "/brand/chubbs-badge.png" },
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/images/black-forest-cake.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f0e7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <OrderButton />
        </MotionProvider>
      </body>
    </html>
  );
}
