import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <h1>Page not found</h1>
        <p>
          That page doesn't exist. Go to the <Link href="/">home page</Link> or see our <Link href="/pricing">prices</Link>.
        </p>
      </div>
    </section>
  );
}
