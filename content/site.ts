// Single source of truth for business facts (NAP, prices, towns, FAQs).
// Everything else (pages, schema, llms.txt, sitemap) reads from here.

const env = (key: string) => process.env[key]?.trim() || undefined;

export const siteUrl = (env("NEXT_PUBLIC_SITE_URL") ?? "https://binbusters-emeraldcoast.com").replace(/\/$/, "");

export const brand = {
  name: "Bin Busters of the Emerald Coast",
  shortName: "Bin Busters",
  tagline: "Trash can cleaning on the Emerald Coast",
  description:
    "Veteran-owned trash can cleaning in Fort Walton Beach, Destin, Navarre, Niceville and nearby. We sanitize and deodorize your bins at the curb with 200° water.",
  phone: env("NEXT_PUBLIC_BRAND_PHONE") ?? "(850) 396-2908",
  phoneE164: env("NEXT_PUBLIC_BRAND_PHONE_E164") ?? "+18503962908",
  email: env("NEXT_PUBLIC_BRAND_EMAIL") ?? "jarrettgordon8@gmail.com",
  // Service-area business: no street address is published unless the owner asks for it.
  region: "Florida",
  regionCode: "FL",
  country: "US",
  bookingUrl:
    env("NEXT_PUBLIC_BOOKING_URL") ??
    "https://clienthub.getjobber.com/client_hubs/5f0fc032-0a72-403a-9d37-10238d156c60/public/work_request/new",
  owner: {
    name: "Jarrett Gordon",
    jobTitle: "Owner",
    bio: "20-year U.S. Air Force veteran who started Bin Busters of the Emerald Coast as a family-owned business.",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61574866272048",
    "https://www.instagram.com/jarrettcgordon/",
    ...(env("NEXT_PUBLIC_BRAND_GBP_URL") ? [env("NEXT_PUBLIC_BRAND_GBP_URL") as string] : []),
  ],
  googleBusinessProfile: env("NEXT_PUBLIC_BRAND_GBP_URL"),
  extraBinPrice: 10,
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  cadence: string;
  unit?: string;
  summary: string;
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly Clean",
    price: 20,
    cadence: "per month",
    unit: "MON",
    summary: "Your bin cleaned every month, the day after trash pickup. Best for families and hot summer months.",
    popular: true,
  },
  {
    id: "quarterly",
    name: "Quarterly Clean",
    price: 35,
    cadence: "every 12 weeks",
    summary: "A deep clean every 12 weeks. Good for smaller households.",
  },
  {
    id: "one-time",
    name: "One-Time Clean",
    price: 50,
    cadence: "one visit",
    summary: "A single clean with no plan. Good before a move, a sale, a rental turnover or after a bad smell.",
  },
];

export type Town = {
  slug: string;
  name: string;
  county: "Okaloosa" | "Walton" | "Santa Rosa";
  intro: string;
  nearby: string[];
};

export const towns: Town[] = [
  {
    slug: "fort-walton-beach",
    name: "Fort Walton Beach",
    county: "Okaloosa",
    intro:
      "Fort Walton Beach is home base. We clean trash and recycling bins across the city, from the neighborhoods near Hurlburt Field to the homes off Beal Parkway and the Okaloosa Island side.",
    nearby: ["mary-esther", "ocean-city", "wright", "shalimar"],
  },
  {
    slug: "destin",
    name: "Destin",
    county: "Okaloosa",
    intro:
      "Destin homes and vacation rentals see heavy bin use, especially in season. Regular cleaning keeps smells and flies down between guests and through the summer heat.",
    nearby: ["miramar-beach", "sandestin", "fort-walton-beach"],
  },
  {
    slug: "navarre",
    name: "Navarre",
    county: "Santa Rosa",
    intro:
      "We cover Navarre in Santa Rosa County, west of Fort Walton Beach. We recommend monthly cleaning for families who want bins that stay fresh in the humidity.",
    nearby: ["wynnehaven-beach", "mary-esther", "fort-walton-beach"],
  },
  {
    slug: "niceville",
    name: "Niceville",
    county: "Okaloosa",
    intro:
      "Niceville households get the same curbside clean as the rest of the coast: hot water, sanitizer and deodorizer, right after trash day.",
    nearby: ["bluewater-bay", "valparaiso"],
  },
  {
    slug: "mary-esther",
    name: "Mary Esther",
    county: "Okaloosa",
    intro:
      "Mary Esther sits between Fort Walton Beach and Navarre, right on our regular route, so scheduling is easy.",
    nearby: ["fort-walton-beach", "wynnehaven-beach", "navarre"],
  },
  {
    slug: "shalimar",
    name: "Shalimar",
    county: "Okaloosa",
    intro:
      "Shalimar is a short drive from Fort Walton Beach and part of our weekly routes for recurring and one-time cleans.",
    nearby: ["fort-walton-beach", "wright", "valparaiso"],
  },
  {
    slug: "valparaiso",
    name: "Valparaiso",
    county: "Okaloosa",
    intro:
      "Valparaiso residents, including military families near Eglin, can use our monthly and quarterly plans to keep bins clean without the hose-and-scrub routine.",
    nearby: ["niceville", "shalimar", "bluewater-bay"],
  },
  {
    slug: "bluewater-bay",
    name: "Bluewater Bay",
    county: "Okaloosa",
    intro:
      "We clean bins throughout Bluewater Bay. Clean cans help with HOA standards and keep pests away from garages and driveways.",
    nearby: ["niceville", "valparaiso"],
  },
  {
    slug: "miramar-beach",
    name: "Miramar Beach",
    county: "Walton",
    intro:
      "Miramar Beach homes and rentals in Walton County are on our service list. A clean before guests arrive keeps bins from becoming a complaint.",
    nearby: ["sandestin", "destin"],
  },
  {
    slug: "sandestin",
    name: "Sandestin",
    county: "Walton",
    intro:
      "We serve homes in and around Sandestin. A one-time clean is a simple way to get a neglected bin back to new before guests arrive.",
    nearby: ["miramar-beach", "destin"],
  },
  {
    slug: "wright",
    name: "Wright",
    county: "Okaloosa",
    intro: "Wright is minutes from our home base in Fort Walton Beach and covered on our regular routes.",
    nearby: ["fort-walton-beach", "ocean-city", "shalimar"],
  },
  {
    slug: "ocean-city",
    name: "Ocean City",
    county: "Okaloosa",
    intro: "Ocean City homes get the same curbside bin cleaning and sanitizing as the rest of Fort Walton Beach.",
    nearby: ["fort-walton-beach", "wright", "shalimar"],
  },
  {
    slug: "wynnehaven-beach",
    name: "Wynnehaven Beach",
    county: "Okaloosa",
    intro: "We serve Wynnehaven Beach on the route between Mary Esther and Navarre.",
    nearby: ["mary-esther", "navarre"],
  },
];

export const townBySlug = (slug: string) => towns.find((t) => t.slug === slug);

export const steps = [
  {
    title: "Sign up",
    body: "Pick a monthly, quarterly or one-time clean and book online. Payment is handled through a secure portal.",
  },
  {
    title: "We come after trash pickup",
    body: "We schedule your clean for the day after your trash is collected, so your bins are empty. Leave them at the curb.",
  },
  {
    title: "Clean and sanitize",
    body: "Our trailer washes each bin inside and out with pressurized water over 200°F, which kills about 99% of bacteria and germs.",
  },
  {
    title: "Deodorize and return",
    body: "We finish with an eco-friendly deodorizer and put your bins back where you keep them.",
  },
];

export const benefits = [
  { title: "Kills germs", body: "Hot, pressurized water removes about 99% of the bacteria that grow in dirty bins." },
  { title: "Stops the smell", body: "An eco-friendly deodorizer keeps bins fresh in Gulf Coast heat and humidity." },
  { title: "Fewer pests", body: "Clean bins attract fewer flies, maggots, ants and rodents." },
  { title: "No mess for you", body: "Everything happens at the curb, and simple sign-up, scheduling, reminders and billing are handled online." },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does trash can cleaning cost?",
    a: "Monthly cleaning is $20 a month, quarterly cleaning is $35 every 12 weeks, and a one-time clean is $50. Each price includes one bin; each extra bin is $10.",
  },
  {
    q: "What areas do you serve?",
    a: "We clean bins in Fort Walton Beach, Destin, Navarre, Niceville, Mary Esther, Shalimar, Valparaiso, Bluewater Bay, Miramar Beach, Sandestin, Wright, Ocean City and Wynnehaven Beach in Florida. If you are nearby but not listed, call us and we will see if we can fit you in.",
  },
  {
    q: "Why should I have my trash bins professionally cleaned?",
    a: "Dirty bins grow bacteria and draw flies, maggots and rodents, especially in Florida heat. A professional clean with 200° water sanitizes the bin and removes the smell without you handling the mess.",
  },
  {
    q: "How often should I get my bins cleaned?",
    a: "Monthly is what we recommend for most homes, especially in summer. Quarterly works for smaller households that produce less food waste.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Leave your bins at the curb on your scheduled day and we will clean them and put them back.",
  },
  {
    q: "Do I need to empty my bins before you arrive?",
    a: "Your bins should be empty, so we come the day after trash pickup. If you have to put garbage in before we arrive, bag it and we will take it out and put it back after cleaning.",
  },
  {
    q: "How do you clean the bins?",
    a: "Our custom trailer sprays each bin inside and out with pressurized water heated over 200°F, which kills about 99% of bacteria. We then apply an eco-friendly deodorizer.",
  },
  {
    q: "Do you clean recycling bins and vacation rental bins?",
    a: "Yes. We clean trash and recycling bins for homes and vacation rentals. Each extra bin is $10.",
  },
  {
    q: "Do I need to keep payment info on file?",
    a: "For recurring plans, yes. You enter your card once in a secure payment portal and are billed automatically.",
  },
  {
    q: "Who owns Bin Busters of the Emerald Coast?",
    a: "Jarrett Gordon, a 20-year U.S. Air Force veteran. It is a local, family-owned business.",
  },
];

export const lastUpdated = "2026-11-09";
