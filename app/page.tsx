"use client";

import "./home.css";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { HERO_FRAME_COUNT, heroFrameUrl } from "@/lib/hero-sequence";

const ImageSequenceCanvas = dynamic(() => import("@/components/ImageSequenceCanvas"), {
  ssr: false,
  loading: () => (
    <section className="pinned-section hero-sequence-placeholder" aria-label="Loading hero">
      <div className="content-overlay container">
        <h1 className="text-hero-enhanced">For Brands That Refuse To Blend In</h1>
      </div>
    </section>
  ),
});

export default function Home() {
  const manifestoRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const workGridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      // Manifesto section reveal
      gsap.from(".manifesto-title", {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".manifesto-line", {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Services cards animation
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Work grid stagger
      gsap.from(".work-item", {
        scrollTrigger: {
          trigger: workGridRef.current,
          start: "top 75%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="home-page">
      {/* HERO SECTION WITH PEBBLE DROP - Full Screen */}
      <ImageSequenceCanvas frameCount={HERO_FRAME_COUNT} urlTemplate={heroFrameUrl}>
        <div className="content-overlay container">
          <h1 className="text-hero-enhanced" style={{ animation: "fadeInUp 1.2s ease-out" }}>
            For Brands That<br />
            Refuse To<br />
            <span className="hero-blend-text">Blend In</span>
          </h1>
          <p className="text-tagline" style={{ marginTop: "2rem", animation: "fadeInUp 1.6s ease-out" }}>
            We help brands get <em className="tagline-emphasis">remembered</em>, not just seen.
          </p>
          <div className="hero-cta" style={{ marginTop: "3rem", animation: "fadeInUp 2s ease-out" }}>
            <Link href="/work" className="btn-primary">
              <span>Explore Our Work</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </ImageSequenceCanvas>

      {/* MANIFESTO SECTION */}
      <section ref={manifestoRef} className="manifesto-section">
        <div className="container-wide">
          <h2 className="manifesto-title">
            <span className="manifesto-title-small">NOT ANOTHER AGENCY.</span>
            <span className="manifesto-title-large">Definitely not another boring one.</span>
          </h2>

          <div className="manifesto-grid">
            <div className="manifesto-item">
              <div className="manifesto-line">
                <span className="manifesto-label">Most agencies</span>
                <p className="manifesto-text-dim">Create content.<br/>Deliver posts.<br/>Track likes.<br/>Move on.</p>
              </div>
            </div>

            <div className="manifesto-item manifesto-item-highlight">
              <div className="manifesto-line">
                <span className="manifesto-label manifesto-label-brand">Pebble Media</span>
                <p className="manifesto-text-bright">Builds brand systems.<br/>Creates stories people remember.<br/>Tracks business outcomes.<br/>Stays for the long run.</p>
              </div>
            </div>
          </div>

          <div className="manifesto-cta">
            <p className="manifesto-line">"What should people remember?"</p>
            <p className="manifesto-line-sub">Every campaign, every reel, every website, every identity starts with this question.</p>
          </div>
        </div>
      </section>

      {/* SERVICES - CREATE. CONNECT. CONVERT. */}
      <section ref={servicesRef} className="services-section">
        <div className="container">
          <div className="services-header">
            <h2 className="section-title">Create. Connect. Convert.</h2>
            <p className="section-subtitle">Five disciplines. One story.</p>
          </div>

          <div className="services-grid">
            <div className="service-card" data-service="branding">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 8L32 16H16L24 8Z" fill="#FD6732"/>
                  <rect x="16" y="16" width="16" height="24" stroke="#FD6732" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="service-title">Branding</h3>
              <p className="service-desc">Identity, logo, positioning & guidelines.</p>
              <p className="service-tagline">Because first impressions happen only once.</p>
            </div>

            <div className="service-card" data-service="content">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="10" y="14" width="28" height="20" rx="2" stroke="#FD6732" strokeWidth="2"/>
                  <path d="M18 20L24 26L30 20" stroke="#FD6732" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="service-title">Content Creation</h3>
              <p className="service-desc">Reels, shoots, films & commercials.</p>
              <p className="service-tagline">The internet has enough content. We create content worth watching.</p>
            </div>

            <div className="service-card" data-service="social">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="12" stroke="#FD6732" strokeWidth="2"/>
                  <circle cx="24" cy="24" r="3" fill="#FD6732"/>
                  <circle cx="34" cy="14" r="2" fill="#FD6732"/>
                </svg>
              </div>
              <h3 className="service-title">Social Media</h3>
              <p className="service-desc">Planning, community & growth systems.</p>
              <p className="service-tagline">Because posting randomly is not a strategy.</p>
            </div>

            <div className="service-card" data-service="performance">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M12 30L18 24L24 28L36 16" stroke="#FD6732" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M36 20V16H32" stroke="#FD6732" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="service-title">Performance Marketing</h3>
              <p className="service-desc">Meta ads, leads & conversions.</p>
              <p className="service-tagline">Let's make the numbers go up.</p>
            </div>

            <div className="service-card" data-service="web">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="14" stroke="#FD6732" strokeWidth="2"/>
                  <path d="M10 24H38M24 10C19 15 17 19 17 24C17 29 19 33 24 38C29 33 31 29 31 24C31 19 29 15 24 10Z" stroke="#FD6732" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="service-title">Website Design</h3>
              <p className="service-desc">Beautiful sites people want to use.</p>
              <p className="service-tagline">Form meets function.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - THE PEBBLE STORY */}
      <section ref={philosophyRef} className="philosophy-section">
        <div className="philosophy-bg"></div>

        <div className="container">
          <div className="philosophy-content">
            <span className="philosophy-label">WHY THE NAME "PEBBLE"?</span>
            <h2 className="philosophy-title">A fun fact (and our whole philosophy).</h2>

            <div className="philosophy-story">
              <p className="philosophy-text">
                When a penguin chooses its life partner, it searches for the perfect
                pebble and presents it as a gift. If accepted, that pebble becomes a
                symbol of trust, commitment and a lifelong partnership.
              </p>

              <div className="philosophy-highlight">
                <h3>That's exactly how we see our clients.</h3>
                <p>Not projects. Not invoices. Not retainers. Long-term creative partnerships.</p>
              </div>

              <p className="philosophy-footnote">
                (Also because "The Global Creative Marketing Storytelling Growth Ninja Agency" was already taken.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK GRID */}
      <section ref={workGridRef} className="work-section">
        <div className="container-wide">
          <div className="work-header">
            <h2 className="section-title">Selected Work</h2>
            <Link href="/work" className="view-all-link">
              View All Projects
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="work-grid">
            <Link href="/work/jd-nova" className="work-item work-item-large">
              <div className="work-item-image">
                <div className="work-item-overlay"></div>
                <div className="work-item-label">Real Estate</div>
              </div>
              <div className="work-item-info">
                <h3>JD Nova Corp</h3>
                <p>Brand identity & performance campaigns</p>
              </div>
            </Link>

            <Link href="/work/chitale" className="work-item">
              <div className="work-item-image">
                <div className="work-item-overlay"></div>
                <div className="work-item-label">FMCG</div>
              </div>
              <div className="work-item-info">
                <h3>Chitale Bandhu</h3>
                <p>Content strategy & social growth</p>
              </div>
            </Link>

            <Link href="/work/boldfit" className="work-item">
              <div className="work-item-image">
                <div className="work-item-overlay"></div>
                <div className="work-item-label">D2C</div>
              </div>
              <div className="work-item-info">
                <h3>Boldfit</h3>
                <p>Influencer marketing & UGC</p>
              </div>
            </Link>

            <Link href="/work/rapido" className="work-item">
              <div className="work-item-image">
                <div className="work-item-overlay"></div>
                <div className="work-item-label">Tech</div>
              </div>
              <div className="work-item-info">
                <h3>Rapido</h3>
                <p>Campaign films & digital ads</p>
              </div>
            </Link>

            <Link href="/work/skyi" className="work-item work-item-tall">
              <div className="work-item-image">
                <div className="work-item-overlay"></div>
                <div className="work-item-label">Real Estate</div>
              </div>
              <div className="work-item-info">
                <h3>SKYi Developers</h3>
                <p>Property films & lead generation</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              <span className="cta-title-line">Let's build something</span>
              <span className="cta-title-line cta-title-highlight">people can't scroll past.</span>
            </h2>
            <p className="cta-subtitle">
              If you've made it this far, we should probably work together.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn-primary-enhanced">
                <span>Start a Project</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary-enhanced">
                <span>Learn More About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles for page-specific animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
