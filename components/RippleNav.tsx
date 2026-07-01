"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import "./RippleNav.css";

/**
 * THE SINGLE PERFECT RIPPLE
 * One Pebble. Infinite Ripples.
 * Fully responsive signature navigation for Pebble Media
 */

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function RippleNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Pebble breathing animation
  const breatheScale = useMotionValue(1);
  const breatheSpring = useSpring(breatheScale, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Breathing effect
  useEffect(() => {
    const interval = setInterval(() => {
      breatheScale.set(1.06);
      setTimeout(() => breatheScale.set(1), 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, [breatheScale]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Calculate arc positions - responsive
  const navPositions = useMemo(() => {
    // Responsive radius based on viewport
    const getRadius = () => {
      if (typeof window === "undefined") return 280;
      const width = window.innerWidth;
      if (width < 640) return 160;
      if (width < 768) return 200;
      if (width < 1024) return 240;
      return 280;
    };

    const radius = getRadius();
    const startAngle = -20 * (Math.PI / 180);
    const endAngle = 120 * (Math.PI / 180);
    const angleStep = (endAngle - startAngle) / (navItems.length - 1);

    return navItems.map((_, index) => {
      const angle = startAngle + angleStep * index;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, [isMobile]);

  // Page transition handler
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === pathname) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const ripple = document.createElement("div");
    ripple.className = "page-ripple-transition";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      router.push(href);
      setIsOpen(false);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }, 400);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        className={`ripple-nav ${scrolled ? "scrolled" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="ripple-nav-container">
          {/* Logo */}
          <Link href="/" className="ripple-nav-logo">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <img src="/pebble-logo.png" alt="Pebble Media" width={140} height={40} />
            </motion.div>
          </Link>

          {/* The Pebble Trigger */}
          <motion.button
            className="pebble-trigger"
            onClick={() => setIsOpen(!isOpen)}
            style={{ scale: breatheSpring }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="ripple-navigation"
          >
            <div className="pebble-stone" />
            <motion.div
              className="pebble-glow"
              animate={{ opacity: isOpen ? 0.8 : scrolled ? 0.4 : 0.3 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="ripple-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            />

            {/* The Single Perfect Ripple - Centered on mobile, from pebble on desktop */}
            <div
              className={`ripple-manifold ${isMobile ? 'mobile-center' : ''}`}
              id="ripple-navigation"
              role="navigation"
            >
              <motion.div
                className="perfect-ripple"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0.8, 0.3] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { times: [0, 0.3, 1] },
                }}
              />

              {/* Navigation Items on Arc */}
              {navItems.map((item, index) => {
                const pos = navPositions[index];
                const isActive = pathname === item.href;

                return (
                  <motion.div
                    key={item.name}
                    className="nav-item-wrapper"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 1, x: pos.x, y: pos.y }}
                    exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`nav-item ${isActive ? "active" : ""}`}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <motion.div
                        className="nav-item-surface"
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                          },
                        }}
                      >
                        {isActive && (
                          <motion.div
                            className="active-indicator"
                            layoutId="activeNav"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="nav-item-label">{item.name}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
