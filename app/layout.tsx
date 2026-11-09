import type { Metadata, Viewport } from "next";
import { brand, siteUrl } from "@/content/site";
import { Footer, Header } from "@/components/ui";
import { Analytics } from "@/components/analytics";
import { JsonLd, siteGraph } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Trash Can Cleaning Fort Walton Beach & Destin | ${brand.shortName}`, template: `%s | ${brand.shortName}` },
  description: brand.description,
  applicationName: brand.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#0b6e4f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // GA4 loads on Vercel production only; previews stay silent.
  const gaId = process.env.VERCEL_ENV === "production" ? process.env.NEXT_PUBLIC_GA_ID : undefined;
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd nodes={siteGraph()} />
        <Analytics gaId={gaId} />
      </body>
    </html>
  );
}
