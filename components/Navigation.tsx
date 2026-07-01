"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import "./Navigation.css";

const navItems = [
  { name: "Home", href: "/", index: "01" },
  { name: "About", href: "/about", index: "02" },
  { name: "Work", href: "/work", index: "03" },
  { name: "Services", href: "/services", index: "04" },
  { name: "Case Studies", href: "/case-studies", index: "05" },
  { name: "Testimonials", href: "/testimonials", index: "06" },
  { name: "Blog", href: "/blog", index: "07" },
  { name: "Contact", href: "/contact", index: "08" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Body scroll lock
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

  // Track cursor for magnetic effect
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen, cursorX, cursorY]);

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        className={`nav-bar ${scrolled ? "nav-bar--scrolled" : ""}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-bar__container">
          {/* Logo */}
          <Link href="/" className="nav-bar__logo">
            <motion.img
              src="/pebble-logo.png"
              alt="Pebble Media"
              width={140}
              height={40}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          {/* Menu Trigger */}
          <button
            className="nav-bar__trigger"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <span className="nav-bar__trigger-text">Menu</span>
            <div className="nav-bar__trigger-icon">
              <span className="nav-bar__trigger-line" />
              <span className="nav-bar__trigger-line" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="nav-menu">
            {/* Split panels */}
            <motion.div
              className="nav-menu__panel nav-menu__panel--left"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="nav-menu__panel nav-menu__panel--right"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Content */}
            <motion.div
              className="nav-menu__content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* Close button */}
              <button
                className="nav-menu__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <motion.div
                  className="nav-menu__close-icon"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="nav-menu__close-line" />
                  <span className="nav-menu__close-line" />
                </motion.div>
                <span className="nav-menu__close-text">Close</span>
              </button>

              {/* Navigation items */}
              <nav className="nav-menu__nav" aria-label="Main navigation">
                <ul className="nav-menu__list">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.li
                        key={item.href}
                        className="nav-menu__item"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4 + index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        <Link
                          href={item.href}
                          className={`nav-menu__link ${isActive ? "nav-menu__link--active" : ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="nav-menu__link-index">{item.index}</span>
                          <motion.span
                            className="nav-menu__link-text"
                            animate={{
                              x: hoveredIndex === index ? 20 : 0,
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {item.name}
                          </motion.span>
                          {isActive && (
                            <motion.div
                              className="nav-menu__link-indicator"
                              layoutId="menuIndicator"
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer info */}
              <motion.div
                className="nav-menu__footer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="nav-menu__footer-col">
                  <p className="nav-menu__footer-label">Get in touch</p>
                  <a href="mailto:hello@pebblemedia.in" className="nav-menu__footer-link">
                    hello@pebblemedia.in
                  </a>
                </div>
                <div className="nav-menu__footer-col">
                  <p className="nav-menu__footer-label">Follow us</p>
                  <div className="nav-menu__footer-socials">
                    <a href="#" className="nav-menu__footer-link">Instagram</a>
                    <a href="#" className="nav-menu__footer-link">LinkedIn</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
