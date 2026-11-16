import type { Metadata } from "next";
import { brand, reviewUrl } from "@/content/site";

// Short link to send customers after a clean (Jobber follow-up text, card on the bin, QR on the trailer).
export const metadata: Metadata = {
  title: "Leave us a review",
  description: `Thanks for choosing ${brand.name}. A quick Google review helps your neighbors find us.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/review" },
};

export default function Review() {
  return (
    <section className="section">
      <div className="wrap narrow center">
        <h1>Thanks for trusting us with your bins</h1>
        <p className="lede">
          We're a small, veteran-owned business and most of our customers find us on Google. A quick review takes 30 seconds and
          means a lot.
        </p>
        <a className="btn btn-lg" href={reviewUrl} target="_blank" rel="noopener" data-event="review_click">
          Leave a Google review
        </a>
        <p className="muted">
          Something not right? Call or text Jarrett at <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a> and we'll make it right.
        </p>
      </div>
    </section>
  );
}
