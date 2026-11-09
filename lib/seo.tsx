import type { Metadata } from "next";
import { brand, faqs, plans, siteUrl, towns, type Faq, type Town } from "@/content/site";

export const abs = (path = "/") => `${siteUrl}${path === "/" ? "/" : path}`;

/** Per-page metadata with OG/Twitter written from the page's own values (Next merges metadata shallowly). */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${brand.shortName}`;
  const image = `${siteUrl}/og?title=${encodeURIComponent(title)}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: abs(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: abs(path),
      siteName: brand.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

const ORG = `${siteUrl}/#business`;
const OWNER = `${siteUrl}/#owner`;
const WEBSITE = `${siteUrl}/#website`;

export function siteGraph() {
  return [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": ORG,
      name: brand.name,
      alternateName: brand.shortName,
      description: brand.description,
      url: abs("/"),
      telephone: brand.phoneE164,
      email: brand.email,
      image: `${siteUrl}/og?title=${encodeURIComponent(brand.tagline)}`,
      logo: `${siteUrl}/icon.svg`,
      priceRange: "$20-$50",
      founder: { "@id": OWNER },
      address: { "@type": "PostalAddress", addressRegion: brand.regionCode, addressCountry: brand.country },
      areaServed: towns.map((t) => ({
        "@type": "City",
        name: `${t.name}, FL`,
        containedInPlace: { "@type": "AdministrativeArea", name: `${t.county} County, Florida` },
      })),
      knowsAbout: ["Trash can cleaning", "Garbage bin sanitizing", "Recycling bin cleaning"],
      sameAs: brand.sameAs,
      ...(brand.googleBusinessProfile ? { hasMap: brand.googleBusinessProfile } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Trash can cleaning plans",
        itemListElement: plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          description: `${p.summary} Includes 1 bin; each additional bin $${brand.extraBinPrice}.`,
          price: p.price,
          priceCurrency: "USD",
          url: abs("/pricing"),
          itemOffered: { "@id": `${siteUrl}/#service` },
        })),
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Trash can cleaning",
      serviceType: "Trash can cleaning and sanitizing",
      description:
        "Curbside cleaning of residential trash and recycling bins with pressurized water over 200°F, sanitizer and eco-friendly deodorizer.",
      provider: { "@id": ORG },
      areaServed: towns.map((t) => `${t.name}, FL`),
    },
    {
      "@type": "Person",
      "@id": OWNER,
      name: brand.owner.name,
      jobTitle: brand.owner.jobTitle,
      description: brand.owner.bio,
      worksFor: { "@id": ORG },
      sameAs: ["https://www.instagram.com/jarrettcgordon/"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: abs("/"),
      name: brand.name,
      publisher: { "@id": ORG },
      inLanguage: "en-US",
    },
  ];
}

export function faqNode(list: Faq[] = faqs, path = "/faq") {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function townServiceNode(t: Town) {
  return {
    "@type": "Service",
    "@id": `${abs(`/service-areas/${t.slug}`)}#service`,
    name: `Trash can cleaning in ${t.name}, FL`,
    serviceType: "Trash can cleaning and sanitizing",
    provider: { "@id": ORG },
    areaServed: { "@type": "City", name: `${t.name}, FL` },
    offers: plans.map((p) => ({ "@type": "Offer", name: p.name, price: p.price, priceCurrency: "USD" })),
  };
}

export function JsonLd({ nodes }: { nodes: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
