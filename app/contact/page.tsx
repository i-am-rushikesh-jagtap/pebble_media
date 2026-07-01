"use client";

import "@/app/sections.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you soon.");
  };

  return (
    <main className="page-with-nav">
      <section className="section-contact">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-wrapper"
          >
            <div className="contact-header">
              <span className="section-label">Get in Touch</span>
              <h1 className="section-title">Let's Create Something Amazing</h1>
              <p className="section-description">
                Ready to transform your brand? Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="contact-content">
              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your vision, goals, and timeline..."
                    />
                  </div>

                  <button type="submit" className="btn-submit">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-info">
                <div className="info-card">
                  <h3>Email Us</h3>
                  <a href="mailto:hello@pebblemedia.com">hello@pebblemedia.com</a>
                </div>

                <div className="info-card">
                  <h3>Call Us</h3>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>

                <div className="info-card">
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    <a href="#" className="social-link">LinkedIn</a>
                    <a href="#" className="social-link">Twitter</a>
                    <a href="#" className="social-link">Instagram</a>
                    <a href="#" className="social-link">Dribbble</a>
                  </div>
                </div>

                <div className="info-card">
                  <h3>Response Time</h3>
                  <p>We typically respond within 24 hours on business days.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
