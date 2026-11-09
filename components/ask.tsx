"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircleQuestion, Phone, X } from "lucide-react";
import { brand, faqs, plans } from "@/content/site";

type Node = { q: string; a: string; cta?: { href: string; label: string } };

// Scripted answers from the real FAQ and price list. Anything personal goes to a person.
const topics: { label: string; items: Node[] }[] = [
  {
    label: "Prices",
    items: [
      { q: "How much is it?", a: faqs[0].a, cta: { href: "/book", label: "Get my price" } },
      ...plans.map((p) => ({
        q: `What's in the ${p.name}?`,
        a: `${p.summary} $${p.price} ${p.cadence}, 1 bin included, $${brand.extraBinPrice} per extra bin.`,
        cta: { href: `/book?plan=${p.id}`, label: `Book ${p.name.toLowerCase()}` },
      })),
    ],
  },
  {
    label: "Do you come to me?",
    items: [{ q: "What areas do you serve?", a: faqs[1].a, cta: { href: "/book", label: "Check my ZIP" } }],
  },
  {
    label: "How it works",
    items: faqs.filter((f) => /home|empty|clean the bins|often|why/i.test(f.q)).map((f) => ({ q: f.q, a: f.a })),
  },
  {
    label: "Rentals & neighborhoods",
    items: [
      {
        q: "Do you clean vacation rental bins?",
        a: faqs.find((f) => /vacation/i.test(f.q))!.a,
        cta: { href: "/vacation-rentals", label: "Rental owners" },
      },
      {
        q: "Can my neighbors and I sign up together?",
        a: "Yes. Each home books its own plan, and we clean the whole street on the same route the day after pickup.",
        cta: { href: "/neighborhoods", label: "Neighborhoods" },
      },
    ],
  },
  {
    label: "Billing",
    items: faqs.filter((f) => /payment/i.test(f.q)).map((f) => ({ q: f.q, a: f.a })),
  },
];

export function AskButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("bb:ask"))}>
      {children ?? "Ask a question"}
    </button>
  );
}

export function AskDrawer() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<number | null>(null);
  const [item, setItem] = useState<Node | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("bb:ask", on);
    return () => window.removeEventListener("bb:ask", on);
  }, []);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = () => {
    setOpen(false);
    setTopic(null);
    setItem(null);
  };

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="ask-h" onClose={close} onClick={(e) => e.target === ref.current && close()}>
      <div className="drawer-inner">
        <div className="drawer-head">
          <p id="ask-h" className="drawer-title">
            <MessageCircleQuestion aria-hidden /> Ask Bin Busters
          </p>
          <button className="icon-btn" onClick={close} aria-label="Close">
            <X aria-hidden />
          </button>
        </div>

        {item ? (
          <div className="ask-answer">
            <p className="ask-q">{item.q}</p>
            <p>{item.a}</p>
            <div className="row">
              {item.cta && (
                <Link className="btn" href={item.cta.href} onClick={close}>
                  {item.cta.label}
                </Link>
              )}
              <button className="btn btn-ghost" onClick={() => setItem(null)}>
                Another question
              </button>
            </div>
          </div>
        ) : topic === null ? (
          <>
            <p className="muted">Pick a topic. For anything about your home or a special job, talk to Jarrett.</p>
            <div className="chips">
              {topics.map((t, i) => (
                <button key={t.label} className="chip" onClick={() => setTopic(i)}>
                  {t.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button className="link-btn" onClick={() => setTopic(null)}>
              ← All topics
            </button>
            <ul className="ask-list">
              {topics[topic].items.map((n) => (
                <li key={n.q}>
                  <button onClick={() => setItem(n)}>{n.q}</button>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="ask-human">
          <p>Something else? A person answers.</p>
          <div className="row">
            <a className="btn btn-ghost" href={`tel:${brand.phoneE164}`} data-event="call_click">
              <Phone size={18} aria-hidden /> {brand.phone}
            </a>
            <a className="btn btn-ghost" href={`sms:${brand.phoneE164}`} data-event="sms_click">
              Text us
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
