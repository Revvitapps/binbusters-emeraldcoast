import Link from "next/link";
import { towns } from "@/content/site";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Service Areas: Okaloosa, Walton & Santa Rosa",
  description:
    "Bin Busters cleans trash cans in Fort Walton Beach, Destin, Navarre, Niceville, Mary Esther, Shalimar, Valparaiso, Bluewater Bay, Miramar Beach, Sandestin and more.",
  path: "/service-areas",
});

const counties = ["Okaloosa", "Walton", "Santa Rosa"] as const;

export default function Areas() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Service areas" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Where we clean trash cans</h1>
          <p className="lede">
            We serve {towns.length} towns on Florida's Emerald Coast. Not on the list? Call us; if you're close, we can
            usually fit you in.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {counties.map((c) => (
            <div key={c} className="county">
              <h2>{c} County</h2>
              <ul className="towns">
                {towns
                  .filter((t) => t.county === c)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link href={`/service-areas/${t.slug}`}>{t.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
      <JsonLd nodes={[breadcrumbNode([{ name: "Service areas", path: "/service-areas" }])]} />
    </>
  );
}
