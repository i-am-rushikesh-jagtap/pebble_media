"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Pebble Media transformed our brand from a startup into a market leader. Their strategic approach and creative execution exceeded every expectation.",
    author: "Sarah Chen",
    role: "CEO, TechCorp",
    rating: 5
  },
  {
    quote: "Working with Pebble was a game-changer. They don't just deliver great work—they become true partners in your growth journey.",
    author: "Michael Rodriguez",
    role: "CMO, Growth Inc",
    rating: 5
  },
  {
    quote: "The ROI we achieved with Pebble's campaigns was unprecedented. They combine creativity with data-driven strategy like no one else.",
    author: "Emily Thompson",
    role: "Head of Marketing, StartupX",
    rating: 5
  }
];

export default function TestimonialsSection() {
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
    <section ref={sectionRef} className="section-testimonials">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">Client Success</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Don't just take our word for it—hear from the brands we've helped transform
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="testimonial-card"
            >
              <div className="testimonial-stars">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.author.charAt(0)}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
