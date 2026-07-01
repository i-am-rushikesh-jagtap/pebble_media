"use client";

import "@/app/sections.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container-premium">
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-text">Pebble</span>
            </div>
            <p className="footer-tagline">One Pebble. Infinite Ripples.</p>
            <p className="footer-description">
              Transforming brands through strategic creativity and data-driven growth.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="/services">Brand Strategy</a></li>
              <li><a href="/services">Digital Marketing</a></li>
              <li><a href="/services">Creative Production</a></li>
              <li><a href="/services">Growth Consulting</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/work">Our Work</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <a href="mailto:hello@pebblemedia.in">hello@pebblemedia.in</a>
              </li>
            </ul>
            <div className="footer-social">
              <a href="https://instagram.com/pebblemedia" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">ig</a>
              <a href="https://linkedin.com/company/pebblemedia" aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">in</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {currentYear} Pebble Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
