"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import {
  dispatchPreloaderDone,
  getMaxPreloaderMs,
  setPreloading,
  waitForAppReady,
} from "@/lib/app-ready";

export default function AppPreloader() {
  const pathname = usePathname();
  const needsHeroFrame = pathname === "/";
  const hasRun = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let cancelled = false;
    let rafId = 0;
    setPreloading(true);

    const start = performance.now();
    const tickProgress = () => {
      if (cancelled || readyRef.current) return;
      const elapsed = performance.now() - start;
      const cap = getMaxPreloaderMs();
      const simulated = Math.min(92, (elapsed / cap) * 94);
      setProgress(simulated);
      rafId = window.requestAnimationFrame(tickProgress);
    };
    rafId = window.requestAnimationFrame(tickProgress);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const playExit = () => {
      const root = rootRef.current;
      if (!root || cancelled) return;

      setProgress(100);

      if (reducedMotion) {
        gsap.to(root, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.out",
          onComplete: finish,
        });
        return;
      }

      const curtains = root.querySelectorAll<HTMLElement>(".app-preloader__curtain");
      const content = root.querySelector<HTMLElement>(".app-preloader__content");
      const rule = root.querySelector<HTMLElement>(".app-preloader__rule");

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      tl.to(content, { opacity: 0, y: -20, duration: 0.45, ease: "power4.in" }, 0)
        .to(rule, { scaleX: 0, duration: 0.5, transformOrigin: "left center" }, 0.05)
        .to(
          curtains,
          {
            yPercent: (i) => (i === 0 ? -100 : 100),
            duration: 1,
            stagger: 0.04,
          },
          0.12
        )
        .to(root, { opacity: 0, duration: 0.35, ease: "power2.out" }, 0.82);

      tl.eventCallback("onComplete", finish);
    };

    const finish = () => {
      if (cancelled) return;
      dispatchPreloaderDone();
      setPreloading(false);
      setVisible(false);
    };

    waitForAppReady(needsHeroFrame).then(() => {
      if (cancelled) return;
      readyRef.current = true;
      window.cancelAnimationFrame(rafId);
      window.setTimeout(playExit, 120);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      setPreloading(false);
    };
  }, [needsHeroFrame]);

  if (!visible) return null;

  const count = Math.round(progress);

  return (
    <div ref={rootRef} className="app-preloader" role="status" aria-live="polite" aria-label="Loading">
      <div className="app-preloader__curtain app-preloader__curtain--top" aria-hidden="true" />
      <div className="app-preloader__curtain app-preloader__curtain--bottom" aria-hidden="true" />

      <div className="app-preloader__content">
        <p className="app-preloader__eyebrow">
          <span className="app-preloader__mask">
            <span className="app-preloader__mask-inner">Creative growth studio</span>
          </span>
        </p>

        <h1 className="app-preloader__wordmark" aria-hidden="true">
          <span className="app-preloader__mask app-preloader__mask--delay-1">
            <span className="app-preloader__mask-inner">Pebble</span>
          </span>
          <span className="app-preloader__mask app-preloader__mask--delay-2">
            <span className="app-preloader__mask-inner app-preloader__mask-inner--accent">
              Media
            </span>
          </span>
        </h1>

        <div className="app-preloader__rule" aria-hidden="true" />

        <div className="app-preloader__progress" aria-hidden="true">
          <div className="app-preloader__progress-track">
            <div
              className="app-preloader__progress-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="app-preloader__count">{count.toString().padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
