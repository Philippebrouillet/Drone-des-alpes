import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/constant";

export const alt = `${APP_NAME} - Nettoyage par drone en Haute-Savoie, Savoie et Isère`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image de partage (Open Graph / Twitter) au format attendu : 1200x630.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c2b6a 0%, #05112a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9eaac3",
            marginBottom: 24,
          }}
        >
          {APP_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          Nettoyage par drone
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#ced5e1",
            marginBottom: 40,
          }}
        >
          Toiture · Façade · Bâtiment industriel · Gouttières
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              background: "#f23455",
              padding: "14px 28px",
              borderRadius: 999,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Sans échafaudage
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9eaac3" }}>
            Haute-Savoie · Savoie · Ain · Isère · Jura
          </div>
        </div>
      </div>
    ),
    size,
  );
}
