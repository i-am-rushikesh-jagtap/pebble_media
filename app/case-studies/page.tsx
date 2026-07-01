"use client";

import "@/app/sections.css";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));

export default function CaseStudiesPage() {
  return (
    <main className="page-with-nav">
      <PortfolioSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
