"use client";

import VideoPortfolioSection from "@/components/VideoPortfolioSection";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

export default function WorkPage() {
  return (
    <main className="page-with-nav">
      {/* Video Portfolio */}
      <VideoPortfolioSection />

      {/* Case Studies */}
      <PortfolioSection />

      {/* Stats & Clients */}
      <ClientsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
