// Builds PWA icons from an inline SVG mark. Run: node scripts/make-icons.mjs
// Swap MARK for the owner's logo artwork once he confirms he can use it.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/pwa", { recursive: true });

const can = (scale) => `
  <g transform="translate(256 256) scale(${scale}) translate(-32 -32)">
    <path d="M18 22h28l-3 30a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3z" fill="#fff"/>
    <rect x="15" y="16" width="34" height="6" rx="2" fill="#fff"/>
    <path d="M27 31c3 3 7 3 10 0M27 40c3 3 7 3 10 0" stroke="#bd1e2c" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
const svg = (scale, rounded) => `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="#111111"/>
  <circle cx="256" cy="256" r="${rounded ? 200 : 170}" fill="#bd1e2c"/>
  ${can(scale)}
</svg>`;

const out = async (s, size, file) => sharp(Buffer.from(s)).resize(size, size).png().toFile(`public/pwa/${file}`);
await out(svg(7, true), 192, "icon-192.png");
await out(svg(7, true), 512, "icon-512.png");
// Maskable: full-bleed background, mark inside the 80% safe zone.
await out(svg(5.6, false), 192, "maskable-192.png");
await out(svg(5.6, false), 512, "maskable-512.png");
await out(svg(7, false), 180, "apple-touch-icon.png");
console.log("icons written to public/pwa/");
