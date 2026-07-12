"use client";

import { useEffect, useRef } from "react";

/** Real ticker lines from the Updates dashboard (TEAM-branded lines omitted). */
const TICKER_ITEMS = [
  "Plan Dev and Plan Imp R&R docs are temporarily unavailable in Gardiant. Updated versions will be posted soon!",
  "Congratulations, Jordan and Sam, on passing the CDMS exam!",
  "The Voc Hotline is here! Ask voc-related questions and get instant answers — improving daily.",
  "Phishing emails continue. Do not enter your email address and password to access information received via email.",
  "AWA Closure? Complete an Exit Interview — and use activity code \"Exit Interview\" — to support client transition.",
  "Access to CAC may be sporadic today.",
];

const SPEED_PPS = 40;

export function MockTicker() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    const groupEl = groupRef.current;
    const containerEl = containerRef.current;
    if (!el || !groupEl || !containerEl) return;

    let width = groupEl.offsetWidth || 1;
    if (width < containerEl.offsetWidth) {
      width = containerEl.offsetWidth;
    }
    let offset = 0;
    let last = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      offset -= (SPEED_PPS * dt) / 1000;
      if (-offset >= width) {
        offset += width;
      }
      el.style.transform = `translateX(${offset}px)`;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    const handleResize = () => {
      width = groupEl.offsetWidth || 1;
      if (width < containerEl.offsetWidth) {
        width = containerEl.offsetWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const repeats = Math.max(3, 12 - TICKER_ITEMS.length);
  const cycleItems = Array.from({ length: repeats }, () => TICKER_ITEMS).flat();

  return (
    <div className="border-b border-amber-200/70 bg-amber-50 text-amber-950">
      <div ref={containerRef} className="relative overflow-hidden py-2">
        <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
          <div ref={groupRef} className="flex">
            {cycleItems.map((text, idx) => (
              <span
                key={`g1-${idx}`}
                className="mr-8 inline-flex items-center gap-2 text-[11px] sm:text-xs"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-amber-500" />
                <span>{text}</span>
              </span>
            ))}
          </div>
          <div className="flex" aria-hidden="true">
            {cycleItems.map((text, idx) => (
              <span
                key={`g2-${idx}`}
                className="mr-8 inline-flex items-center gap-2 text-[11px] sm:text-xs"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-amber-500" />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
