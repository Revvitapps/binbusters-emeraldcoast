import Link from "next/link";
import { brand, plans } from "@/content/site";
import { Breadcrumbs, CtaBand, FaqList, Reviews, VeteranBadge } from "@/components/ui";
import { JsonLd, breadcrumbNode, faqNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Bin Cleaning for Military Families near Eglin & Hurlburt",
  description: `Veteran-owned trash can cleaning for military families near Eglin AFB and Hurlburt Field. Move-out and move-in cleans for PCS, no need to be home. From $${plans[0].price}/month.`,
  path: "/military",
});

const qs = [
  {
    q: "Can you clean our bins before we PCS out?",
    a: `Yes. Book a one-time clean ($${plans[2].price} for 1 bin) for the day after your last trash pickup, so the bins are clean when you hand the house back.`,
  },
  {
    q: "We just moved in and the bins are gross. Can you help?",
    a: "Yes. A one-time deep clean sanitizes and deodorizes them so you start fresh. If you like the result, a monthly plan keeps them that way.",
  },
  {
    q: "Do we need to be home, or can you work around deployments and duty schedules?",
    a: "You never need to be home. Leave the bins at the curb after pickup and we clean them and put them back. Scheduling, reminders and billing are online.",
  },
  {
    q: "Do you clean bins in on-base housing?",
    a: `Call ${brand.phone} and we will tell you whether we can reach your address.`,
  },
];

export default function Military() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Military & PCS" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <VeteranBadge />
          <h1>Bin cleaning for military families</h1>
          <p className="lede">
            {brand.shortName} is owned by {brand.owner.name}, a 20-year U.S. Air Force veteran. We know PCS season, long duty
            days and deployments, so we made bin cleaning something you never have to be home for.
          </p>
          <ul className="checks">
            <li>Move-out and move-in cleans</li>
            <li>No need to be home</li>
            <li>Serving families near Eglin AFB and Hurlburt Field</li>
          </ul>
          <div className="row">
            <Link href="/book?plan=one-time" className="btn" data-event="book_start">
              Book a PCS clean
            </Link>
            <Link href="/book?plan=monthly" className="btn btn-ghost">
              Monthly plan
            </Link>
          </div>
        </div>
      </section>
      <Reviews limit={3} />
      <FaqList items={qs} title="Military family questions" />
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "Military & PCS", path: "/military" }]), faqNode(qs, "/military")]} />
    </>
  );
}
