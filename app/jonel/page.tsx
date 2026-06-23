"use client";

import { useEffect, useState } from "react";

/* ─── Scroll reveal hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".j-reveal, .j-reveal-left, .j-reveal-right")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Navbar ─── */
function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("j-navbar");
    if (!nav) return;
    const handler = () =>
      nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggle = () => {
    document.getElementById("j-mobile")?.classList.toggle("open");
  };
  const close = () => {
    document.getElementById("j-mobile")?.classList.remove("open");
  };

  const links = [
    ["#about", "About"],
    ["#services", "Services"],
    ["#process", "Process"],
    ["#portfolio", "Portfolio"],
    ["#results", "Results"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      <nav
        id="j-navbar"
        className="j-navbar"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "0 5%", height: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(11,26,42,0.95)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(107,185,212,0.12)",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
      >
        {/* Logo / Name */}
        <a
          href="#home"
          style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "1px" }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, color: "#E8F5F9", letterSpacing: "2px" }}>
            JONEL ENAD
          </span>
          <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "3px", color: "#6BB9D4", textTransform: "uppercase" }}>
            Virtual Assistant
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="j-nav-links"
          style={{ display: "flex", gap: "32px", listStyle: "none", alignItems: "center" }}
        >
          {links.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  textDecoration: "none", color: "rgba(232,245,249,0.72)",
                  fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.5px",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#6BB9D4")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(232,245,249,0.72)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="j-nav-cta"
          style={{
            background: "linear-gradient(135deg,#C9A84C,#F4C15D)",
            color: "#0B1A2A", fontWeight: 700, fontSize: "0.8rem",
            padding: "10px 24px", borderRadius: "50px", textDecoration: "none",
            letterSpacing: "0.5px", whiteSpace: "nowrap",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 16px rgba(244,193,93,0.3)",
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(244,193,93,0.45)"; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(244,193,93,0.3)"; }}
        >
          Work With Me
        </a>

        {/* Hamburger */}
        <button
          className="j-hamburger"
          onClick={toggle}
          style={{
            display: "none", flexDirection: "column", gap: "5px",
            background: "none", border: "none", cursor: "pointer", padding: "4px",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ display: "block", width: "22px", height: "2px", background: "#E8F5F9", borderRadius: "2px", transition: "0.3s" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="j-mobile"
        className="j-mobile-menu"
        style={{
          display: "none", position: "fixed", top: "72px", left: 0, right: 0,
          zIndex: 999, background: "#0B1A2A",
          padding: "24px 5% 32px",
          borderBottom: "1px solid rgba(107,185,212,0.15)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
        }}
      >
        <ul style={{ listStyle: "none" }}>
          {links.map(([href, label]) => (
            <li key={href} style={{ borderBottom: "1px solid rgba(107,185,212,0.1)" }}>
              <a
                href={href}
                onClick={close}
                style={{
                  display: "block", padding: "14px 0",
                  color: "rgba(232,245,249,0.85)", textDecoration: "none",
                  fontWeight: 600, fontSize: "1rem", letterSpacing: "0.5px",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={close}
          style={{
            display: "block", marginTop: "24px",
            background: "linear-gradient(135deg,#C9A84C,#F4C15D)",
            color: "#0B1A2A", fontWeight: 700, fontSize: "1rem",
            padding: "16px", borderRadius: "50px", textAlign: "center",
            textDecoration: "none",
          }}
        >
          Work With Me
        </a>
      </div>
    </>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh", background: "#0B1A2A",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "120px 5% 80px",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", right: "8%",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(60,94,140,0.25) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "5%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,185,212,0.12) 0%, transparent 70%)",
        }} />
        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(107,185,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,185,212,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Eyebrow label */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          marginBottom: "28px",
          background: "rgba(107,185,212,0.1)",
          border: "1px solid rgba(107,185,212,0.25)",
          borderRadius: "50px", padding: "8px 20px",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6BB9D4", display: "inline-block", animation: "jPulseGold 2.5s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "2px", color: "#6BB9D4", textTransform: "uppercase" }}>
            Available for New Clients
          </span>
        </div>

        {/* Gold divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "18px" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4C15D" }} />
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 700, lineHeight: 1.05,
          color: "#E8F5F9", letterSpacing: "4px",
          marginBottom: "12px",
        }}>
          JONEL ENAD
        </h1>

        {/* Title */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
          fontWeight: 600, letterSpacing: "5px",
          color: "#6BB9D4", textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          Virtual Assistant
        </p>

        {/* Gold divider 2 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg,transparent,rgba(244,193,93,0.6))" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(244,193,93,0.6)" }} />
          <div style={{ height: "1px", width: "80px", background: "linear-gradient(90deg,rgba(244,193,93,0.6),transparent)" }} />
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.1rem, 2.8vw, 1.8rem)",
          fontWeight: 400, lineHeight: 1.55,
          color: "rgba(232,245,249,0.85)",
          letterSpacing: "1.5px", maxWidth: "680px",
          margin: "0 auto 44px",
        }}>
          From Start to Stable.{" "}
          <span className="gold-text">Clients Today.</span>{" "}
          Scale Tomorrow.
        </h2>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#portfolio"
            style={{
              background: "transparent",
              border: "2px solid rgba(107,185,212,0.6)",
              color: "#E8F5F9", fontWeight: 600,
              fontSize: "0.85rem", padding: "14px 36px",
              borderRadius: "50px", textDecoration: "none",
              letterSpacing: "1px", transition: "0.25s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#6BB9D4"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(107,185,212,0.1)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(107,185,212,0.6)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              background: "linear-gradient(135deg,#C9A84C,#F4C15D)",
              color: "#0B1A2A", fontWeight: 700,
              fontSize: "0.85rem", padding: "14px 36px",
              borderRadius: "50px", textDecoration: "none",
              letterSpacing: "1px", transition: "0.25s",
              boxShadow: "0 6px 24px rgba(244,193,93,0.35)",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 30px rgba(244,193,93,0.5)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(244,193,93,0.35)"; }}
          >
            Work With Me
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "#E8F5F9", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #E8F5F9, transparent)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  const highlights = [
    ["Organized Systems", "Clean backends that run without daily firefighting"],
    ["Client Acquisition", "Support that keeps your pipeline full and follow-ups on point"],
    ["Operational Clarity", "Documented processes so nothing falls through the cracks"],
    ["Scale-Ready Setup", "Structure built to grow with you — not against you"],
  ];

  return (
    <section id="about" style={{ padding: "110px 5%", background: "#E8F5F9" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "80px", alignItems: "center" }} className="j-about-grid">
        {/* Image placeholder */}
        <div className="j-reveal-left" style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "4/5", maxWidth: "420px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #3C5E8C 0%, #0B1A2A 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "16px", position: "relative", overflow: "hidden",
            border: "1px solid rgba(107,185,212,0.2)",
          }}>
            {/* Subtle pattern inside */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(107,185,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(107,185,212,0.06) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <div style={{ fontSize: "3.5rem", position: "relative", zIndex: 1 }}>📸</div>
            <p style={{ color: "rgba(232,245,249,0.6)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
              Your Photo Here
            </p>
            <p style={{ color: "rgba(232,245,249,0.35)", fontSize: "0.68rem", textAlign: "center", maxWidth: "200px", position: "relative", zIndex: 1 }}>
              Replace this placeholder with a professional headshot
            </p>
          </div>
          {/* Gold accent corner */}
          <div style={{
            position: "absolute", bottom: "-16px", right: "0",
            width: "120px", height: "120px",
            borderBottom: "3px solid #F4C15D",
            borderRight: "3px solid #F4C15D",
            borderRadius: "0 0 20px 0",
            zIndex: 0,
          }} />
        </div>

        {/* Content */}
        <div className="j-reveal-right">
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#3C5E8C", display: "block", marginBottom: "14px" }}>
            About Me
          </span>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.6rem,3vw,2.4rem)",
            fontWeight: 600, color: "#0B1A2A",
            lineHeight: 1.3, marginBottom: "20px",
          }}>
            I Help Business Owners{" "}
            <span className="gold-text">Build Systems That Last</span>
          </h2>

          <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg,#F4C15D,transparent)", marginBottom: "24px" }} />

          <p style={{ fontSize: "0.95rem", color: "#3C5E8C", lineHeight: 1.85, marginBottom: "16px" }}>
            Running a business is hard enough without drowning in emails, missed follow-ups, and disorganized workflows. I step in as your behind-the-scenes partner — organizing your backend, streamlining operations, and supporting the client acquisition processes that drive consistent revenue.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#3C5E8C", lineHeight: 1.85, marginBottom: "32px" }}>
            My focus is simple: take the chaos off your plate so you can focus on what you do best — and build a business that&apos;s ready to scale when opportunity comes.
          </p>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
            {highlights.map(([title, desc], i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <span style={{
                  minWidth: "28px", height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#3C5E8C,#6BB9D4)",
                  color: "#fff", fontWeight: 700,
                  fontSize: "0.7rem", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "1px",
                }}>✓</span>
                <span style={{ fontSize: "0.88rem", color: "#0B1A2A", lineHeight: 1.65 }}>
                  <strong>{title}</strong> — {desc}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#0B1A2A", color: "#E8F5F9",
              fontWeight: 600, fontSize: "0.85rem",
              padding: "14px 32px", borderRadius: "50px",
              textDecoration: "none", letterSpacing: "0.5px",
              transition: "0.25s", boxShadow: "0 6px 20px rgba(11,26,42,0.25)",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3C5E8C"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#0B1A2A"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            Let&apos;s Talk →
          </a>
        </div>
      </div>
      <style>{`@media(max-width:900px){.j-about-grid{grid-template-columns:1fr!important;gap:48px!important;} .j-about-grid > div:first-child { max-width:100%; }}`}</style>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  const services = [
    { icon: "📋", title: "Business Admin Support", desc: "Day-to-day administrative tasks handled with precision — data entry, document management, reporting, and more." },
    { icon: "🎯", title: "Lead Generation Support", desc: "Research, list building, and outreach support to keep your client pipeline consistently full." },
    { icon: "🔄", title: "CRM & Client Follow-Up", desc: "Set up and manage your CRM, automate follow-up sequences, and ensure no lead ever slips through." },
    { icon: "📝", title: "Process Documentation", desc: "Turn your workflows into clear SOPs so your team can execute consistently — with or without you." },
    { icon: "📅", title: "Calendar & Inbox Management", desc: "Organized scheduling, email triage, and meeting coordination so your time is protected and focused." },
    { icon: "📱", title: "Social Media Admin Support", desc: "Scheduling, content organization, basic graphics, and community inbox management to keep your presence active." },
    { icon: "⚙️", title: "Operations Setup", desc: "Build the systems and tools that give your business structure — from project management to automations." },
  ];

  return (
    <section id="services" style={{ padding: "110px 5%", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="j-reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#3C5E8C", display: "block", marginBottom: "14px" }}>
            What I Do
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 600, color: "#0B1A2A", marginBottom: "16px" }}>
            Services
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F4C15D" }} />
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
          </div>
          <p style={{ fontSize: "0.95rem", color: "#3C5E8C", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto" }}>
            End-to-end virtual support designed to give your business the backend it needs to grow.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "22px" }} className="j-services-grid">
          {services.map((s, i) => (
            <div
              key={i}
              className="j-reveal"
              style={{
                background: "#fff", borderRadius: "16px",
                padding: "32px 28px",
                border: "1px solid rgba(60,94,140,0.12)",
                borderTop: "3px solid transparent",
                backgroundClip: "padding-box",
                position: "relative", overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.3s, border-color 0.3s",
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 20px 48px rgba(11,26,42,0.1)";
                el.style.borderColor = "rgba(60,94,140,0.2)";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(60,94,140,0.12)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#3C5E8C,#6BB9D4)" }} />
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: "linear-gradient(135deg,rgba(60,94,140,0.08),rgba(107,185,212,0.12))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", marginBottom: "20px",
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", fontWeight: 600, color: "#0B1A2A", marginBottom: "10px", lineHeight: 1.4 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "#3C5E8C", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.j-services-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:640px){.j-services-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

/* ─── Process ─── */
function Process() {
  const steps = [
    {
      n: "01", title: "Assess",
      desc: "We start with a thorough audit of your current operations, workflows, and bottlenecks — understanding exactly where your backend is holding you back.",
      color: "#3C5E8C",
    },
    {
      n: "02", title: "Organize",
      desc: "Emails, files, tasks, contacts — everything gets structured, cleaned up, and put in its proper place so nothing is lost and everything is findable.",
      color: "#6BB9D4",
    },
    {
      n: "03", title: "Implement",
      desc: "New systems, tools, templates, and automations are built and activated — turning your organized foundation into a smoothly running operation.",
      color: "#0B1A2A",
    },
    {
      n: "04", title: "Stabilize & Scale",
      desc: "With solid systems in place, your business is ready for consistent clients and growth. We refine as you scale so the backend never becomes the bottleneck.",
      color: "#F4C15D",
    },
  ];

  return (
    <section id="process" style={{ padding: "110px 5%", background: "#0B1A2A", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(60,94,140,0.2),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(107,185,212,0.1),transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="j-reveal" style={{ textAlign: "center", marginBottom: "72px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#6BB9D4", display: "block", marginBottom: "14px" }}>
            How It Works
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 600, color: "#E8F5F9", marginBottom: "16px" }}>
            The Process
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F4C15D" }} />
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
          </div>
          <p style={{ fontSize: "0.95rem", color: "rgba(107,185,212,0.8)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
            Four focused steps from chaos to a business that runs like clockwork.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", position: "relative" }} className="j-process-grid">
          {/* Connector line */}
          <div style={{
            position: "absolute", top: "52px", left: "12.5%", right: "12.5%", height: "2px",
            background: "linear-gradient(90deg,#3C5E8C,#6BB9D4,#3C5E8C)",
            zIndex: 0,
          }} className="j-process-line" />

          {steps.map((s, i) => (
            <div key={i} className="j-reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              {/* Number circle */}
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: s.n === "04" ? "#F4C15D" : s.n === "02" ? "#6BB9D4" : s.n === "03" ? "#0B1A2A" : "#3C5E8C",
                border: `3px solid ${s.n === "04" ? "rgba(244,193,93,0.3)" : "rgba(107,185,212,0.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
                boxShadow: `0 8px 24px rgba(11,26,42,0.4)`,
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.3rem", fontWeight: 700,
                  color: s.n === "04" ? "#0B1A2A" : "#E8F5F9",
                }}>
                  {s.n}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", fontWeight: 600, color: "#E8F5F9", marginBottom: "12px", letterSpacing: "1px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "rgba(232,245,249,0.55)", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.j-process-grid{grid-template-columns:repeat(2,1fr)!important;} .j-process-line{display:none!important;}}
        @media(max-width:640px){.j-process-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

/* ─── Portfolio ─── */
function Portfolio() {
  const placeholders = [
    { label: "CRM Setup & Workflow", type: "Operations Project", icon: "🔄" },
    { label: "Lead Gen Campaign", type: "Client Acquisition", icon: "🎯" },
    { label: "Process Documentation", type: "SOP / Documentation", icon: "📝" },
    { label: "Inbox & Calendar System", type: "Admin Management", icon: "📅" },
    { label: "Social Media Schedule", type: "Social Admin", icon: "📱" },
    { label: "Client Onboarding Flow", type: "Operations Setup", icon: "✅" },
  ];

  return (
    <section id="portfolio" style={{ padding: "110px 5%", background: "#E8F5F9" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="j-reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#3C5E8C", display: "block", marginBottom: "14px" }}>
            Sample Work
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 600, color: "#0B1A2A", marginBottom: "16px" }}>
            Portfolio
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F4C15D" }} />
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
          </div>
          <p style={{ fontSize: "0.95rem", color: "#3C5E8C", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto" }}>
            A selection of projects and sample work. Add screenshots, PDFs, or project write-ups to each card.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="j-portfolio-grid">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className="j-reveal"
              style={{
                borderRadius: "16px", overflow: "hidden",
                background: "#fff",
                border: "1px solid rgba(60,94,140,0.12)",
                transition: "transform 0.3s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.3s",
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 48px rgba(11,26,42,0.1)"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              {/* Image placeholder */}
              <div style={{
                height: "200px", background: "linear-gradient(135deg,#3C5E8C,#0B1A2A)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "12px", position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(rgba(107,185,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(107,185,212,0.06) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
                <span style={{ fontSize: "2.5rem", position: "relative", zIndex: 1 }}>{p.icon}</span>
                <p style={{ color: "rgba(232,245,249,0.45)", fontSize: "0.68rem", letterSpacing: "1.5px", fontWeight: 600, textTransform: "uppercase", position: "relative", zIndex: 1 }}>
                  [ Add Screenshot / Image ]
                </p>
              </div>
              {/* Card content */}
              <div style={{ padding: "20px 22px" }}>
                <span style={{ display: "inline-block", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6BB9D4", marginBottom: "8px", background: "rgba(107,185,212,0.1)", padding: "4px 10px", borderRadius: "50px" }}>
                  {p.type}
                </span>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.88rem", fontWeight: 600, color: "#0B1A2A", marginBottom: "8px" }}>
                  {p.label}
                </h3>
                <p style={{ fontSize: "0.77rem", color: "#3C5E8C", lineHeight: 1.65 }}>
                  Description of the project, tools used, and results achieved. Replace with your actual project details.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.j-portfolio-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:640px){.j-portfolio-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

/* ─── Results ─── */
function Results() {
  const metrics = [
    { icon: "⚡", value: "2× Faster", label: "Response Time", desc: "Clients get replies and follow-ups in half the time" },
    { icon: "🧹", value: "Cleaner", label: "Client Workflows", desc: "Organized systems that reduce confusion and rework" },
    { icon: "🔁", value: "Consistent", label: "Follow-Up System", desc: "No more leads going cold — structured follow-up that converts" },
    { icon: "📊", value: "Trackable", label: "Lead Tracking", desc: "Full pipeline visibility so you always know where deals stand" },
  ];

  return (
    <section id="results" style={{ padding: "110px 5%", background: "#0B1A2A" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="j-reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#6BB9D4", display: "block", marginBottom: "14px" }}>
            Impact
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 600, color: "#E8F5F9", marginBottom: "16px" }}>
            Results That Matter
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F4C15D" }} />
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
          </div>
          <p style={{ fontSize: "0.95rem", color: "rgba(107,185,212,0.8)", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto" }}>
            Real improvements in day-to-day operations. Update these metrics with your actual client results.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }} className="j-results-grid">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="j-reveal"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(107,185,212,0.15)",
                borderRadius: "16px", padding: "36px 24px",
                textAlign: "center",
                transition: "transform 0.3s, border-color 0.3s, background 0.3s",
              }}
              onMouseOver={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = "rgba(244,193,93,0.35)"; el.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseOut={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(107,185,212,0.15)"; el.style.background = "rgba(255,255,255,0.04)"; }}
            >
              <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "16px" }}>{m.icon}</span>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" }} className="gold-text">
                {m.value}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#E8F5F9", letterSpacing: "1px", marginBottom: "12px", textTransform: "uppercase" }}>
                {m.label}
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(107,185,212,0.7)", lineHeight: 1.65 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div className="j-reveal" style={{ marginTop: "56px", textAlign: "center" }}>
          <div style={{
            maxWidth: "680px", margin: "0 auto",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(244,193,93,0.2)",
            borderRadius: "20px", padding: "40px 40px",
          }}>
            <div style={{ fontSize: "3rem", color: "rgba(244,193,93,0.25)", lineHeight: 1, marginBottom: "16px", fontFamily: "Georgia, serif" }}>"</div>
            <p style={{ fontSize: "0.95rem", color: "rgba(232,245,249,0.65)", fontStyle: "italic", lineHeight: 1.85, marginBottom: "24px" }}>
              Add a client testimonial here. A short quote about your work, their results, and what it was like working with you.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#3C5E8C,#6BB9D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8F5F9", fontSize: "0.7rem", fontWeight: 700 }}>
                👤
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#E8F5F9" }}>Client Name</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(107,185,212,0.7)" }}>Role, Company</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.j-results-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:640px){.j-results-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  }

  return (
    <section id="contact" style={{ padding: "110px 5%", background: "#E8F5F9" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="j-reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#3C5E8C", display: "block", marginBottom: "14px" }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 600, color: "#0B1A2A", marginBottom: "16px" }}>
            Ready to Organize Your Business Backend
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,transparent,#F4C15D)" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F4C15D" }} />
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg,#F4C15D,transparent)" }} />
          </div>
          <p style={{ fontSize: "1rem", color: "#3C5E8C", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
            Ready to organize your business backend and prepare for growth? Let&apos;s talk about how I can help.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "64px", alignItems: "start" }} className="j-contact-grid">
          {/* Left info */}
          <div className="j-reveal-left">
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 600, color: "#0B1A2A", marginBottom: "24px" }}>
              Let&apos;s Work Together
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#3C5E8C", lineHeight: 1.85, marginBottom: "36px" }}>
              Whether you need help getting organized, building your systems from scratch, or supporting client acquisition — I&apos;m ready to step in and make it happen.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "📧", label: "Email", value: "enadjonel18@gmail.com", href: "mailto:enadjonel18@gmail.com" },
                { icon: "💼", label: "LinkedIn", value: "Connect on LinkedIn", href: "#" },
                { icon: "📍", label: "Location", value: "Philippines · Remote Worldwide", href: undefined },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg,rgba(60,94,140,0.1),rgba(107,185,212,0.1))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6BB9D4", marginBottom: "2px" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: "0.88rem", color: "#0B1A2A", fontWeight: 600, textDecoration: "none" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "#3C5E8C")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#0B1A2A")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.88rem", color: "#0B1A2A", fontWeight: 600 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Brand values */}
            <div style={{ marginTop: "48px", padding: "24px", background: "#0B1A2A", borderRadius: "16px" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#6BB9D4", marginBottom: "16px" }}>
                Brand Values
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Integrity", "Results", "Growth", "Partnership"].map((v) => (
                  <span key={v} style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", color: "rgba(244,193,93,0.85)", background: "rgba(244,193,93,0.1)", border: "1px solid rgba(244,193,93,0.25)", padding: "6px 14px", borderRadius: "50px", textTransform: "uppercase" }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="j-reveal-right">
            <div style={{ background: "#fff", borderRadius: "20px", padding: "44px", boxShadow: "0 8px 40px rgba(11,26,42,0.08)", border: "1px solid rgba(60,94,140,0.1)" }}>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", color: "#0B1A2A", marginBottom: "12px" }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#3C5E8C", lineHeight: 1.7 }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                    { id: "business", label: "Business / Company", type: "text", placeholder: "Your business name" },
                  ].map((f) => (
                    <div key={f.id} style={{ marginBottom: "20px" }}>
                      <label htmlFor={f.id} style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3C5E8C", marginBottom: "8px" }}>
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        style={{
                          width: "100%", padding: "12px 16px",
                          border: "1.5px solid rgba(60,94,140,0.2)",
                          borderRadius: "10px", fontSize: "0.88rem",
                          color: "#0B1A2A", outline: "none",
                          background: "#F8FCFD",
                          transition: "border-color 0.2s",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#6BB9D4")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(60,94,140,0.2)")}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="service" style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3C5E8C", marginBottom: "8px" }}>
                      Service Needed
                    </label>
                    <select
                      id="service"
                      style={{
                        width: "100%", padding: "12px 16px",
                        border: "1.5px solid rgba(60,94,140,0.2)",
                        borderRadius: "10px", fontSize: "0.88rem",
                        color: "#0B1A2A", outline: "none",
                        background: "#F8FCFD",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6BB9D4")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(60,94,140,0.2)")}
                    >
                      <option value="">Select a service...</option>
                      <option>Business Admin Support</option>
                      <option>Lead Generation Support</option>
                      <option>CRM & Client Follow-Up</option>
                      <option>Process Documentation</option>
                      <option>Calendar & Inbox Management</option>
                      <option>Social Media Admin Support</option>
                      <option>Operations Setup</option>
                      <option>Multiple Services / Not Sure</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <label htmlFor="message" style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3C5E8C", marginBottom: "8px" }}>
                      Tell Me About Your Business
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="What's your biggest operational challenge right now? Where do things tend to fall apart?"
                      style={{
                        width: "100%", padding: "12px 16px",
                        border: "1.5px solid rgba(60,94,140,0.2)",
                        borderRadius: "10px", fontSize: "0.88rem",
                        color: "#0B1A2A", outline: "none",
                        background: "#F8FCFD", resize: "vertical",
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: 1.65,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6BB9D4")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(60,94,140,0.2)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%", padding: "15px",
                      background: status === "sending" ? "rgba(60,94,140,0.5)" : "linear-gradient(135deg,#0B1A2A,#3C5E8C)",
                      color: "#E8F5F9", fontWeight: 700, fontSize: "0.88rem",
                      border: "none", borderRadius: "50px", cursor: status === "sending" ? "wait" : "pointer",
                      letterSpacing: "1px", textTransform: "uppercase",
                      transition: "0.25s", fontFamily: "'Montserrat', sans-serif",
                      boxShadow: "0 6px 24px rgba(11,26,42,0.25)",
                    }}
                    onMouseOver={(e) => { if (status !== "sending") (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.j-contact-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: "#0B1A2A", padding: "64px 5% 32px", borderTop: "1px solid rgba(107,185,212,0.1)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr", gap: "48px", marginBottom: "48px" }} className="j-footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", fontWeight: 700, color: "#E8F5F9", letterSpacing: "2px", marginBottom: "4px" }}>
                JONEL ENAD
              </div>
              <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "3px", color: "#6BB9D4", textTransform: "uppercase" }}>
                Virtual Assistant
              </div>
            </div>
            <p style={{ fontSize: "0.84rem", color: "rgba(232,245,249,0.45)", lineHeight: 1.8, maxWidth: "280px", marginBottom: "20px" }}>
              Helping business owners build organized backends, consistent client pipelines, and the systems to scale with confidence.
            </p>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#F4C15D", letterSpacing: "2px", textTransform: "uppercase" }}>
              From Start to Stable.
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", fontWeight: 700, color: "#E8F5F9", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Business Admin", "Lead Generation", "CRM Systems", "Process Docs", "Calendar & Inbox", "Operations Setup"].map((s) => (
                <li key={s}>
                  <a href="#services" style={{ fontSize: "0.82rem", color: "rgba(232,245,249,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#6BB9D4")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(232,245,249,0.45)")}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", fontWeight: 700, color: "#E8F5F9", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>
              Navigate
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[["#about", "About"], ["#services", "Services"], ["#process", "Process"], ["#portfolio", "Portfolio"], ["#results", "Results"], ["#contact", "Contact"]].map(([href, label]) => (
                <li key={href}>
                  <a href={href} style={{ fontSize: "0.82rem", color: "rgba(232,245,249,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#6BB9D4")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(232,245,249,0.45)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(107,185,212,0.1)", paddingTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(232,245,249,0.3)" }}>
            © 2026 Jonel Enad. All rights reserved.
          </p>
          <p style={{ fontSize: "0.68rem", color: "rgba(244,193,93,0.5)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            Clients Today. Scale Tomorrow. ✦
          </p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.j-footer-grid{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
    </footer>
  );
}

/* ─── Page ─── */
export default function JonelPage() {
  useScrollReveal();

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        const el = document.querySelector(target.getAttribute("href")!);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", smoothScroll);
    return () => document.removeEventListener("click", smoothScroll);
  }, []);

  return (
    <div className="jonel-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Results />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
