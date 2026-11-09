import { brand, benefits, faqs, plans } from "@/content/site";
import { BookButton, CallButton, CtaBand, FaqList, Pricing, Steps, TownGrid } from "@/components/ui";
import { JsonLd, faqNode, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { CalendarSync, CircleHelp, Home as HomeIcon, MapPin, Sparkles, Users, CalendarDays } from "lucide-react";
import { AskButton } from "@/components/ask";
import { Mascot } from "@/components/logo";
import Image from "next/image";

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
          <div className="hero-copy">
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
          <div className="hero-mascot">
            <Mascot priority />
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

      <section className="section proof" aria-labelledby="proof-h">
        <div className="wrap proof-grid">
          <div>
            <h2 id="proof-h">See the difference</h2>
            <p className="lede">A real bin before and after a Bin Busters clean.</p>
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
          <div className="trailer">
            <Image src="/brand/trailer.png" alt="The Bin Busters cleaning trailer with its lift tipping a trash can into the wash bay" width={639} height={501} />
            <p className="muted">Our trailer washes each bin right at your curb.</p>
          </div>
        </div>
      </section>
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
