"use client";

import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="page-with-nav">
      {/* Services Overview */}
      <ServicesSection />

      {/* How We Work */}
      <ProcessSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
