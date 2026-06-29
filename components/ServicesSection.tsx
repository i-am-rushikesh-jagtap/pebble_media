"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: "🎨",
    title: "Brand Strategy & Identity",
    description: "We craft distinctive brand identities that resonate with your audience and stand out in the market.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Positioning"]
  },
  {
    icon: "📱",
    title: "Digital Marketing",
    description: "Data-driven campaigns that drive growth, engagement, and measurable ROI across all digital channels.",
    features: ["Social Media", "Content Strategy", "SEO/SEM", "Analytics"]
  },
  {
    icon: "🎬",
    title: "Creative Production",
    description: "World-class storytelling through video, photography, and motion graphics that captivate audiences.",
    features: ["Video Production", "Photography", "Motion Graphics", "Animation"]
  },
  {
    icon: "💡",
    title: "Growth Consulting",
    description: "Strategic guidance to scale your brand, optimize operations, and achieve sustainable growth.",
    features: ["Market Research", "Growth Strategy", "Performance Optimization", "Advisory"]
  }
];

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="section-services">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Services That Transform</h2>
          <p className="section-description">
            We combine strategy, creativity, and technology to build brands that matter
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="service-card"
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
