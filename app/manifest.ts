import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: brand.name,
    short_name: "Bin Busters",
    description: brand.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#111111",
    background_color: "#ffffff",
    categories: ["lifestyle", "utilities"],
    icons: [
      { src: "/pwa/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/pwa/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Book a cleaning", short_name: "Book", url: "/book", icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }] },
      { name: "Prices", url: "/pricing", icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }] },
      { name: "Service areas", short_name: "Areas", url: "/service-areas", icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }] },
      { name: "Contact", url: "/contact", icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
