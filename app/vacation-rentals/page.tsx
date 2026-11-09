import Link from "next/link";
import { brand, plans } from "@/content/site";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui";
import { SegmentForm } from "@/components/segment-form";
import { JsonLd, breadcrumbNode, faqNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vacation Rental Bin Cleaning in Destin & Nearby",
  description:
    "Clean, odor-free bins for vacation rentals in Destin, Miramar Beach, Sandestin, Fort Walton Beach and Navarre. Curbside, no need to be there. From $20/month.",
  path: "/vacation-rentals",
});

const qs = [
  {
    q: "Do I need to be at the rental?",
    a: "No. Bins just need to be empty and at the curb. We clean them and put them back.",
  },
  {
    q: "How much is it for a rental?",
    a: `Same prices as any home: $${plans[0].price} a month, $${plans[1].price} every 12 weeks, or $${plans[2].price} one time, with $${brand.extraBinPrice} per extra bin.`,
  },
  {
    q: "I manage several properties. Can you handle all of them?",
    a: "Yes. Send us the list and we will set up each address on our routes. Call or use the form on this page.",
  },
];

export default function Rentals() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Vacation rentals" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <p className="eyebrow">For owners and property managers</p>
          <h1>Bins guests never complain about</h1>
          <p className="lede">
            Full rental bins sit in the Gulf Coast heat between pickups. We wash, sanitize and deodorize them at the curb so the
            first thing guests smell is the beach, not the trash.
          </p>
          <ul className="checks">
            <li>No need to be on site</li>
            <li>Monthly plans from ${plans[0].price}</li>
            <li>Same prices as any home</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Get your properties on our route</h2>
            <p>Tell us how many rentals you have and where. Jarrett will call you back with a schedule.</p>
            <p>
              Just one home? <Link href="/book?plan=monthly">Book it online</Link> in a minute.
            </p>
          </div>
          <SegmentForm source="rental" countLabel="Number of properties" cta="Request a rental schedule" />
        </div>
      </section>
      <FaqList items={qs} title="Rental owner questions" />
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "Vacation rentals", path: "/vacation-rentals" }]), faqNode(qs, "/vacation-rentals")]} />
    </>
  );
}
