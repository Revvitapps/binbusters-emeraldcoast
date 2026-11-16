import { leadSummary, type Lead } from "@/lib/pipeline";

// Receives leads from the site. Delivery is optional and configured by env:
//   RESEND_API_KEY + LEAD_EMAIL_TO (+ LEAD_EMAIL_FROM once the domain is verified in Resend)
//   PIPELINE_WEBHOOK_URL (Zapier, Make, Slack incoming webhook, a CRM...)
// With nothing set it logs the lead and returns delivered:false, and the UI steers people to Jobber or a text.

const clean = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : undefined);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  const lead: Lead = {
    source: (["book", "rental", "neighborhood", "ask", "zip-check"].includes(String(body.source))
      ? body.source
      : "book") as Lead["source"],
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    address: clean(body.address, 200),
    zip: clean(body.zip, 10),
    town: clean(body.town, 80),
    plan: clean(body.plan, 40),
    bins: typeof body.bins === "number" ? Math.min(20, Math.max(1, Math.round(body.bins))) : undefined,
    price: typeof body.price === "number" ? Math.round(body.price) : undefined,
    notes: clean(body.notes, 1000),
    at: new Date().toISOString(),
  };
  if (!lead.phone && !lead.email && lead.source !== "zip-check") {
    return Response.json({ ok: false, error: "phone or email required" }, { status: 422 });
  }

  const tasks: Promise<boolean>[] = [];
  const text = leadSummary(lead);

  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM || "Bin Busters website <onboarding@resend.dev>",
          to: process.env.LEAD_EMAIL_TO.split(",").map((s) => s.trim()),
          reply_to: lead.email || undefined,
          subject: `New ${lead.source} request${lead.town ? ` in ${lead.town}` : ""}${lead.name ? ` from ${lead.name}` : ""}`,
          text,
        }),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }
  if (process.env.PIPELINE_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.PIPELINE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, text }),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  const results = await Promise.all(tasks);
  const delivered = results.some(Boolean);
  if (!delivered) console.log("[pipeline] lead not forwarded (no delivery configured):", lead.source, lead.town ?? "");
  return Response.json({ ok: true, delivered });
}
