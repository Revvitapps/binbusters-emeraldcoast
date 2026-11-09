import { brand } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms and Conditions",
  description: `Service terms for trash can cleaning by ${brand.name}: scheduling, billing, cancellations and bin access.`,
  path: "/terms",
});

export default function Terms() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <h1>Terms and conditions</h1>
        <p className="muted">Last updated November 9, 2026</p>
        <h2>Service</h2>
        <p>
          We clean residential trash and recycling bins at the curb on the day after your scheduled trash pickup. Bins should be
          empty and accessible. If garbage is in the bin, please bag it; we will remove it and put it back after cleaning.
        </p>
        <h2>Billing</h2>
        <p>
          Recurring plans are billed automatically through our secure payment portal. Prices include one bin; each additional bin
          is ${brand.extraBinPrice} per cleaning. Prices are listed on our pricing page and may change with notice.
        </p>
        <h2>Cancellations</h2>
        <p>
          You can cancel a recurring plan at any time by calling or emailing us before your next scheduled cleaning.
        </p>
        <h2>Missed cleanings</h2>
        <p>
          If your bins are not out or are still full, we may be unable to clean them that day. We will contact you to reschedule.
        </p>
        <h2>Contact</h2>
        <p>
          <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a> · <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>
      </div>
    </section>
  );
}
