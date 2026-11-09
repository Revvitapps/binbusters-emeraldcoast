import type { Metadata, Viewport } from "next";
import { Lato, Montserrat } from "next/font/google";
import { brand, siteUrl } from "@/content/site";
import { Footer, Header } from "@/components/ui";
import { Analytics } from "@/components/analytics";
import { AskDrawer } from "@/components/ask";
import { TabBar } from "@/components/tab-bar";
import { InstallPrompt, Pwa } from "@/components/pwa";
import { JsonLd, siteGraph } from "@/lib/seo";
import "./globals.css";

// Montserrat (headings) and Lato (body) match the fonts on the original Bin Busters site.
const display = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Trash Can Cleaning Fort Walton Beach & Destin | ${brand.shortName}`, template: `%s | ${brand.shortName}` },
  description: brand.description,
  applicationName: brand.name,
  appleWebApp: { capable: true, title: "Bin Busters", statusBarStyle: "black-translucent" },
  icons: { apple: "/pwa/apple-touch-icon.png" },
  other: { "apple-mobile-web-app-capable": "yes", "mobile-web-app-capable": "yes" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.VERCEL_ENV === "production";
  // GA4 loads on Vercel production only; previews stay silent.
  const gaId = isProd ? process.env.NEXT_PUBLIC_GA_ID : undefined;
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TabBar />
        <AskDrawer />
        <InstallPrompt />
        <Pwa enabled={process.env.NODE_ENV === "production"} />
        <JsonLd nodes={siteGraph()} />
        <Analytics gaId={gaId} />
      </body>
    </html>
  );
}
