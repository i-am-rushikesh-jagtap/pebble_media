"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    ensureGsapPlugins();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const onScroll = (e: { scroll: number }) => {
      ScrollTrigger.update();
      window.dispatchEvent(
        new CustomEvent("pebble:scroll", { detail: { scroll: e.scroll } })
      );
    };

    lenis.on("scroll", onScroll);
    (window as Window & { __pebbleLenis?: Lenis }).__pebbleLenis = lenis;

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as Window & { __pebbleLenis?: Lenis }).__pebbleLenis;
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
