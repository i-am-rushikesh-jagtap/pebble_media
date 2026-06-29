"use client";

import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";

export default function Home() {
  return (
    <main>
      {/* SCENE 01: HERO */}
      <ImageSequenceCanvas
        frameCount={241}
        urlTemplate={(frame) => `/sequence/img_${frame.toString().padStart(5, '0')}.jpg`}
      >
        <div className="content-overlay container">
          <h1 className="text-hero" style={{ animation: "fadeInUp 2s ease-out" }}>
            Every brand<br />starts small.
          </h1>
          <p className="text-body" style={{ marginTop: '2rem', animation: "fadeInUp 2.5s ease-out" }}>
            One Pebble. Infinite Ripples.
          </p>
        </div>
      </ImageSequenceCanvas>

      {/* Global Styles for page-specific simple animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
