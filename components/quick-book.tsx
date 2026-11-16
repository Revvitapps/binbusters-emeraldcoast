"use client";

import { useRef, useState } from "react";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { brand } from "@/content/site";
import { upsertContact } from "@/lib/pipeline";

/**
 * "Book now in Jobber": the quick path for people who already know what they want.
 * Opens Jarrett's Jobber request form in a new tab and, in the same tap, sends him a short
 * heads-up email through /api/pipeline (source "quick") so he hears about it even if the
 * customer gives up halfway through Jobber. Name and contact are optional to keep it one tap.
 */
export function QuickBook({
  from,
  zip,
  town,
  plan,
  compact,
  id,
}: {
  /** Where the tap happened, for Jarrett's email ("home page", "pricing page", "booking page"). */
  from: string;
  zip?: string;
  town?: string;
  plan?: string;
  compact?: boolean;
  id?: string;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const sent = useRef(false);

  function notify() {
    if (sent.current) return;
    sent.current = true;
    const c = contact.trim();
    const isEmail = c.includes("@");
    // Not awaited: the link opens Jobber straight away, and the request is sent with keepalive.
    void upsertContact({
      source: "quick",
      name: name.trim() || undefined,
      phone: c && !isEmail ? c : undefined,
      email: isEmail ? c : undefined,
      zip: zip?.trim() || undefined,
      town,
      plan,
      notes: `Tapped "Book now in Jobber" on the ${from}.`,
    });
  }

  return (
    <div id={id} className={compact ? "quick-book compact" : "quick-book card"}>
      <div className="quick-book-copy">
        <p className="quick-book-title">
          <CalendarCheck aria-hidden size={20} /> {compact ? "Know what you want? Skip the questions." : "Already know what you want?"}
        </p>
        <p className="muted">
          Book now in our secure Jobber scheduler: pick your start date and save your card in about a minute. Leave your name
          and number too, so Jarrett can reach you if anything gets cut off.
        </p>
      </div>
      <div className="quick-book-form">
        <label className="field">
          <span>Name (optional)</span>
          <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          <span>Phone or email (optional)</span>
          <input autoComplete="tel" inputMode="email" value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>
        <a className="btn" href={brand.bookingUrl} target="_blank" rel="noopener" data-event="book_click" onClick={notify}>
          Book now in Jobber <ExternalLink aria-hidden size={17} />
        </a>
      </div>
    </div>
  );
}
