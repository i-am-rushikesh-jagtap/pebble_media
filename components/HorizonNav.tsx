"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./HorizonNav.css";

/**
 * THE HORIZON LINE
 *
 * A navigation system embodying the moment before the ripple—
 * the calm surface that holds infinite potential.
 *
 * Metaphor: Still water at the horizon line.
 * Interaction: Vertical emergence, like stones breaking surface tension.
 * Brand: One Pebble. Infinite Ripples.
 */

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// Custom water-like easing
const waterEase = [0.19, 1.0, 0.22, 1.0] as const;

export default function HorizonNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll detection with smooth threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          THE HORIZON LINE
          ═══════════════════════════════════════════════════════ */}
      <motion.header
        className={`horizon-nav ${scrolled ? "horizon-nav--scrolled" : ""} ${
          isOpen ? "horizon-nav--open" : ""
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: waterEase }}
      >
        <div className="horizon-nav__container">
          {/* Logo - floats like a reflection */}
          <Link href="/" className="horizon-nav__logo" onClick={() => setIsOpen(false)}>
            <motion.div
              className="horizon-nav__logo-wrapper"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: waterEase }}
            >
              <img
                src="/pebble-logo.png"
                alt="Pebble Media"
                width={140}
                height={40}
                className="horizon-nav__logo-image"
              />
              {/* Subtle reflection effect */}
              <div className="horizon-nav__logo-reflection" aria-hidden="true" />
            </motion.div>
          </Link>

          {/* Desktop horizontal navigation */}
          {!isMobile && (
            <nav className="horizon-nav__links" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`horizon-nav__link ${
                      isActive ? "horizon-nav__link--active" : ""
                    }`}
                  >
                    <span className="horizon-nav__link-text">{item.name}</span>

                    {/* Active indicator - ripple rings */}
                    {isActive && (
                      <motion.div
                        className="horizon-nav__ripple-rings"
                        layoutId="activeRipple"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        aria-hidden="true"
                      >
                        <span className="horizon-nav__ripple-ring horizon-nav__ripple-ring--1" />
                        <span className="horizon-nav__ripple-ring horizon-nav__ripple-ring--2" />
                        <span className="horizon-nav__ripple-ring horizon-nav__ripple-ring--3" />
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Menu trigger - minimal and elegant */}
          {isMobile && (
            <button
              className="horizon-nav__trigger"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="horizon-menu"
            >
              <span className="horizon-nav__trigger-text">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="horizon-nav__trigger-indicator">
                <motion.span
                  className="horizon-nav__trigger-dot"
                  animate={{
                    scale: isOpen ? [1, 1.2, 1] : 1,
                    opacity: isOpen ? [1, 0.6, 1] : 0.8,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isOpen ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </button>
          )}
        </div>

        {/* The horizon line itself */}
        <div className="horizon-nav__line" aria-hidden="true" />
      </motion.header>

      {/* ═══════════════════════════════════════════════════════
          NAVIGATION OVERLAY - Deep Water Surface
          ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            {/* Backdrop - like looking into deep water */}
            <motion.div
              className="horizon-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: waterEase }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Navigation menu - items rise from below */}
            <motion.nav
              id="horizon-menu"
              className="horizon-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: waterEase }}
              aria-label="Mobile navigation"
            >
              <div className="horizon-menu__container">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      className="horizon-menu__item-wrapper"
                      initial={{
                        opacity: 0,
                        y: 60,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 40,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.08,
                        ease: waterEase,
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`horizon-menu__item ${
                          isActive ? "horizon-menu__item--active" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.div
                          className="horizon-menu__item-surface"
                          whileHover={{
                            scale: 1.02,
                            y: -4,
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.3, ease: waterEase }}
                        >
                          <span className="horizon-menu__item-text">
                            {item.name}
                          </span>

                          {/* Active state ripples */}
                          {isActive && (
                            <div
                              className="horizon-menu__active-ripples"
                              aria-hidden="true"
                            >
                              <span className="horizon-menu__ripple" />
                              <span className="horizon-menu__ripple" />
                              <span className="horizon-menu__ripple" />
                            </div>
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
