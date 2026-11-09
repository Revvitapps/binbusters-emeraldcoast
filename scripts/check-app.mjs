// End-to-end checks on the production build. Usage: npm run build && npm run check:app [-- --shots <dir>]
// Boots `next start`, requests every route, walks the booking funnel, runs axe, checks overflow at 360/390/1440,
// and confirms the offline fallback once the service worker is installed.
import { spawn } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium, devices } = require("playwright");

const PORT = 3456;
const BASE = `http://localhost:${PORT}`;
const shotsArg = process.argv.indexOf("--shots");
const SHOTS = shotsArg > -1 ? process.argv[shotsArg + 1] : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

try {
  await fetch(BASE);
  console.error(`Port ${PORT} is already in use; stop the other server first.`);
  process.exit(1);
} catch {}
const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], { stdio: "ignore" });
const fail = [];
const log = (m) => console.log(m);
try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }

  // 1. Routes
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  const extra = ["/book", "/book?plan=one-time", "/review", "/robots.txt", "/llms.txt", "/manifest.webmanifest", "/sw.js", "/offline.html", "/og?title=Test", "/pwa/icon-512.png"];
  for (const p of [...paths, ...extra]) {
    const r = await fetch(BASE + p);
    if (r.status !== 200) fail.push(`route ${p} -> ${r.status}`);
  }
  log(`routes: ${paths.length + extra.length} checked`);
  for (const [from, to] of [["/faqs", "/faq"], ["/privacy-policy", "/privacy"]]) {
    const r = await fetch(BASE + from, { redirect: "manual" });
    if (![301, 308].includes(r.status) || !r.headers.get("location")?.endsWith(to)) fail.push(`redirect ${from}`);
  }
  const api = await fetch(`${BASE}/api/pipeline`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "book", name: "Test", phone: "8505550100" }) });
  if (!api.ok) fail.push(`api/pipeline -> ${api.status}`);
  const bad = await fetch(`${BASE}/api/pipeline`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  if (bad.status !== 422) fail.push(`api/pipeline accepted empty lead (${bad.status})`);

  const browser = await chromium.launch();
  const axeSrc = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

  // 2. Layout, tab bar, a11y on every main route
  const main = ["/", "/book", "/pricing", "/service-areas", "/service-areas/destin", "/vacation-rentals", "/neighborhoods", "/military", "/faq", "/about", "/contact", "/review"];
  for (const [name, ctxOpts] of [
    ["phone", { ...devices["iPhone 13"] }],
    ["narrow", { viewport: { width: 360, height: 740 } }],
    ["desktop", { viewport: { width: 1440, height: 900 } }],
  ]) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    for (const p of main) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      const sw = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, window.innerWidth) - (window.visualViewport?.width ?? window.innerWidth) * (window.visualViewport?.scale ?? 1));
      if (sw > 0) fail.push(`${name} ${p}: horizontal overflow ${sw}px`);
      if (!(await page.locator(".tabbar .tab-center").isVisible())) fail.push(`${name} ${p}: tab bar missing`);
      if (name !== "narrow") {
        await page.addScriptTag({ content: axeSrc });
        const res = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] })).violations.map((v) => `${v.id} (${v.nodes.length})`));
        if (res.length) fail.push(`${name} ${p}: axe ${res.join(", ")}`);
      }
      if (SHOTS && name !== "narrow") await page.screenshot({ path: `${SHOTS}/${name}${p === "/" ? "-home" : p.replace(/\//g, "-")}.png`, fullPage: name === "desktop" && p === "/" });
    }
    await ctx.close();
  }
  log("layout + axe: done");

  // 3. Funnel walk-through on a phone
  {
    const ctx = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/book`);
    await page.fill('input[autocomplete="postal-code"]', "32541");
    await page.getByText("Good news").waitFor();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("radio", { name: /Quarterly/ }).click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "One more bin" }).click();
    const price = await page.locator(".price-line p span").first().innerText();
    if (price !== "$45") fail.push(`funnel price for quarterly + 2 bins = ${price}, expected $45`);
    await page.getByRole("button", { name: "Next" }).click();
    await page.fill('input[autocomplete="name"]', "Test Person");
    await page.fill('input[autocomplete="tel"]', "8505550100");
    await page.fill('input[autocomplete="street-address"]', "1 Test St");
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/funnel-details.png` });
    await page.getByRole("button", { name: "Request my clean" }).click();
    await page.getByRole("link", { name: "Open the scheduler" }).waitFor();
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/funnel-done.png` });
    // Ask drawer
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.locator(".tabbar").getByRole("button", { name: "Ask" }).click();
    await page.getByRole("button", { name: "Prices" }).click();
    await page.getByRole("button", { name: "How much is it?" }).click();
    await page.getByText("$20 a month").first().waitFor();
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/ask.png` });
    await ctx.close();
    log("funnel + ask: done");
  }

  // 4. Offline: install the SW, kill the network, reload an unvisited page.
  {
    const ctx = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await ctx.newPage();
    await page.goto(BASE);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.reload();
    await ctx.setOffline(true);
    await page.goto(`${BASE}/terms`).catch(() => {});
    const offlineText = await page.textContent("body").catch(() => "");
    if (!offlineText?.includes("You're offline")) fail.push("offline fallback not shown");
    await page.goto(`${BASE}/book`).catch(() => {});
    if (!(await page.textContent("body").catch(() => ""))?.includes("Book your bin cleaning")) fail.push("/book not available offline");
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/offline-book.png` });
    await ctx.close();
    log("offline: done");
  }
  await browser.close();
} finally {
  server.kill();
}

if (fail.length) {
  console.error("FAILED:\n" + fail.join("\n"));
  process.exit(1);
}
console.log("App checks passed.");
