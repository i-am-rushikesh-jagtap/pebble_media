"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We deep-dive into your brand, market, and audience to uncover opportunities and insights.",
    duration: "1-2 weeks"
  },
  {
    number: "02",
    title: "Strategize",
    description: "We craft a comprehensive strategy aligned with your business goals and market position.",
    duration: "2-3 weeks"
  },
  {
    number: "03",
    title: "Create",
    description: "Our team brings the strategy to life with world-class creative execution and production.",
    duration: "4-8 weeks"
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "We deploy, measure, and continuously optimize for maximum impact and ROI.",
    duration: "Ongoing"
  }
];

export default function ProcessSection() {
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
    <section ref={sectionRef} className="section-process">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">Our Approach</span>
          <h2 className="section-title">How We Work</h2>
          <p className="section-description">
            A proven process refined over hundreds of successful projects
          </p>
        </motion.div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="process-step"
            >
              <div className="process-number">{step.number}</div>
              <div className="process-content">
                <div className="process-header">
                  <h3 className="process-title">{step.title}</h3>
                  <span className="process-duration">{step.duration}</span>
                </div>
                <p className="process-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="process-line" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
