"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene03Connect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !nodesRef.current) return;

    let ctx = gsap.context(() => {
      const nodes = nodesRef.current!.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        nodes,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pinned-section" style={{ backgroundColor: "#111" }}>
      <div className="content-overlay container" style={{ justifyContent: "center", alignItems: "center" }}>
        <h2 className="text-h2" style={{ marginBottom: "4rem", textAlign: "center" }}>
          CONNECT<br />
          <span style={{ fontSize: "1.5rem", color: "var(--brand-color)" }}>Building Relationships</span>
        </h2>
        
        <div ref={nodesRef} style={{ position: "relative", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
           {["Communities", "People", "Connections", "Audience Growth", "Brand Engagement"].map((item, i) => (
             <div
               key={item}
               style={{
                 position: "absolute",
                 top: `${50 + Math.sin(i * 1.5) * 30}%`,
                 left: `${50 + Math.cos(i * 1.5) * 30}%`,
                 transform: "translate(-50%, -50%)",
                 padding: "1.5rem",
                 borderRadius: "50%",
                 background: "radial-gradient(circle, rgba(253,103,50,0.1) 0%, transparent 70%)",
                 border: "1px solid rgba(253,103,50,0.2)",
                 textAlign: "center",
                 width: "180px",
                 height: "180px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
               }}
             >
               <span style={{ fontWeight: 300 }}>{item}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
