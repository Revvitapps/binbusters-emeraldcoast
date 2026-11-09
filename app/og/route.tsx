import { ImageResponse } from "next/og";
import { brand } from "@/content/site";

// Branded share card: /og?title=...
export function GET(req: Request) {
  const title = (new URL(req.url).searchParams.get("title") || brand.tagline).slice(0, 90);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #111111 0%, #2a0a0d 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, opacity: 0.9 }}>{brand.name}</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.9 }}>
          Veteran-owned · From $20/month · {brand.phone}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
