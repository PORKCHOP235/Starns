"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import IntroScreen from "@/components/IntroScreen";

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("visible"),
              i * 90
            );
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(
      (el) => obs.observe(el)
    );
    return () => obs.disconnect();
  }, []);
}

/* ── Navbar ── */
function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const handler = () =>
      nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const ham = document.getElementById("hamburger");
    const open = menu?.classList.toggle("open");
    ham?.classList.toggle("open", open);
  }
  function closeMenu() {
    document.getElementById("mobileMenu")?.classList.remove("open");
    document.getElementById("hamburger")?.classList.remove("open");
  }

  return (
    <>
      <nav id="navbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 5%", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(27,41,87,0.07)",
        transition: "box-shadow .3s",
      }}
      className="[&.scrolled]:shadow-[0_4px_28px_rgba(27,41,87,0.10)]"
      >
        <a href="#home" style={{ display: "block", lineHeight: 0 }}>
          <Image src="/logo.png" alt="Starn Marketing" width={140} height={50} style={{ height: "50px", width: "auto", objectFit: "contain" }} />
        </a>

        <ul style={{ display: "flex", gap: "36px", listStyle: "none", margin: 0, padding: 0 }} className="nav-links-desktop">
          {[["#services","Services"],["#about","About"],["#process","Process"],["#testimonials","Results"]].map(([href,label])=>(
            <li key={href}><a href={href} style={{ textDecoration:"none", color:"var(--navy)", fontWeight:500, fontSize:"0.9rem", transition:"color .2s" }}
              onMouseOver={e=>(e.currentTarget.style.color="var(--teal)")}
              onMouseOut={e=>(e.currentTarget.style.color="var(--navy)")}
            >{label}</a></li>
          ))}
        </ul>

        <a href="#contact" style={{
          background:"linear-gradient(135deg,#00C2CB,#7C3AED)", color:"#fff",
          fontWeight:700, fontSize:"0.88rem", padding:"11px 26px",
          borderRadius:"50px", textDecoration:"none",
          boxShadow:"0 4px 16px rgba(0,194,203,0.3)", whiteSpace:"nowrap",
          transition:"transform .2s, box-shadow .2s",
        }}
        onMouseOver={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 8px 28px rgba(0,194,203,0.45)";}}
        onMouseOut={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 4px 16px rgba(0,194,203,0.3)";}}
        className="nav-cta-btn"
        >
          Free Strategy Call
        </a>

        <button id="hamburger" onClick={toggleMenu} style={{ display:"none", flexDirection:"column", gap:"5px", background:"none", border:"none", cursor:"pointer", padding:"4px" }} className="hamburger-btn" aria-label="Menu">
          {[0,1,2].map(i=><span key={i} style={{ display:"block", width:"24px", height:"2px", background:"var(--navy)", borderRadius:"2px", transition:".3s" }} />)}
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobileMenu" style={{ display:"none", position:"fixed", top:"72px", left:0, right:0, zIndex:999, background:"#fff", padding:"24px 5% 32px", boxShadow:"0 16px 48px rgba(0,0,0,0.12)" }} className="mobile-menu-panel">
        <ul style={{ listStyle:"none", margin:0, padding:0 }}>
          {[["#services","Services"],["#about","About"],["#process","Process"],["#testimonials","Results"]].map(([href,label])=>(
            <li key={href} style={{ borderBottom:"1px solid rgba(27,41,87,0.07)" }}>
              <a href={href} onClick={closeMenu} style={{ display:"block", padding:"14px 0", color:"var(--navy)", textDecoration:"none", fontWeight:600, fontSize:"1.05rem" }}>{label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={closeMenu} style={{ display:"block", marginTop:"24px", background:"linear-gradient(135deg,#00C2CB,#7C3AED)", color:"#fff", fontWeight:700, fontSize:"1rem", padding:"16px", borderRadius:"50px", textAlign:"center", textDecoration:"none" }}>
          Free Strategy Call
        </a>
      </div>

      <style>{`
        @media (max-width:768px){
          .nav-links-desktop { display:none !important; }
          .nav-cta-btn { display:none !important; }
          .hamburger-btn { display:flex !important; }
          .mobile-menu-panel.open { display:block !important; }
        }
      `}</style>
    </>
  );
}

/* ── Marquee Strip ── */
function MarqueeStrip() {
  const items = ["Social Media Marketing","Paid Ads","Web Design","Email Marketing","Content Creation","Analytics & Reporting","SEO Strategy","Brand Identity"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:"var(--navy)", padding:"18px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", animation:"marquee 30s linear infinite", width:"max-content" }}>
        {doubled.map((item,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"0 36px", whiteSpace:"nowrap" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#00C2CB", display:"inline-block", flexShrink:0 }} />
            <span style={{ color:"rgba(255,255,255,0.55)", fontWeight:700, fontSize:"0.95rem", letterSpacing:".5px" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Services ── */
const services = [
  { icon:"📱", title:"Social Media Marketing", desc:"Strategic content creation, community management, and growth campaigns across Instagram, Facebook, LinkedIn, TikTok, and more.", grad:"linear-gradient(90deg,#00C2CB,#7C3AED)", bg:"rgba(0,194,203,0.1)" },
  { icon:"🌐", title:"Website Design & Dev", desc:"High-converting websites and landing pages built for speed, aesthetics, and results. From concept to launch, we handle it all.", grad:"linear-gradient(90deg,#7C3AED,#EC4899)", bg:"rgba(124,58,237,0.1)" },
  { icon:"🎯", title:"Paid Ads (Meta & Google)", desc:"ROI-driven ad campaigns that target the right audience, at the right time, with the right message. We make every dollar count.", grad:"linear-gradient(90deg,#EC4899,#F97316)", bg:"rgba(236,72,153,0.1)" },
  { icon:"📊", title:"Analytics & Reporting", desc:"Crystal-clear reporting that shows exactly what's working. No jargon — just actionable data that informs every decision we make.", grad:"linear-gradient(90deg,#F97316,#FBBF24)", bg:"rgba(249,115,22,0.1)" },
  { icon:"✍️", title:"Content Creation", desc:"Scroll-stopping graphics, videos, and copy that authentically represent your brand and connect with your target audience.", grad:"linear-gradient(90deg,#FBBF24,#00C2CB)", bg:"rgba(251,191,36,0.1)" },
  { icon:"📧", title:"Email Marketing", desc:"Automated email sequences and campaigns that nurture leads, retain customers, and drive consistent revenue on autopilot.", grad:"linear-gradient(90deg,#00C2CB,#EC4899)", bg:"rgba(0,194,203,0.1)" },
];

function Services() {
  return (
    <section id="services" style={{ padding:"100px 5%", background:"#F0F4FF" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:"56px" }}>
          <span style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>What We Do</span>
          <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, color:"var(--navy)", marginBottom:"16px" }}>
            One Agency. <span className="gradient-text">Every Solution.</span>
          </h2>
          <p style={{ fontSize:"1.02rem", color:"#64748B", lineHeight:1.75, maxWidth:"560px", margin:"0 auto" }}>
            From social media to paid ads to website design — we handle every piece of your marketing so nothing falls through the cracks.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }} className="services-grid">
          {services.map((s,i)=>(
            <div key={i} className="reveal service-card-item" style={{
              background:"#fff", borderRadius:"20px", padding:"34px",
              border:"1px solid rgba(27,41,87,0.07)",
              position:"relative", overflow:"hidden",
              transition:"transform .35s cubic-bezier(.175,.885,.32,1.275), box-shadow .35s",
              cursor:"default",
            }}
            onMouseOver={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-8px)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 24px 56px rgba(27,41,87,0.13)";}}
            onMouseOut={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";(e.currentTarget as HTMLDivElement).style.boxShadow="none";}}
            >
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:s.grad }} />
              <div style={{ width:"58px", height:"58px", borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.65rem", marginBottom:"22px", background:s.bg }}>{s.icon}</div>
              <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"var(--navy)", marginBottom:"10px" }}>{s.title}</h3>
              <p style={{ fontSize:"0.87rem", color:"#64748B", lineHeight:1.72, marginBottom:"18px" }}>{s.desc}</p>
              <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"0.83rem", fontWeight:700, color:"#00C2CB", textDecoration:"none" }}>Learn more →</a>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:640px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Numbers ── */
function Numbers() {
  const nums = [
    { icon:"🚀", val:"100+",  label:"Brands Scaled" },
    { icon:"📈", val:"+187%", label:"Avg. Lead Growth" },
    { icon:"⭐", val:"98%",   label:"Client Retention" },
    { icon:"💰", val:"4× ROAS", label:"Return on Ad Spend" },
  ];
  return (
    <div style={{ background:"var(--navy-dk)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%,rgba(0,194,203,0.12) 0%,transparent 60%),radial-gradient(ellipse at 80% 50%,rgba(124,58,237,0.12) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", maxWidth:"100%", padding:"0 5%", position:"relative", zIndex:1 }} className="numbers-grid">
        {nums.map((n,i)=>(
          <div key={i} className="reveal" style={{ padding:"48px 32px", textAlign:"center", borderRight:"1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ fontSize:"2rem", display:"block", marginBottom:"12px" }}>{n.icon}</span>
            <div style={{ fontSize:"2.8rem", fontWeight:900, lineHeight:1, marginBottom:"8px" }} className="gradient-text">{n.val}</div>
            <div style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.55)", fontWeight:500 }}>{n.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:1024px){.numbers-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:640px){.numbers-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" style={{ padding:"100px 5%" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }} className="about-grid">
        {/* Visual */}
        <div className="reveal-left" style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"420px", height:"420px", borderRadius:"42% 58% 65% 35% / 45% 40% 60% 55%", background:"linear-gradient(135deg,rgba(0,194,203,0.12),rgba(124,58,237,0.12))", display:"flex", alignItems:"center", justifyContent:"center", animation:"blobMorph 8s ease-in-out infinite" }}>
            <Image src="/logo.png" alt="Starn Marketing" width={260} height={120} style={{ width:"260px", height:"auto", filter:"drop-shadow(0 16px 36px rgba(27,41,87,0.18))" }} />
          </div>
          {/* Float cards */}
          <div style={{ position:"absolute", bottom:"24px", right:"-16px", background:"#fff", borderRadius:"16px", boxShadow:"0 10px 36px rgba(27,41,87,0.13)", padding:"16px 22px", animation:"floatA 5s ease-in-out infinite" }}>
            <div style={{ fontSize:"0.68rem", color:"#64748B", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Client Satisfaction</div>
            <div style={{ fontSize:"1.4rem", fontWeight:900 }} className="gradient-text">98%</div>
          </div>
          <div style={{ position:"absolute", top:"32px", left:"-16px", background:"#fff", borderRadius:"16px", boxShadow:"0 10px 36px rgba(27,41,87,0.13)", padding:"16px 22px", animation:"floatB 5s ease-in-out infinite", animationDelay:"-2.5s" }}>
            <div style={{ fontSize:"0.68rem", color:"#64748B", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Avg. Revenue Growth</div>
            <div style={{ fontSize:"1.4rem", fontWeight:900 }} className="gradient-text">+187%</div>
          </div>
        </div>

        {/* Content */}
        <div className="reveal-right">
          <span style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>Our Story</span>
          <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, color:"var(--navy)", lineHeight:1.18, marginBottom:"16px" }}>
            Built for Business Owners <span className="gradient-text">Done With Overwhelm</span>
          </h2>
          <p style={{ color:"#64748B", lineHeight:1.8, marginBottom:"10px" }}>
            Starn Marketing was built for business owners who are done being overwhelmed by marketing. We bring together strategy, creativity, and execution to solve your marketing problems and drive real, measurable growth.
          </p>
          <p style={{ color:"var(--navy)", fontWeight:700, fontSize:"0.95rem", marginBottom:"4px" }}>
            One solution. Less stress. More results.
          </p>
          <ul style={{ listStyle:"none", margin:"28px 0 38px", padding:0, display:"flex", flexDirection:"column", gap:"16px" }}>
            {[
              ["Strategy first","every campaign starts with a clear, data-backed growth plan"],
              ["Full execution","we don't just advise, we build and run it all for you"],
              ["Radical transparency","you always know what we're doing and why it's working"],
              ["Partnerships, not projects","we grow alongside you for the long term"],
            ].map(([strong,rest],i)=>(
              <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"14px", fontSize:"0.94rem", color:"#64748B", lineHeight:1.65 }}>
                <span style={{ minWidth:"26px", height:"26px", background:"linear-gradient(135deg,#00C2CB,#7C3AED)", color:"#fff", fontWeight:800, fontSize:"0.75rem", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>✓</span>
                <span><strong style={{ color:"var(--navy)" }}>{strong}</strong> — {rest}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" style={{ background:"linear-gradient(135deg,#00C2CB,#7C3AED)", color:"#fff", fontWeight:700, fontSize:"0.95rem", padding:"15px 34px", borderRadius:"50px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"8px", boxShadow:"0 6px 20px rgba(0,194,203,0.35)" }}>
            Start Your Growth Story →
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

/* ── Process ── */
const steps = [
  { n:"1", title:"Free Strategy Call", desc:"We learn everything about your business, goals, and current marketing. No pitch — just a real conversation about what will actually move the needle.", grad:"linear-gradient(135deg,#00C2CB,#7C3AED)", shadow:"rgba(0,194,203,0.35)" },
  { n:"2", title:"Custom Growth Plan", desc:"We build a tailored marketing roadmap — channels, messaging, budgets, and timelines — all aligned to your specific revenue goals.", grad:"linear-gradient(135deg,#7C3AED,#EC4899)", shadow:"rgba(124,58,237,0.35)" },
  { n:"3", title:"Full Execution", desc:"Our team launches and manages everything. Content, ads, emails, SEO — handled end-to-end so you can focus on running your business.", grad:"linear-gradient(135deg,#EC4899,#F97316)", shadow:"rgba(236,72,153,0.35)" },
  { n:"4", title:"Optimize & Scale", desc:"We track every metric, report clearly, and continuously optimize. As results grow, we scale what's working and cut what isn't.", grad:"linear-gradient(135deg,#F97316,#FBBF24)", shadow:"rgba(249,115,22,0.35)" },
];

function Process() {
  return (
    <section id="process" style={{ padding:"100px 5%", background:"linear-gradient(135deg,#F0F4FF,#EAF9FB)" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:"56px" }}>
          <span style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>How We Work</span>
          <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, color:"var(--navy)", marginBottom:"16px" }}>
            From <span className="gradient-text">Strategy</span> to Results in 4 Steps
          </h2>
          <p style={{ fontSize:"1.02rem", color:"#64748B", lineHeight:1.75, maxWidth:"560px", margin:"0 auto" }}>
            A proven system that removes guesswork and delivers measurable growth every time.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"24px", position:"relative" }} className="process-grid">
          {steps.map((s,i)=>(
            <div key={i} className="reveal" style={{ textAlign:"center", padding:"0 16px", position:"relative", zIndex:1 }}>
              <div style={{ width:"80px", height:"80px", borderRadius:"50%", background:s.grad, color:"#fff", fontSize:"1.6rem", fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:`0 8px 24px ${s.shadow}` }}>{s.n}</div>
              <h3 style={{ fontSize:"1.02rem", fontWeight:800, color:"var(--navy)", marginBottom:"10px" }}>{s.title}</h3>
              <p style={{ fontSize:"0.85rem", color:"#64748B", lineHeight:1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.process-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:640px){.process-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Why Us ── */
const whys = [
  { icon:"🚀", title:"Results-Driven Mindset", desc:"Every decision is tied to measurable outcomes. If it doesn't grow your business, we don't do it. Simple as that." },
  { icon:"🔍", title:"Full Transparency", desc:"No black boxes. You get clear reporting, honest conversations, and access to every campaign we run on your behalf." },
  { icon:"⚡", title:"Agile & Fast-Moving", desc:"We move quickly, test constantly, and adapt fast. Your marketing never goes stale — we're always optimizing for what's next." },
  { icon:"🤝", title:"True Partnership", desc:"We function as an extension of your team — invested in your success, proactive in communication, and always in your corner." },
  { icon:"🎨", title:"Creative Excellence", desc:"Strategy without great creative falls flat. We bring both — bold, on-brand content that stops the scroll and drives action." },
  { icon:"📐", title:"Custom-Built Systems", desc:"No cookie-cutter templates. Every strategy, funnel, and campaign is built specifically for your brand and your audience." },
];

function WhyUs() {
  return (
    <section id="why" style={{ padding:"100px 5%" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:"56px" }}>
          <span style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>Why Starn</span>
          <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, color:"var(--navy)", marginBottom:"16px" }}>
            Marketing That <span className="gradient-text">Actually Works</span>
          </h2>
          <p style={{ fontSize:"1.02rem", color:"#64748B", lineHeight:1.75, maxWidth:"560px", margin:"0 auto" }}>
            We're not a generic agency. We're a growth partner that treats your business like our own.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"22px" }} className="why-grid">
          {whys.map((w,i)=>(
            <div key={i} className="reveal" style={{
              padding:"34px", borderRadius:"20px",
              background:"linear-gradient(135deg,rgba(0,194,203,0.05),rgba(124,58,237,0.05))",
              border:"1px solid rgba(27,41,87,0.08)",
              transition:"transform .3s cubic-bezier(.175,.885,.32,1.275), box-shadow .3s, border-color .3s",
            }}
            onMouseOver={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-6px)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 20px 48px rgba(27,41,87,0.1)";(e.currentTarget as HTMLDivElement).style.borderColor="rgba(0,194,203,0.25)";}}
            onMouseOut={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";(e.currentTarget as HTMLDivElement).style.boxShadow="none";(e.currentTarget as HTMLDivElement).style.borderColor="rgba(27,41,87,0.08)";}}
            >
              <span style={{ fontSize:"2.2rem", display:"block", marginBottom:"18px" }}>{w.icon}</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:800, color:"var(--navy)", marginBottom:"10px" }}>{w.title}</h3>
              <p style={{ fontSize:"0.87rem", color:"#64748B", lineHeight:1.72 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.why-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:640px){.why-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Testimonials ── */
const testis = [
  { initials:"JR", q:"Starn took us from 0 to 150K followers in under 8 months and tripled our monthly revenue through their paid ads strategy. The ROI has been insane.", name:"Jessica R.", role:"CEO, Bloom Wellness Co." },
  { initials:"MK", q:"Before Starn, I was throwing money at ads with no idea what was working. Now I have a clear strategy, consistent leads, and finally feel in control of my marketing.", name:"Marcus K.", role:"Owner, Atlas Fitness Studios" },
  { initials:"SP", q:"The new website Starn built for us converted at nearly 3× our old site from day one. Their content team completely elevated our brand presence online.", name:"Sofia P.", role:"Founder, Luxe Skin Lab" },
];

function Testimonials() {
  return (
    <section id="testimonials" style={{ padding:"100px 5%", background:"#F0F4FF" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:"56px" }}>
          <span style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>Client Results</span>
          <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, color:"var(--navy)", marginBottom:"16px" }}>
            Real Businesses. <span className="gradient-text">Real Growth.</span>
          </h2>
          <p style={{ fontSize:"1.02rem", color:"#64748B", lineHeight:1.75, maxWidth:"560px", margin:"0 auto" }}>
            Don't take our word for it — hear from the business owners who trusted Starn with their marketing.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }} className="testi-grid">
          {testis.map((t,i)=>(
            <div key={i} className="reveal" style={{
              background:"#fff", borderRadius:"20px", padding:"34px",
              boxShadow:"0 4px 24px rgba(27,41,87,0.07)", position:"relative",
              transition:"transform .3s cubic-bezier(.175,.885,.32,1.275), box-shadow .3s",
            }}
            onMouseOver={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-6px)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 20px 48px rgba(27,41,87,0.11)";}}
            onMouseOut={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 4px 24px rgba(27,41,87,0.07)";}}
            >
              <div style={{ position:"absolute", top:"20px", right:"28px", fontSize:"5rem", lineHeight:1, color:"rgba(0,194,203,0.12)", fontFamily:"Georgia, serif", fontWeight:900 }}>"</div>
              <div style={{ color:"#FBBF24", fontSize:"0.95rem", marginBottom:"18px", letterSpacing:"2px" }}>★★★★★</div>
              <blockquote style={{ fontSize:"0.91rem", color:"#64748B", lineHeight:1.82, fontStyle:"italic", marginBottom:"26px", background:"none", border:"none", padding:0 }}>
                "{t.q}"
              </blockquote>
              <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                <div style={{ width:"46px", height:"46px", borderRadius:"50%", background:"linear-gradient(135deg,#00C2CB,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"0.95rem", flexShrink:0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--navy)" }}>{t.name}</div>
                  <div style={{ fontSize:"0.77rem", color:"#64748B" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.testi-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:640px){.testi-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section id="contact" style={{ padding:"100px 5%", background:"linear-gradient(135deg,#0D1628 0%,#1a0d4a 50%,#0a2a4a 100%)", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-100px", left:"50%", transform:"translateX(-50%)", width:"700px", height:"700px", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,194,203,0.14),transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-200px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.1),transparent 65%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <span className="reveal" style={{ fontSize:"0.73rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C2CB", display:"block", marginBottom:"14px" }}>Get Started Today</span>
        <h2 className="reveal" style={{ fontSize:"clamp(2.2rem,5vw,3.4rem)", fontWeight:900, color:"#fff", lineHeight:1.13, marginBottom:"20px" }}>
          Less Stress.<br /><span className="gradient-text">More Results.</span>
        </h2>
        <p className="reveal" style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.6)", maxWidth:"520px", margin:"0 auto 44px", lineHeight:1.75 }}>
          Book your free strategy call today and discover exactly what's holding your marketing back — and how we fix it. No commitment. No fluff.
        </p>
        <div className="reveal" style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="mailto:hello@starnmarketing.com" style={{ background:"#fff", color:"var(--navy)", fontWeight:700, fontSize:"0.95rem", padding:"16px 38px", borderRadius:"50px", textDecoration:"none", boxShadow:"0 6px 24px rgba(0,0,0,0.2)", transition:"transform .25s, box-shadow .25s", display:"inline-flex", alignItems:"center", gap:"8px" }}
          onMouseOver={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 14px 36px rgba(255,255,255,0.25)";}}
          onMouseOut={e=>{(e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";(e.currentTarget as HTMLAnchorElement).style.boxShadow="0 6px 24px rgba(0,0,0,0.2)";}}
          >
            Book Free Strategy Call →
          </a>
          <a href="#services" style={{ background:"transparent", border:"2px solid rgba(255,255,255,0.35)", color:"#fff", fontWeight:700, fontSize:"0.95rem", padding:"14px 38px", borderRadius:"50px", textDecoration:"none", transition:".25s" }}
          onMouseOver={e=>{(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.1)";(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.7)";}}
          onMouseOut={e=>{(e.currentTarget as HTMLAnchorElement).style.background="transparent";(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.35)";}}
          >
            Explore Services
          </a>
        </div>
        <p className="reveal" style={{ marginTop:"44px", color:"rgba(255,255,255,0.4)", fontSize:"0.78rem", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase" }}>
          ★ Less Stress, More Results — That&apos;s the Starn Promise ★
        </p>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ background:"#0D1628", padding:"72px 5% 32px", color:"rgba(255,255,255,0.55)" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2.2fr 1fr 1fr 1fr", gap:"48px", marginBottom:"56px" }} className="footer-top">
          <div>
            <Image src="/logo.png" alt="Starn Marketing" width={140} height={46} style={{ height:"46px", width:"auto", objectFit:"contain", filter:"brightness(0) invert(1) opacity(.88)", marginBottom:"18px", display:"block" }} />
            <p style={{ fontSize:"0.87rem", lineHeight:1.75, maxWidth:"280px" }}>We handle the marketing. You handle the success. Built for business owners who want real, measurable growth.</p>
            <span style={{ display:"inline-block", marginTop:"16px", fontSize:"0.75rem", fontWeight:700, color:"#00C2CB", textTransform:"uppercase", letterSpacing:"1.5px" }}>Less Stress. More Results.</span>
          </div>
          {[
            { h:"Services", links:[["#services","Social Media"],["#services","Paid Ads"],["#services","Web Design"],["#services","Email Marketing"],["#services","Content Creation"],["#services","Analytics"]] },
            { h:"Company",  links:[["#about","About Us"],["#process","How It Works"],["#testimonials","Results"],["#contact","Contact"]] },
            { h:"Contact",  links:[["mailto:hello@starnmarketing.com","hello@starnmarketing.com"],["#contact","Book a Call"],["#","Instagram"],["#","LinkedIn"],["#","Facebook"]] },
          ].map((col,i)=>(
            <div key={i}>
              <h4 style={{ color:"#fff", fontSize:"0.88rem", fontWeight:700, marginBottom:"20px" }}>{col.h}</h4>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"11px" }}>
                {col.links.map(([href,label])=>(
                  <li key={label}><a href={href} style={{ color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"0.86rem", transition:"color .2s, padding-left .2s", display:"block" }}
                  onMouseOver={e=>{(e.currentTarget as HTMLAnchorElement).style.color="#00C2CB";(e.currentTarget as HTMLAnchorElement).style.paddingLeft="4px";}}
                  onMouseOut={e=>{(e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.5)";(e.currentTarget as HTMLAnchorElement).style.paddingLeft="0";}}
                  >{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
          <p style={{ fontSize:"0.82rem" }}>© 2026 Starn Marketing. All rights reserved.</p>
          <div style={{ display:"flex", gap:"10px" }}>
            {[["in","LinkedIn"],["ig","Instagram"],["fb","Facebook"],["𝕏","Twitter"]].map(([label,aria])=>(
              <a key={aria} href="#" aria-label={aria} style={{ width:"38px", height:"38px", borderRadius:"50%", background:"rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"rgba(255,255,255,0.55)", fontSize:"0.8rem", fontWeight:700, transition:"background .2s, color .2s, transform .2s" }}
              onMouseOver={e=>{(e.currentTarget as HTMLAnchorElement).style.background="#00C2CB";(e.currentTarget as HTMLAnchorElement).style.color="#fff";(e.currentTarget as HTMLAnchorElement).style.transform="translateY(-3px)";}}
              onMouseOut={e=>{(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.07)";(e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.55)";(e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";}}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:1024px){.footer-top{grid-template-columns:1fr 1fr!important;}}@media(max-width:640px){.footer-top{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}

/* ── Page ── */
export default function Home() {
  const [revealed, setRevealed] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        const el = document.querySelector(target.getAttribute("href")!);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    };
    document.addEventListener("click", smoothScroll);
    return () => document.removeEventListener("click", smoothScroll);
  }, []);

  return (
    <>
      {!revealed && <IntroScreen onComplete={() => setRevealed(true)} />}
      <Navbar />
      <main>
        <Hero revealed={revealed} />
        <MarqueeStrip />
        <Services />
        <Numbers />
        <About />
        <Process />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
