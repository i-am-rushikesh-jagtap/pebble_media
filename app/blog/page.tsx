"use client";

import "@/app/sections.css";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "The Future of Brand Storytelling in 2024",
    excerpt: "Explore how AI and immersive technologies are reshaping the way brands connect with audiences.",
    date: "June 15, 2024",
    category: "Trends",
    readTime: "5 min read"
  },
  {
    title: "5 Strategies to Maximize Your Video Marketing ROI",
    excerpt: "Learn proven tactics to get more value from your video content investments.",
    date: "June 10, 2024",
    category: "Strategy",
    readTime: "7 min read"
  },
  {
    title: "Case Study: How We Helped TechCorp 3x Their Engagement",
    excerpt: "Behind the scenes of our award-winning campaign that transformed brand perception.",
    date: "June 5, 2024",
    category: "Case Study",
    readTime: "10 min read"
  }
];

export default function BlogPage() {
  return (
    <main className="page-with-nav">
      <section className="section-blog">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <span className="section-label">Insights & Stories</span>
            <h1 className="section-title">Our Blog</h1>
            <p className="section-description">
              Industry insights, case studies, and creative inspiration from our team
            </p>
          </motion.div>

          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="blog-card"
              >
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-read-time">{post.readTime}</span>
                  <a href="#" className="blog-read-more">Read More →</a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
