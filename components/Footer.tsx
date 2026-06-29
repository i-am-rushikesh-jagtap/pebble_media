"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container-premium">
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <img src="/pebble-logo.png" alt="Pebble Media" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              One Pebble. Infinite Ripples.
            </p>
            <p className="footer-description">
              Transforming brands through strategic creativity and data-driven growth.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Brand Strategy</a></li>
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">Creative Production</a></li>
              <li><a href="#services">Growth Consulting</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#case-studies">Case Studies</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <a href="mailto:hello@pebblemedia.com">hello@pebblemedia.com</a>
              </li>
              <li>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn" className="social-link">in</a>
              <a href="#" aria-label="Twitter" className="social-link">𝕏</a>
              <a href="#" aria-label="Instagram" className="social-link">ig</a>
              <a href="#" aria-label="Dribbble" className="social-link">dr</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Pebble Media. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
