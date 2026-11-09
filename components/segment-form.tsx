"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { brand } from "@/content/site";
import { leadSummary, smsHref, upsertContact, type Lead } from "@/lib/pipeline";

/** Short "call me back" form for rentals and neighborhoods. */
export function SegmentForm({ source, countLabel, cta }: { source: Lead["source"]; countLabel: string; cta: string }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", address: "", count: "", notes: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [delivered, setDelivered] = useState(false);
  const lead: Lead = {
    source,
    name: f.name,
    phone: f.phone,
    email: f.email,
    address: f.address,
    notes: [f.count && `${countLabel}: ${f.count}`, f.notes].filter(Boolean).join(". "),
  };
  const ok = f.name.trim() && (f.phone.trim().length >= 10 || /.+@.+\..+/.test(f.email));

  if (state === "sent")
    return (
      <div className="card done-step" role="status">
        <h3>{delivered ? "Thanks, we'll call you shortly." : "One more tap so it reaches Jarrett"}</h3>
        <p>{delivered ? "Jarrett has your details." : "Send it as a text, or call. Either way you'll hear back fast."}</p>
        <div className="row">
          <a className="btn" href={smsHref(brand.phoneE164, leadSummary(lead))} data-event="sms_click">
            <MessageSquare size={18} aria-hidden /> Text my request
          </a>
          <a className="btn btn-ghost" href={`tel:${brand.phoneE164}`} data-event="call_click">
            Call {brand.phone}
          </a>
        </div>
      </div>
    );

  return (
    <form
      className="card form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ok) return;
        setState("sending");
        const r = await upsertContact(lead);
        setDelivered(r.delivered);
        setState("sent");
        window.dispatchEvent(new Event("bb:installable"));
      }}
    >
      <label className="field">
        <span>Name</span>
        <input required autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </label>
      <label className="field">
        <span>Mobile phone</span>
        <input type="tel" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </label>
      <label className="field">
        <span>Email</span>
        <input type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </label>
      <label className="field">
        <span>Address or neighborhood</span>
        <input autoComplete="street-address" value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} />
      </label>
      <label className="field">
        <span>{countLabel}</span>
        <input inputMode="numeric" value={f.count} onChange={(e) => setF({ ...f, count: e.target.value })} />
      </label>
      <label className="field">
        <span>Notes (optional)</span>
        <textarea rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
      </label>
      <button className="btn" type="submit" disabled={!ok || state === "sending"}>
        {state === "sending" ? "Sending..." : cta}
      </button>
    </form>
  );
}
