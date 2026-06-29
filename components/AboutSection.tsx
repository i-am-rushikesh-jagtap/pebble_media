"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-about">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="about-content"
        >
          <div className="about-text">
            <span className="section-label">About Us</span>
            <h2 className="section-title">We Create Brands That Matter</h2>
            <div className="about-description">
              <p>
                Founded on the belief that every great brand starts with a single idea—one pebble creating infinite ripples—we've spent the last decade helping ambitious companies transform their vision into reality.
              </p>
              <p>
                Our team of strategists, designers, and storytellers combines deep industry expertise with fresh creative thinking to deliver work that doesn't just look good—it drives real business results.
              </p>
              <p>
                From startups finding their voice to established brands reinventing themselves, we partner with companies at every stage of their journey to build brands that resonate, engage, and grow.
              </p>
            </div>
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <div className="value-text">
                  <h4>Strategy First</h4>
                  <p>Every creative decision backed by data and insights</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">✨</div>
                <div className="value-text">
                  <h4>Creative Excellence</h4>
                  <p>Award-winning work that stands out</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">📈</div>
                <div className="value-text">
                  <h4>Results Driven</h4>
                  <p>Measured impact on your bottom line</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
