"use client";

import { useEffect, useState, useRef } from "react";
import "./TeamCarousel.css";

/**
 * PEBBLE-THEMED TEAM CAROUSEL
 *
 * Features:
 * • Smooth organic animations
 * • Auto-rotating cards with pause on hover
 * • Pebble-shaped cards with rounded aesthetics
 * • Interactive navigation with touch support
 * • Fully responsive design
 * • Swipe gestures on mobile
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    console.log('Next slide clicked');
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    console.log('Previous slide clicked');
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div
      ref={carouselRef}
      className="team-pebble-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pebble-container">
        {/* Navigation Arrow - Left */}
        <button
          type="button"
          className="pebble-nav pebble-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
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

        {/* Main Featured Card */}
        <div
          className="pebble-featured"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Team member carousel"
        >
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
        </div>

        {/* Navigation Arrow - Right */}
        <button
          type="button"
          className="pebble-nav pebble-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
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

      {/* Member Information - Below carousel */}
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
              type="button"
              key={index}
              className={`pebble-dot ${index === activeIndex ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to ${teamMembers[index].name}`}
            >
              <span className="pebble-dot-inner" />
            </button>
          ))}
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
