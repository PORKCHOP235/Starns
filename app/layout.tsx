import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starn Marketing — Less Stress. More Results.",
  description:
    "Starn Marketing brings together strategy, creativity, and execution to drive real, measurable growth for your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
