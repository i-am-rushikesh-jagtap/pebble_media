"use client";

import { useEffect, useState } from "react";
import "./TeamCarousel.css";

/**
 * PEBBLE-THEMED TEAM CAROUSEL
 *
 * Features:
 * • Smooth organic animations
 * • Auto-rotating cards with pause on hover
 * • Pebble-shaped cards with rounded aesthetics
 * • Interactive navigation
 * • Responsive design
 */

interface TeamMember {
  name: string;
  role: string;
  image: string;
  superpower?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shardul Kulkarni",
    role: "Founder & Creative Director",
    superpower: "Turns ideas into stories",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o1.jpeg?updatedAt=1754289569411",
  },
  {
    name: "Himanshu",
    role: "Lead Developer",
    superpower: "Code architect",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307",
  },
  {
    name: "Kashish",
    role: "Creative Designer",
    superpower: "Visual storyteller",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398",
  },
  {
    name: "Team Member 4",
    role: "Marketing Strategist",
    superpower: "Growth driver",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o3.jpeg?updatedAt=1754289569422",
  },
  {
    name: "Team Member 5",
    role: "Brand Consultant",
    superpower: "Brand architect",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o5.jpeg?updatedAt=1754289569406",
  },
  {
    name: "Team Member 6",
    role: "Content Creator",
    superpower: "Story weaver",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o6.jpeg?updatedAt=1754289569438",
  },
];

export default function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div
      className="team-pebble-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pebble-container">
        {/* Main Featured Card */}
        <div className="pebble-featured">
          <div className="pebble-card-wrapper">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`pebble-card ${index === activeIndex ? "active" : ""} ${
                  index === (activeIndex - 1 + teamMembers.length) % teamMembers.length
                    ? "prev"
                    : ""
                } ${index === (activeIndex + 1) % teamMembers.length ? "next" : ""}`}
              >
                <div className="pebble-card-inner">
                  <div className="pebble-image">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />
                    <div className="pebble-shine" />
                  </div>
                  <div className="pebble-ripple" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="pebble-nav pebble-nav-prev"
            onClick={prevSlide}
            aria-label="Previous team member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="pebble-nav pebble-nav-next"
            onClick={nextSlide}
            aria-label="Next team member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Member Information */}
        <div className="pebble-info">
          <div className="pebble-info-content" key={activeIndex}>
            <h3 className="pebble-name">{teamMembers[activeIndex].name}</h3>
            <p className="pebble-role">{teamMembers[activeIndex].role}</p>
            {teamMembers[activeIndex].superpower && (
              <p className="pebble-superpower">
                <span className="pebble-icon">✨</span>
                {teamMembers[activeIndex].superpower}
              </p>
            )}
          </div>

          {/* Pebble Dots Navigation */}
          <div className="pebble-dots">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                className={`pebble-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${teamMembers[index].name}`}
              >
                <span className="pebble-dot-inner" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Pebble Elements */}
      <div className="pebble-decorations" aria-hidden="true">
        <div className="floating-pebble pebble-1" />
        <div className="floating-pebble pebble-2" />
        <div className="floating-pebble pebble-3" />
      </div>
    </div>
  );
}
