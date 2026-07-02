"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { setPreloading, waitForAppReady } from "@/lib/app-ready";

export default function AppPreloader() {
  const pathname = usePathname();
  const needsHeroFrame = pathname === "/";
  const hasRun = useRef(false);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let cancelled = false;
    setPreloading(true);

    waitForAppReady(needsHeroFrame).then(() => {
      if (cancelled) return;
      setDone(true);
      window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        setPreloading(false);
      }, 560);
    });

    return () => {
      cancelled = true;
      setPreloading(false);
    };
  }, [needsHeroFrame]);

  if (!visible) return null;

  return (
    <div
      className={`app-preloader${done ? " is-done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Pebble Media"
    >
      <div className="app-preloader__inner">
        <span className="app-preloader__pebble" aria-hidden="true" />
        <p className="app-preloader__label">Loading</p>
      </div>
    </div>
  );
}
