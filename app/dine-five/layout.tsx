import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DineFive — $5.99 Every Meal",
  description:
    "DineFive connects people with chef-prepared, ready-to-eat meals from local kitchens at a fixed price of $5.99. Fight food waste. Feed people. Keep it affordable.",
};

export default function DineFiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root {
          --dined-dark:    #231815;
          --dined-amber:   #E8920C;
          --dined-rust:    #C25030;
          --dined-green:   #5A7A3A;
          --dined-cream:   #FFFAF4;
          --dined-muted:   #8B6A4A;
          --dined-warm:    #B0A898;

          --diced-hero-section-top-text:           #C25030;
          --diced-hero-section-main-gradient-from: #C25030;
          --diced-hero-section-main-gradient-to:   #E8920C;
          --diced-hero-section-separator:          #E8920C;
          --diced-hero-section-sub-text:           #8B6A4A;
          --diced-hero-section-button-bg:          #C25030;
          --diced-hero-section-button-fg:          #FFFAF4;
          --diced-hero-section-button-hover-bg:    #E8920C;
          --diced-hero-section-button-hover-fg:    #231815;
        }
      `}</style>
      {children}
    </>
  );
}
