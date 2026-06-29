"use client";

import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";
import ServicesSection from "@/components/ServicesSection";
import VideoPortfolioSection from "@/components/VideoPortfolioSection";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* SCENE 01: ENHANCED HERO */}
      <ImageSequenceCanvas
        frameCount={241}
        urlTemplate={(frame) => `/sequence/img_${frame.toString().padStart(5, '0')}.jpg`}
      >
        <div className="content-overlay container">
          <h1 className="text-hero-enhanced" style={{ animation: "fadeInUp 1.2s ease-out" }}>
            Every brand<br />starts small.
          </h1>
          <p className="text-tagline" style={{ marginTop: '2rem', animation: "fadeInUp 1.6s ease-out" }}>
            One Pebble. Infinite Ripples.
          </p>
          <div className="hero-cta" style={{ marginTop: '3rem', animation: "fadeInUp 2s ease-out" }}>
            <a href="#services" className="btn-primary">Explore Our Work</a>
            <a href="#contact" className="btn-secondary">Start a Project</a>
          </div>
        </div>
      </ImageSequenceCanvas>

      {/* SERVICES SECTION */}
      <ServicesSection />

      {/* VIDEO PORTFOLIO SECTION */}
      <VideoPortfolioSection />

      {/* PORTFOLIO SECTION */}
      <PortfolioSection />

      {/* CLIENTS SECTION */}
      <ClientsSection />

      {/* PROCESS SECTION */}
      <ProcessSection />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* FOOTER */}
      <Footer />

      {/* Global Styles for page-specific animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
