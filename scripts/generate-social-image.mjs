import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

// Regenerate with: node scripts/generate-social-image.mjs
// Keep the artwork native to the site so the logo, copy and colors stay editable.
const root = new URL("../", import.meta.url);
const [logo, photo] = await Promise.all([
  readFile(new URL("public/Logo-blanco.png", root)),
  readFile(new URL("public/wal_limpieza.png", root)),
]);
const png = (buffer) => `data:image/png;base64,${buffer.toString("base64")}`;
const box = (style, ...children) => h("div", { style: { display: "flex", ...style } }, ...children);

const artwork = box(
  { width: "100%", height: "100%", background: "#faf9f6", color: "#193a37", fontFamily: "sans-serif", position: "relative" },
  box(
    { width: 670, height: "100%", padding: "50px 0 42px 56px", flexDirection: "column" },
    box(
      { alignItems: "center", gap: 18 },
      h("img", { src: png(logo), width: 76, height: 76, alt: "", style: { borderRadius: "50%" } }),
      box(
        { flexDirection: "column" },
        box({ fontSize: 37, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1 }, "Walter"),
        box({ fontSize: 12, letterSpacing: 2.3, marginTop: 9 }, "LIMPIEZA DE TAPIZADOS"),
      ),
    ),
    box(
      { flexDirection: "column", fontSize: 67, fontWeight: 700, letterSpacing: -3.3, lineHeight: 1.08, marginTop: 47 },
      box({}, "Limpieza de"),
      box({}, "tapizados en"),
      box({ color: "#12675c" }, "Santa Fe"),
    ),
    box({ fontSize: 25, color: "#586965", marginTop: 26 }, "Servicio profesional a domicilio."),
    box(
      { marginTop: "auto", paddingTop: 22, borderTop: "1px solid #dbe3dd", width: 540, alignItems: "center", gap: 12 },
      box({ width: 9, height: 9, borderRadius: "50%", background: "#12675c" }),
      box({ fontSize: 18, color: "#12675c" }, "Sillones · Colchones · Sillas · Autos"),
    ),
  ),
  box(
    { position: "absolute", left: 680, top: 32, width: 488, height: 566, borderRadius: "18px 74px 18px 18px", overflow: "hidden", background: "#eaf1ed" },
    h("img", { src: png(photo), width: 488, height: 566, alt: "", style: { objectFit: "cover", objectPosition: "57% center" } }),
    box(
      { position: "absolute", left: 22, right: 22, bottom: 22, background: "#faf9f6", borderRadius: 10, padding: "20px 24px", flexDirection: "column", color: "#193a37" },
      box({ fontSize: 23, fontWeight: 700 }, "Cuidamos tus muebles"),
      box({ fontSize: 23 }, "a conciencia."),
    ),
  ),
);

const response = new ImageResponse(artwork, { width: 1200, height: 630 });
const imagePath = new URL("src/app/opengraph-image.png", root);
await writeFile(imagePath, Buffer.from(await response.arrayBuffer()));
console.log(`Social image generated: ${fileURLToPath(imagePath)}`);
