import type { Metadata } from "next";
import { Inter, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import "./sections.css";
import "./home.css";
import "./about.css";
import "./work.css";
import SmoothScroll from "@/components/SmoothScroll";
import LiquidGlassNav from "@/components/LiquidGlassNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pebble Media | One Pebble. Infinite Ripples.",
  description: "A creative growth partner that transforms small ideas into lasting impact through world-class storytelling, design and advertising.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <LiquidGlassNav />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
