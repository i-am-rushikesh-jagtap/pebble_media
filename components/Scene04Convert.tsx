"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene04Convert() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !metricsRef.current) return;
    
    let ctx = gsap.context(() => {
      const metrics = metricsRef.current!.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        metrics,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pinned-section" style={{ backgroundColor: "#080808" }}>
      <div className="content-overlay container" style={{ justifyContent: "center" }}>
        <h2 className="text-h2" style={{ marginBottom: "1rem" }}>CONVERT</h2>
        <p className="text-body" style={{ marginBottom: "4rem", maxWidth: "600px" }}>
          Business growth, revenue, leads, performance, and opportunity.
        </p>

        <div ref={metricsRef} style={{ display: "flex", gap: "3rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "3rem" }}>
          <div>
            <div style={{ fontSize: "4rem", fontWeight: 300, color: "var(--brand-color)" }}>10x</div>
            <div style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", opacity: 0.5 }}>Revenue Growth</div>
          </div>
          <div>
            <div style={{ fontSize: "4rem", fontWeight: 300 }}>5M+</div>
            <div style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", opacity: 0.5 }}>Leads Generated</div>
          </div>
          <div>
            <div style={{ fontSize: "4rem", fontWeight: 300 }}>24/7</div>
            <div style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", opacity: 0.5 }}>Performance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
