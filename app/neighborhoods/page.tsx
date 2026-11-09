import Link from "next/link";
import { plans } from "@/content/site";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui";
import { SegmentForm } from "@/components/segment-form";
import { JsonLd, breadcrumbNode, faqNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Neighborhood & HOA Bin Cleaning",
  description:
    "Get your street or HOA on one bin-cleaning day. Each home books its own plan from $20/month and we clean the whole neighborhood the day after pickup.",
  path: "/neighborhoods",
});

const qs = [
  {
    q: "How does a neighborhood sign-up work?",
    a: "Each household books its own plan and pays for its own bins. We put the whole street on one route and clean everyone's bins the day after trash pickup.",
  },
  {
    q: "Can an HOA share this with residents?",
    a: "Yes. Share this page or our booking link in your newsletter or community group. Board members can call us to set it up.",
  },
];

export default function Neighborhoods() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Neighborhoods & HOAs" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <p className="eyebrow">For neighbors, HOAs and community groups</p>
          <h1>One clean-bin day for your whole street</h1>
          <p className="lede">
            When neighbors sign up together, everyone's bins get cleaned on the same day, right after pickup. Plans start at $
            {plans[0].price} a month per home.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Bring your neighborhood</h2>
            <p>Tell us the neighborhood and roughly how many homes are interested. We'll call you to set up the route.</p>
            <p>
              Ready for your own home now? <Link href="/book">Book online</Link>.
            </p>
          </div>
          <SegmentForm source="neighborhood" countLabel="Homes interested (roughly)" cta="Get my street on the route" />
        </div>
      </section>
      <FaqList items={qs} title="Neighborhood questions" />
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "Neighborhoods & HOAs", path: "/neighborhoods" }]), faqNode(qs, "/neighborhoods")]} />
    </>
  );
}
