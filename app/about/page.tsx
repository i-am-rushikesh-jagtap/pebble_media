"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/components/Footer";
import TeamCarousel from "@/components/TeamCarousel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".about-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".about-hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      // Story section
      gsap.from(".story-block", {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });

      // Values cards
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });

      // Team section fade in
      gsap.from(".team-carousel-main-container", {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page">
      {/* HERO */}
      <section ref={heroRef} className="about-hero">
        <div className="about-hero-bg-gradient"></div>
        <div className="container">
          <h1 className="about-hero-title">
            <span className="about-hero-title-small">WHO ARE WE?</span>
            <span className="about-hero-title-large">
              People don't fall in love with products.<br />
              People fall in love with <em>stories</em>.
            </span>
          </h1>
          <p className="about-hero-text">
            Every brand has a story. Unfortunately, not every brand knows how to tell it.
            That's where we come in — turning your project into a story people choose, again and again.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section ref={storyRef} className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-block">
              <span className="story-label">NOT ANOTHER AGENCY.</span>
              <h2 className="story-heading">Definitely not another boring one.</h2>
              <p className="story-text">
                We build brands, campaigns, stories, experiences, content, websites
                and identities - and occasionally survive impossible deadlines.
              </p>
            </div>

            <div className="story-block story-block-highlight">
              <h3 className="story-quote">"Most agencies help brands get seen. We help brands get remembered."</h3>
            </div>

            <div className="story-block">
              <span className="story-label">A LETTER FROM OUR FOUNDER</span>
              <h3 className="story-founder-name">SK Shardul Kulkarni</h3>
              <p className="story-founder-title">Founder & Creative Director • Filmmaker • Strategist • Professional Overthinker</p>
              <p className="story-text">
                "Pebble was never meant to become just another marketing agency. It was created because I was tired of
                seeing brands spend money on content that looked good but achieved nothing. <strong>Creativity should drive
                business growth — not just aesthetics.</strong>"
              </p>
              <p className="story-emphasis">
                "What should people remember?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PEBBLE PHILOSOPHY */}
      <section className="pebble-story-section">
        <div className="container">
          <div className="pebble-story-content">
            <span className="story-label">WHY THE NAME "PEBBLE"?</span>
            <h2 className="pebble-story-title">A fun fact (and our whole philosophy).</h2>

            <div className="pebble-story-text">
              <p>
                When a penguin chooses its life partner, it searches for the perfect
                pebble and presents it as a gift. If accepted, that pebble becomes a
                symbol of trust, commitment and a lifelong partnership.
              </p>

              <div className="pebble-callout">
                <h3>That's exactly how we see our clients.</h3>
                <p>Not projects. Not invoices. Not retainers. <strong>Long-term creative partnerships.</strong></p>
              </div>

              <p className="pebble-footnote">
                (Also because "The Global Creative Marketing Storytelling Growth Ninja Agency" was already taken.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section ref={valuesRef} className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">Content gets attention. Connection builds brands.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Creative Excellence</h3>
              <p>Every frame, every word, every pixel — crafted with intention.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">◎</div>
              <h3>Strategic Thinking</h3>
              <p>Beautiful work that achieves business objectives, not just awards.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Honest Communication</h3>
              <p>We say what needs to be said, not what you want to hear.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3>Long-Term Partnerships</h3>
              <p>We stay for the journey, not just the launch.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Continuous Innovation</h3>
              <p>Always learning, always evolving, never settling.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">📈</div>
              <h3>Measurable Growth</h3>
              <p>Likes are nice. But loyalty pays the bills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE TEAM */}
      <section ref={teamRef} className="team-section">
        <div className="container">
          <div className="team-header">
            <h2 className="section-title">Meet the people behind the pixels</h2>
            <p className="section-subtitle">
              Some create brands. Some create films. Some create campaigns. Some create unnecessary WhatsApp groups.
              Together — we create impact.
            </p>
          </div>

          <TeamCarousel />
        </div>
      </section>

      {/* BRANDS WE'VE WORKED WITH */}
      <section className="clients-showcase">
        <div className="container">
          <div className="clients-header">
            <h2 className="section-title">Brands We've Worked With</h2>
            <p className="section-subtitle">Some names you might recognise. <em>Some names you'll recognise soon.</em></p>
          </div>

          <div className="clients-grid">
            <div className="client-logo-box">JD Nova Corp</div>
            <div className="client-logo-box">Chitale Bandhu</div>
            <div className="client-logo-box">Boldfit</div>
            <div className="client-logo-box">SuperYou</div>
            <div className="client-logo-box">Rapido</div>
            <div className="client-logo-box">Scapia</div>
            <div className="client-logo-box">Go Zero</div>
            <div className="client-logo-box">SKYi Developers</div>
            <div className="client-logo-box">Vilas Javdekar Developers</div>
          </div>

          <p className="clients-more">...and many more.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2 className="about-cta-title">
            Ready to create something memorable?
          </h2>
          <div className="about-cta-buttons">
            <Link href="/contact" className="btn-primary-enhanced">
              <span>Start a Project</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/work" className="btn-secondary-enhanced">
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
