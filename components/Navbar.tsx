"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "./Navbar.css";

/**
 * MODERN RESPONSIVE NAVIGATION
 * Clean glassmorphism design with smooth animations
 */

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ─── MODERN NAVIGATION BAR ─── */}
      <motion.nav
        className={`modern-nav ${scrolled ? 'modern-nav--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="modern-nav-container">
          {/* Logo */}
          <Link href="/" className="modern-nav-logo" aria-label="Pebble Media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pebble-logo.png"
              alt="Pebble Media"
              width={140}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="modern-nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`modern-nav-link ${isActive ? 'modern-nav-link--active' : ''}`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="modern-nav-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="modern-nav-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="modern-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Panel */}
            <motion.div
              className="modern-nav-mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="modern-nav-mobile-header">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pebble-logo.png"
                    alt="Pebble Media"
                    width={120}
                    height={35}
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="modern-nav-close"
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="modern-nav-mobile-links">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`modern-nav-mobile-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                        {isActive && <span className="active-dot" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
