"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ChronicleButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  fontFamily?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

export function ChronicleButton({
  text = "Get Started",
  href,
  onClick,
  fontFamily = "'Poppins', sans-serif",
  size = "md",
  variant = "solid",
}: ChronicleButtonProps) {
  const [hovered, setHovered] = useState(false);

  const paddings = { sm: "10px 24px", md: "14px 36px", lg: "18px 52px" };
  const fontSizes = { sm: "0.85rem", md: "0.95rem", lg: "1.05rem" };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    border: variant === "outline" ? "2px solid var(--diced-hero-section-button-bg, #C25030)" : "none",
    cursor: "pointer",
    padding: paddings[size],
    borderRadius: "8px",
    fontFamily,
    fontWeight: 600,
    fontSize: fontSizes[size],
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "140px",
    background:
      variant === "solid"
        ? "var(--diced-hero-section-button-bg, #C25030)"
        : "transparent",
    color:
      variant === "solid"
        ? "var(--diced-hero-section-button-fg, #FFFAF4)"
        : "var(--diced-hero-section-button-bg, #C25030)",
  };

  const btn = (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={baseStyle}
      animate={{
        background: hovered
          ? (variant === "solid"
              ? "var(--diced-hero-section-button-hover-bg, #E8920C)"
              : "var(--diced-hero-section-button-bg, #C25030)")
          : (variant === "solid"
              ? "var(--diced-hero-section-button-bg, #C25030)"
              : "transparent"),
        color: hovered
          ? (variant === "solid"
              ? "var(--diced-hero-section-button-hover-fg, #231815)"
              : "var(--diced-hero-section-button-fg, #FFFAF4)")
          : (variant === "solid"
              ? "var(--diced-hero-section-button-fg, #FFFAF4)"
              : "var(--diced-hero-section-button-bg, #C25030)"),
      }}
      transition={{ duration: 0.22 }}
    >
      {/* Front face */}
      <motion.span
        style={{ display: "block", transformOrigin: "center bottom", willChange: "transform" }}
        animate={{ rotateX: hovered ? -90 : 0, opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.24, ease: "easeInOut" }}
      >
        {text}
      </motion.span>

      {/* Back face */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center top",
          willChange: "transform",
        }}
        animate={{ rotateX: hovered ? 0 : 90, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.24, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "inline-block" }}>
        {btn}
      </a>
    );
  }
  return btn;
}
