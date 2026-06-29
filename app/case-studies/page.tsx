"use client";

import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function CaseStudiesPage() {
  return (
    <main className="page-with-nav">
      {/* Case Studies Grid */}
      <PortfolioSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
