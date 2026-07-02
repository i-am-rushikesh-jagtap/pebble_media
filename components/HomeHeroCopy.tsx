"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { HERO_PIN_SCROLL_END, HERO_PIN_SCRUB } from "@/lib/hero-sequence";
import { HERO_READY_EVENT, isHeroReady } from "@/lib/app-ready";

export default function HomeHeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const root = rootRef.current;
    if (!root) return;

    const pinSection = root.closest<HTMLElement>(".pinned-section");
    if (!pinSection) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runEntrance = () => {
      const ctx = gsap.context(() => {
        if (!reducedMotion) {
          const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });

          entrance
            .from(".hero-eyebrow", {
              y: 20,
              opacity: 0,
              duration: 0.75,
            })
            .from(
              ".hero-line__inner",
              {
                yPercent: 108,
                opacity: 0,
                duration: 1.15,
                stagger: 0.1,
              },
              "-=0.4"
            )
            .from(
              ".hero-tagline-rule",
              {
                scaleY: 0,
                duration: 0.65,
                transformOrigin: "top center",
              },
              "-=0.55"
            )
            .from(
              ".hero-tagline__part",
              {
                yPercent: 120,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
              },
              "-=0.45"
            );

          const scrollMotion = gsap.timeline({
            scrollTrigger: {
              trigger: pinSection,
              start: "top top",
              end: HERO_PIN_SCROLL_END,
              scrub: HERO_PIN_SCRUB,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "none" },
          });

          scrollMotion
            .to(".hero-eyebrow", { opacity: 0, y: -28, duration: 0.22 }, 0)
            .to(".hero-copy__motion", { y: -110, duration: 1 }, 0)
            .to(
              ".text-hero-enhanced",
              {
                scale: 0.86,
                opacity: 0.18,
                filter: "blur(8px)",
                duration: 1,
              },
              0
            )
            .to(".hero-line:nth-child(1) .hero-line__inner", { x: -56, duration: 1 }, 0)
            .to(".hero-line:nth-child(2) .hero-line__inner", { x: 36, duration: 1 }, 0)
            .to(
              ".hero-line--accent .hero-line__inner",
              {
                x: 72,
                scale: 1.06,
                duration: 1,
              },
              0
            )
            .to(".hero-tagline-wrap", { y: 52, duration: 1 }, 0)
            .to(
              ".hero-tagline-rule",
              {
                scaleY: 0.35,
                opacity: 0.2,
                duration: 1,
              },
              0
            )
            .to(
              ".text-tagline",
              {
                opacity: 0.22,
                filter: "blur(4px)",
                duration: 1,
              },
              0
            )
            .to(".hero-tagline__part:nth-child(1)", { x: -40, duration: 1 }, 0)
            .to(
              ".hero-tagline__part:nth-child(2)",
              {
                x: 28,
                scale: 1.05,
                duration: 1,
              },
              0
            )
            .to(".hero-tagline__part:nth-child(3)", { x: 56, duration: 1 }, 0);
        }
      }, root);

      return () => ctx.revert();
    };

    if (isHeroReady()) {
      return runEntrance();
    }

    const onHeroReady = () => runEntrance();
    window.addEventListener(HERO_READY_EVENT, onHeroReady, { once: true });
    return () => window.removeEventListener(HERO_READY_EVENT, onHeroReady);
  }, []);

  return (
    <div ref={rootRef} className="hero-copy">
      <div className="hero-copy__motion">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow__mark" aria-hidden="true" />
          Story-led growth studio
        </p>

        <h1 className="text-hero-enhanced">
          <span className="hero-line">
            <span className="hero-line__inner">For Brands That</span>
          </span>
          <span className="hero-line">
            <span className="hero-line__inner">Refuse To</span>
          </span>
          <span className="hero-line hero-line--accent">
            <span className="hero-line__inner hero-blend-text">Blend In</span>
          </span>
        </h1>

        <div className="hero-tagline-wrap">
          <span className="hero-tagline-rule" aria-hidden="true" />
          <p className="text-tagline">
            <span className="hero-tagline__part">We help brands get </span>
            <span className="hero-tagline__part hero-tagline__part--accent">
              <em className="tagline-emphasis">remembered</em>
            </span>
            <span className="hero-tagline__part">, not just seen.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
