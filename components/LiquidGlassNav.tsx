"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./LiquidGlassNav.css";

const APPLE_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 38,
  mass: 0.55,
};

const APPLE_SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.65,
};

const APPLE_EASE = [0.32, 0.72, 0, 1] as const;

const DESKTOP_MIN = 1024;
const TABLET_MIN = 768;

const desktopNavItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const overlayNavItems = [
  { name: "Home", href: "/", num: "01" },
  { name: "About", href: "/about", num: "02" },
  { name: "Work", href: "/work", num: "03" },
  { name: "Services", href: "/services", num: "04" },
  { name: "Case Studies", href: "/case-studies", num: "05" },
  { name: "Testimonials", href: "/testimonials", num: "06" },
  { name: "Blog", href: "/blog", num: "07" },
  { name: "Contact", href: "/contact", num: "08" },
];

type Viewport = "mobile" | "tablet" | "desktop";

type LenisInstance = { stop: () => void; start: () => void; scroll: number };

function getViewport(width: number): Viewport {
  if (width < TABLET_MIN) return "mobile";
  if (width < DESKTOP_MIN) return "tablet";
  return "desktop";
}

function getLenis(): LenisInstance | null {
  if (typeof window === "undefined") return null;
  return (window as Window & { __pebbleLenis?: LenisInstance }).__pebbleLenis ?? null;
}

const menuPanelVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...APPLE_SPRING_SOFT,
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: 0.28, ease: APPLE_EASE },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: APPLE_SPRING_SOFT,
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export default function LiquidGlassNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const rafRef = useRef<number | null>(null);

  const rawScroll = useMotionValue(0);
  const smoothScroll = useSpring(rawScroll, {
    stiffness: 140,
    damping: 28,
    mass: 0.15,
    restDelta: 0.001,
  });

  const scrollProgress = useTransform(smoothScroll, [0, 72], [0, 1], { clamp: true });
  const navLift = useTransform(scrollProgress, [0, 1], [0, -3]);
  const tintOpacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const innerScale = useTransform(scrollProgress, [0, 1], [1, 0.975]);

  const isOverlayNav = viewport !== "desktop";

  useEffect(() => {
    const updateViewport = () => setViewport(getViewport(window.innerWidth));

    updateViewport();

    const mqDesktop = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    const mqTablet = window.matchMedia(`(min-width: ${TABLET_MIN}px)`);

    const onChange = () => updateViewport();

    mqDesktop.addEventListener("change", onChange);
    mqTablet.addEventListener("change", onChange);
    window.addEventListener("resize", onChange, { passive: true });

    return () => {
      mqDesktop.removeEventListener("change", onChange);
      mqTablet.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  useEffect(() => {
    if (!isOverlayNav) setIsOpen(false);
  }, [isOverlayNav]);

  useEffect(() => {
    const updateScroll = (y: number) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rawScroll.set(y);
        rafRef.current = null;
      });
    };

    const onLenisScroll = (e: Event) => {
      const detail = (e as CustomEvent<{ scroll: number }>).detail;
      updateScroll(detail?.scroll ?? window.scrollY);
    };

    const onNativeScroll = () => updateScroll(window.scrollY);

    window.addEventListener("pebble:scroll", onLenisScroll);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    updateScroll(window.scrollY);

    return () => {
      window.removeEventListener("pebble:scroll", onLenisScroll);
      window.removeEventListener("scroll", onNativeScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [rawScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  useEffect(() => {
    const lenis = getLenis();

    if (isOpen && isOverlayNav) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, isOverlayNav]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <motion.header
        className={`lg-nav-wrapper lg-nav-wrapper--${viewport}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...APPLE_SPRING_SOFT, delay: 0.08 }}
        style={{ y: navLift }}
      >
        <nav
          className={`lg-nav lg-nav--${viewport} ${isOpen ? "lg-nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <motion.div className="lg-nav__glass" style={{ scale: innerScale }}>
            <div className="lg-nav__blur-layer" aria-hidden="true" />
            <motion.div
              className="lg-nav__tint-layer"
              style={{ opacity: tintOpacity }}
              aria-hidden="true"
            />
            <div className="lg-nav__specular" aria-hidden="true" />

            <div className="lg-nav__inner">
              <Link
                href="/"
                className="lg-nav__logo"
                onClick={() => setIsOpen(false)}
                aria-label="Pebble Media home"
              >
                <motion.span
                  className="lg-nav__logo-text"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={APPLE_SPRING}
                >
                  Pebble
                </motion.span>
              </Link>

              <div className="lg-nav__links" role="navigation" aria-label="Desktop navigation">
                {desktopNavItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`lg-nav__link ${isActive ? "lg-nav__link--active" : ""}`}
                      tabIndex={isOverlayNav ? -1 : undefined}
                      aria-hidden={isOverlayNav}
                    >
                      <span className="lg-nav__link-text">{item.name}</span>
                      {isActive && (
                        <motion.span
                          className="lg-nav__active-pill"
                          layoutId="lgActivePill"
                          transition={APPLE_SPRING}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="lg-nav__actions">
                <Link
                  href="/contact"
                  className="lg-nav__cta"
                  tabIndex={isOverlayNav ? -1 : undefined}
                  aria-hidden={isOverlayNav}
                >
                  <motion.span
                    className="lg-nav__cta-inner"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={APPLE_SPRING}
                  >
                    <span className="lg-nav__cta-text lg-nav__cta-text--full">Start a Project</span>
                    <span className="lg-nav__cta-text lg-nav__cta-text--short">Start</span>
                  </motion.span>
                </Link>

                <motion.button
                  type="button"
                  className="lg-nav__menu-btn"
                  onClick={toggleMenu}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="lg-overlay-menu"
                  whileTap={{ scale: 0.97 }}
                  transition={APPLE_SPRING}
                >
                  <span className="lg-nav__menu-label">{isOpen ? "Close" : "Menu"}</span>
                  <span className={`lg-nav__burger ${isOpen ? "lg-nav__burger--open" : ""}`}>
                    <span />
                    <span />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      <AnimatePresence mode="wait">
        {isOpen && isOverlayNav && (
          <>
            <motion.div
              className="lg-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: APPLE_EASE }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              id="lg-overlay-menu"
              className={`lg-menu lg-menu--${viewport}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: APPLE_EASE }}
              aria-label={viewport === "tablet" ? "Tablet navigation" : "Mobile navigation"}
            >
              <motion.div
                className="lg-menu__panel"
                variants={menuPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="lg-menu__blur-layer" aria-hidden="true" />
                <div className="lg-menu__specular" aria-hidden="true" />

                <div className="lg-menu__header">
                  <Link
                    href="/"
                    className="lg-menu__logo"
                    onClick={() => setIsOpen(false)}
                    aria-label="Pebble Media home"
                  >
                    <span className="lg-menu__logo-text">Pebble</span>
                  </Link>
                  <motion.button
                    type="button"
                    className="lg-menu__close"
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.96 }}
                    transition={APPLE_SPRING}
                    aria-label="Close menu"
                  >
                    <span className="lg-menu__close-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                    <span className="lg-menu__close-text">Close</span>
                  </motion.button>
                </div>

                <ul className="lg-menu__list">
                  {overlayNavItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.li key={item.href} variants={menuItemVariants}>
                        <Link
                          href={item.href}
                          className={`lg-menu__item ${isActive ? "lg-menu__item--active" : ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="lg-menu__num">{item.num}</span>
                          <span className="lg-menu__name">{item.name}</span>
                          {isActive && (
                            <motion.span
                              className="lg-menu__active-bar"
                              layoutId="lgMobileActive"
                              transition={APPLE_SPRING}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div className="lg-menu__footer" variants={menuItemVariants}>
                  <p className="lg-menu__tagline">Create. Connect. Convert.</p>
                  <div className="lg-menu__contact">
                    <a href="mailto:hello@pebblemedia.in">hello@pebblemedia.in</a>
                    <span aria-hidden="true">·</span>
                    <a
                      href="https://instagram.com/pebblemedia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                  <Link href="/contact" className="lg-menu__cta" onClick={() => setIsOpen(false)}>
                    Start a Project
                  </Link>
                </motion.div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
