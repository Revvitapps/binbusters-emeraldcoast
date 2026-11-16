import Link from "next/link";
import { brand, towns } from "@/content/site";
import { MAP_H, MAP_W, countyLines, landPath, townPoints } from "./service-map-data";

// Where each town's name sits, in map units: [x, y, anchor]. Coastal towns are lettered out in the
// Gulf, inland towns above. `minor` names are dropped on phones, where the map is too small to
// letter all 13 legibly (the town list under the map still names every one).
// `phone` moves a name for the phone lettering, which is set much larger.
type Spot = { x: number; y: number; anchor?: "start" | "middle" | "end" };
const labels: Record<string, Spot & { minor?: boolean; phone?: Spot }> = {
  navarre: { x: 118, y: 212, phone: { x: 118, y: 208 } },
  "wynnehaven-beach": { x: 249, y: 300, minor: true },
  "mary-esther": { x: 362, y: 214, anchor: "end", minor: true },
  wright: { x: 400, y: 128, anchor: "end", minor: true },
  "ocean-city": { x: 470, y: 142, minor: true },
  shalimar: { x: 528, y: 196, anchor: "start", minor: true },
  valparaiso: { x: 596, y: 100, anchor: "end", minor: true },
  niceville: { x: 641, y: 34, phone: { x: 641, y: 36 } },
  "bluewater-bay": { x: 732, y: 84, anchor: "start", minor: true },
  destin: { x: 650, y: 318, phone: { x: 600, y: 222 } },
  "miramar-beach": { x: 784, y: 346, phone: { x: 842, y: 352 } },
  sandestin: { x: 884, y: 318, anchor: "start", minor: true },
};

const HOME = "fort-walton-beach";

export function ServiceMap({ active }: { active?: string }) {
  const [hx, hy] = townPoints[HOME];
  const activeTown = active ? towns.find((t) => t.slug === active) : undefined;
  return (
    <figure className={`smap${active ? " has-active" : ""}`}>
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="smap-svg"
        role="group"
        aria-label={`Map of the ${towns.length} Emerald Coast towns ${brand.name} serves, from Navarre to Sandestin`}
      >
        <defs>
          <radialGradient id="smap-glow">
            <stop offset="0" stopColor="#45b153" stopOpacity="0.32" />
            <stop offset="1" stopColor="#45b153" stopOpacity="0" />
          </radialGradient>
          <pattern id="smap-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={MAP_W} height={MAP_H} fill="url(#smap-grid)" />
        <circle cx={hx} cy={hy} r="230" fill="url(#smap-glow)" />
        <path className="smap-land" d={landPath} fillRule="evenodd" />
        <path className="smap-county" d={countyLines.santaRosaOkaloosa + countyLines.okaloosaWalton} />

        <g className="smap-place" aria-hidden="true">
          <text x="18" y="30">Santa Rosa Co.</text>
          <text x="420" y="30" textAnchor="middle">Okaloosa Co.</text>
          <text x={MAP_W - 18} y="30" textAnchor="end">Walton Co.</text>
          <text className="smap-water" x="745" y="210" textAnchor="middle">Choctawhatchee Bay</text>
          <text className="smap-water" x={MAP_W - 30} y={MAP_H - 22} textAnchor="end">Gulf of Mexico</text>
        </g>

        {towns
          .filter((t) => t.slug !== HOME)
          .map((t, i) => {
            const [x, y] = townPoints[t.slug];
            const l = labels[t.slug];
            const on = t.slug === active;
            return (
              <Link
                key={t.slug}
                href={`/service-areas/${t.slug}`}
                className={`smap-town${l.minor ? " is-minor" : ""}${on ? " is-active" : ""}`}
                style={{ animationDelay: `${180 + i * 70}ms` }}
                aria-current={on ? "page" : undefined}
                aria-label={t.name}
              >
                {[l, l.phone ?? l].map((at, v) => (
                  <g key={v} className={v ? "for-phone" : l.phone ? "for-wide" : undefined}>
                    {(v === 0 || l.phone) && (
                      <>
                        <line x1={x} y1={y} x2={at.x} y2={at.y + (at.y < y ? 6 : v ? -26 : -14)} />
                        <text x={at.x} y={at.y} textAnchor={at.anchor ?? "middle"}>
                          {t.name}
                        </text>
                      </>
                    )}
                  </g>
                ))}
                <circle className="smap-hit" cx={x} cy={y} r="16" />
                <circle cx={x} cy={y} r={on ? 7 : 5} />
              </Link>
            );
          })}

        <Link
          href={`/service-areas/${HOME}`}
          className={`smap-home${active === HOME ? " is-active" : ""}`}
          aria-current={active === HOME ? "page" : undefined}
          aria-label="Fort Walton Beach, home base"
        >
          <line x1={hx} y1={hy} x2={hx} y2={hy + 50} />
          <circle className="smap-ping" cx={hx} cy={hy} r="9" />
          <circle className="smap-hit" cx={hx} cy={hy} r="18" />
          <circle cx={hx} cy={hy} r="8" />
          <text className="smap-home-name" x={hx} y={hy + 82} textAnchor="middle">
            Fort Walton Beach
          </text>
          <text className="smap-home-tag" x={hx} y={hy + 106} textAnchor="middle">
            Home base
          </text>
        </Link>
      </svg>
      <figcaption className="smap-cap">
        {activeTown
          ? `${activeTown.name} is on our regular route. Tap any town to see its page.`
          : `${towns.length} towns across Okaloosa, Walton and Santa Rosa counties. Tap a town to see its page.`}
      </figcaption>
    </figure>
  );
}
