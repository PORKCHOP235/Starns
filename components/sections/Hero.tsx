"use client";

import { Player } from "@remotion/player";
import { GridPixelateWipe } from "@/components/ui/grid-pixelate-wipe";

interface HeroProps {
  revealed: boolean;
}

function HeroBackground() {
  return (
    <GridPixelateWipe
      cols={16}
      rows={9}
      pattern="wave"
      transitionStart={5}
      transitionDuration={55}
      cellFadeFrames={10}
      from={
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #060D1A 0%, #0D1628 60%, #12103A 100%)" }} />
      }
      to={
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1B2957 0%, #2D1B69 45%, #1a3a5c 100%)" }} />
      }
    />
  );
}

export default function Hero({ revealed }: HeroProps) {
  /* Each content group gets a staggered burst animation once revealed */
  function burst(delay: number, fromX = "0px", fromY = "40px"): React.CSSProperties {
    return revealed
      ? {
          animation: `heroBurst 0.75s cubic-bezier(.175,.885,.32,1.275) ${delay}s both`,
          ["--bx" as string]: fromX,
          ["--by" as string]: fromY,
        }
      : { opacity: 0 };
  }

  return (
    <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* GridPixelateWipe — only mount after intro so the wipe fires on reveal */}
      {revealed && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Player
            component={HeroBackground}
            durationInFrames={120}
            fps={30}
            compositionWidth={1440}
            compositionHeight={900}
            controls={false}
            autoPlay
            loop={false}
            clickToPlay={false}
            acknowledgeRemotionLicense
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* Glow orbs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-200px", right: "-150px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,203,0.18) 0%, transparent 70%)", animation: "orbFloat 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-180px", left: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", animation: "orbFloat 10s ease-in-out infinite", animationDelay: "-4s" }} />
      </div>

      {/* Content grid */}
      <div
        className="hero-inner"
        style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "130px 5% 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", minHeight: "100vh" }}
      >
        {/* ── Left column ── */}
        <div>
          {/* Badge */}
          <div style={{ ...burst(0.05, "60px", "-20px"), display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,194,203,0.15)", border: "1px solid rgba(0,194,203,0.35)", color: "#00C2CB", fontWeight: 600, fontSize: "0.8rem", padding: "6px 16px", borderRadius: "50px", marginBottom: "22px" }}>
            <span style={{ width: "7px", height: "7px", background: "#00C2CB", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            Trusted by 100+ Growing Businesses
          </div>

          {/* Headline */}
          <h1 style={{ ...burst(0.12, "80px", "0px"), fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", fontWeight: 900, lineHeight: 1.1, color: "#fff", marginBottom: "22px" }}>
            We Handle the Marketing.
            <br />
            <span className="gradient-text">You Handle the Success.</span>
          </h1>

          {/* Subtitle */}
          <p style={{ ...burst(0.2, "60px", "0px"), fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "38px", maxWidth: "480px" }}>
            Starn Marketing brings together strategy, creativity, and execution to solve your marketing problems and drive real, measurable growth — without the overwhelm.
          </p>

          {/* CTAs */}
          <div style={{ ...burst(0.28, "40px", "0px"), display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{ background: "linear-gradient(135deg, #00C2CB, #7C3AED)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "15px 34px", borderRadius: "50px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 6px 24px rgba(0,194,203,0.4)", transition: "transform 0.25s, box-shadow 0.25s" }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 14px 36px rgba(0,194,203,0.5)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(0,194,203,0.4)"; }}
            >
              Get Free Strategy Call →
            </a>
            <a
              href="#services"
              style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "13px 34px", borderRadius: "50px", textDecoration: "none", transition: "background 0.25s, border-color 0.25s" }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.8)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              See Our Services
            </a>
          </div>

          {/* Stats */}
          <div style={{ ...burst(0.38, "30px", "0px"), display: "flex", gap: "32px", marginTop: "48px", flexWrap: "wrap" }}>
            {[
              { val: "3×", label: "Average ROI" },
              { val: "100+", label: "Brands Scaled" },
              { val: "98%", label: "Client Retention" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, lineHeight: 1 }} className="gradient-text">{s.val}</div>
                <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column: dashboard card ── */}
        <div
          className="hero-visual-col"
          style={{ ...burst(0.18, "-80px", "20px"), position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: "24px", boxShadow: "0 28px 72px rgba(0,0,0,0.35)", padding: "32px", width: "340px", position: "relative", zIndex: 2 }}>
            <span style={{ display: "inline-block", background: "linear-gradient(135deg, #00C2CB, #7C3AED)", color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "4px 12px", borderRadius: "50px", marginBottom: "16px", letterSpacing: "0.5px" }}>
              Live Campaign Results
            </span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1B2957", marginBottom: "6px" }}>Q1 Growth Report</h3>
            <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.6, marginBottom: "22px" }}>Revenue-driven marketing that speaks for itself.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Leads",   pct: "87%", val: "+187%", grad: "linear-gradient(90deg,#00C2CB,#7C3AED)" },
                { label: "Traffic", pct: "72%", val: "+72%",  grad: "linear-gradient(90deg,#7C3AED,#EC4899)" },
                { label: "Revenue", pct: "94%", val: "+214%", grad: "linear-gradient(90deg,#EC4899,#F97316)" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600, width: "56px", flexShrink: 0 }}>{b.label}</span>
                  <div style={{ flex: 1, height: "8px", background: "#F0F4FF", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: "4px", background: b.grad, width: b.pct, animation: revealed ? `barGrow 1.4s ease ${0.8 + i * 0.2}s both` : "none", transformOrigin: "left" }} />
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1B2957", width: "40px", textAlign: "right" }}>{b.val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[{ val: "4.2×", lbl: "ROAS" }, { val: "98%", lbl: "Retention" }].map((m, i) => (
                <div key={i} style={{ flex: 1, background: "#F0F4FF", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#1B2957" }}>{m.val}</div>
                  <div style={{ fontSize: "0.65rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>{m.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge 1 */}
          <div style={{ position: "absolute", top: "-18px", right: "-24px", background: "rgba(255,255,255,0.97)", borderRadius: "16px", boxShadow: "0 10px 36px rgba(0,0,0,0.25)", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px", zIndex: 3, animation: "floatA 4s ease-in-out infinite" }}>
            <span style={{ fontSize: "1.4rem" }}>🎯</span>
            <div>
              <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1B2957" }}>Campaign Live</div>
              <div style={{ fontSize: "0.7rem", color: "#64748B" }}>Paid ads at peak</div>
            </div>
          </div>

          {/* Floating badge 2 */}
          <div style={{ position: "absolute", bottom: "10px", left: "-36px", background: "rgba(255,255,255,0.97)", borderRadius: "16px", boxShadow: "0 10px 36px rgba(0,0,0,0.25)", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px", zIndex: 3, animation: "floatB 5s ease-in-out infinite" }}>
            <span style={{ fontSize: "1.4rem" }}>📈</span>
            <div>
              <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1B2957" }}>+42% This Month</div>
              <div style={{ fontSize: "0.7rem", color: "#64748B" }}>Organic traffic growth</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroBurst {
          0%   { opacity: 0; transform: scale(0.15) translate(var(--bx, 0px), var(--by, 40px)); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: scale(1) translate(0px, 0px); }
        }
        @media (max-width: 768px) {
          .hero-inner        { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-visual-col   { display: none !important; }
        }
      `}</style>
    </section>
  );
}
