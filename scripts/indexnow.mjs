// Pings IndexNow (Bing, Yandex, Seznam...) with every URL in the live sitemap, or the paths given.
// Usage: npm run indexnow            (all URLs)
//        npm run indexnow -- /pricing (just one)
import { readdirSync } from "node:fs";

const site = (process.env.SITE_URL || "https://binbusters-emeraldcoast.com").replace(/\/$/, "");
const host = new URL(site).host;
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("No IndexNow key file in public/");
const key = keyFile.slice(0, 32);

let urlList = process.argv.slice(2).map((p) => `${site}${p.startsWith("/") ? p : `/${p}`}`);
if (!urlList.length) {
  const xml = await (await fetch(`${site}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow ${res.status} for ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);
