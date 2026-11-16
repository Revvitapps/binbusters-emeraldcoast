import { BookFunnel } from "@/components/book-funnel";
import { Breadcrumbs } from "@/components/ui";
import { JsonLd, breadcrumbNode, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book Trash Can Cleaning",
  description: "Check your ZIP, pick monthly, quarterly or one-time, see your exact price and request your first bin cleaning in under a minute.",
  path: "/book",
});

type Props = { searchParams: Promise<{ plan?: string; town?: string }> };

export default async function Book({ searchParams }: Props) {
  const { plan, town } = await searchParams;
  return (
    <>
      <Breadcrumbs items={[{ name: "Book" }]} />
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Book your bin cleaning</h1>
          <p className="lede">Four quick steps. You see your exact price before you send anything.</p>
          <BookFunnel initialPlan={plan} initialTown={town} />
        </div>
      </section>
      <JsonLd nodes={[breadcrumbNode([{ name: "Book", path: "/book" }])]} />
    </>
  );
}
