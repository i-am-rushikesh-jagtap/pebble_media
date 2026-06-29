"use client";

import { useState } from "react";

export default function Scene07Drop() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pinned-section" style={{ backgroundColor: "#000", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ width: "100%", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        
        {!submitted ? (
          <div style={{ transition: "opacity 0.5s" }}>
            <h2 className="text-h2" style={{ marginBottom: "1rem" }}>DROP YOUR PEBBLE</h2>
            <p className="text-body" style={{ marginBottom: "3rem" }}>
              Ready to start your journey? Let's create ripples together.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="text"
                placeholder="Name"
                required
                style={{ padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "1rem" }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                style={{ padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "1rem" }}
              />
              <button
                type="submit"
                className="magnetic"
                style={{
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  background: "var(--brand-color)",
                  color: "#000",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Create Ripple
              </button>
            </form>
          </div>
        ) : (
          <div style={{ animation: "fadeIn 2s ease-out" }}>
            <div style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: 0,
              left: 0,
              background: "radial-gradient(circle, rgba(253,103,50,0.2) 0%, transparent 60%)",
              zIndex: -1,
              animation: "rippleExpand 3s ease-out forwards"
            }} />
            <h2 className="text-h2" style={{ color: "var(--brand-color)" }}>A new journey has begun.</h2>
            <p className="text-body" style={{ marginTop: "1rem" }}>We will be in touch shortly.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rippleExpand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}} />
    </section>
  );
}
