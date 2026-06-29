"use client";

import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="page-with-nav">
      {/* About Us */}
      <AboutSection />

      {/* Our Impact - Stats */}
      <ClientsSection />

      {/* What Clients Say */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
