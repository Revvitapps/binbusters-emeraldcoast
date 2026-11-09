import Image from "next/image";

// The Bin Busters wordmark and mascot, recovered from the original site (owner confirmed use, 2026-11-09).
export function Logo({ height = 52, priority = false }: { height?: number; priority?: boolean }) {
  return <Image src="/brand/logo.png" alt="Bin Busters of the Emerald Coast" width={Math.round((height * 292) / 123)} height={height} priority={priority} loading={priority ? undefined : "eager"} />;
}

export function Mascot({ size = 267, priority = false, className }: { size?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/brand/mascot.png"
      alt="The Bin Busters mascot, a slimy trash can inside a no symbol"
      width={size}
      height={Math.round((size * 272) / 267)}
      priority={priority}
      className={className}
    />
  );
}
