"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./PebbleNav.css";

const navItems = [
  { name: "Home", href: "/", num: "01" },
  { name: "About", href: "/about", num: "02" },
  { name: "Work", href: "/work", num: "03" },
  { name: "Services", href: "/services", num: "04" },
  { name: "Case Studies", href: "/case-studies", num: "05" },
  { name: "Testimonials", href: "/testimonials", num: "06" },
  { name: "Blog", href: "/blog", num: "07" },
  { name: "Contact", href: "/contact", num: "08" },
];

export default function PebbleNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <motion.nav
        className={`pebble-nav ${scrolled ? "pebble-nav--scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pebble-nav__container">
          <Link href="/" className="pebble-nav__logo">
            <img src="/pebble-logo.png" alt="Pebble Media" width={140} height={40} />
          </Link>

          <button
            className="pebble-nav__menu-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <span className="pebble-nav__menu-text">Menu</span>
            <div className="pebble-nav__menu-lines">
              <span />
              <span />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="pebble-menu">
            {/* Orange Background */}
            <motion.div
              className="pebble-menu__bg"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Content */}
            <div className="pebble-menu__content">
              {/* Close Button */}
              <motion.button
                className="pebble-menu__close"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                aria-label="Close menu"
              >
                <div className="pebble-menu__close-icon">
                  <span />
                  <span />
                </div>
                <span className="pebble-menu__close-text">Close</span>
              </motion.button>

              {/* Navigation Items */}
              <nav className="pebble-menu__nav" aria-label="Main navigation">
                <motion.div
                  className="pebble-menu__list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        className="pebble-menu__item-wrap"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + index * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`pebble-menu__item ${
                            isActive ? "pebble-menu__item--active" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="pebble-menu__num">{item.num}</span>
                          <span className="pebble-menu__name">{item.name}</span>
                          {isActive && (
                            <motion.div
                              className="pebble-menu__active-bar"
                              layoutId="activeBar"
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </nav>

              {/* Footer */}
              <motion.div
                className="pebble-menu__footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="pebble-menu__tagline">
                  <p>Create. Connect. Convert.</p>
                </div>
                <div className="pebble-menu__contact">
                  <a href="mailto:hello@pebblemedia.in">hello@pebblemedia.in</a>
                  <span className="pebble-menu__divider">·</span>
                  <a href="https://instagram.com/pebblemedia" target="_blank" rel="noopener">
                    Instagram
                  </a>
                  <span className="pebble-menu__divider">·</span>
                  <a href="https://linkedin.com/company/pebblemedia" target="_blank" rel="noopener">
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
