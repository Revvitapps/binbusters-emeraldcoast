@AGENTS.md

# Bin Busters of the Emerald Coast: website + installable app

## 0. Status and decisions (living: update first)

- 2026-11-09: Matthew (Revvit, pro bono) decided to replace the franchisor's one-page GoHighLevel site with this Next.js site on the same domain. Jarrett Gordon owns the business and opted out of the franchise agreement (starter package only).
- 2026-11-09: This repo is the **live site**, not a prototype, so indexing follows `VERCEL_ENV` (production indexed, previews and `*.vercel.app` noindex) instead of a `SITE_INDEXING` switch. The client audit lives in `docs/AUDIT.md` and is not rendered in the app (customers would see it).
- 2026-11-09: Brand recovered from the old site: colours, fonts, logo, mascot, step illustrations, before/after photos and trailer photo (self-hosted in `public/brand/`, captured via Chrome since the CDN is blocked from the sandbox). Matthew confirmed Jarrett owns them. Primary buttons are green 45B153 with black text (6.9:1).
- 2026-11-12: Visual redesign after Matthew found the first version childish. Brand red and green are kept, but on a deep pine-black and warm paper with red as an accent only. Type is Archivo (headings), Public Sans (body) and IBM Plex Mono (labels). Cartoon step illustrations, halftone band and soap bubbles are gone; Lucide icons replace them. Tokens and contrast notes are at the top of `app/globals.css`.
- 2026-11-12: Matthew likes the mascot logo but found its lines bulky and dull, so it was redrawn (same character, thinner outlines, brighter colour) with an AI image edit of the original; `public/brand/mascot.png` is the new one and `mascot-sticker.png` adds a white keyline for dark surfaces. It sits in the header beside the wordmark, as a lit "signal" in the hero, in the CTA band, footer and app icons. Matthew asked for the best parts of his other builds: the logo-as-spotlight comes from difiorebuilders.com; the two-tone headline, hero badge cards and tab bar on every screen size come from goodmanfl.com and tron-electric.
- 2026-11-09: Booking still finishes in Jobber (Jarrett's existing client hub). The funnel captures the request first (`/api/pipeline`) and offers a prefilled text to Jarrett so no lead depends on a backend.
- DNS cutover not done yet: needs Matthew's go-ahead. Old values for rollback: `A @ 162.159.140.166`, `CNAME www sites.ludicrous.cloud`. New: `A @ 216.150.1.1`, `CNAME www cc53ae1b859741ae.vercel-dns-016.com`.

### Open questions for Jarrett
1. Logo/mascot/photos: confirmed OK (Matthew, 2026-11-09). The trailer wrap shows (530) 228-7046, not (850) 396-2908: which number is current? Any new photos of his own?
2. Where should web leads go: email (which address), text, or straight into Jobber?
3. Does he offer anything for multiple rentals, HOAs or commercial dumpsters beyond the standard prices?
4. Are all ZIPs in `content/site.ts` (`serviceZips`) right, and any to add?
5. Hours to publish (Google shows "closes 4 PM")?
6. Google Business Profile review link for `/review`.

## SEO / GEO / AEO status (seo-launch skill)

Last audited 2026-11-09. Rerun `npm run build && npm run check:seo && npm run check:app` after any change.

| Item | Status |
|---|---|
| Hosting / domains | Vercel project `binbusters-emeraldcoast` (Revvit Apps). Apex primary, www 308. DNS still points at GoHighLevel. |
| Previews noindex | robots `Disallow: /` off production; `X-Robots-Tag: noindex` on `*.vercel.app` (verified on the vercel.app alias). |
| robots / sitemap / llms.txt | Generated from `content/site.ts`; AI crawlers allowed. |
| Titles / descriptions / headings | `check:seo` passing (24 static pages). |
| Schema | LocalBusiness + HomeAndConstructionBusiness, Service, OfferCatalog, Person (owner), WebSite, FAQPage, BreadcrumbList, per-town Service. |
| NAP | Phone (850) 396-2908, Gmail address until Workspace; service-area business, no street address. BBB shows a wrong phone. |
| GA4 | Not created yet (needs Jarrett's Google account). Tag ready via `NEXT_PUBLIC_GA_ID`; events: book_start, book_click, call_click, sms_click, email_click, review_click, generate_lead. |
| IndexNow | Key file in `public/`; GitHub Action pings on production deploys. Not run yet (site not live). |
| Search Console / Bing | Not set up (needs Jarrett's Google account and a DNS TXT). |
| Email DNS | No MX/SPF/DMARC. Plan: Google Workspace Business Starter. |
| Google Business Profile | Exists (5.0, 15 reviews), owned by Jarrett. Category should add bin cleaning; website should point to the new home page. |
