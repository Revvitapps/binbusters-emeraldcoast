@AGENTS.md

# Bin Busters of the Emerald Coast: website + installable app

## 0. Status and decisions (living: update first)

- 2026-11-09: Matthew (Revvit, pro bono) decided to replace the franchisor's one-page GoHighLevel site with this Next.js site on the same domain. Jarrett Gordon owns the business and opted out of the franchise agreement (starter package only).
- 2026-11-09: This repo is the **live site**, not a prototype, so indexing follows `VERCEL_ENV` (production indexed, previews and `*.vercel.app` noindex) instead of a `SITE_INDEXING` switch. The client audit lives in `docs/AUDIT.md` and is not rendered in the app (customers would see it).
- 2026-11-09: Brand recovered from the old site: colours, fonts, logo, mascot, step illustrations, before/after photos and trailer photo (self-hosted in `public/brand/`, captured via Chrome since the CDN is blocked from the sandbox). Matthew confirmed Jarrett owns them. Primary buttons are green 45B153 with black text (6.9:1).
- 2026-11-12: Visual redesign after Matthew found the first version childish. Brand red and green are kept, but on a deep pine-black and warm paper with red as an accent only. Type is Archivo (headings), Public Sans (body) and IBM Plex Mono (labels). Cartoon step illustrations, halftone band and soap bubbles are gone; Lucide icons replace them. Tokens and contrast notes are at the top of `app/globals.css`.
- 2026-11-12: Matthew likes the mascot logo but found its lines bulky and dull, so it was redrawn (same character, thinner outlines, brighter colour) with an AI image edit of the original; `public/brand/mascot.png` is the new one and `mascot-sticker.png` adds a white keyline for dark surfaces. It sits in the header beside the wordmark, as a lit "signal" in the hero, in the CTA band, footer and app icons. Matthew asked for the best parts of his other builds: the logo-as-spotlight comes from difiorebuilders.com; the two-tone headline, hero badge cards and tab bar on every screen size come from goodmanfl.com and tron-electric.
- 2026-11-12: Matthew liked the spotlight and asked for it more centred and used as the background of the mobile app. On desktop the lit mascot disc is centred above the trailer with a soft beam falling onto it; at 960px and below it sits at the top centre of the hero and its beam is the backdrop behind the headline.
- 2026-11-12: Matthew asked for a Ghostbusters play: the trailer turned to face the other way with the logo rising out of it. `public/brand/trailer-left.png` is the original cutout mirrored and then redrawn with an AI image edit so the wrap lettering reads correctly (same wording, still the (530) number, sharper at 1280px). On desktop a beam leaves the base of the tipped can (Matthew moved it there from the wash bay) and opens out to the lit mascot disc (`.hero-rig`, `.hero-beam` in `app/globals.css`). A real photo from Jarrett should replace it when he has one.
- 2026-11-12: After trying the beam from the wash bay and then from the base of the can, Matthew asked to take the logo and beam away altogether. The desktop hero is now the left-facing trailer on its own. The lit mascot and its beam remain only at 960px and below, as the phone hero backdrop he asked for earlier.
- 2026-11-16: Matthew asked for a service-area map shaped like the Emerald Coast, as on his Gateway Payments site (`Revvitapps/gateway-pitch`). `components/service-map.tsx` draws the real coastline (GSHHS full resolution via `pip install basemap basemap-data-hires`, since Census/OSM hosts are blocked from the sandbox) with Census county lines; regenerate with `scripts/build-service-map.py`. It sits in the dark "Where we clean" section (home and town pages, current town in red) and on `/service-areas`.
- 2026-11-09: Booking still finishes in Jobber (Jarrett's existing client hub). The funnel captures the request first (`/api/pipeline`) and offers a prefilled text to Jarrett so no lead depends on a backend.
- 2026-11-16: Quick booking. A "Book now in Jobber" card (`components/quick-book.tsx`) sits under the plans on home and `/pricing` (hero links to it) and on step 1 of `/book`. One tap opens Jobber and posts a `quick` lead (name and contact optional) so Jarrett gets a heads-up email. The last `/book` step now leads with "Finish booking in Jobber"; text and call are the fallback. `app/favicon.ico` is generated from the mascot by `npm run icons`.
- 2026-11-18: The hero trailer photo now reads 850-396-2908. The digits were rebuilt from the photo's own glyphs (a 9 is the 6 turned over), and the blacks and tires were deepened so it looks newer. See `scripts/trailer-swap-number.py` and `scripts/trailer-deepen-blacks.py` (run in that order on the 530 original from git history); the AI-made 850 version on static.magica.com could not be downloaded.
- 2026-11-16: DNS switched; the site is live on Vercel. Lead email goes through Jarrett's own Resend account (domain verified, sender leads@binbusters-emeraldcoast.com) to jarrett@binbusters-emeraldcoast.com; a live test lead arrived. Old values for rollback: `A @ 162.159.140.166`, `CNAME www sites.ludicrous.cloud`. New: `A @ 216.150.1.1`, `CNAME www cc53ae1b859741ae.vercel-dns-016.com`.

- 2026-11-24: SEO scorecard fixes. The sitemap no longer stamps one shared lastmod on every URL. Opening hours are still not in the LocalBusiness schema: they wait on question 5 below.

### Open questions for Jarrett
1. Logo/mascot/photos: confirmed OK (Matthew, 2026-11-09). The trailer photo now shows (850) 396-2908 (edited 2026-11-18); does the real wrap still say (530)? Any new photos of his own?
2. Where should web leads go: email (which address), text, or straight into Jobber?
3. Does he offer anything for multiple rentals, HOAs or commercial dumpsters beyond the standard prices?
4. Are all ZIPs in `content/site.ts` (`serviceZips`) right, and any to add?
5. Hours to publish (Google shows "closes 4 PM")?
6. Google Business Profile review link for `/review`.

## SEO / GEO / AEO status (seo-launch skill)

Last audited 2026-11-09. Rerun `npm run build && npm run check:seo && npm run check:app` after any change.

| Item | Status |
|---|---|
| Hosting / domains | Vercel project `binbusters-emeraldcoast` (Revvit Apps). Apex primary, www 308. DNS switched to Vercel 2026-11-16. |
| Previews noindex | robots `Disallow: /` off production; `X-Robots-Tag: noindex` on `*.vercel.app` (verified on the vercel.app alias). |
| robots / sitemap / llms.txt | Generated from `content/site.ts`; AI crawlers allowed. Sitemap URLs carry no lastmod (2026-11-24: the one shared date was dropped). |
| Titles / descriptions / headings | `check:seo` passing (24 static pages). |
| Schema | LocalBusiness + HomeAndConstructionBusiness, Service, OfferCatalog, Person (owner), WebSite, FAQPage, BreadcrumbList, per-town Service. |
| NAP | Phone (850) 396-2908, Gmail address until Workspace; service-area business, no street address. BBB shows a wrong phone. |
| GA4 | Not created yet (needs Jarrett's Google account). Tag ready via `NEXT_PUBLIC_GA_ID`; events: book_start, book_click, call_click, sms_click, email_click, review_click, generate_lead. |
| IndexNow | Key file in `public/`; GitHub Action pings on production deploys. Not run yet (site not live). |
| Search Console / Bing | Not set up (needs Jarrett's Google account and a DNS TXT). |
| Email DNS | Google Workspace MX/SPF/DKIM, Resend DKIM + send records, DMARC p=none (2026-11-16). |
| Google Business Profile | Exists (5.0, 15 reviews), owned by Jarrett. Category should add bin cleaning; website should point to the new home page. |
