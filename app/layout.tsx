import type { Metadata } from "next";
import { Inter, Cinzel, Montserrat } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import LiquidGlassNav from "@/components/LiquidGlassNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pebble Media | One Pebble. Infinite Ripples.",
  description:
    "A creative growth partner that transforms small ideas into lasting impact through world-class storytelling, design and advertising.",
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
