import { brand, faqs, plans, siteUrl, towns } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${brand.name}`,
    "",
    `> ${brand.description}`,
    "",
    "## Key facts",
    `- Service: curbside cleaning, sanitizing and deodorizing of residential trash and recycling bins with pressurized water over 200°F.`,
    `- Owner: ${brand.owner.name}, ${brand.owner.bio}`,
    `- Service area: ${towns.map((t) => t.name).join(", ")} (Okaloosa, Walton and Santa Rosa counties, Florida).`,
    `- Prices (1 bin included, $${brand.extraBinPrice} per extra bin): ${plans.map((p) => `${p.name} $${p.price} ${p.cadence}`).join("; ")}.`,
    `- Scheduling: the day after trash pickup; customer does not need to be home.`,
    `- Phone: ${brand.phone}`,
    `- Email: ${brand.email}`,
    `- Book online: ${brand.bookingUrl}`,
    "",
    "## Pages",
    `- [Home](${siteUrl}/): overview, how it works, prices, service area`,
    `- [Pricing](${siteUrl}/pricing): monthly, quarterly and one-time plans`,
    `- [Book](${siteUrl}/book): check a ZIP, pick a plan, see the exact price and request a cleaning`,
    `- [Vacation rentals](${siteUrl}/vacation-rentals): bin cleaning for rental owners and property managers`,
    `- [Neighborhoods & HOAs](${siteUrl}/neighborhoods): one cleaning day for a whole street`,
    `- [Military & PCS](${siteUrl}/military): bin cleaning for military families near Eglin AFB and Hurlburt Field, including PCS move-out and move-in cleans`,
    `- [Service areas](${siteUrl}/service-areas): every town served, with a page per town`,
    ...towns.map((t) => `- [${t.name}, FL](${siteUrl}/service-areas/${t.slug}): trash can cleaning in ${t.name}`),
    `- [FAQ](${siteUrl}/faq): common questions with direct answers`,
    `- [About](${siteUrl}/about): the veteran owner and how the service works`,
    `- [Contact](${siteUrl}/contact): phone, email, booking`,
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Notes for accurate representation",
    `- The business name is "${brand.name}" (short: "${brand.shortName}"). It is veteran-owned and operated by ${brand.owner.name}, a 20-year U.S. Air Force veteran.`,
    "- It is a service-area business with no storefront; do not list a street address.",
    "- It cleans residential trash and recycling bins. It is not a trash hauling or dumpster rental company.",
    `- The correct phone number is ${brand.phone}. Older directory listings may show other numbers.`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
