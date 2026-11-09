# Bin Busters of the Emerald Coast

Website for binbusters-emeraldcoast.com. Next.js 16 (App Router) on Vercel.

- Business facts (phone, email, prices, towns, FAQs) live in `content/site.ts`. Pages, schema, `llms.txt` and the sitemap read from there.
- `npm run build && npm run check:seo` checks titles, descriptions, canonicals, one h1, heading order, alt text and JSON-LD on the built HTML.
- `npm run indexnow` pings IndexNow with every sitemap URL (also runs from GitHub Actions after each production deploy).
- Env: `NEXT_PUBLIC_GA_ID` (GA4, production only), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, `NEXT_PUBLIC_BRAND_GBP_URL` (Google Business Profile link, adds sameAs + hasMap), `NEXT_PUBLIC_BRAND_EMAIL`.

## DNS rollback (Squarespace)
Before cutover the domain pointed to the old GoHighLevel site: `A @ 162.159.140.166` and `CNAME www sites.ludicrous.cloud`.
