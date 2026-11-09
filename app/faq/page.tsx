import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui";
import { JsonLd, breadcrumbNode, faqNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Trash Can Cleaning FAQ",
  description: "Answers on bin cleaning cost, how often to clean, whether you need to be home, and which Emerald Coast towns Bin Busters serves.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "FAQ" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Frequently asked questions</h1>
          <p className="lede">Straight answers about our trash can cleaning service.</p>
        </div>
      </section>
      <FaqList title="All questions" />
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "FAQ", path: "/faq" }]), faqNode()]} />
    </>
  );
}
