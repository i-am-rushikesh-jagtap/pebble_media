"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import {
  WheelPhysicsEngine,
  VelocityTracker,
  wrapIndex,
  slotFrontness,
  dominantSlotIndex,
} from "@/lib/wheel-physics";
import "./TeamCarousel.css";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "shardul",
    name: "Shardul Kulkarni",
    role: "Founder & Creative Director",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o1.jpeg?updatedAt=1754289569411",
  },
  {
    id: "himanshu",
    name: "Himanshu",
    role: "Lead Developer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307",
  },
  {
    id: "kashish",
    name: "Kashish",
    role: "Creative Designer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398",
  },
  {
    id: "member-4",
    name: "Team Member 4",
    role: "Marketing Strategist",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o3.jpeg?updatedAt=1754289569422",
  },
  {
    id: "member-5",
    name: "Team Member 5",
    role: "Brand Consultant",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o5.jpeg?updatedAt=1754289569406",
  },
  {
    id: "member-6",
    name: "Team Member 6",
    role: "Content Creator",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o6.jpeg?updatedAt=1754289569438",
  },
];

const COUNT = teamMembers.length;
const ANGLE_STEP = 360 / COUNT;
const AUTO_INTERVAL = 6000;
const DRAG_SENSITIVITY = 0.42;
const META_SWITCH_MARGIN = 0.06;

function NavChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <span className="team-orbit__nav-inner" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {direction === "prev" ? (
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}

export default function TeamCarousel() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [metaPhase, setMetaPhase] = useState<"idle" | "swap">("idle");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [navPress, setNavPress] = useState<"prev" | "next" | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayIndexRef = useRef(0);
  const settledIndexRef = useRef(0);
  const navTargetIndexRef = useRef(0);
  const isSpinningRef = useRef(false);
  const isDraggingRef = useRef(false);
  const metaSwapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const engineRef = useRef<WheelPhysicsEngine | null>(null);
  const velocityTracker = useRef(new VelocityTracker(8));
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const didDragRef = useRef(false);
  const prefersReducedMotion = useRef(false);
  const skipNavClickRef = useRef(false);

  const displayMember = teamMembers[displayIndex] ?? teamMembers[0];
  const settledMember = teamMembers[settledIndex] ?? teamMembers[0];

  const clearMetaSwapTimer = useCallback(() => {
    if (metaSwapTimer.current) {
      clearTimeout(metaSwapTimer.current);
      metaSwapTimer.current = null;
    }
  }, []);

  const pulseGlow = useCallback(() => {
    if (!glowRef.current || prefersReducedMotion.current) return;
    gsap.fromTo(
      glowRef.current,
      { opacity: 0.55 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          if (glowRef.current) gsap.set(glowRef.current, { clearProps: "opacity" });
        },
      }
    );
  }, []);

  const resetGlowParallax = useCallback(() => {
    if (!glowRef.current) return;
    gsap.set(glowRef.current, { x: 0, y: 0 });
  }, []);

  const applyDisplayIndex = useCallback(
    (nextIndex: number, animate: boolean) => {
      if (nextIndex === displayIndexRef.current) return;

      displayIndexRef.current = nextIndex;

      if (!animate || prefersReducedMotion.current) {
        clearMetaSwapTimer();
        setMetaPhase("idle");
        setDisplayIndex(nextIndex);
        return;
      }

      clearMetaSwapTimer();
      setMetaPhase("swap");

      metaSwapTimer.current = setTimeout(() => {
        setDisplayIndex(nextIndex);
        setMetaPhase("idle");
        metaSwapTimer.current = null;
      }, 100);
    },
    [clearMetaSwapTimer]
  );

  const syncDisplayIndex = useCallback(
    (nextIndex: number, angle: number) => {
      const current = displayIndexRef.current;
      if (nextIndex === current) return;

      if (isSpinningRef.current || isDraggingRef.current) {
        applyDisplayIndex(nextIndex, false);
        return;
      }

      const newScore = slotFrontness(angle, nextIndex, ANGLE_STEP);
      const oldScore = slotFrontness(angle, current, ANGLE_STEP);
      if (newScore < 0.5 || newScore < oldScore + META_SWITCH_MARGIN) return;

      applyDisplayIndex(nextIndex, true);
    },
    [applyDisplayIndex]
  );

  const syncSlotVisuals = useCallback(
    (angle: number) => {
      let maxFrontness = 0;
      const dominant = dominantSlotIndex(angle, ANGLE_STEP, COUNT);

      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        const frontness = slotFrontness(angle, i, ANGLE_STEP);
        el.style.setProperty("--frontness", frontness.toFixed(4));
        maxFrontness = Math.max(maxFrontness, frontness);

        const isFront = frontness > 0.88;
        el.classList.toggle("is-active", isFront);
        el.setAttribute("aria-hidden", isFront ? "false" : "true");

        const btn = el.querySelector<HTMLButtonElement>(".team-orbit__pebble");
        if (btn) btn.tabIndex = isFront ? 0 : -1;
      });

      sceneRef.current?.style.setProperty("--glow-intensity", maxFrontness.toFixed(4));
      syncDisplayIndex(dominant, angle);
    },
    [syncDisplayIndex]
  );

  const applyRotation = useCallback(
    (angle: number) => {
      if (!ringRef.current) return;
      gsap.set(ringRef.current, { rotateY: angle, force3D: true });
      syncSlotVisuals(angle);
    },
    [syncSlotVisuals]
  );

  const handleSettle = useCallback(
    (angle: number, index: number) => {
      settledIndexRef.current = index;
      navTargetIndexRef.current = index;
      isSpinningRef.current = false;
      setSettledIndex(index);
      setIsSpinning(false);
      applyDisplayIndex(index, false);
      setMetaPhase("idle");
      applyRotation(angle);
      pulseGlow();
      resetGlowParallax();
    },
    [applyRotation, applyDisplayIndex, pulseGlow, resetGlowParallax]
  );

  const handleUpdate = useCallback(
    (angle: number, velocity: number) => {
      applyRotation(angle);
      if (Math.abs(velocity) > 0.001) {
        isSpinningRef.current = true;
        setIsSpinning(true);
      }
    },
    [applyRotation]
  );

  const beginNavSpin = useCallback(() => {
    if (!ringRef.current) return;
    isSpinningRef.current = true;
    setIsSpinning(true);
    resetGlowParallax();
    engineRef.current?.setAngle(gsap.getProperty(ringRef.current, "rotateY") as number);
  }, [resetGlowParallax]);

  const runStepNavigation = useCallback(
    (direction: 1 | -1) => {
      const engine = engineRef.current;
      if (!engine || !ringRef.current || isDraggingRef.current) return;

      if (prefersReducedMotion.current) {
        const next = wrapIndex(navTargetIndexRef.current + direction, COUNT);
        navTargetIndexRef.current = next;
        engine.settleImmediate(next);
        return;
      }

      navTargetIndexRef.current = wrapIndex(navTargetIndexRef.current + direction, COUNT);
      beginNavSpin();
      engine.requestNavStep(direction);
    },
    [beginNavSpin]
  );

  const runGoToSlide = useCallback(
    (index: number) => {
      const engine = engineRef.current;
      if (!engine || !ringRef.current || isDraggingRef.current) return;
      if (index < 0 || index >= COUNT) return;

      if (prefersReducedMotion.current) {
        navTargetIndexRef.current = index;
        engine.settleImmediate(index);
        return;
      }

      if (index === navTargetIndexRef.current && !engine.isRunning) return;

      navTargetIndexRef.current = index;
      beginNavSpin();
      engine.retargetToIndex(index);
    },
    [beginNavSpin]
  );

  const clearNavPress = useCallback(() => {
    setNavPress(null);
  }, []);

  const handleNavPointerDown = useCallback(
    (direction: "prev" | "next", e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      setNavPress(direction);
      skipNavClickRef.current = true;
      if (direction === "prev") runStepNavigation(-1);
      else runStepNavigation(1);
    },
    [runStepNavigation]
  );

  const handleNavClick = useCallback(
    (direction: "prev" | "next") => {
      if (skipNavClickRef.current) {
        skipNavClickRef.current = false;
        return;
      }
      if (direction === "prev") runStepNavigation(-1);
      else runStepNavigation(1);
    },
    [runStepNavigation]
  );

  const nextSlide = useCallback(() => {
    runStepNavigation(1);
  }, [runStepNavigation]);

  const prevSlide = useCallback(() => {
    runStepNavigation(-1);
  }, [runStepNavigation]);

  const goToSlide = useCallback(
    (index: number) => {
      runGoToSlide(index);
    },
    [runGoToSlide]
  );

  const markImageError = useCallback((id: string) => {
    setImageErrors((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  useEffect(() => {
    ensureGsapPlugins();
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    engineRef.current = new WheelPhysicsEngine(
      { slotCount: COUNT, slotStep: ANGLE_STEP, dragSensitivity: DRAG_SENSITIVITY },
      {
        onUpdate: handleUpdate,
        onSettle: handleSettle,
      }
    );

    engineRef.current.settleImmediate(0);
    navTargetIndexRef.current = 0;

    return () => {
      clearMetaSwapTimer();
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, [handleSettle, handleUpdate, clearMetaSwapTimer]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    isSpinningRef.current = isSpinning;
  }, [isSpinning]);

  useEffect(() => {
    if (isPaused || isDragging || isSpinning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, isSpinning, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!rootRef.current?.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const scene = sceneRef.current;
    const glow = glowRef.current;
    if (!scene || !glow || prefersReducedMotion.current) return;

    const onMove = (e: PointerEvent) => {
      if (isDraggingRef.current || isSpinningRef.current) return;
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(glow, {
        x: x * 18,
        y: y * 10,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    scene.addEventListener("pointermove", onMove);
    return () => scene.removeEventListener("pointermove", onMove);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ringRef.current || e.button !== 0) return;

    engineRef.current?.stop();
    clearMetaSwapTimer();
    setMetaPhase("idle");
    isDraggingRef.current = true;
    isSpinningRef.current = false;
    setIsDragging(true);
    setIsSpinning(false);
    setIsPaused(true);
    didDragRef.current = false;
    dragStartX.current = e.clientX;
    dragStartAngle.current = gsap.getProperty(ringRef.current, "rotateY") as number;
    velocityTracker.current.reset();
    velocityTracker.current.push(e.clientX);
    engineRef.current?.setAngle(dragStartAngle.current);
    resetGlowParallax();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !ringRef.current) return;

    velocityTracker.current.push(e.clientX);

    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 6) didDragRef.current = true;

    const angle = dragStartAngle.current + delta * DRAG_SENSITIVITY;
    engineRef.current?.setAngle(angle);
    applyRotation(angle);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    setIsPaused(false);

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 80);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }

    const engine = engineRef.current;
    if (!engine || !ringRef.current) return;

    const pxVelocity = velocityTracker.current.getVelocity();
    const angle = gsap.getProperty(ringRef.current, "rotateY") as number;
    engine.setAngle(angle);

    if (prefersReducedMotion.current) {
      const idx = dominantSlotIndex(angle, ANGLE_STEP, COUNT);
      engine.settleImmediate(idx);
      return;
    }

    if (!didDragRef.current || Math.abs(pxVelocity) < 0.08) {
      isSpinningRef.current = true;
      setIsSpinning(true);
      engine.settleFromDrag();
      return;
    }

    isSpinningRef.current = true;
    setIsSpinning(true);
    engine.release(pxVelocity);
  };

  const onPointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    setIsPaused(false);
    didDragRef.current = false;
    const angle = gsap.getProperty(ringRef.current, "rotateY") as number;
    const idx = dominantSlotIndex(angle, ANGLE_STEP, COUNT);
    engineRef.current?.settleImmediate(idx);
    isSpinningRef.current = false;
    setIsSpinning(false);
  };

  const sceneClass = [
    "team-orbit__scene",
    isDragging ? "is-dragging" : "",
    isSpinning ? "is-spinning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const metaClass = ["team-orbit__meta", metaPhase === "swap" ? "is-swapping" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className="team-orbit"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      <div className="team-orbit__halo" aria-hidden="true" />
      <div className="team-orbit__track" aria-hidden="true" />

      <div className="team-orbit__controls">
        <button
          type="button"
          className={`team-orbit__nav team-orbit__nav--prev${navPress === "prev" ? " is-pressed" : ""}`}
          onPointerDown={(e) => handleNavPointerDown("prev", e)}
          onClick={() => handleNavClick("prev")}
          onPointerUp={clearNavPress}
          onPointerCancel={clearNavPress}
          onPointerLeave={clearNavPress}
          aria-label="Previous team member"
        >
          <NavChevron direction="prev" />
        </button>

        <div
          ref={sceneRef}
          className={sceneClass}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          role="region"
          aria-label="Team member carousel"
          aria-roledescription="carousel"
        >
          <div ref={glowRef} className="team-orbit__glow" aria-hidden="true" />

          <div className="team-orbit__perspective">
            <div ref={ringRef} className="team-orbit__ring">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="team-orbit__item"
                  style={{ ["--item-angle" as string]: `${index * ANGLE_STEP}deg` }}
                >
                  <button
                    type="button"
                    className="team-orbit__pebble"
                    onClick={() => {
                      if (didDragRef.current) return;
                      goToSlide(index);
                    }}
                    aria-label={`View ${member.name}, ${member.role}`}
                  >
                    <div className="team-orbit__pebble-surface">
                      {imageErrors[member.id] ? (
                        <span className="team-orbit__photo-fallback" aria-hidden="true">
                          {member.name.charAt(0)}
                        </span>
                      ) : (
                        <Image
                          src={member.image}
                          alt={index === displayIndex ? member.name : ""}
                          fill
                          sizes="(max-width: 640px) 120px, (max-width: 1024px) 200px, 320px"
                          className="team-orbit__photo"
                          priority={index <= 1}
                          draggable={false}
                          onError={() => markImageError(member.id)}
                        />
                      )}
                      <span className="team-orbit__pebble-shine" aria-hidden="true" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="team-orbit__floor" aria-hidden="true" />
        </div>

        <button
          type="button"
          className={`team-orbit__nav team-orbit__nav--next${navPress === "next" ? " is-pressed" : ""}`}
          onPointerDown={(e) => handleNavPointerDown("next", e)}
          onClick={() => handleNavClick("next")}
          onPointerUp={clearNavPress}
          onPointerCancel={clearNavPress}
          onPointerLeave={clearNavPress}
          aria-label="Next team member"
        >
          <NavChevron direction="next" />
        </button>
      </div>

      <div className={metaClass}>
        <div className="team-orbit__copy">
          <h3 className="team-orbit__name">{displayMember.name}</h3>
          <p className="team-orbit__role">{displayMember.role}</p>
        </div>

        <span className="team-orbit__sr-only" aria-live="polite" aria-atomic="true">
          {isSpinning ? "" : `${settledMember.name}, ${settledMember.role}`}
        </span>
      </div>

      <div className="team-orbit__dots" role="tablist" aria-label="Select team member">
        {teamMembers.map((member, index) => (
          <button
            type="button"
            key={member.id}
            role="tab"
            aria-selected={index === displayIndex}
            className={`team-orbit__dot${index === displayIndex ? " is-active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to ${member.name}`}
          >
            <span className="team-orbit__dot-fill" />
          </button>
        ))}
      </div>

      <p className="team-orbit__hint">Flick to spin · drag to browse</p>
    </div>
  );
}
