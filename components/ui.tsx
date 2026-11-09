import Link from "next/link";
import { brand, faqs as allFaqs, plans, steps, towns, type Faq } from "@/content/site";

const tel = `tel:${brand.phoneE164}`;

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label={`${brand.name} home`}>
          <LogoMark />
          <span>
            <strong>Bin Busters</strong>
            <small>of the Emerald Coast</small>
          </span>
        </Link>
        <nav aria-label="Main" className="nav">
          <Link href="/pricing">Pricing</Link>
          <Link href="/service-areas">Service areas</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-cta">
          <a href={tel} className="phone">{brand.phone}</a>
          <BookButton small />
        </div>
      </div>
    </header>
  );
}

export function LogoMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="var(--emerald)" />
      <path d="M18 22h28l-3 30a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3z" fill="#fff" />
      <rect x="15" y="16" width="34" height="6" rx="2" fill="#fff" />
      <path d="M27 31c3 3 7 3 10 0M27 40c3 3 7 3 10 0" stroke="var(--emerald)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BookButton({ small, label = "Book a cleaning" }: { small?: boolean; label?: string }) {
  return (
    <a href={brand.bookingUrl} className={small ? "btn btn-sm" : "btn"} rel="noopener" target="_blank" data-event="book_click">
      {label}
    </a>
  );
}

export function CallButton() {
  return (
    <a href={tel} className="btn btn-ghost" data-event="call_click">
      Call {brand.phone}
    </a>
  );
}

export function Pricing({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <section className="section" aria-labelledby="pricing-h">
      <div className="wrap">
        <H id="pricing-h">Simple pricing</H>
        <p className="lede">Each price includes 1 bin. Extra bins are ${brand.extraBinPrice} each.</p>
        <div className="cards">
          {plans.map((p) => (
            <div key={p.id} className={p.popular ? "card plan featured" : "card plan"}>
              {p.popular && <span className="badge">Recommended</span>}
              <Sub>{p.name}</Sub>
              <p className="price">
                <span>${p.price}</span> {p.cadence}
              </p>
              <p>{p.summary}</p>
              <p className="muted">+${brand.extraBinPrice} each additional bin</p>
              <BookButton label={`Book ${p.name.toLowerCase()}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <section className="section alt" aria-labelledby="how-h">
      <div className="wrap">
        <H id="how-h">How it works</H>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <Sub>{s.title}</Sub>
              <p>{s.body}</p>
            </li>
          ))}
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
        <H id="faq-h">{title}</H>
        <div className="faqs">
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                <Sub>{f.q}</Sub>
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
        <H id="areas-h">{exclude ? "Other towns we serve" : "Where we clean"}</H>
        <p className="lede">Okaloosa, Walton and Santa Rosa counties on Florida's Emerald Coast.</p>
        <ul className="towns">
          {towns
            .filter((t) => t.slug !== exclude)
            .map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}`}>{t.name}</Link>
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
      <div className="wrap">
        <h2>Ready for clean, fresh-smelling bins?</h2>
        <p>Book online in two minutes, or call and we will set you up.</p>
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
          <p className="footer-name">{brand.name}</p>
          <p>Veteran-owned, family-run trash can cleaning on Florida's Emerald Coast.</p>
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
            <li><Link href="/pricing">Pricing</Link></li>
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
