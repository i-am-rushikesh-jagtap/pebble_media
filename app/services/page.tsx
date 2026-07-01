"use client";

import "@/app/sections.css";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));

export default function ServicesPage() {
  return (
    <main className="page-with-nav">
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
