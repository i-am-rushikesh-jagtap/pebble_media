"use client";

import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* HERO SECTION - Full Screen */}
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
            <Link href="/work" className="btn-primary">Explore Our Work</Link>
            <Link href="/contact" className="btn-secondary">Start a Project</Link>
          </div>
        </div>
      </ImageSequenceCanvas>

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
