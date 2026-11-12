import Image from "next/image";

// The Bin Busters wordmark and mascot, recovered from the original site (owner confirmed use, 2026-11-09).
// `onDark` swaps in the white version of the same wordmark for dark surfaces.
export function Logo({ height = 44, priority = false, onDark = false }: { height?: number; priority?: boolean; onDark?: boolean }) {
  return (
    <Image
      src={onDark ? "/brand/logo-white.png" : "/brand/logo.png"}
      alt="Bin Busters of the Emerald Coast"
      width={Math.round((height * 292) / 123)}
      height={height}
      priority={priority}
      loading={priority ? undefined : "eager"}
    />
  );
}

// Redrawn 2026-11-12 from the original mascot: same character, thinner even outlines, brighter colour.
// `sticker` adds a white keyline so it holds on dark surfaces. Decorative by default (alt="").
export function Mascot({ size = 267, priority = false, className, sticker = false, alt = "" }: { size?: number; priority?: boolean; className?: string; sticker?: boolean; alt?: string }) {
  return (
    <Image
      src={sticker ? "/brand/mascot-sticker.png" : "/brand/mascot.png"}
      alt={alt}
      width={size}
      height={Math.round((size * 725) / 760)}
      priority={priority}
      className={className}
    />
  );
}
