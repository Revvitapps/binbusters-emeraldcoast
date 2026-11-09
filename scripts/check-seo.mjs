// Reads the built HTML in .next/server/app and fails on SEO problems.
// Usage: npm run build && npm run check:seo
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
if (!existsSync(root)) {
  console.error("Run `npm run build` first.");
  process.exit(1);
}
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html") && !/_not-found|_global-error/.test(p)) files.push(p);
  }
};
walk(root);

const errors = [];
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const page = f.replace(root, "") || "/";
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, "&") ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (!title) errors.push(`${page}: no title`);
  if (title.length > 70) errors.push(`${page}: title ${title.length} chars: ${title}`);
  if (!desc) errors.push(`${page}: no description`);
  if (desc.length > 165) errors.push(`${page}: description ${desc.length} chars`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${page}: no canonical`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${page}: ${h1} h1 tags`);
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      errors.push(`${page}: heading skips h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }
  }
  for (const img of html.match(/<img[^>]*>/g) || []) if (!/\balt=/.test(img)) errors.push(`${page}: img without alt`);
  if (!/application\/ld\+json/.test(html)) errors.push(`${page}: no JSON-LD`);
}

const keys = readdirSync("public").filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (keys.length !== 1) errors.push("public/: expected exactly one IndexNow key file");
else if (readFileSync(join("public", keys[0]), "utf8").trim() !== keys[0].slice(0, 32))
  errors.push("IndexNow key file must contain only its key");

console.log(`Checked ${files.length} pages.`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("SEO check passed.");
