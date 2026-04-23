import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "WAYNE",
  description: "Coffee, matcha, juices & all-day food. Ixelles, Brussels.",
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased bg-cream text-espresso`}>
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
