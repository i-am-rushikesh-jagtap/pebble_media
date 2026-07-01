"use client";

import { FEATURED_CLIENTS } from "@/lib/home-content";

const ROW_A = FEATURED_CLIENTS.slice(0, 6);
const ROW_B = FEATURED_CLIENTS.slice(6);

export default function ClientLogoStrip() {
  return (
    <section className="client-strip" aria-label="Clients we work with">
      <div className="client-strip__header container">
        <p className="client-strip__eyebrow">Trusted by brands building for the long run</p>
      </div>

      <div className="client-strip__track client-strip__track--a" aria-hidden="true">
        <div className="client-strip__row">
          {[...ROW_A, ...ROW_A].map((name, i) => (
            <span key={`a-${name}-${i}`} className="client-strip__logo">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="client-strip__track client-strip__track--b" aria-hidden="true">
        <div className="client-strip__row">
          {[...ROW_B, ...ROW_B].map((name, i) => (
            <span key={`b-${name}-${i}`} className="client-strip__logo">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
