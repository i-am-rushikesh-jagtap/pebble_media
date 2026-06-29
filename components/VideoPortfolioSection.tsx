"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const videoProjects = [
  {
    title: "Bar Flying",
    category: "Brand Film",
    description: "Dynamic brand storytelling capturing the energy and culture of modern nightlife.",
    thumbnail: "/portfolio/thumbs/bar-flying.jpg",
    videoUrl: "/portfolio/videos/bar-flying.mp4",
    duration: "2:30",
    stats: "High-impact visual narrative"
  },
  {
    title: "Gudgum",
    category: "Product Video",
    description: "Creative product showcase blending lifestyle and brand personality.",
    thumbnail: "/portfolio/thumbs/gudgum.jpg",
    videoUrl: "/portfolio/videos/gudgum.mp4",
    duration: "1:45",
    stats: "Engaging storytelling"
  },
  {
    title: "Go Zero",
    category: "Brand Campaign",
    description: "Sustainability-focused brand film highlighting eco-conscious innovation.",
    thumbnail: "/portfolio/thumbs/go-zero.jpg",
    videoUrl: "/portfolio/videos/go-zero.mp4",
    duration: "3:00",
    stats: "Purpose-driven content"
  },
  {
    title: "Not Funny",
    category: "Creative Content",
    description: "Bold creative piece that challenges conventions with humor and wit.",
    thumbnail: "/portfolio/thumbs/not-funny.jpg",
    videoUrl: "/portfolio/videos/not-funny.mp4",
    duration: "2:15",
    stats: "Viral-worthy creativity"
  },
  {
    title: "Bold Fit",
    category: "Fitness Brand",
    description: "High-energy fitness brand film motivating audiences to push their limits.",
    thumbnail: "/portfolio/thumbs/bold-fit.jpg",
    videoUrl: "/portfolio/videos/bold-fit.mp4",
    duration: "2:00",
    stats: "Powerful motivation"
  },
  {
    title: "Chebel",
    category: "Brand Story",
    description: "Authentic brand storytelling connecting heritage with modern appeal.",
    thumbnail: "/portfolio/thumbs/chebel.jpg",
    videoUrl: "/portfolio/videos/chebel.mp4",
    duration: "2:45",
    stats: "Emotional connection"
  }
];

const eventProjects = [
  {
    title: "Zerodha",
    category: "Corporate Event",
    description: "Professional event coverage capturing key moments and atmosphere.",
    thumbnail: "/portfolio/thumbs/zerodha.jpg",
    videoUrl: "/portfolio/events/zerodha.mp4",
    duration: "5:00",
    stats: "Full event documentation"
  },
  {
    title: "Great Creators Trail",
    category: "Event Highlight",
    description: "Dynamic highlight reel showcasing creativity and community.",
    thumbnail: "/portfolio/thumbs/creators-trail.jpg",
    videoUrl: "/portfolio/events/great-creators-trail.mp4",
    duration: "3:30",
    stats: "Community celebration"
  },
  {
    title: "70-30",
    category: "Event Coverage",
    description: "Comprehensive event documentation with cinematic storytelling.",
    thumbnail: "/portfolio/thumbs/70-30.jpg",
    videoUrl: "/portfolio/events/70-30.mp4",
    duration: "4:15",
    stats: "Cinematic coverage"
  },
  {
    title: "EV Bike Launch",
    category: "Product Launch",
    description: "Electric vehicle launch event capturing innovation and excitement.",
    thumbnail: "/portfolio/thumbs/ev-bike.jpg",
    videoUrl: "/portfolio/events/ev-bike.mp4",
    duration: "3:45",
    stats: "Launch momentum"
  }
];

export default function VideoPortfolioSection() {
  const [inView, setInView] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"videos" | "events">("videos");
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

  const projects = activeTab === "videos" ? videoProjects : eventProjects;

  return (
    <section id="video-portfolio" ref={sectionRef} className="section-video-portfolio">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">Video Production</span>
          <h2 className="section-title">Our Video Work</h2>
          <p className="section-description">
            From brand films to event coverage, we create visual stories that captivate and inspire
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="video-tabs">
          <button
            className={`video-tab ${activeTab === "videos" ? "video-tab--active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Brand Videos ({videoProjects.length})
          </button>
          <button
            className={`video-tab ${activeTab === "events" ? "video-tab--active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Event Coverage ({eventProjects.length})
          </button>
        </div>

        {/* Video Grid */}
        <div className="video-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="video-card"
              onClick={() => setSelectedVideo(project)}
            >
              <div className="video-thumbnail">
                <div className="video-thumbnail-placeholder">
                  <div className="play-icon">▶</div>
                  <div className="video-overlay">
                    <span className="video-duration">{project.duration}</span>
                  </div>
                </div>
              </div>
              <div className="video-info">
                <span className="video-category">{project.category}</span>
                <h3 className="video-title">{project.title}</h3>
                <p className="video-description">{project.description}</p>
                <div className="video-stats">{project.stats}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="video-modal-close" onClick={() => setSelectedVideo(null)}>
                ✕
              </button>
              <div className="video-player-wrapper">
                <div className="video-player-placeholder">
                  <h3>{selectedVideo.title}</h3>
                  <p>Video will be embedded here</p>
                  <p className="video-help-text">
                    Add your video file to: /public/portfolio/{activeTab}/{selectedVideo.title.toLowerCase().replace(/\s+/g, '-')}.mp4
                  </p>
                </div>
              </div>
              <div className="video-modal-info">
                <h3>{selectedVideo.title}</h3>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
