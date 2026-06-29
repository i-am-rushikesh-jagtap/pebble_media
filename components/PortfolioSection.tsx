"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Tech Startup Rebrand",
    category: "Brand Identity",
    description: "Complete brand transformation for a Series B SaaS company",
    metrics: "+240% Brand Recognition",
    color: "rgba(253, 103, 50, 0.1)"
  },
  {
    title: "E-commerce Growth Campaign",
    category: "Digital Marketing",
    description: "Multi-channel campaign driving 10x ROI in 6 months",
    metrics: "10x ROI · $2.4M Revenue",
    color: "rgba(59, 130, 246, 0.1)"
  },
  {
    title: "Product Launch Video",
    category: "Creative Production",
    description: "Award-winning product film for Fortune 500 brand",
    metrics: "12M+ Views · Gold Lion",
    color: "rgba(168, 85, 247, 0.1)"
  },
  {
    title: "Market Expansion Strategy",
    category: "Growth Consulting",
    description: "Strategic advisory for international market entry",
    metrics: "3 New Markets · 150% Growth",
    color: "rgba(34, 197, 94, 0.1)"
  }
];

export default function PortfolioSection() {
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
    <section id="work" ref={sectionRef} className="section-portfolio">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">Case Studies</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-description">
            Real results for real brands. Here's how we create impact.
          </p>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="portfolio-card"
              style={{ backgroundColor: project.color }}
            >
              <div className="portfolio-content">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-metrics">{project.metrics}</div>
              </div>
              <div className="portfolio-link">
                <span>View Case Study</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
