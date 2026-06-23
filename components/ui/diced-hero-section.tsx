"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface DicedHeroSectionProps {
  topText?: string;
  mainText?: string;
  subMainText?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  images?: [string, string, string, string];
  backgroundColor?: string;
  fontFamily?: string;
}

const CLIP_PATHS = [
  "polygon(0 0, 100% 0, 90% 100%, 0 100%)",    // TL — right edge angled
  "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",  // TR — left edge angled
  "polygon(0 0, 90% 0, 100% 100%, 0 100%)",     // BL — top-right angled
  "polygon(0 0, 100% 0, 100% 90%, 10% 100%)",   // BR — bottom-left angled
];

export function DicedHeroSection({
  topText = "Discover",
  mainText = "Transform Your Experience",
  subMainText = "Join thousands of satisfied customers.",
  buttonText = "Get Started",
  onButtonClick,
  images = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
  ],
  backgroundColor = "#FFFAF4",
  fontFamily = "'Poppins', sans-serif",
}: DicedHeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <>
      <style>{`
        .dhs-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .dhs-cell:hover .dhs-img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .dhs-grid { display: none !important; }
          .dhs-inner { grid-template-columns: 1fr !important; }
          .dhs-text { padding: 100px 6% 60px !important; }
        }
      `}</style>
      <section
        ref={containerRef}
        style={{
          backgroundColor,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative background orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(232,146,12,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "2%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(194,80,48,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          className="dhs-inner"
          style={{
            maxWidth: "1320px",
            width: "100%",
            margin: "0 auto",
            padding: "0 5%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left: Text content */}
          <div className="dhs-text" style={{ padding: "80px 0 60px" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                color: "var(--diced-hero-section-top-text, #C25030)",
                fontFamily,
                fontWeight: 600,
                fontSize: "0.82rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              {topText}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
                lineHeight: 1.08,
                marginBottom: "28px",
                background:
                  "linear-gradient(135deg, var(--diced-hero-section-main-gradient-from, #C25030) 20%, var(--diced-hero-section-main-gradient-to, #E8920C) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {mainText}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                width: "56px",
                height: "4px",
                background: "var(--diced-hero-section-separator, #E8920C)",
                borderRadius: "2px",
                marginBottom: "28px",
                transformOrigin: "left",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontFamily,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--diced-hero-section-sub-text, #8B6A4A)",
                marginBottom: "44px",
                maxWidth: "500px",
              }}
            >
              {subMainText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}
            >
              <button
                onClick={onButtonClick}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "var(--diced-hero-section-button-hover-bg, #E8920C)";
                  el.style.color = "var(--diced-hero-section-button-hover-fg, #231815)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 24px rgba(232,146,12,0.35)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "var(--diced-hero-section-button-bg, #C25030)";
                  el.style.color = "var(--diced-hero-section-button-fg, #FFFAF4)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 14px rgba(194,80,48,0.28)";
                }}
                style={{
                  background: "var(--diced-hero-section-button-bg, #C25030)",
                  color: "var(--diced-hero-section-button-fg, #FFFAF4)",
                  border: "none",
                  padding: "16px 40px",
                  borderRadius: "8px",
                  fontFamily,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 14px rgba(194,80,48,0.28)",
                }}
              >
                {buttonText}
              </button>

              <p
                style={{
                  fontFamily,
                  fontSize: "0.82rem",
                  color: "var(--diced-hero-section-sub-text, #8B6A4A)",
                  margin: 0,
                }}
              >
                No commitment · Join free
              </p>
            </motion.div>
          </div>

          {/* Right: 2×2 image grid */}
          <motion.div
            className="dhs-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "260px 260px",
              gap: "10px",
              padding: "20px 0",
            }}
          >
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="dhs-cell"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  overflow: "hidden",
                  clipPath: CLIP_PATHS[i],
                  borderRadius: "2px",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="dhs-img"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
