"use client";

import { AnimatedPath } from "../shared/AnimatedPath";

/**
 * HeroNucleo — núcleo central + 6 satélites con etiquetas literales del SPEC.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * Composición:
 *   · Núcleo φ=64 sólido `#A5B4FC` con halo radial blur 40px
 *   · 6 nodos satélite φ=10 distribuidos asimétricamente (no rejilla)
 *   · 6 líneas Bezier finas saliendo del núcleo a cada satélite
 *   · Pulso sutil del núcleo scale 1→1.04 2.4s
 *   · stroke-dasharray loop sobre las líneas (8s)
 *   · Etiquetas literales del SPEC: estudiantes / programas / pagos /
 *     comunicaciones / evaluaciones / agenda
 *
 * viewBox 0 0 960 400 · escalado fluido `clamp(620px, 70vw, 960px)`.
 *
 * Sprint C · D-fix · 2026-04-27 · Etiquetas largas ("COMUNICACIONES",
 * "EVALUACIONES") se cortaban contra el borde del viewBox. Se aplica
 * "alternativa combinada" del spec: viewBox ampliado lateralmente
 * (800→960, 360→400) + satélites laterales acercados ~10% al centro
 * para garantizar holgura suficiente a las etiquetas exteriores. El
 * núcleo se recentra en (480,200).
 */
const NUCLEUS = { x: 480, y: 200 };
const NUCLEUS_R = 32;

// Satélites desplazados ~10% al centro vs versión original; layout se recompone
// en torno al nuevo centro (480,200). Holgura lateral ≈120-140px → etiquetas completas.
const SATELITES = [
  { x: 200, y: 100, label: "estudiantes",    side: "L" },
  { x: 760, y: 105, label: "programas",      side: "R" },
  { x: 775, y: 255, label: "pagos",          side: "R" },
  { x: 180, y: 270, label: "comunicaciones", side: "L" },
  { x: 320, y: 350, label: "evaluaciones",   side: "B" },
  { x: 640, y: 345, label: "agenda",         side: "B" },
] as const;

export function HeroNucleo() {
  return (
    <svg
      role="img"
      aria-label="Núcleo enfocado · seis áreas operativas conectadas a una sola interfaz"
      viewBox="0 0 960 400"
      className="w-full h-auto"
      style={{ width: "clamp(620px, 70vw, 960px)", maxWidth: "100%" }}
    >
      <defs>
        <radialGradient id="nucleus-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.42" />
          <stop offset="50%"  stopColor="#7DD3FC" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#101328" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nucleus-fill" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#C7D2FE" />
          <stop offset="60%"  stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#818CF8" />
        </radialGradient>
        <linearGradient id="connector" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Halo blur grande detrás del núcleo · 240×240 */}
      <circle cx={NUCLEUS.x} cy={NUCLEUS.y} r="120" fill="url(#nucleus-halo)" />

      {/* 6 conectores Bezier · trazado animado de entrada + dash-flow loop */}
      <g stroke="url(#connector)" strokeWidth="1" fill="none">
        {SATELITES.map((s, i) => {
          // curva: midpoint con perpendicular leve para sensación orgánica
          const mx = (NUCLEUS.x + s.x) / 2;
          const my = (NUCLEUS.y + s.y) / 2;
          const dx = s.x - NUCLEUS.x;
          const dy = s.y - NUCLEUS.y;
          const len = Math.hypot(dx, dy) || 1;
          const curve = 22;
          const cx = mx - (dy / len) * curve;
          const cy = my + (dx / len) * curve;
          return (
            <AnimatedPath
              key={`conn-${i}`}
              d={`M ${NUCLEUS.x} ${NUCLEUS.y} Q ${cx} ${cy} ${s.x} ${s.y}`}
              duration={1200}
              delay={300 + i * 90}
              className="animate-dash-flow"
              style={{ strokeDasharray: "4 6" }}
            />
          );
        })}
      </g>

      {/* Núcleo sólido · pulse loop */}
      <g className="animate-nucleus-pulse" style={{ transformOrigin: `${NUCLEUS.x}px ${NUCLEUS.y}px` }}>
        <circle cx={NUCLEUS.x} cy={NUCLEUS.y} r={NUCLEUS_R} fill="url(#nucleus-fill)" />
        <circle
          cx={NUCLEUS.x}
          cy={NUCLEUS.y}
          r={NUCLEUS_R - 8}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.25"
          strokeWidth="0.6"
        />
      </g>

      {/* Satélites · punto + etiqueta */}
      {SATELITES.map((s, i) => {
        const anchor = s.side === "R" ? "start" : s.side === "L" ? "end" : "middle";
        const labelX =
          s.side === "R" ? s.x + 14 : s.side === "L" ? s.x - 14 : s.x;
        const labelY = s.side === "B" ? s.y + 22 : s.y + 4;
        return (
          <g key={`sat-${i}`}>
            <circle cx={s.x} cy={s.y} r="5" fill="#67E8F9" />
            <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="#67E8F9" strokeOpacity="0.30" />
            <text
              x={labelX}
              y={labelY}
              textAnchor={anchor}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="11"
              fontWeight="500"
              fill="#B8BDD6"
              style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
