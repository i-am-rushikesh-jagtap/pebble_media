"use client";

import { useEffect, useState, useRef } from "react";
import "./TeamCarousel.css";

/**
 * APPLE-STYLE STICKY SCROLL CAROUSEL
 *
 * Implementation:
 * • Natural browser scrolling (NO preventDefault)
 * • Tall wrapper creates scroll space
 * • Sticky container stays in viewport
 * • Scroll position maps to card index
 * • Smooth interpolated transitions
 * • GPU-accelerated animations
 */

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shardul Kulkarni",
    role: "Founder & Creative Director",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o1.jpeg?updatedAt=1754289569411",
  },
  {
    name: "Himanshu",
    role: "Lead Developer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307",
  },
  {
    name: "Kashish",
    role: "Creative Designer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398",
  },
  {
    name: "Team Member 4",
    role: "Marketing Strategist",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o3.jpeg?updatedAt=1754289569422",
  },
  {
    name: "Team Member 5",
    role: "Brand Consultant",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o5.jpeg?updatedAt=1754289569406",
  },
  {
    name: "Team Member 6",
    role: "Content Creator",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o6.jpeg?updatedAt=1754289569438",
  },
];

export default function TeamCarousel() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /**
   * Calculate scroll progress using RAF
   * Maps scroll position to 0-1 range
   */
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how far through the wrapper we've scrolled
      const scrollableHeight = wrapperHeight - viewportHeight;
      const scrolled = -rect.top;

      // Normalize to 0-1
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);

      // Calculate discrete index (which card to show)
      const index = Math.min(
        teamMembers.length - 1,
        Math.floor(progress * teamMembers.length)
      );
      setCurrentIndex(index);

      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    rafRef.current = requestAnimationFrame(updateScrollProgress);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  /**
   * Get card interpolation values based on scroll progress
   * Creates smooth transitions between discrete cards
   */
  const getCardTransform = (index: number) => {
    const totalCards = teamMembers.length;
    const progressPerCard = 1 / totalCards;
    const cardStart = index * progressPerCard;
    const cardEnd = (index + 1) * progressPerCard;

    // How far are we into this card's range?
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - cardStart) / progressPerCard)
    );

    const offset = index - currentIndex;

    // Default hidden state
    let translateY = 0;
    let translateZ = -900;
    let scale = 0.45;
    let opacity = 0;
    let rotateX = 0;
    let blur = 4;
    let brightness = 0.35;
    let saturate = 0.35;

    if (offset === 0) {
      // Current center card
      translateY = 0;
      translateZ = 5;
      scale = 1.1;
      opacity = 1;
      rotateX = 0;
      blur = 0;
      brightness = 1.06;
      saturate = 1.12;
    } else if (offset === 1) {
      // Next card (below)
      translateY = 165;
      translateZ = -180;
      scale = 0.94;
      opacity = 0.78;
      rotateX = -4;
      blur = 0.4;
      brightness = 0.74;
      saturate = 0.88;
    } else if (offset === 2) {
      // Two cards down
      translateY = 330;
      translateZ = -420;
      scale = 0.82;
      opacity = 0.38;
      rotateX = -8;
      blur = 1.2;
      brightness = 0.58;
      saturate = 0.68;
    } else if (offset === -1) {
      // Previous card (above)
      translateY = -165;
      translateZ = -180;
      scale = 0.94;
      opacity = 0.78;
      rotateX = 4;
      blur = 0.4;
      brightness = 0.74;
      saturate = 0.88;
    } else if (offset === -2) {
      // Two cards up
      translateY = -330;
      translateZ = -420;
      scale = 0.82;
      opacity = 0.38;
      rotateX = 8;
      blur = 1.2;
      brightness = 0.58;
      saturate = 0.68;
    }

    return {
      transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateX(${rotateX}deg)`,
      opacity,
      filter: `brightness(${brightness}) saturate(${saturate}) blur(${blur}px)`,
    };
  };

  return (
    <div ref={wrapperRef} className="team-carousel-wrapper">
      <div className="team-carousel-sticky">
        <div className="team-carousel-main-container">
          {/* Cards Section */}
          <div className="team-carousel-section">
            <section
              className="team-carousel-container"
              aria-label="Team members carousel"
              role="region"
            >
              {/* Vertical Progress Indicator */}
              <nav className="carousel-progress" aria-label="Team member progress">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`progress-step ${index === currentIndex ? "active" : ""} ${
                      index < currentIndex ? "completed" : ""
                    }`}
                    aria-label={`${member.name}`}
                    aria-current={index === currentIndex ? "true" : undefined}
                  />
                ))}
              </nav>

              {/* 3D Card Stack */}
              <div className="team-carousel-track">
                {teamMembers.map((member, index) => {
                  const transform = getCardTransform(index);

                  return (
                    <article
                      key={index}
                      className="card"
                      data-index={index}
                      aria-hidden={index !== currentIndex}
                      style={{
                        transform: transform.transform,
                        opacity: transform.opacity,
                        filter: transform.filter,
                      }}
                    >
                      <div className="card-image-wrapper">
                        <img
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          loading="lazy"
                          draggable="false"
                        />
                      </div>
                      {index === currentIndex && (
                        <div className="card-glow" aria-hidden="true" />
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Member Info & Navigation */}
          <div className="team-controls-section">
            {/* Member Information */}
            <div className="team-member-info" key={currentIndex}>
              <h2 className="team-member-name">
                <span className="name-text">{teamMembers[currentIndex].name}</span>
              </h2>
              <p className="team-member-role">
                <span className="role-text">{teamMembers[currentIndex].role}</span>
              </p>
            </div>

            {/* Pagination Capsules */}
            <nav className="team-dots" aria-label="Team member navigation">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className={`team-dot ${i === currentIndex ? "active" : ""}`}
                  aria-label={`${member.name}`}
                  aria-current={i === currentIndex ? "page" : undefined}
                >
                  <span className="dot-inner" />
                </div>
              ))}
            </nav>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="scroll-indicator" aria-hidden="true">
            <div className="scroll-indicator-line" />
            <span className="scroll-indicator-text">
              {currentIndex + 1} / {teamMembers.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
