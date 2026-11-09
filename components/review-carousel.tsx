"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Review = { name: string; text: string };

/** Rotates real Google reviews: two at a time on wide screens, one on phones. Pauses on hover/focus and for reduced motion. */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  const shown = [reviews[i], reviews[(i + 1) % n]];
  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="carousel-track" aria-live={paused ? "polite" : "off"}>
        {shown.map((r, k) => (
          <figure key={`${i}-${k}`} className={k === 1 ? "slide slide-2" : "slide"}>
            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
            <blockquote>{r.text}</blockquote>
            <figcaption>
              <span className="avatar" aria-hidden="true">{r.name[0]}</span>
              <span>
                <strong>{r.name}</strong>
                <small>Google review</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="carousel-nav">
        <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="Previous review">
          <ChevronLeft aria-hidden />
        </button>
        <div className="dots">
          {reviews.map((r, k) => (
            <button
              key={r.name}
              type="button"
              className={k === i ? "dot on" : "dot"}
              aria-label={`Show review from ${r.name}`}
              aria-current={k === i ? "true" : undefined}
              onClick={() => setI(k)}
            />
          ))}
        </div>
        <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="Next review">
          <ChevronRight aria-hidden />
        </button>
      </div>
    </div>
  );
}
