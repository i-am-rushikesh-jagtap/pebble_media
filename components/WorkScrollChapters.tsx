"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { FEATURED_PROJECTS, type FeaturedProject } from "@/lib/home-content";

function ChapterMedia({ project }: { project: FeaturedProject }) {
  const [mediaReady, setMediaReady] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const showVideo = Boolean(project.videoSrc) && !mediaFailed;
  const showImage = Boolean(project.imageSrc) && !showVideo && !mediaFailed;
  const imageFit = project.imageFit ?? "cover";

  return (
    <div
      className={`work-chapter__media${imageFit === "contain" ? " work-chapter__media--contain" : ""}`}
      data-project={project.id}
    >
      <div
        className="work-chapter__fallback"
        style={{ background: project.gradient }}
        aria-hidden={(showVideo || showImage) && mediaReady}
      />
      {showVideo && project.videoSrc ? (
        <video
          className={`work-chapter__video${mediaReady ? " is-ready" : ""}`}
          src={project.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setMediaReady(true)}
          onError={() => setMediaFailed(true)}
        />
      ) : showImage && project.imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`work-chapter__image${mediaReady ? " is-ready" : ""}`}
          src={project.imageSrc}
          alt={`${project.title} project showcase`}
          onLoad={() => setMediaReady(true)}
          onError={() => setMediaFailed(true)}
        />
      ) : null}
      <div className="work-chapter__media-shade" aria-hidden="true" />
    </div>
  );
}

export default function WorkScrollChapters() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".work-chapters__intro-inner", {
        scrollTrigger: {
          trigger: ".work-chapters__intro",
          start: "top 82%",
        },
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (reducedMotion) return;

      section.querySelectorAll<HTMLElement>(".work-chapter").forEach((chapter) => {
        const content = chapter.querySelector<HTMLElement>(".work-chapter__content");
        const index = chapter.querySelector<HTMLElement>(".work-chapter__index");

        if (!content) return;

        gsap.from(content.children, {
          scrollTrigger: {
            trigger: chapter,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });

        if (index) {
          gsap.fromTo(
            index,
            { x: 0, opacity: 0.08 },
            {
              x: -24,
              opacity: 0.16,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work-chapters" aria-labelledby="work-chapters-title">
      <div className="work-chapters__atmosphere" aria-hidden="true">
        <span className="work-chapters__orb work-chapters__orb--warm" />
        <span className="work-chapters__orb work-chapters__orb--cool" />
      </div>

      <div className="work-chapters__intro">
        <div className="container-wide work-chapters__intro-inner">
          <div className="work-chapters__intro-copy">
            <p className="work-chapters__eyebrow">Selected work</p>
            <h2 id="work-chapters-title" className="work-chapters__title">
              Stories that <em>stick</em>
            </h2>
            <p className="work-chapters__lede">
              Three partnerships. Three industries. One obsession — making brands remembered, not
              just seen.
            </p>
          </div>
          <Link href="/work" className="work-chapters__all-link">
            View all projects
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="work-chapters__list">
        {FEATURED_PROJECTS.map((project) => (
          <article key={project.id} className="work-chapter" data-project={project.id}>
            <span className="work-chapter__index" aria-hidden="true">
              {project.index}
            </span>

            <ChapterMedia project={project} />

            <div className="work-chapter__content">
              <p className="work-chapter__meta">
                <span>{project.index}</span>
                <span aria-hidden="true">/</span>
                <span>{project.category}</span>
              </p>
              <h3 className="work-chapter__title">{project.title}</h3>
              <p className="work-chapter__headline">{project.headline}</p>
              <p className="work-chapter__desc">{project.description}</p>
              <p className="work-chapter__metric">{project.metric}</p>
              <ul className="work-chapter__services">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <Link href={project.href} className="work-chapter__link">
                View project
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
