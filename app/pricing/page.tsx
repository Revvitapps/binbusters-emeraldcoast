import { brand, faqs } from "@/content/site";
import { Breadcrumbs, CtaBand, FaqList, Pricing } from "@/components/ui";
import { JsonLd, breadcrumbNode, faqNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Trash Can Cleaning Prices",
  description: `Bin cleaning from $20/month, $35 quarterly or $50 one time, 1 bin included, $${brand.extraBinPrice} per extra bin. Fort Walton Beach, Destin, Navarre and nearby.`,
  path: "/pricing",
});

const priceFaqs = faqs.filter((f) => /cost|payment|often|recycling/i.test(f.q));

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Pricing" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Trash can cleaning prices</h1>
          <p className="lede">
            Three plans, no contracts. Every price includes one bin, and extra trash or recycling bins are ${brand.extraBinPrice} each.
          </p>
        </div>
      </section>
      <Pricing />
      <FaqList items={priceFaqs} title="Pricing questions" />
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "Pricing", path: "/pricing" }]), faqNode(priceFaqs, "/pricing")]} />
    </>
  );
}
