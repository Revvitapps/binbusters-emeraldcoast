// Builds PWA icons and the favicon from the Bin Busters mascot. Run: node scripts/make-icons.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/pwa", { recursive: true });
const MASCOT = "public/brand/mascot.png";

// Mascot centred on a plain white tile; `fill` is the share of the tile the mascot covers.
async function iconBuffer(size, fill, rounded) {
  const inner = Math.round(size * fill);
  const mascot = await sharp(MASCOT).trim().resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#ffffff"/></svg>`);
  return sharp(bg).composite([{ input: mascot, gravity: "center" }]).png().toBuffer();
}
async function icon(size, fill, rounded, file) {
  writeFileSync(file, await iconBuffer(size, fill, rounded));
}

// favicon.ico for browsers and crawlers that request /favicon.ico directly. PNG-compressed ICO with 16, 32 and 48px images.
async function favicon(file) {
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => iconBuffer(s, 0.96, false)));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(s, e); // width
    header.writeUInt8(s, e + 1); // height
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(pngs[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += pngs[i].length;
  });
  writeFileSync(file, Buffer.concat([header, ...pngs]));
}

await icon(192, 0.9, true, "public/pwa/icon-192.png");
await icon(512, 0.9, true, "public/pwa/icon-512.png");
// Maskable: full-bleed, mascot inside the 80% safe zone.
await icon(192, 0.72, false, "public/pwa/maskable-192.png");
await icon(512, 0.72, false, "public/pwa/maskable-512.png");
await icon(180, 0.86, false, "public/pwa/apple-touch-icon.png");
await icon(96, 0.96, false, "app/icon.png");
await favicon("app/favicon.ico");
console.log("icons written");
