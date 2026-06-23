"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DicedHeroSection } from "@/components/ui/diced-hero-section";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const C = {
  dark:     "#231815",
  amber:    "#E8920C",
  rust:     "#C25030",
  green:    "#5A7A3A",
  cream:    "#FFFAF4",
  creamAlt: "#FFF5E8",
  muted:    "#8B6A4A",
  warm:     "#B0A898",
  white:    "#FFFFFF",
} as const;

const F = {
  heading: "'Montserrat', sans-serif",
  body:    "'Poppins', sans-serif",
  accent:  "'Playfair Display', serif",
} as const;

// ─── Animation Presets ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0 },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const TRANS = { duration: 0.62, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };
const VP    = { once: true, margin: "-80px" };

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function Icon({
  name,
  size = 22,
  color = "currentColor",
  sw = 1.8,
}: {
  name: string;
  size?: number;
  color?: string;
  sw?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    check:     <polyline points="20 6 9 17 4 12" />,
    check2:    <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    dollar:    <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    leaf:      <path d="M2 22c2-4 4-8 8-10s10-2 12-4c0 4-2 8-6 10s-8 2-14 4z" />,
    shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    heart:     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    users:     <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    chefHat:   <><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" /><line x1="6" y1="17" x2="18" y2="17" /></>,
    tag:       <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
    clock:     <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    recycle:   <><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" /></>,
    pin:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    store:     <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    trending:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={C.rust} />
      <text x="20" y="27" textAnchor="middle" fill={C.cream} fontSize="20" fontWeight="900" fontFamily="'Montserrat', sans-serif">5</text>
    </svg>
  );
}

function LogoFull({ height = 44 }: { height?: number }) {
  const [imgOk, setImgOk] = useState(false);
  useEffect(() => {
    const p = new window.Image();
    p.onload = () => setImgOk(true);
    p.src = "/dinefive-logo.png";
  }, []);

  if (imgOk)
    return (
      <img
        src="/dinefive-logo.png"
        alt="DineFive"
        height={height}
        style={{ height: `${height}px`, width: "auto", objectFit: "contain", display: "block" }}
      />
    );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <LogoMark size={height - 4} />
      <span style={{ fontFamily: F.heading, fontWeight: 800, fontSize: `${height * 0.48}px`, color: C.dark, letterSpacing: "-0.02em" }}>
        Dine<span style={{ color: C.rust }}>Five</span>
      </span>
    </div>
  );
}

// ─── Chip / Section Label ─────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: `${C.rust}18`,
        color: C.rust,
        fontFamily: F.body,
        fontWeight: 600,
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "5px 14px",
        borderRadius: "100px",
        marginBottom: "20px",
      }}
    >
      {text}
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works"    },
    { label: "For Diners",   href: "#for-diners"      },
    { label: "Restaurants",  href: "#for-restaurants" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 5%",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(255,250,244,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.amber}22` : "none",
        transition: "all 0.3s ease",
      }}
    >
      <a href="/dine-five" style={{ textDecoration: "none" }}>
        <LogoFull height={36} />
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ fontFamily: F.body, fontWeight: 500, fontSize: "0.9rem", color: C.dark, textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.color = C.rust; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; (e.currentTarget as HTMLAnchorElement).style.color = C.dark; }}
          >
            {l.label}
          </a>
        ))}

        <a
          href="#waitlist"
          style={{ background: C.rust, color: C.cream, fontFamily: F.body, fontWeight: 600, fontSize: "0.88rem", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em", transition: "background 0.2s, color 0.2s, transform 0.15s", boxShadow: "0 2px 8px rgba(194,80,48,0.22)" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.amber; el.style.color = C.dark; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.rust; el.style.color = C.cream; el.style.transform = "translateY(0)"; }}
        >
          Join Waitlist
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "3,000+", label: "Meals Saved",      icon: "leaf"    },
  { value: "$5.99",  label: "Always the Price",  icon: "tag"     },
  { value: "40+",    label: "Local Restaurants", icon: "store"   },
  { value: "0",      label: "Delivery Fees",     icon: "check2"  },
];

function StatsStrip() {
  return (
    <section style={{ background: C.dark }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        variants={stagger}
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "52px 5%", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "32px" }}
      >
        {STATS.map((s) => (
          <motion.div key={s.value} variants={fadeUp} transition={TRANS} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${C.amber}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={s.icon} size={22} color={C.amber} />
            </div>
            <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "2.2rem", color: C.cream, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.warm, fontWeight: 500 }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Mission Banner ───────────────────────────────────────────────────────────
function MissionBanner() {
  return (
    <section style={{ background: `linear-gradient(135deg, ${C.rust} 0%, ${C.amber} 100%)`, padding: "80px 5%", textAlign: "center", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ position: "relative" }}>
        <motion.p variants={fadeUp} transition={TRANS} style={{ fontFamily: F.accent, fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,250,244,0.75)", marginBottom: "16px" }}>
          Our Mission
        </motion.p>
        <motion.h2 variants={fadeUp} transition={TRANS} style={{ fontFamily: F.heading, fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.cream, lineHeight: 1.15, maxWidth: "720px", margin: "0 auto 20px" }}>
          Fight Food Waste. Feed People. Keep It Fair.
        </motion.h2>
        <motion.p variants={fadeUp} transition={{ ...TRANS, delay: 0.1 }} style={{ fontFamily: F.body, fontSize: "1.08rem", color: "rgba(255,250,244,0.85)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.75 }}>
          Every day, restaurants prepare food that doesn&apos;t get sold. DineFive turns that into an opportunity — for you to eat well and for the planet to waste less.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const cards = [
    { icon: "chefHat", title: "Chef-Made Quality",  body: "Every meal listed on DineFive is prepared fresh by real restaurant kitchens — not meal-kit packets or reheated batches." },
    { icon: "tag",      title: "Always $5.99",       body: "No guessing, no price surges. Every meal is exactly $5.99. Pick up your meal and pay one flat price, always."           },
    { icon: "leaf",     title: "Zero Food Waste",    body: "Restaurants list surplus same-day inventory. You rescue it. Everyone wins — especially the environment."                },
    { icon: "pin",      title: "Hyper-Local",        body: "Browse restaurants within walking or biking distance. Support local kitchens while eating great food."                  },
  ];

  return (
    <section id="about" style={{ background: C.cream, padding: "100px 5%" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} transition={TRANS} style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionLabel text="What Is DineFive?" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", color: C.dark, marginBottom: "16px", lineHeight: 1.2 }}>
            Great Meals. One Price. Zero Waste.
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: C.muted, maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
            DineFive is the app that connects you with freshly made, restaurant-quality meals at the end of each kitchen&apos;s day — for just $5.99.
          </p>
        </motion.div>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {cards.map((c) => (
            <motion.div
              key={c.icon}
              variants={fadeUp}
              transition={TRANS}
              whileHover={{ y: -6, boxShadow: `0 16px 48px rgba(194,80,48,0.14)` }}
              style={{ background: C.white, borderRadius: "16px", padding: "32px 28px", border: `1px solid ${C.amber}22` }}
            >
              <div style={{ width: "52px", height: "52px", background: `${C.rust}14`, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Icon name={c.icon} size={24} color={C.rust} />
              </div>
              <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.05rem", color: C.dark, marginBottom: "10px" }}>{c.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.7 }}>{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "01", icon: "pin",     title: "Browse Nearby",   body: "Open DineFive and see restaurants near you with meals listed for today. Filter by cuisine, distance, or pickup time." },
    { num: "02", icon: "tag",     title: "Claim Your Meal", body: "Select a meal and reserve it — every listing is $5.99. No delivery fees, no tips required, no hidden costs."          },
    { num: "03", icon: "chefHat", title: "Pick Up & Enjoy", body: "Head to the restaurant at the pickup window and grab your freshly made meal. Enjoy great food guilt-free."           },
  ];

  return (
    <section id="how-it-works" style={{ background: C.creamAlt, padding: "100px 5%" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} transition={TRANS} style={{ textAlign: "center", marginBottom: "72px" }}>
          <SectionLabel text="How It Works" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", color: C.dark, marginBottom: "16px" }}>
            Three Steps to a Great Meal
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: C.muted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.75 }}>
            DineFive is as simple as it gets. Browse, claim, pick up.
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              transition={{ ...TRANS, delay: i * 0.12 }}
              style={{ flex: "1 1 280px", maxWidth: "340px", background: C.white, borderRadius: "20px", padding: "40px 32px", position: "relative", border: `1px solid ${C.amber}20`, boxShadow: "0 4px 24px rgba(35,24,21,0.06)" }}
            >
              <div style={{ position: "absolute", top: "28px", right: "28px", fontFamily: F.heading, fontWeight: 900, fontSize: "3.5rem", color: `${C.amber}18`, lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ width: "56px", height: "56px", background: `linear-gradient(135deg, ${C.rust}22, ${C.amber}22)`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <Icon name={s.icon} size={26} color={C.rust} />
              </div>
              <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.15rem", color: C.dark, marginBottom: "12px" }}>{s.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "0.93rem", color: C.muted, lineHeight: 1.72 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── For Diners ───────────────────────────────────────────────────────────────
function ForDiners() {
  const perks = [
    { icon: "dollar",   text: "Every meal is exactly $5.99 — no fees, no tips"     },
    { icon: "chefHat",  text: "Restaurant-quality, freshly cooked food daily"       },
    { icon: "leaf",     text: "You're actively reducing food waste by eating"  },
    { icon: "pin",      text: "Only local restaurants — no ghost kitchens"          },
    { icon: "clock",    text: "Limited daily slots create fresh urgency"             },
    { icon: "shield",   text: "Every meal guaranteed or your money back"             },
  ];

  return (
    <section id="for-diners" style={{ background: C.cream, padding: "100px 5%" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        variants={stagger}
        style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
      >
        <motion.div variants={fadeLeft} transition={TRANS}>
          <SectionLabel text="For Diners" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3vw, 2.6rem)", color: C.dark, marginBottom: "20px", lineHeight: 1.2 }}>
            Eat Well Without Spending a Fortune
          </h2>
          <blockquote style={{ fontFamily: F.accent, fontStyle: "italic", fontSize: "1.2rem", color: C.rust, borderLeft: `4px solid ${C.amber}`, paddingLeft: "20px", margin: "0 0 32px", lineHeight: 1.6 }}>
            &ldquo;Great food deserves a good ending — and so does your wallet.&rdquo;
          </blockquote>
          <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.muted, lineHeight: 1.8, marginBottom: "36px" }}>
            DineFive gives you access to chef-crafted meals from real restaurants at a price that works every single day of the week. Eat fresh. Save money. Help the planet.
          </p>
          <a
            href="#waitlist"
            style={{ background: C.rust, color: C.cream, fontFamily: F.body, fontWeight: 600, fontSize: "0.95rem", padding: "14px 36px", borderRadius: "8px", textDecoration: "none", display: "inline-block", letterSpacing: "0.03em", transition: "background 0.2s, color 0.2s, transform 0.15s", boxShadow: "0 4px 14px rgba(194,80,48,0.25)" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.amber; el.style.color = C.dark; el.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.rust; el.style.color = C.cream; el.style.transform = "translateY(0)"; }}
          >
            Get Early Access
          </a>
        </motion.div>

        <motion.div variants={fadeRight} transition={TRANS}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {perks.map((p) => (
              <motion.div
                key={p.text}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", gap: "16px", background: C.white, borderRadius: "12px", padding: "18px 22px", border: `1px solid ${C.amber}18` }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${C.green}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={p.icon} size={20} color={C.green} />
                </div>
                <span style={{ fontFamily: F.body, fontSize: "0.93rem", color: C.dark, lineHeight: 1.5 }}>{p.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── For Restaurants ──────────────────────────────────────────────────────────
function ForRestaurants() {
  const benefits = [
    { icon: "dollar",   title: "Recover Lost Revenue",    body: "Turn end-of-day surplus into real income instead of disposal costs."          },
    { icon: "users",    title: "Grow Your Customer Base",  body: "New diners discover you through DineFive and return at full price."          },
    { icon: "trending", title: "Zero Marketing Cost",      body: "Get listed and discovered — no ad spend, no agency fees required."          },
    { icon: "shield",   title: "You Set the Inventory",    body: "Only list what you actually have. No over-promising, no complexity."         },
  ];

  return (
    <section id="for-restaurants" style={{ background: C.dark, padding: "100px 5%" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} transition={TRANS} style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionLabel text="For Restaurants" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", color: C.cream, marginBottom: "16px" }}>
            Your Kitchen Earns More. Wastes Less.
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: C.warm, maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
            Joining DineFive is free. List your surplus meals daily and watch unsold inventory become a revenue stream.
          </p>
        </motion.div>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              transition={TRANS}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
              style={{ background: "#2D1F1A", borderRadius: "16px", padding: "32px 28px", border: `1px solid ${C.amber}18` }}
            >
              <div style={{ width: "52px", height: "52px", background: `${C.amber}18`, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Icon name={b.icon} size={24} color={C.amber} />
              </div>
              <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.05rem", color: C.cream, marginBottom: "10px" }}>{b.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "0.92rem", color: C.warm, lineHeight: 1.7 }}>{b.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} transition={{ ...TRANS, delay: 0.3 }} style={{ textAlign: "center", marginTop: "52px" }}>
          <a
            href="#waitlist"
            style={{ background: C.amber, color: C.dark, fontFamily: F.body, fontWeight: 700, fontSize: "0.95rem", padding: "15px 40px", borderRadius: "8px", textDecoration: "none", display: "inline-block", letterSpacing: "0.03em", transition: "background 0.2s, color 0.2s, transform 0.15s", boxShadow: "0 4px 20px rgba(232,146,12,0.35)" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.rust; el.style.color = C.cream; el.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.amber; el.style.color = C.dark; el.style.transform = "translateY(0)"; }}
          >
            List Your Restaurant — It&apos;s Free
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Portion Standards ────────────────────────────────────────────────────────
function PortionStandards() {
  const standards = [
    { icon: "chefHat", label: "Minimum 400 calories per meal"                     },
    { icon: "check",   label: "Full main dish — not a side portion"                },
    { icon: "leaf",    label: "All ingredients fresh, same-day prepared"            },
    { icon: "shield",  label: "No reheated or day-old ingredients"                 },
    { icon: "star",    label: "Rated and reviewed by DineFive diners"              },
    { icon: "heart",   label: "Packaged for safe, clean pickup"                    },
  ];

  return (
    <section style={{ background: C.cream, padding: "100px 5%" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        variants={stagger}
        style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
      >
        <motion.div variants={fadeRight} transition={TRANS}>
          <SectionLabel text="Portion Standards" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3vw, 2.6rem)", color: C.dark, marginBottom: "20px", lineHeight: 1.2 }}>
            $5.99 Doesn&apos;t Mean Cutting Corners
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.muted, lineHeight: 1.8, marginBottom: "12px" }}>
            Every meal on DineFive meets strict portion and quality standards. Restaurants that list on our platform agree to our Diner Promise before going live.
          </p>
          <p style={{ fontFamily: F.accent, fontStyle: "italic", fontSize: "1.1rem", color: C.rust, lineHeight: 1.6, marginTop: "24px" }}>
            &ldquo;Full meals, full flavors. Never a downgrade on quality.&rdquo;
          </p>
        </motion.div>

        <motion.div variants={fadeLeft} transition={TRANS}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {standards.map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: C.white, borderRadius: "12px", border: `1px solid ${C.green}20` }}
              >
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${C.green}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={s.icon} size={18} color={C.green} />
                </div>
                <span style={{ fontFamily: F.body, fontSize: "0.93rem", color: C.dark, fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Why $5.99 ────────────────────────────────────────────────────────────────
function WhyFiveNinetyNine() {
  const reasons = [
    { heading: "Low enough to be a daily habit.",    body: "At $5.99, a DineFive meal costs less than a fast food combo — and tastes like a full restaurant experience."                               },
    { heading: "High enough to pay the kitchen.",    body: "Restaurants still recover real value for meals they'd otherwise discard. It's not charity — it's economics."              },
    { heading: "Simple enough to build trust.",      body: "One price, no exceptions. Diners know what they're paying. Restaurants know what they'll earn. No surprises."                  },
  ];

  return (
    <section style={{ background: `linear-gradient(160deg, ${C.creamAlt} 0%, ${C.cream} 100%)`, padding: "100px 5%" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={fadeUp} transition={TRANS} style={{ marginBottom: "64px" }}>
          <SectionLabel text="Why $5.99?" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", color: C.dark, marginBottom: "16px" }}>
            The Number That Makes It Work
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: C.muted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.75 }}>
            $5.99 wasn&apos;t chosen randomly. It&apos;s the sweet spot that makes this model sustainable for everyone.
          </p>
        </motion.div>

        <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "28px", textAlign: "left" }}>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ ...TRANS, delay: i * 0.1 }}
              style={{ background: C.white, borderRadius: "16px", padding: "32px 36px", border: `1px solid ${C.amber}22`, display: "flex", gap: "24px", alignItems: "flex-start" }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.rust}, ${C.amber})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.cream, fontFamily: F.heading, fontWeight: 800, fontSize: "1rem" }}>
                {i + 1}
              </div>
              <div>
                <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.05rem", color: C.dark, marginBottom: "8px" }}>{r.heading}</h3>
                <p style={{ fontFamily: F.body, fontSize: "0.93rem", color: C.muted, lineHeight: 1.72, margin: 0 }}>{r.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Our Promise ──────────────────────────────────────────────────────────────
function OurPromise() {
  const promises = [
    { icon: "shield",  title: "Quality Guarantee",   body: "Meals that don't meet our standards get delisted. Every listing is reviewed."          },
    { icon: "heart",   title: "Community First",      body: "We prioritize local restaurants and local diners — no chains, no corporate kitchens."       },
    { icon: "recycle", title: "Impact Transparency",  body: "Every order shows how many grams of food waste you personally prevented."                   },
    { icon: "users",   title: "Fair for Everyone",    body: "Diners eat well. Restaurants earn more. The planet gets a break. Everyone wins."             },
  ];

  return (
    <section style={{ background: C.dark, padding: "100px 5%" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} transition={TRANS} style={{ textAlign: "center", marginBottom: "64px" }}>
          <SectionLabel text="Our Promise" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", color: C.cream, marginBottom: "16px" }}>
            We&apos;re Accountable to You
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: C.warm, maxWidth: "480px", margin: "0 auto", lineHeight: 1.75 }}>
            DineFive only works if diners and restaurants can trust it completely. Here&apos;s what we commit to.
          </p>
        </motion.div>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {promises.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              transition={TRANS}
              style={{ background: "#2D1F1A", borderRadius: "16px", padding: "32px 28px", border: `1px solid ${C.rust}22`, textAlign: "center" }}
            >
              <div style={{ width: "56px", height: "56px", background: `${C.rust}22`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Icon name={p.icon} size={26} color={C.amber} />
              </div>
              <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.05rem", color: C.cream, marginBottom: "10px" }}>{p.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "0.92rem", color: C.warm, lineHeight: 1.7 }}>{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────
function Waitlist() {
  const [email, setEmail]         = useState("");
  const [type, setType]           = useState<"diner" | "restaurant">("diner");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" style={{ background: `linear-gradient(135deg, ${C.rust} 0%, ${C.amber} 100%)`, padding: "100px 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 70%, rgba(255,255,255,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />

      <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={stagger} style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <motion.div variants={fadeUp} transition={TRANS}>
          <SectionLabel text="Join the Waitlist" />
          <h2 style={{ fontFamily: F.heading, fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.cream, marginBottom: "16px", lineHeight: 1.15 }}>
            Be First When DineFive Launches
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "1.05rem", color: "rgba(255,250,244,0.85)", lineHeight: 1.75, marginBottom: "36px" }}>
            We&apos;re opening market-by-market. Get on the list and we&apos;ll notify you the moment DineFive arrives in your area.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: "rgba(255,250,244,0.15)", borderRadius: "20px", padding: "40px 32px", border: "1px solid rgba(255,250,244,0.25)" }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <Icon name="check2" size={52} color={C.cream} sw={1.5} />
              </div>
              <h3 style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "1.4rem", color: C.cream, marginBottom: "10px" }}>You&apos;re on the list!</h3>
              <p style={{ fontFamily: F.body, color: "rgba(255,250,244,0.85)", fontSize: "1rem", lineHeight: 1.7 }}>
                We&apos;ll email <strong>{email}</strong> as soon as DineFive launches near you.
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" variants={fadeUp} transition={TRANS} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", background: "rgba(35,24,21,0.25)", borderRadius: "12px", padding: "4px", gap: "4px" }}>
                {(["diner", "restaurant"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    style={{ flex: 1, padding: "10px 0", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: F.body, fontWeight: 600, fontSize: "0.9rem", background: type === t ? C.cream : "transparent", color: type === t ? C.rust : "rgba(255,250,244,0.75)", transition: "all 0.22s ease" }}
                  >
                    {t === "diner" ? "I&apos;m a Diner" : "I Have a Restaurant"}
                  </button>
                ))}
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ padding: "16px 20px", borderRadius: "12px", border: "2px solid rgba(255,250,244,0.25)", background: "rgba(255,250,244,0.1)", color: C.cream, fontFamily: F.body, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,250,244,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,250,244,0.25)")}
              />

              <button
                type="submit"
                disabled={loading}
                style={{ background: C.dark, color: C.cream, fontFamily: F.body, fontWeight: 700, fontSize: "1rem", padding: "16px", borderRadius: "12px", border: "none", cursor: loading ? "wait" : "pointer", letterSpacing: "0.04em", transition: "background 0.22s", opacity: loading ? 0.7 : 1 }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#1A0E0C"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.dark; }}
              >
                {loading ? "Joining..." : "Join the Waitlist →"}
              </button>

              <p style={{ fontFamily: F.body, fontSize: "0.8rem", color: "rgba(255,250,244,0.6)", margin: 0 }}>
                No spam. No commitment. Just a heads-up when we launch near you.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: "How It Works", href: "#how-it-works"    },
    { label: "For Diners",   href: "#for-diners"      },
    { label: "Restaurants",  href: "#for-restaurants" },
    { label: "Waitlist",     href: "#waitlist"         },
  ];

  return (
    <footer style={{ background: "#160D0A", padding: "60px 5% 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "40px", flexWrap: "wrap", paddingBottom: "40px", borderBottom: `1px solid ${C.rust}22`, marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <LogoMark size={36} />
            <span style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "1.3rem", color: C.cream }}>
              Dine<span style={{ color: C.amber }}>Five</span>
            </span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: "0.88rem", color: C.warm, maxWidth: "280px", lineHeight: 1.7 }}>
            Connecting people with freshly made restaurant meals at $5.99. Fight food waste. Eat well. Every day.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "0.85rem", color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase" }}>Navigate</span>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{ fontFamily: F.body, fontSize: "0.9rem", color: C.warm, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.amber)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.warm)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "260px" }}>
          <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: "0.85rem", color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase" }}>Coming Soon</span>
          <p style={{ fontFamily: F.body, fontSize: "0.88rem", color: C.warm, lineHeight: 1.7, margin: 0 }}>
            DineFive is currently in pre-launch. Join the waitlist and be first to know when we open in your city.
          </p>
          <a href="#waitlist" style={{ background: C.rust, color: C.cream, fontFamily: F.body, fontWeight: 600, fontSize: "0.88rem", padding: "11px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", width: "fit-content", transition: "background 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = C.amber)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = C.rust)}
          >
            Join Waitlist
          </a>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ fontFamily: F.body, fontSize: "0.82rem", color: "#4A3530", margin: 0 }}>© 2025 DineFive. All rights reserved.</p>
        <p style={{ fontFamily: F.accent, fontStyle: "italic", fontSize: "0.82rem", color: "#4A3530", margin: 0 }}>&ldquo;Good food deserves a good ending.&rdquo;</p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DineFivePage() {
  return (
    <div style={{ background: C.cream, overflowX: "hidden" }}>
      <Navbar />

      <DicedHeroSection
        topText="$5.99 · Fresh · Zero Waste"
        mainText="Good Food Deserves a Good Ending."
        subMainText="DineFive connects you with freshly prepared, chef-made meals from local restaurants — offered the same day they're made, at a fixed price of $5.99. No delivery fees. No surprises."
        buttonText="Find Meals Near Me"
        onButtonClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        images={[
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80",
        ]}
        backgroundColor={C.cream}
        fontFamily={F.body}
      />

      <StatsStrip />
      <MissionBanner />
      <About />
      <HowItWorks />
      <ForDiners />
      <ForRestaurants />
      <PortionStandards />
      <WhyFiveNinetyNine />
      <OurPromise />
      <Waitlist />
      <Footer />
    </div>
  );
}
