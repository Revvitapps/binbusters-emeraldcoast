import { brand } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${brand.name} collects and uses information on this website and when you book a trash can cleaning.`,
  path: "/privacy",
});

export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap narrow prose">
        <h1>Privacy policy</h1>
        <p className="muted">Last updated November 9, 2026</p>
        <h2>What we collect</h2>
        <p>
          When you book a cleaning, you give us your name, service address, phone, email and payment details. Bookings and
          payments are handled by our scheduling provider, Jobber, under its own privacy policy. We do not sell your information.
        </p>
        <h2>Website analytics</h2>
        <p>
          This website uses Vercel Analytics and Google Analytics to understand how visitors use the site. Google Analytics sets
          cookies; you can block them in your browser settings or with Google's opt-out add-on.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your information to schedule and perform cleanings, send reminders and receipts, and answer your questions. We
          may send you service updates by text or email; reply STOP or ask us to opt out at any time.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about your data: <a href={`mailto:${brand.email}`}>{brand.email}</a> or{" "}
          <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a>.
        </p>
      </div>
    </section>
  );
}
