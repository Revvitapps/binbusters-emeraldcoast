import Link from "next/link";
import { brand, faqs as allFaqs, plans, reviewSummary, reviewUrl, reviews, steps, towns, type Faq } from "@/content/site";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { ReviewCarousel } from "@/components/review-carousel";
import { ArrowRight, Check, ChevronDown, Droplets, MapPin, MousePointerClick, Phone, Sparkles, Star as StarIcon } from "lucide-react";

const tel = `tel:${brand.phoneE164}`;

export function Header() {
  return (
    <>
      <VeteranRibbon />
      <HeaderBar />
    </>
  );
}

function HeaderBar() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label={`${brand.name} home`}>
          <Logo priority />
        </Link>
        <nav aria-label="Main" className="nav">
          <Link href="/pricing">Pricing</Link>
          <Link href="/service-areas">Service areas</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-cta">
          <a href={tel} className="phone" data-event="call_click">
            <Phone aria-hidden size={16} />
            {brand.phone}
          </a>
          <BookButton small />
        </div>
      </div>
    </header>
  );
}


export function BookButton({ small, label = "Book a cleaning", href = "/book" }: { small?: boolean; label?: string; href?: string }) {
  return (
    <Link href={href} className={small ? "btn btn-sm" : "btn"} data-event="book_start">
      {label}
    </Link>
  );
}

export function CallButton() {
  return (
    <a href={tel} className="btn btn-ghost" data-event="call_click">
      <Phone aria-hidden size={18} />
      Call {brand.phone}
    </a>
  );
}

/** Five gold stars as icons (decorative; the rating is always stated in text next to them). */
export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((k) => (
        <StarIcon key={k} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function Pricing({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <section className="section" aria-labelledby="pricing-h">
      <div className="wrap">
        <p className="eyebrow">Pricing</p>
        <H id="pricing-h">Simple pricing</H>
        <p className="lede">Each price includes 1 bin. Extra bins are ${brand.extraBinPrice} each. No contracts.</p>
        <div className="cards">
          {plans.map((p) => (
            <div key={p.id} className={p.popular ? "card plan featured" : "card plan"}>
              {p.popular && <span className="badge">Recommended</span>}
              <Sub>{p.name}</Sub>
              <p className="price">
                <span>${p.price}</span> {p.cadence}
              </p>
              <p className="plan-summary">{p.summary}</p>
              <ul className="plan-list">
                <li><Check aria-hidden size={16} /> 1 bin included</li>
                <li><Check aria-hidden size={16} /> +${brand.extraBinPrice} each additional bin</li>
                <li><Check aria-hidden size={16} /> Sanitized and deodorized</li>
              </ul>
              <BookButton label={`Book ${p.name.toLowerCase()}`} href={`/book?plan=${p.id}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stepIcons = [MousePointerClick, Droplets, Sparkles];

export function Steps({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <section className="section alt" aria-labelledby="how-h">
      <div className="wrap">
        <p className="eyebrow">The process</p>
        <H id="how-h">How it works</H>
        <ol className="steps">
          {steps.map((s, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
            <li key={s.title}>
              <span className="step-icon"><Icon aria-hidden size={24} /></span>
              <Sub>{s.title}</Sub>
              <p>{s.body}</p>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function FaqList({ items = allFaqs, headingLevel = 2, title = "Questions people ask" }: { items?: Faq[]; headingLevel?: 2 | 3; title?: string }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="wrap narrow">
        <p className="eyebrow">Answers</p>
        <H id="faq-h">{title}</H>
        <div className="faqs">
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                <Sub>{f.q}</Sub>
                <ChevronDown aria-hidden size={20} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TownGrid({ headingLevel = 2, exclude }: { headingLevel?: 2 | 3; exclude?: string }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section className="section alt" aria-labelledby="areas-h">
      <div className="wrap">
        <p className="eyebrow">Service area</p>
        <H id="areas-h">{exclude ? "Other towns we serve" : "Where we clean"}</H>
        <p className="lede">Okaloosa, Walton and Santa Rosa counties on Florida's Emerald Coast.</p>
        <ul className="towns">
          {towns
            .filter((t) => t.slug !== exclude)
            .map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}`}>
                  <MapPin aria-hidden size={16} />
                  {t.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-grid">
        <div>
          <p className="eyebrow">Veteran-owned · {reviewSummary.rating} on Google</p>
          <h2>Ready for clean, fresh-smelling bins?</h2>
          <p>Book online in two minutes, or call and we will set you up.</p>
        </div>
        <div className="row">
          <BookButton />
          <CallButton />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs wrap">
      <Link href="/">Home</Link>
      {items.map((it) => (
        <span key={it.name}>
          {" / "}
          {it.path ? <Link href={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-logo">
            <Logo height={52} onDark />
            <Image src="/brand/mascot.png" alt="" width={52} height={53} className="footer-mascot" />
          </p>
          <p><strong className="footer-vet">Veteran-owned &amp; operated</strong><br />Family-run trash can cleaning on Florida's Emerald Coast, owned by a 20-year U.S. Air Force veteran.</p>
          <p>
            <a href={tel}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>
        <div>
          <p className="footer-h">Service areas</p>
          <ul>
            {towns.map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-h">Company</p>
          <ul>
            <li><Link href="/book">Book online</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/vacation-rentals">Vacation rentals</Link></li>
            <li><Link href="/neighborhoods">Neighborhoods & HOAs</Link></li>
            <li><Link href="/military">Military & PCS</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            {brand.sameAs.map((u) => (
              <li key={u}>
                <a href={u} rel="noopener" target="_blank">
                  {u.includes("facebook") ? "Facebook" : u.includes("instagram") ? "Instagram" : "Google"}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="wrap copyright">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
    </footer>
  );
}

function Star({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.3L12 17.8 5.8 21.5l1.6-7.3L2 9.5l7.1-.6z" />
    </svg>
  );
}

/** Thin ribbon above the header on every page. */
export function VeteranRibbon() {
  return (
    <div className="vet-ribbon">
      <div className="wrap">
        <Star size={12} />
        <span>
          <strong>Veteran-owned &amp; operated</strong>
          <span className="vet-ribbon-more"> · 20 years U.S. Air Force · Proud neighbors of Eglin AFB &amp; Hurlburt Field</span>
        </span>
      </div>
    </div>
  );
}

/** Large hero badge. */
export function VeteranBadge() {
  return (
    <p className="vet-badge">
      <Star size={14} />
      <span>Veteran-owned</span>
    </p>
  );
}

/** "Served 20 years" section for the home and town pages. */
export function VeteranSection({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section className="vet-section" aria-labelledby="vet-h">
      <div className="wrap vet-grid">
        <div>
          <p className="vet-kicker">
            <Star size={14} /> Veteran-owned &amp; operated
          </p>
          <H id="vet-h">He served 20 years. Now he serves the Emerald Coast.</H>
          <p>
            {brand.owner.name} spent two decades in the U.S. Air Force before starting {brand.shortName} here at home. The same
            standards come to your curb: we show up when we say we will, do the job right, and treat your home like our own. <Link href="/about">Meet {brand.owner.name.split(" ")[0]}</Link>.
          </p>
          <p>
            Military families: we work around duty schedules, deployments and PCS moves. You never need to be home.{" "}
            <Link href="/military">Military &amp; PCS cleanings</Link>.
          </p>
        </div>
        <ul className="vet-stats">
          <li>
            <strong>20</strong>
            <span>years U.S. Air Force</span>
          </li>
          <li>
            <strong>100%</strong>
            <span>family-owned and local</span>
          </li>
          <li>
            <strong>200°F</strong>
            <span>water on every clean</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Real Google reviews, front and centre on the home page. */
export function Reviews({ headingLevel = 2, limit = 6 }: { headingLevel?: 2 | 3; limit?: number }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section className="section reviews" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="reviews-head">
          <div>
            <p className="eyebrow">Google reviews</p>
            <H id="reviews-h">What our customers say</H>
          </div>
          <p className="rating">
            <strong>{reviewSummary.rating}</strong>
            <span>
              <Stars size={18} />
              <small>{reviewSummary.count} reviews on Google</small>
            </span>
          </p>
        </div>
        <ReviewCarousel reviews={reviews.slice(0, limit)} />
        <div className="row">
          <a className="btn btn-ghost" href={brand.googleBusinessProfile} target="_blank" rel="noopener">
            Read all reviews on Google
            <ArrowRight aria-hidden size={18} />
          </a>
          <a className="link-btn" href={reviewUrl} target="_blank" rel="noopener">
            Already a customer? Leave a review
          </a>
        </div>
      </div>
    </section>
  );
}
