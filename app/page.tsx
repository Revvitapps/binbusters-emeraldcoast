import { brand, benefits, faqs, plans, reviewSummary } from "@/content/site";
import { BookButton, CallButton, CtaBand, FaqList, Pricing, Reviews, Stars, Steps, TownGrid, VeteranBadge, VeteranSection } from "@/components/ui";
import { JsonLd, faqNode, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BugOff, CalendarCheck, CalendarDays, CalendarSync, Check, CircleHelp, Home as HomeIcon, MapPin, ShieldCheck, Smartphone, Sparkles, Thermometer, Users, Wind } from "lucide-react";
import { AskButton } from "@/components/ask";
import Image from "next/image";
import { Mascot } from "@/components/logo";

const needs = [
  { label: "Monthly cleaning", sub: `$${plans[0].price}/month, 1 bin`, href: "/book?plan=monthly", Icon: CalendarSync },
  { label: "One-time deep clean", sub: `$${plans[2].price}, 1 bin`, href: "/book?plan=one-time", Icon: Sparkles },
  { label: "Every 12 weeks", sub: `$${plans[1].price} per clean`, href: "/book?plan=quarterly", Icon: CalendarDays },
  { label: "My vacation rental", sub: "Clean bins between guests", href: "/vacation-rentals", Icon: HomeIcon },
  { label: "My whole street or HOA", sub: "One clean-bin day", href: "/neighborhoods", Icon: Users },
  { label: "Do you come to me?", sub: "Check your ZIP", href: "/book", Icon: MapPin },
  { label: "I have a question", sub: "Quick answers or a person", ask: true, Icon: CircleHelp },
];

const benefitIcons = [ShieldCheck, Wind, BugOff, Smartphone];

const trust = [
  { Icon: Sparkles, label: "Sanitized and deodorized", sub: "Inside and out, every visit" },
  { Icon: Thermometer, label: "200°F water", sub: "Kills about 99% of bacteria" },
  { Icon: CalendarCheck, label: "No need to be home", sub: "We come after trash pickup" },
  { Icon: MapPin, label: "Local to the Emerald Coast", sub: "Okaloosa, Walton and Santa Rosa" },
];

export const metadata = pageMeta({
  title: "Trash Can Cleaning in Fort Walton Beach & Destin | Bin Busters",
  description: brand.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <VeteranBadge />
            <h1>
              Veteran-owned trash can cleaning <span className="accent">on the Emerald Coast</span>
            </h1>
            <p className="lede">
              We clean, sanitize and deodorize your trash and recycling bins right at the curb with 200° water.
              Plans start at $20 a month.
            </p>
            <div className="row">
              <BookButton />
              <CallButton />
            </div>
            <ul className="hero-badges">
              <li>
                <Stars size={15} />
                <span>
                  <strong>{reviewSummary.rating} on Google</strong>
                  <small>{reviewSummary.count} local reviews</small>
                </span>
              </li>
              <li>
                <ShieldCheck aria-hidden size={22} />
                <span>
                  <strong>Veteran-owned</strong>
                  <small>20 years U.S. Air Force</small>
                </span>
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="hero-rig">
              <div className="hero-signal" aria-hidden="true">
                <Mascot size={230} priority />
              </div>
              <div className="hero-trailer">
                <span className="hero-beam" aria-hidden="true" />
                <Image
                  src="/brand/trailer-left.png"
                  alt="The Bin Busters cleaning trailer with its lift tipping a trash can into the wash bay"
                  width={1280}
                  height={988}
                  priority
                  sizes="(max-width: 960px) 90vw, 46vw"
                />
              </div>
            </div>
            <p className="hero-chip">
              <Thermometer aria-hidden size={18} />
              <span>
                <strong>200°F</strong> pressurized wash at your curb
              </span>
            </p>
          </div>
        </div>
        <div className="wrap">
          <ul className="trust">
            {trust.map(({ Icon, label, sub }) => (
              <li key={label}>
                <Icon aria-hidden size={22} />
                <span>
                  <strong>{label}</strong>
                  <small>{sub}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reviews />

      <section className="section need" aria-labelledby="need-h">
        <div className="wrap">
          <p className="eyebrow">Get started</p>
          <h2 id="need-h">What do you need?</h2>
          <div className="need-grid">
            {needs.map((n) =>
              n.ask ? (
                <AskButton key={n.label} className="need">
                  <span className="need-icon"><n.Icon aria-hidden /></span>
                  <span>
                    <strong>{n.label}</strong>
                    <small>{n.sub}</small>
                  </span>
                  <ArrowRight aria-hidden className="need-arrow" />
                </AskButton>
              ) : (
                <Link key={n.label} href={n.href!} className="need">
                  <span className="need-icon"><n.Icon aria-hidden /></span>
                  <span>
                    <strong>{n.label}</strong>
                    <small>{n.sub}</small>
                  </span>
                  <ArrowRight aria-hidden className="need-arrow" />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <VeteranSection />

      <section className="section" aria-labelledby="why-h">
        <div className="wrap">
          <p className="eyebrow">Why it matters</p>
          <h2 id="why-h">Why clean your bins?</h2>
          <p className="lede">Florida heat turns a dirty can into a home for bacteria, flies and maggots within days.</p>
          <div className="cards four">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <div className="card benefit" key={b.title}>
                  <span className="benefit-icon"><Icon aria-hidden size={22} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Steps />

      <section className="section proof" aria-labelledby="proof-h">
        <div className="wrap proof-grid">
          <div>
            <p className="eyebrow">Results</p>
            <h2 id="proof-h">See the difference</h2>
            <p className="lede">A real bin before and after a Bin Busters clean.</p>
            <ul className="ticks">
              <li><Check aria-hidden size={18} /> Washed inside and out with water over 200°F</li>
              <li><Check aria-hidden size={18} /> Finished with an eco-friendly deodorizer</li>
              <li><Check aria-hidden size={18} /> Bins go back where you keep them</li>
            </ul>
            <BookButton />
          </div>
          <div className="ba">
            <figure>
              <Image src="/brand/before.png" alt="Inside of a dirty trash can full of grime and litter" width={300} height={285} />
              <figcaption>Before</figcaption>
            </figure>
            <figure>
              <Image src="/brand/after.png" alt="Inside of the same trash can after cleaning, bright and clean" width={300} height={281} />
              <figcaption>After</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <Pricing />
      <TownGrid />

      <FaqList items={faqs.slice(0, 6)} />
      <CtaBand />
      <JsonLd nodes={[faqNode(faqs.slice(0, 6), "/")]} />
    </>
  );
}
