import { brand } from "@/content/site";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us: Veteran-Owned Bin Cleaning",
  description: `${brand.name} is a family-owned trash can cleaning business started by ${brand.owner.name}, a 20-year U.S. Air Force veteran.`,
  path: "/about",
});

export default function About() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Veteran-owned, family-run</h1>
          <p className="lede">
            {brand.name} is owned and operated by {brand.owner.name}, a 20-year U.S. Air Force veteran.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow prose">
          <h2>Why we started</h2>
          <p>
            Living on the Emerald Coast, Jarrett got tired of dealing with filthy, smelly trash cans created by our hot, humid
            weather, and he knew others felt the same. After two decades in the Air Force, he started this family-owned business
            to make clean, fresh-smelling trash cans easy and affordable for everyone.
          </p>
          <h2>How we work</h2>
          <p>
            We use a custom trailer that washes each bin with pressurized water over 200°F, then deodorize it with an
            eco-friendly product. We show up the day after trash pickup, so you never have to be home.
          </p>
          <p>
            Sign-up, scheduling, reminders and billing are all handled online, and you can always reach us at{" "}
            <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a>.
          </p>
        </div>
      </section>
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "About", path: "/about" }])]} />
    </>
  );
}
