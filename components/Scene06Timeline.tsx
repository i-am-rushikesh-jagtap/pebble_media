"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene06Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(track, {
        xPercent: -66.66,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pinned-section" style={{ backgroundColor: "#050505", overflow: "hidden" }}>
      <div ref={trackRef} style={{ display: "flex", width: "300vw", height: "100%" }}>
        
        {/* Milestone 1 */}
        <div style={{ width: "100vw", height: "100%", display: "flex", alignItems: "center", padding: "0 10vw" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2 className="text-h2" style={{ color: "var(--brand-color)", marginBottom: "1rem" }}>THE FIRST PEBBLE</h2>
            <p className="text-body" style={{ fontSize: "1.5rem" }}>
              It started with a simple idea. A single ripple in the vast ocean of digital noise. We wanted to tell stories differently.
            </p>
          </div>
        </div>

        {/* Milestone 2 */}
        <div style={{ width: "100vw", height: "100%", display: "flex", alignItems: "center", padding: "0 10vw" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2 className="text-h2" style={{ marginBottom: "1rem" }}>MOMENTUM</h2>
            <p className="text-body" style={{ fontSize: "1.5rem" }}>
              One pebble became a wave. We partnered with visionary founders to build cinematic, unforgettable brand experiences.
            </p>
          </div>
        </div>

        {/* Milestone 3 */}
        <div style={{ width: "100vw", height: "100%", display: "flex", alignItems: "center", padding: "0 10vw" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2 className="text-h2" style={{ marginBottom: "1rem" }}>THE FUTURE</h2>
            <p className="text-body" style={{ fontSize: "1.5rem" }}>
              The ripples are infinite. Our journey of creative excellence is just beginning.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
