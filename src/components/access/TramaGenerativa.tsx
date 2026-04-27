"use client";

import { useEffect, useState } from "react";

/**
 * P8 · Trama generativa reactiva.
 *
 * Capa SVG de fondo con líneas finas que reaccionan al estado del flow:
 *   · idle   — 6 líneas en posición base, opacity 0.18 max
 *   · typing — las líneas se reactivan (stagger), pulse sutil
 *   · valid  — convergen hacia el centro
 *   · error  — se dispersan radialmente
 *
 * Performance: SVG estático con CSS animations · sin requestAnimationFrame.
 * Respeta `prefers-reduced-motion` → render estático sin animation.
 */
type TramaState = "idle" | "typing" | "valid" | "error";

export function TramaGenerativa({
  accent = "#A5B4FC",
  accent2 = "#67E8F9",
  state = "idle",
  intensity = 1,
}: {
  accent?: string;
  accent2?: string;
  state?: TramaState;
  intensity?: number;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const baseOpacity = 0.18 * intensity;
  const animClass = reducedMotion ? "" : `trama-${state}`;

  return (
    <svg
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${animClass}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      style={{ opacity: baseOpacity }}
    >
      <defs>
        <linearGradient id="tramaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent2} />
        </linearGradient>
      </defs>

      {/* 8 líneas convergentes desde los bordes hacia el centro */}
      <path
        d="M 50 100 Q 300 250 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        className="trama-line trama-line-1"
      />
      <path
        d="M 950 100 Q 700 250 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        className="trama-line trama-line-2"
      />
      <path
        d="M 50 900 Q 300 750 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        className="trama-line trama-line-3"
      />
      <path
        d="M 950 900 Q 700 750 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        className="trama-line trama-line-4"
      />
      <path
        d="M 500 50 Q 480 250 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        className="trama-line trama-line-5"
      />
      <path
        d="M 500 950 Q 520 750 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        className="trama-line trama-line-6"
      />
      <path
        d="M 30 500 Q 250 480 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        className="trama-line trama-line-7"
      />
      <path
        d="M 970 500 Q 750 520 500 500"
        fill="none"
        stroke="url(#tramaGrad)"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        className="trama-line trama-line-8"
      />
    </svg>
  );
}
