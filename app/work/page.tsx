"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FilterCategory = "all" | "real-estate" | "d2c" | "tech" | "fmcg" | "content";

export default function WorkPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const projects = [
    {
      id: "jd-nova",
      title: "JD Nova Corp",
      category: "real-estate" as FilterCategory,
      description: "Complete brand identity and lead generation campaigns for luxury properties",
      services: ["Brand Identity", "Property Films", "Performance Marketing"],
      year: "2025",
      results: "300% increase in qualified leads, 45% reduction in CPL"
    },
    {
      id: "chitale",
      title: "Chitale Bandhu",
      category: "fmcg" as FilterCategory,
      description: "Social media transformation for India's heritage FMCG brand",
      services: ["Content Strategy", "Reels", "Community Management"],
      year: "2024",
      results: "2.5M+ reach, 180K+ engagement, 35% follower growth"
    },
    {
      id: "boldfit",
      title: "Boldfit",
      category: "d2c" as FilterCategory,
      description: "Influencer-led growth campaigns for fitness D2C brand",
      services: ["Influencer Marketing", "UGC Content", "Performance Ads"],
      year: "2024",
      results: "500+ creator partnerships, 8M+ impressions"
    },
    {
      id: "rapido",
      title: "Rapido",
      category: "tech" as FilterCategory,
      description: "Brand films and digital advertising for India's largest bike taxi platform",
      services: ["Campaign Films", "Digital Ads", "Social Content"],
      year: "2024",
      results: "15M+ views, 4.2% CTR on performance campaigns"
    },
    {
      id: "skyi",
      title: "SKYi Developers",
      category: "real-estate" as FilterCategory,
      description: "Property showcase films and lead generation for premium real estate",
      services: ["Property Films", "Drone Shoots", "Meta Ads"],
      year: "2024",
      results: "250+ site visits generated, 12% conversion rate"
    },
    {
      id: "superyou",
      title: "SuperYou",
      category: "d2c" as FilterCategory,
      description: "Launch campaign and ongoing content for wellness D2C brand",
      services: ["Brand Launch", "Content Creation", "Social Management"],
      year: "2024",
      results: "50K+ community built from scratch"
    },
    {
      id: "scapia",
      title: "Scapia",
      category: "tech" as FilterCategory,
      description: "User acquisition campaigns for fintech credit card platform",
      services: ["Performance Marketing", "Creative Strategy", "Landing Pages"],
      year: "2025",
      results: "22% reduction in CAC, 3.8x ROAS"
    },
    {
      id: "go-zero",
      title: "Go Zero",
      category: "d2c" as FilterCategory,
      description: "Sustainable storytelling for eco-friendly product brand",
      services: ["Brand Positioning", "Content Creation", "Influencer Collabs"],
      year: "2024",
      results: "1.8M+ organic reach, 4.5% engagement rate"
    },
    {
      id: "vilas-javdekar",
      title: "Vilas Javdekar Developers",
      category: "real-estate" as FilterCategory,
      description: "Multi-project property marketing and lead generation",
      services: ["Property Films", "Social Media", "Performance Marketing"],
      year: "2024",
      results: "180+ qualified leads per month average"
    },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".work-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".work-hero-stats", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.7,
      });

      // Project cards
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <main className="work-page">
      {/* HERO */}
      <section ref={heroRef} className="work-hero">
        <div className="work-hero-bg"></div>

        <div className="container">
          <div className="work-hero-content">
            <h1 className="work-hero-title">
              <span className="work-hero-label">OUR WORK</span>
              <span className="work-hero-headline">
                Brands that<br />
                refuse to stay<br />
                <em>forgettable</em>.
              </span>
            </h1>

            <div className="work-hero-stats-grid">
              <div className="work-hero-stats">
                <span className="stat-number">50+</span>
                <span className="stat-label">Brands Partnered</span>
              </div>
              <div className="work-hero-stats">
                <span className="stat-number">200M+</span>
                <span className="stat-label">Total Impressions</span>
              </div>
              <div className="work-hero-stats">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Leads Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section ref={gridRef} className="work-grid-section">
        <div className="container-wide">
          {/* Filter */}
          <div className="work-filter">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Work
            </button>
            <button
              className={`filter-btn ${activeFilter === "real-estate" ? "active" : ""}`}
              onClick={() => setActiveFilter("real-estate")}
            >
              Real Estate
            </button>
            <button
              className={`filter-btn ${activeFilter === "d2c" ? "active" : ""}`}
              onClick={() => setActiveFilter("d2c")}
            >
              D2C Brands
            </button>
            <button
              className={`filter-btn ${activeFilter === "tech" ? "active" : ""}`}
              onClick={() => setActiveFilter("tech")}
            >
              Tech
            </button>
            <button
              className={`filter-btn ${activeFilter === "fmcg" ? "active" : ""}`}
              onClick={() => setActiveFilter("fmcg")}
            >
              FMCG
            </button>
          </div>

          {/* Project Grid */}
          <div className="work-projects-grid">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="project-card">
                <div className="project-card-image">
                  <div className="project-card-overlay"></div>
                  <span className="project-category">{project.category.replace("-", " ")}</span>
                </div>

                <div className="project-card-content">
                  <div className="project-meta">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-services">
                    {project.services.map((service, i) => (
                      <span key={i} className="service-tag">{service}</span>
                    ))}
                  </div>

                  <div className="project-results">
                    <span className="results-label">Results:</span>
                    <p className="results-text">{project.results}</p>
                  </div>

                  <Link href={`/work/${project.id}`} className="project-link">
                    <span>View Case Study</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="work-cta">
        <div className="container">
          <h2 className="work-cta-title">
            Want to see your brand here?
          </h2>
          <p className="work-cta-subtitle">
            Let's create something memorable together.
          </p>
          <Link href="/contact" className="btn-primary-enhanced">
            <span>Start Your Project</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
