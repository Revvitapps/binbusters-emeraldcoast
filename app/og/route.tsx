import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand } from "@/content/site";

const asset = async (name: string) => `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand", name))).toString("base64")}`;

// Branded share card: /og?title=...
export async function GET(req: Request) {
  const title = (new URL(req.url).searchParams.get("title") || brand.tagline).slice(0, 90);
  const [mascot, logo] = await Promise.all([asset("mascot.png"), asset("logo.png")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#bd1e2c", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 90, background: "#111111", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760, margin: 48, padding: 44, background: "rgba(17,17,17,0.9)", borderRadius: 28, color: "#fff" }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: 16, padding: "10px 16px", alignSelf: "flex-start" }}>
            <img src={logo} width={238} height={100} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#7fdc8b" }}>Veteran-owned · From $20/month · {brand.phone}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <img src={mascot} width={340} height={346} alt="" />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
