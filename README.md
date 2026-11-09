# Bin Busters of the Emerald Coast

The website and installable app for binbusters-emeraldcoast.com, a veteran-owned trash can cleaning business serving Fort Walton Beach, Destin, Navarre and 10 nearby towns. It replaces a one-page GoHighLevel funnel with a fast, searchable site that walks visitors to an exact price and a booking in Jobber. Next.js 16 (App Router) on Vercel. Status, decisions and open questions: [CLAUDE.md](CLAUDE.md). Client audit: [docs/AUDIT.md](docs/AUDIT.md).

## Run

```bash
npm install
npm run dev          # http://localhost:3000 (also on your LAN for phone testing)
npm run build
npm run typecheck
npm run check:seo    # titles, descriptions, canonicals, one h1, heading order, alt text, JSON-LD (built HTML)
npm run check:app    # boots the build: every route, redirects, API, axe at phone + desktop, overflow at 360/390/1440,
                     # funnel walk-through with price check, Ask drawer, offline fallback. Add -- --shots <dir> for screenshots.
npm run icons        # regenerate PWA icons
npm run indexnow     # ping IndexNow with every sitemap URL (also runs from GitHub Actions after production deploys)
```

## Env

All optional; see [.env.example](.env.example).

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4, loads on Vercel production only |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Search Console / Bing meta tags |
| `NEXT_PUBLIC_BRAND_GBP_URL` | Business Profile link, adds `sameAs` + `hasMap` |
| `NEXT_PUBLIC_GBP_REVIEW_URL` | Direct "write a review" link for `/review` |
| `NEXT_PUBLIC_BRAND_EMAIL` | Overrides the email shown everywhere |
| `NEXT_PUBLIC_BOOKING_URL` | Jobber work-request link |
| `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` | Email each web lead |
| `PIPELINE_WEBHOOK_URL` | Post each lead to Zapier, Make, Slack or a CRM |

## Brand

| Token | Value | Source |
|---|---|---|
| Red | `#BD1E2C` (`--red`), deep `#9C1824` | Header band on the old site |
| Green | `#45B153` (`--green`) for fills; `#2B7A36` (`--green-deep`) for text, since white on #45B153 is 2.7:1 | Old site buttons |
| Black | `#111111` | Old site text and stripe |
| Headings | Montserrat 600-800 | Old site |
| Body | Lato 400/700 | Old site |
| Logo / icons | Stand-in bin mark (`components/logo.tsx`, `scripts/make-icons.mjs`) | Ours. The Bin Busters logo and mascot were not copied (see CLAUDE.md) |

Business facts (phone, email, prices, towns, ZIPs, FAQs) live in `content/site.ts`; pages, schema, `llms.txt`, the sitemap and the Ask helper all read from it.

## Screens

| Route | What it is |
|---|---|
| `/` | Hero, "What do you need?" (7 tap answers), how it works, prices, towns, owner story, FAQ |
| `/book` | Funnel: ZIP check, plan, bins (live price), details, then Jobber, text or call. `?plan=` and `?town=` prefill |
| `/pricing`, `/faq`, `/about`, `/contact` | Core pages |
| `/service-areas`, `/service-areas/<town>` | 13 town pages with local intro, nearby links, prices, town FAQ, Service schema |
| `/vacation-rentals`, `/neighborhoods` | Segment pages with call-back forms |
| `/review` | Short link for review requests (noindex) |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt`, `/og` | Machine-readable files and share images |
| Ask (tab bar) | Scripted answers from the FAQ and prices; anything else goes to call or text |

App shell: manifest with shortcuts, service worker (`public/sw.js`, production only, network-first pages, `/offline.html` fallback), install prompt from the second visit or after a request, bottom tab bar on every screen size with Book raised in the centre.

## Real vs stubbed

- Real: prices, towns, phone, email, owner story, FAQ answers, Jobber link.
- Lead delivery: `/api/pipeline` validates and forwards to email/webhook **only when env is set**. Until then each finished request offers "Open the scheduler" (Jobber) and a prefilled text to Jarrett, so nothing depends on it.
- ZIP list: from public ZIP boundaries; an unlisted ZIP is never a "no", it asks people to call.
- Photos: none yet. Waiting on Jarrett.

## Verified

2026-11-09: `typecheck`, `build`, `check:seo` (24 pages) and `check:app` pass. Viewports: iPhone 13 (390x664), 360x740, 1440x900. Lighthouse not run yet.

## Launch

1. Squarespace DNS (domain owner Jarrett, Matthew is a manager): `A @ 216.150.1.1`, `CNAME www cc53ae1b859741ae.vercel-dns-016.com`. Rollback: `A @ 162.159.140.166`, `CNAME www sites.ludicrous.cloud`.
2. Confirm the Vercel domain shows Valid, fetch `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` on the live domain.
3. Search Console Domain property (TXT in Squarespace), submit the sitemap, request indexing for home, /book, /pricing and the biggest towns. Bing import. `npm run indexnow`.
4. Business Profile: website to the new home page, add a bin-cleaning category.
