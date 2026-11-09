import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, plans, townBySlug, towns } from "@/content/site";
import { BookButton, Breadcrumbs, CallButton, CtaBand, FaqList, Pricing, Steps, TownGrid } from "@/components/ui";
import { JsonLd, breadcrumbNode, faqNode, pageMeta, townServiceNode } from "@/lib/seo";

type Props = { params: Promise<{ town: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = townBySlug((await params).town);
  if (!t) return {};
  return pageMeta({
    title: `Trash Can Cleaning in ${t.name}, FL`,
    description: `Curbside trash can cleaning and sanitizing in ${t.name}, FL from $20/month. Veteran-owned. 200° water, deodorized, no need to be home.`,
    path: `/service-areas/${t.slug}`,
  });
}

function townFaqs(name: string, county: string) {
  return [
    {
      q: `Do you clean trash cans in ${name}?`,
      a: `Yes. ${brand.name} cleans trash and recycling bins at homes and vacation rentals in ${name}, ${county} County, Florida.`,
    },
    {
      q: `How much is bin cleaning in ${name}?`,
      a: `The same as everywhere we serve: $${plans[0].price} a month, $${plans[1].price} every 12 weeks, or $${plans[2].price} for a one-time clean. Each extra bin is $${brand.extraBinPrice}.`,
    },
    {
      q: `When do you come to ${name}?`,
      a: `We schedule your clean for the day after your trash pickup so your bins are empty. Leave them at the curb; you don't need to be home.`,
    },
  ];
}

export default async function TownPage({ params }: Props) {
  const t = townBySlug((await params).town);
  if (!t) notFound();
  const nearby = t.nearby.map(townBySlug).filter(Boolean) as typeof towns;
  const qs = townFaqs(t.name, t.county);
  const path = `/service-areas/${t.slug}`;

  return (
    <>
      <Breadcrumbs items={[{ name: "Service areas", path: "/service-areas" }, { name: t.name }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <p className="eyebrow">{t.county} County, Florida</p>
          <h1>Trash can cleaning in {t.name}, FL</h1>
          <p className="lede">{t.intro}</p>
          <div className="row">
            <BookButton />
            <CallButton />
          </div>
          {nearby.length > 0 && (
            <p className="muted">
              Also serving nearby{" "}
              {nearby.map((n, i) => (
                <span key={n.slug}>
                  <Link href={`/service-areas/${n.slug}`}>{n.name}</Link>
                  {i < nearby.length - 2 ? ", " : i === nearby.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>
      <Steps />
      <Pricing />
      <FaqList items={qs} title={`${t.name} bin cleaning questions`} />
      <TownGrid exclude={t.slug} />
      <CtaBand />
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Service areas", path: "/service-areas" },
            { name: t.name, path },
          ]),
          townServiceNode(t),
          faqNode(qs, path),
        ]}
      />
    </>
  );
}
