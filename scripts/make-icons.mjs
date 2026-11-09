// Builds PWA icons and the favicon from the Bin Busters mascot. Run: node scripts/make-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/pwa", { recursive: true });
const MASCOT = "public/brand/mascot.png";

// Mascot centred on a white tile; `fill` is the share of the tile the mascot covers.
async function icon(size, fill, rounded, file) {
  const inner = Math.round(size * fill);
  const mascot = await sharp(MASCOT).trim().resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#ffffff"/><rect y="${Math.round(size * 0.44)}" width="${size}" height="${Math.round(size * 0.12)}" fill="#111111"/></svg>`);
  await sharp(bg).composite([{ input: mascot, gravity: "center" }]).png().toFile(file);
}

await icon(192, 0.9, true, "public/pwa/icon-192.png");
await icon(512, 0.9, true, "public/pwa/icon-512.png");
// Maskable: full-bleed, mascot inside the 80% safe zone.
await icon(192, 0.72, false, "public/pwa/maskable-192.png");
await icon(512, 0.72, false, "public/pwa/maskable-512.png");
await icon(180, 0.86, false, "public/pwa/apple-touch-icon.png");
await icon(96, 0.96, false, "app/icon.png");
console.log("icons written");
