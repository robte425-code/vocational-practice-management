"use client";

import { useEffect, useRef } from "react";

/** Sample ticker lines (invented; not real announcements). */
const TICKER_ITEMS = [
  "Congratulations, Jordan and Sam, on earning your certifications!",
  "The Voc Hotline is here! Ask voc-related questions and get instant answers — improving daily.",
  "Reminder: finish your annual compliance training by the end of the month.",
  "The office is closed Monday for the holiday.",
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
