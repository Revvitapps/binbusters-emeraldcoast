import { brand } from "@/content/site";
import { BookButton, Breadcrumbs, TownGrid } from "@/components/ui";
import { JsonLd, breadcrumbNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us",
  description: `Call ${brand.phone} or email ${brand.email} to book trash can cleaning in Fort Walton Beach, Destin, Navarre and nearby towns.`,
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Contact us</h1>
          <p className="lede">Questions, a town not on our list, or a commercial or HOA job? Reach out.</p>
          <div className="contact-box card">
            <p>
              <strong>Phone:</strong> <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a>
            </p>
            <p>
              <strong>Email:</strong> <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
            <p>
              <strong>Service area:</strong> Okaloosa, Walton and Santa Rosa counties, Florida
            </p>
            <BookButton />
          </div>
        </div>
      </section>
      <TownGrid />
      <JsonLd nodes={[breadcrumbNode([{ name: "Contact", path: "/contact" }])]} />
    </>
  );
}
