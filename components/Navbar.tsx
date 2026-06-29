"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "About", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const SPRING = { type: "spring", stiffness: 400, damping: 30, mass: 0.6 } as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll to deepen the glass when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      {/* ─── Full-width top navigation bar ─── */}
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        role="navigation"
        className={`apple-nav${scrolled ? " apple-nav--scrolled" : ""}`}
      >
        {/* Inner content wrapper with max-width constraint */}
        <div className="apple-nav-inner">

          {/* Logo */}
          <div className="apple-nav-logo">
            <Link href="/" aria-label="Pebble Media — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pebble-logo.png"
                alt="Pebble Media"
                className="apple-nav-logo-img"
              />
            </Link>
          </div>

          {/* ── Desktop center links ── */}
          <LayoutGroup>
            <div
              className="apple-nav-links"
              onMouseLeave={() => setHoveredItem(null)}
              role="menubar"
              aria-label="Primary Navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  role="menuitem"
                  className={`apple-nav-link${activeItem === item.name ? " apple-nav-link--active" : ""}`}
                  aria-current={activeItem === item.name ? "page" : undefined}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseMove={handleLinkMouseMove}
                  onClick={() => setActiveItem(item.name)}
                >
                  {/* SwiftUI matchedGeometryEffect — the morphing glass capsule */}
                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.span
                        layoutId="apple-pill"
                        className="apple-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={SPRING}
                        aria-hidden="true"
                      >
                        {/* Dynamic specular glare tracking mouse */}
                        <motion.span
                          className="apple-pill-glare"
                          animate={{ x: mousePos.x - 36, y: mousePos.y - 36 }}
                          transition={{ type: "tween", duration: 0 }}
                          aria-hidden="true"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="apple-nav-link-label">{item.name}</span>
                </Link>
              ))}
            </div>
          </LayoutGroup>

          {/* ── Desktop right: Professional contact link ── */}
          <div className="apple-nav-actions">
            <Link href="#contact" className="apple-contact-link">
              <span className="contact-icon">✉</span>
              <span>Contact</span>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="apple-hamburger"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span className="apple-hline" animate={isMobileMenuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={SPRING} />
            <motion.span className="apple-hline" animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={SPRING} />
            <motion.span className="apple-hline" animate={isMobileMenuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={SPRING} />
          </button>

        </div>{/* /inner */}

        {/* Separator line that appears on scroll */}
        <motion.div
          className="apple-nav-sep"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </nav>

      {/* ─── Mobile dropdown panel ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Mobile Navigation"
            className="apple-mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING}
          >
            <nav aria-label="Mobile Links">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SPRING, delay: i * 0.03 }}
                >
                  <Link
                    href={item.href}
                    className={`apple-mobile-link${activeItem === item.name ? " apple-mobile-link--active" : ""}`}
                    aria-current={activeItem === item.name ? "page" : undefined}
                    onClick={() => { setActiveItem(item.name); setIsMobileMenuOpen(false); }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
