import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jonel Enad — Virtual Assistant | From Start to Stable",
  description:
    "Jonel Enad is a Virtual Assistant helping business owners organize backend systems, improve operations, support client acquisition, and scale with confidence.",
};

export default function JonelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

        .jonel-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .jonel-root {
          font-family: 'Montserrat', sans-serif;
          color: #0B1A2A;
          background: #fff;
          overflow-x: hidden;
        }
        .jonel-root h1, .jonel-root h2, .jonel-root h3, .jonel-root h4 {
          font-family: 'Cinzel', serif;
        }
        .jonel-root ::-webkit-scrollbar { width: 4px; }
        .jonel-root ::-webkit-scrollbar-track { background: #E8F5F9; }
        .jonel-root ::-webkit-scrollbar-thumb { background: #3C5E8C; border-radius: 2px; }

        /* Reveal animations */
        .j-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .j-reveal.visible { opacity: 1; transform: translateY(0); }
        .j-reveal-left {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .j-reveal-left.visible { opacity: 1; transform: translateX(0); }
        .j-reveal-right {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .j-reveal-right.visible { opacity: 1; transform: translateX(0); }

        /* Gold gradient text */
        .gold-text {
          background: linear-gradient(135deg, #C9A84C 0%, #F4C15D 50%, #E8A930 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .icy-text { color: #6BB9D4; }

        /* Mobile nav */
        @media (max-width: 768px) {
          .j-nav-links { display: none !important; }
          .j-nav-cta   { display: none !important; }
          .j-hamburger { display: flex !important; }
          .j-mobile-menu.open { display: block !important; }
        }

        /* Float animations */
        @keyframes jFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes jFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(8px); }
        }
        @keyframes jPulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,193,93,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(244,193,93,0); }
        }
        @keyframes jSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes jShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Scrolled navbar */
        .j-navbar.scrolled {
          box-shadow: 0 4px 32px rgba(11,26,42,0.14);
          background: rgba(11,26,42,0.97) !important;
        }
      `}</style>
      {children}
    </>
  );
}
