"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageSequenceCanvasProps {
  frameCount: number;
  urlTemplate: (frame: number) => string;
  children?: React.ReactNode;
}

export default function ImageSequenceCanvas({
  frameCount,
  urlTemplate,
  children
}: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = urlTemplate(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, urlTemplate]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const render = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    images[0].onload = () => render(0);
    if (images[0].complete) render(0);

    // IMPORTANT: Use gsap.context to fix React Strict Mode duplicate pin-spacers
    let ctxGSAP = gsap.context(() => {
      const obj = { frame: 0 };
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Scroll depth for this animation (4 screens)
          scrub: 0.5,     // Smooth scrubbing
          pin: true,      // Pin the section while scrolling
        }
      });

      tl.to(obj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(Math.round(obj.frame))
      });
    }, containerRef);

    const handleResize = () => {
      resizeCanvas();
      // render current frame after resize
      const currentProgress = ctxGSAP.data[0] ? (ctxGSAP.data[0] as any).progress() : 0;
      // This is slightly tricky, we just rely on ScrollTrigger update
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      ctxGSAP.revert(); // Properly kills ScrollTrigger and removes pin-spacers!
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameCount]);

  return (
    <section ref={containerRef} className="pinned-section">
      <canvas ref={canvasRef} className="canvas-container" />
      {children}
    </section>
  );
}
