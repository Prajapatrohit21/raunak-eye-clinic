import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Raunak Eye Care Hospital Dewas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0E4D4C",
          padding: "60px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative inner border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(232, 217, 197, 0.2)",
            borderRadius: 16,
          }}
        />

        {/* Amber Eye Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "rgba(193, 127, 58, 0.15)",
            marginBottom: 24,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C17F3A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" fill="#C17F3A" />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#FBF7F0",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Raunak
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#C17F3A",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 32,
            fontFamily: "sans-serif",
          }}
        >
          EYE CARE HOSPITAL
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#E8D9C5",
            marginBottom: 28,
            fontStyle: "italic",
          }}
        >
          "See clearly. Live fully."
        </div>

        {/* Address & Super-Specialities */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            color: "#FBF7F0",
            fontFamily: "sans-serif",
            backgroundColor: "rgba(32, 29, 24, 0.25)",
            padding: "12px 28px",
            borderRadius: 999,
          }}
        >
          <span>Retina · Squint · Cataract</span>
          <span>•</span>
          <span>121, Moti Bunglow Main Rd, Dewas MP</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
