"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene02Create() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    let ctx = gsap.context(() => {
      const cards = cardsRef.current!.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert(); // Fixes the pin-spacer bug
  }, []);

  return (
    <section ref={containerRef} className="pinned-section" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="content-overlay container" style={{ justifyContent: "center", alignItems: "center" }}>
        <h2 className="text-h2" style={{ marginBottom: "4rem" }}>CREATE</h2>
        <div ref={cardsRef} style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["Film Production", "Photography", "UGC", "Instagram Reels", "Commercial Shoots", "Creative Direction"].map((item) => (
            <div
              key={item}
              className="magnetic"
              style={{
                padding: "2rem",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
              }}
            >
              <h3 style={{ fontWeight: 400, letterSpacing: "1px" }}>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
