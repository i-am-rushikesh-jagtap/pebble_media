"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./LiquidGlassNav.css";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const EASE = [0.19, 1, 0.22, 1] as const;

const desktopNavItems = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const mobileNavItems = [
  { name: "Home", href: "/", num: "01" },
  { name: "About", href: "/about", num: "02" },
  { name: "Work", href: "/work", num: "03" },
  { name: "Services", href: "/services", num: "04" },
  { name: "Case Studies", href: "/case-studies", num: "05" },
  { name: "Testimonials", href: "/testimonials", num: "06" },
  { name: "Blog", href: "/blog", num: "07" },
  { name: "Contact", href: "/contact", num: "08" },
];

export default function LiquidGlassNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <motion.header
        className="lg-nav-wrapper"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <nav
          className={`lg-nav ${scrolled ? "lg-nav--scrolled" : ""} ${
            isOpen ? "lg-nav--open" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="lg-nav__glass">
            <div className="lg-nav__specular" aria-hidden="true" />
            <div className="lg-nav__inner">
              <Link href="/" className="lg-nav__logo" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pebble-logo-orange.png"
                    alt="Pebble Media"
                    width={200}
                    height={56}
                    className="lg-nav__logo-img"
                  />
                </motion.div>
              </Link>

              {!isMobile && (
                <div className="lg-nav__links">
                  {desktopNavItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`lg-nav__link ${isActive ? "lg-nav__link--active" : ""}`}
                      >
                        <span className="lg-nav__link-text">{item.name}</span>
                        {isActive && (
                          <motion.span
                            className="lg-nav__active-pill"
                            layoutId="lgActivePill"
                            transition={SPRING}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}

              <div className="lg-nav__actions">
                {!isMobile && (
                  <Link href="/contact" className="lg-nav__cta">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING}
                      className="lg-nav__cta-inner"
                    >
                      Start a Project
                    </motion.span>
                  </Link>
                )}

                {isMobile && (
                  <button
                    type="button"
                    className="lg-nav__menu-btn"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    aria-controls="lg-mobile-menu"
                  >
                    <span className="lg-nav__menu-label">{isOpen ? "Close" : "Menu"}</span>
                    <span className={`lg-nav__burger ${isOpen ? "lg-nav__burger--open" : ""}`}>
                      <span />
                      <span />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div
              className="lg-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              id="lg-mobile-menu"
              className="lg-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              aria-label="Mobile navigation"
            >
              <div className="lg-menu__panel">
                <div className="lg-menu__specular" aria-hidden="true" />

                <div className="lg-menu__header">
                  <Link href="/" className="lg-menu__logo" onClick={() => setIsOpen(false)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/pebble-logo-orange.png"
                      alt="Pebble Media"
                      width={180}
                      height={50}
                      className="lg-menu__logo-img"
                    />
                  </Link>
                  <motion.button
                    type="button"
                    className="lg-menu__close"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    aria-label="Close menu"
                  >
                    <span className="lg-menu__close-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                    Close
                  </motion.button>
                </div>

                <ul className="lg-menu__list">
                  {mobileNavItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.08 + index * 0.05,
                          ease: EASE,
                        }}
                      >
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
                              transition={SPRING}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  className="lg-menu__footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
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
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
