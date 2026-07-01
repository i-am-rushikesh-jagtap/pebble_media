"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_PIN_SCROLL_END, HERO_PIN_SCRUB } from "@/lib/hero-sequence";

interface ImageSequenceCanvasProps {
  frameCount: number;
  urlTemplate: (frame: number) => string;
  children?: React.ReactNode;
}

const BATCH_SIZE = 32;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function ImageSequenceCanvas({
  frameCount,
  urlTemplate,
  children,
}: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const render = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const images = imagesRef.current;
      let frameIndex = index;

      while (frameIndex > 0 && (!images[frameIndex] || !images[frameIndex]!.complete)) {
        frameIndex -= 1;
      }

      const img = images[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
      currentFrameRef.current = frameIndex;
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(frameCount).fill(null);

    const loadSequence = async () => {
      try {
        const first = await loadImage(urlTemplate(1));
        if (cancelled) return;

        imagesRef.current[0] = first;
        setFirstFrameReady(true);
        render(0);

        const schedule = (cb: () => void) => {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(() => cb(), { timeout: 2000 });
          } else {
            setTimeout(cb, 0);
          }
        };

        for (let start = 2; start <= frameCount; start += BATCH_SIZE) {
          await new Promise<void>((resolve) => schedule(resolve));
          if (cancelled) return;

          const end = Math.min(start + BATCH_SIZE - 1, frameCount);
          const batch = await Promise.all(
            Array.from({ length: end - start + 1 }, (_, i) =>
              loadImage(urlTemplate(start + i)).catch(() => null)
            )
          );

          batch.forEach((img, i) => {
            if (img) imagesRef.current[start - 1 + i] = img;
          });

          render(currentFrameRef.current);
        }
      } catch {
        if (!cancelled) setFirstFrameReady(true);
      }
    };

    loadSequence();

    return () => {
      cancelled = true;
    };
  }, [frameCount, urlTemplate, render]);

  useEffect(() => {
    if (!firstFrameReady || !canvasRef.current || !containerRef.current) return;

    ensureGsapPlugins();

    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(currentFrameRef.current);
    };
    resizeCanvas();

    const ctxGSAP = gsap.context(() => {
      const obj = { frame: 0 };

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: HERO_PIN_SCROLL_END,
          scrub: HERO_PIN_SCRUB,
          pin: true,
        },
      }).to(obj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(Math.round(obj.frame)),
      });
    }, containerRef);

    const handleResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      ctxGSAP.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [firstFrameReady, frameCount, render]);

  return (
    <section ref={containerRef} className="pinned-section">
      <canvas ref={canvasRef} className="canvas-container" />
      {!firstFrameReady && <div className="hero-sequence-placeholder" aria-hidden="true" />}
      {children}
    </section>
  );
}
