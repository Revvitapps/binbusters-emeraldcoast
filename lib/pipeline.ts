// One entry point for every lead the site captures.
// Saves a copy on the device (so the visitor's request survives a reload or going offline)
// and POSTs it to /api/pipeline, which forwards it to email and/or a webhook when configured.

export type Lead = {
  source: "book" | "rental" | "neighborhood" | "ask" | "zip-check";
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  zip?: string;
  town?: string;
  plan?: string;
  bins?: number;
  price?: number;
  notes?: string;
  at?: string;
};

const KEY = "bb.leads";

export function savedLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export async function upsertContact(lead: Lead): Promise<{ ok: boolean; delivered: boolean }> {
  const entry = { ...lead, at: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify([...savedLeads(), entry].slice(-10)));
  } catch {}
  try {
    const res = await fetch("/api/pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
      keepalive: true,
    });
    const data = (await res.json().catch(() => ({}))) as { delivered?: boolean };
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", "generate_lead", { lead_source: lead.source, value: lead.price, currency: "USD" });
    return { ok: res.ok, delivered: !!data.delivered };
  } catch {
    return { ok: false, delivered: false };
  }
}

/** A prefilled text message to the owner: works with no backend at all. */
export function smsHref(phoneE164: string, body: string) {
  return `sms:${phoneE164}?&body=${encodeURIComponent(body)}`;
}

export function leadSummary(l: Lead) {
  return [
    `New request from the website (${l.source})`,
    l.name && `Name: ${l.name}`,
    l.phone && `Phone: ${l.phone}`,
    l.email && `Email: ${l.email}`,
    l.address && `Address: ${l.address}`,
    l.zip && `ZIP: ${l.zip}`,
    l.town && `Town: ${l.town}`,
    l.plan && `Plan: ${l.plan}`,
    l.bins && `Bins: ${l.bins}`,
    l.price && `Price: $${l.price}`,
    l.notes && `Notes: ${l.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
}
