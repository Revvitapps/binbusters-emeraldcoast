import { brand, benefits, faqs, plans } from "@/content/site";
import { BookButton, CallButton, CtaBand, FaqList, Pricing, Steps, TownGrid } from "@/components/ui";
import { JsonLd, faqNode, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { CalendarSync, CircleHelp, Home as HomeIcon, MapPin, Sparkles, Users, CalendarDays } from "lucide-react";
import { AskButton } from "@/components/ask";

const needs = [
  { label: "Monthly cleaning", sub: `$${plans[0].price}/month, 1 bin`, href: "/book?plan=monthly", Icon: CalendarSync },
  { label: "One-time deep clean", sub: `$${plans[2].price}, 1 bin`, href: "/book?plan=one-time", Icon: Sparkles },
  { label: "Every 12 weeks", sub: `$${plans[1].price} per clean`, href: "/book?plan=quarterly", Icon: CalendarDays },
  { label: "My vacation rental", sub: "Clean bins between guests", href: "/vacation-rentals", Icon: HomeIcon },
  { label: "My whole street or HOA", sub: "One clean-bin day", href: "/neighborhoods", Icon: Users },
  { label: "Do you come to me?", sub: "Check your ZIP", href: "/book", Icon: MapPin },
  { label: "I have a question", sub: "Quick answers or a person", ask: true, Icon: CircleHelp },
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
          <div>
            <p className="eyebrow">Veteran-owned · Fort Walton Beach, Destin, Navarre & nearby</p>
            <h1>Trash can cleaning on the Emerald Coast</h1>
            <p className="lede">
              We clean, sanitize and deodorize your trash and recycling bins right at the curb with 200° water.
              Plans start at $20 a month.
            </p>
            <div className="row">
              <BookButton />
              <CallButton />
            </div>
            <ul className="checks">
              <li>Kills about 99% of bacteria</li>
              <li>No need to be home</li>
              <li>Monthly, quarterly or one-time</li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            <HeroArt />
          </div>
        </div>
      </section>


      <section className="section need" aria-labelledby="need-h">
        <div className="wrap">
          <h2 id="need-h">What do you need?</h2>
          <div className="need-grid">
            {needs.map((n) =>
              n.ask ? (
                <AskButton key={n.label} className="need">
                  <n.Icon aria-hidden />
                  <span>
                    <strong>{n.label}</strong>
                    <small>{n.sub}</small>
                  </span>
                </AskButton>
              ) : (
                <Link key={n.label} href={n.href!} className="need">
                  <n.Icon aria-hidden />
                  <span>
                    <strong>{n.label}</strong>
                    <small>{n.sub}</small>
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-h">
        <div className="wrap">
          <h2 id="why-h">Why clean your bins?</h2>
          <p className="lede">Florida heat turns a dirty can into a home for bacteria, flies and maggots within days.</p>
          <div className="cards four">
            {benefits.map((b) => (
              <div className="card" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Steps />
      <Pricing />
      <TownGrid />

      <section className="section" aria-labelledby="owner-h">
        <div className="wrap narrow">
          <h2 id="owner-h">Keeping the Emerald Coast clean</h2>
          <p>
            Living here, {brand.owner.name.split(" ")[0]} got tired of filthy, smelly trash cans in our hot, humid weather,
            and knew his neighbors felt the same. After 20 years in the U.S. Air Force, he started this family-owned business
            to make clean, fresh-smelling bins easy for everyone. <Link href="/about">Meet the owner</Link>.
          </p>
        </div>
      </section>

      <FaqList items={faqs.slice(0, 6)} />
      <CtaBand />
      <JsonLd nodes={[faqNode(faqs.slice(0, 6), "/")]} />
    </>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 400 320" width="400" height="320" role="presentation">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" rx="24" fill="url(#sky)" />
      <path d="M0 250 Q100 225 200 250 T400 250 V320 H0Z" fill="#bd1e2c" opacity=".15" />
      <g transform="translate(130 70)">
        <rect x="-8" y="0" width="156" height="22" rx="6" fill="#bd1e2c" />
        <path d="M0 26h140l-12 170a10 10 0 0 1-10 9H22a10 10 0 0 1-10-9z" fill="#45b153" />
        <path d="M40 60v110M70 60v110M100 60v110" stroke="#bd1e2c" strokeWidth="6" strokeLinecap="round" opacity=".35" />
        <circle cx="22" cy="214" r="12" fill="#000" />
        <circle cx="118" cy="214" r="12" fill="#000" />
      </g>
      <g fill="#111" stroke="#45b153" strokeWidth="3">
        <circle cx="300" cy="80" r="16" />
        <circle cx="326" cy="112" r="10" />
        <circle cx="96" cy="96" r="12" />
        <circle cx="80" cy="130" r="7" />
      </g>
      <path d="M296 74l4 4 8-9" stroke="#45b153" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
