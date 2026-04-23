import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Wayne",
  description: "Order your coffee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <div className="max-w-[500px] mx-auto px-4 pb-28">
          {children}
        </div>
      </body>
    </html>
  );
}