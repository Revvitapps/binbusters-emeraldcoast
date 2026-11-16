"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, MapPin, MessageSquare, Minus, Phone, Plus } from "lucide-react";
import { brand, plans, priceFor, serviceZips, towns } from "@/content/site";
import { leadSummary, smsHref, upsertContact, type Lead } from "@/lib/pipeline";

type Step = 0 | 1 | 2 | 3 | 4;
const STEP_NAMES = ["Your area", "How often", "How many bins", "Your details", "Done"];

export function BookFunnel({ initialPlan, initialTown }: { initialPlan?: string; initialTown?: string }) {
  const [step, setStep] = useState<Step>(0);
  const [zip, setZip] = useState("");
  const [town, setTown] = useState(initialTown ?? "");
  const [plan, setPlan] = useState(initialPlan && plans.some((p) => p.id === initialPlan) ? initialPlan : "monthly");
  const [bins, setBins] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [delivered, setDelivered] = useState<boolean | null>(null);

  // Restore an unfinished request (and remember progress) on this device.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bb.draft") || "null");
      if (saved && !initialPlan) {
        if (saved.zip) setZip(saved.zip);
        if (saved.town) setTown(saved.town);
        if (saved.plan) setPlan(saved.plan);
        if (saved.bins) setBins(saved.bins);
        if (saved.form) setForm((f) => ({ ...f, ...saved.form }));
      }
    } catch {}
  }, [initialPlan]);
  useEffect(() => {
    try {
      localStorage.setItem("bb.draft", JSON.stringify({ zip, town, plan, bins, form }));
    } catch {}
  }, [zip, town, plan, bins, form]);

  const zipTowns = serviceZips[zip.trim()] ?? [];
  const zipKnown = zip.trim().length === 5 && zipTowns.length > 0;
  const zipUnknown = zip.trim().length === 5 && zipTowns.length === 0;
  useEffect(() => {
    if (zipKnown && !zipTowns.includes(town)) setTown(zipTowns[0]);
  }, [zipKnown, zipTowns, town]);

  const townName = towns.find((t) => t.slug === town)?.name;
  const planObj = plans.find((p) => p.id === plan)!;
  const price = priceFor(plan, bins);
  const lead: Lead = useMemo(
    () => ({
      source: "book",
      ...form,
      zip,
      town: townName,
      plan: planObj.name,
      bins,
      price,
    }),
    [form, zip, townName, planObj.name, bins, price],
  );
  const canContact = form.name.trim() && (form.phone.trim().length >= 10 || /.+@.+\..+/.test(form.email)) && form.address.trim();

  const go = (s: Step) => {
    setStep(s);
    requestAnimationFrame(() => document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canContact || sending) return;
    setSending(true);
    const r = await upsertContact(lead);
    setDelivered(r.delivered);
    setSending(false);
    try { localStorage.removeItem("bb.draft"); } catch {}
    window.dispatchEvent(new Event("bb:installable"));
    go(4);
  }

  return (
    <div id="funnel" className="funnel card">
      <ol className="funnel-steps" aria-label="Progress">
        {STEP_NAMES.slice(0, 4).map((n, i) => (
          <li key={n} className={i < step ? "done" : i === step ? "now" : ""} aria-current={i === step ? "step" : undefined}>
            <span>{i < step ? <Check size={14} aria-hidden /> : i + 1}</span>
            {n}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <section aria-labelledby="f0">
          <h2 id="f0">Where are your bins?</h2>
          <label className="field">
            <span>ZIP code</span>
            <input
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              placeholder="32548"
            />
          </label>
          {zipKnown && (
            <p className="ok" role="status">
              <MapPin size={18} aria-hidden /> Good news, we clean bins in {zipTowns.map((s) => towns.find((t) => t.slug === s)?.name).join(" and ")}.
            </p>
          )}
          {zipUnknown && (
            <p className="warn" role="status">
              That ZIP isn't on our regular routes, but we may still be able to come. Pick the closest town below or call{" "}
              <a href={`tel:${brand.phoneE164}`}>{brand.phone}</a>.
            </p>
          )}
          <label className="field">
            <span>Town</span>
            <select value={town} onChange={(e) => setTown(e.target.value)}>
              <option value="">Choose your town</option>
              {towns.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <div className="funnel-nav">
            <span />
            <button className="btn" disabled={!town} onClick={() => go(1)}>
              Next
            </button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby="f1">
          <h2 id="f1">How often should we clean?</h2>
          <div className="choices" role="radiogroup" aria-labelledby="f1">
            {plans.map((p) => (
              <button
                key={p.id}
                role="radio"
                aria-checked={plan === p.id}
                className={plan === p.id ? "choice on" : "choice"}
                onClick={() => setPlan(p.id)}
              >
                <span className="choice-top">
                  <strong>{p.name}</strong>
                  <span className="choice-price">
                    ${p.price} <small>{p.cadence}</small>
                  </span>
                </span>
                <span className="choice-body">{p.summary}</span>
                {p.popular && <span className="badge-inline">We recommend</span>}
              </button>
            ))}
          </div>
          <Nav back={() => go(0)} next={() => go(2)} />
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="f2">
          <h2 id="f2">How many bins?</h2>
          <p className="muted">Trash and recycling both count. The first bin is included, each extra is ${brand.extraBinPrice}.</p>
          <div className="stepper">
            <button aria-label="One fewer bin" onClick={() => setBins((b) => Math.max(1, b - 1))} disabled={bins <= 1}>
              <Minus aria-hidden />
            </button>
            <output aria-live="polite">
              {bins} bin{bins > 1 ? "s" : ""}
            </output>
            <button aria-label="One more bin" onClick={() => setBins((b) => Math.min(10, b + 1))}>
              <Plus aria-hidden />
            </button>
          </div>
          <PriceLine plan={planObj.name} cadence={planObj.cadence} price={price} bins={bins} town={townName} />
          <Nav back={() => go(1)} next={() => go(3)} />
        </section>
      )}

      {step === 3 && (
        <form aria-labelledby="f3" onSubmit={submit}>
          <h2 id="f3">Where should we come?</h2>
          <PriceLine plan={planObj.name} cadence={planObj.cadence} price={price} bins={bins} town={townName} />
          <label className="field">
            <span>Name</span>
            <input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="field">
            <span>Mobile phone</span>
            <input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="field">
            <span>Street address</span>
            <input required autoComplete="street-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>
          <label className="field">
            <span>Anything we should know? (optional)</span>
            <textarea rows={2} placeholder="Trash day, gate code, rental check-in..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </label>
          <p className="muted small">We need a phone or email to confirm your first clean. We never share your details.</p>
          <div className="funnel-nav">
            <button type="button" className="btn btn-ghost" onClick={() => go(2)}>
              <ChevronLeft size={18} aria-hidden /> Back
            </button>
            <button className="btn" type="submit" disabled={!canContact || sending}>
              {sending ? "Sending..." : "Request my clean"}
            </button>
          </div>
        </form>
      )}

      {step === 4 && (
        <section aria-labelledby="f4" className="done-step">
          <h2 id="f4">{delivered ? "Got it. We'll be in touch." : "Almost done: confirm in our scheduler"}</h2>
          <PriceLine plan={planObj.name} cadence={planObj.cadence} price={price} bins={bins} town={townName} />
          {delivered ? (
            <p>
              Jarrett has your request and will confirm your first clean. To lock in a date now, finish in our secure scheduler
              where you can also save your card.
            </p>
          ) : (
            <p>
              Finish in our secure scheduler to pick your start and save your card for billing. Prefer a text? Send us your
              request in one tap.
            </p>
          )}
          <div className="row">
            <a className="btn" href={brand.bookingUrl} target="_blank" rel="noopener" data-event="book_click">
              Open the scheduler
            </a>
            <a className="btn btn-ghost" href={smsHref(brand.phoneE164, leadSummary(lead))} data-event="sms_click">
              <MessageSquare size={18} aria-hidden /> Text my request
            </a>
            <a className="btn btn-ghost" href={`tel:${brand.phoneE164}`} data-event="call_click">
              <Phone size={18} aria-hidden /> Call
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

function Nav({ back, next }: { back: () => void; next: () => void }) {
  return (
    <div className="funnel-nav">
      <button className="btn btn-ghost" onClick={back}>
        <ChevronLeft size={18} aria-hidden /> Back
      </button>
      <button className="btn" onClick={next}>
        Next
      </button>
    </div>
  );
}

function PriceLine({ plan, cadence, price, bins, town }: { plan: string; cadence: string; price: number; bins: number; town?: string }) {
  return (
    <div className="price-line" aria-live="polite">
      <div>
        <strong>{plan}</strong>
        <span>
          {bins} bin{bins > 1 ? "s" : ""}
          {town ? ` · ${town}` : ""}
        </span>
      </div>
      <p>
        <span>${price}</span> {cadence}
      </p>
    </div>
  );
}
