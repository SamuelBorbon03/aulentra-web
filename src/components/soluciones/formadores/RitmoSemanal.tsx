"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * RitmoSemanal · Sección 6 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * Cita IBM Plex Serif italic 28px 3 líneas + diagrama de 7 columnas (L-D)
 * con 3-5 puntos circulares de tamaño variable (φ=4-12). Patrón NO uniforme:
 * lunes denso, miércoles ligero, fin de semana 1-2 puntos. Puntos en
 * gradient saturación line-strong → primary. Tooltips por punto con
 * micro-leyenda.
 *
 * COPY PROVISIONAL · autorización Frontend D-bis (Samuel revisa):
 *   - Cita italic: composición editorial siguiendo tono Aulentra.
 *   - 7 tooltips: léxico que reconoce un formador real.
 */

// ─── Cita italic (provisional · autorización D-bis) ─────────────────────
const CITA = `Cuando enseñas por cuenta propia, el sistema deja de ser una herramienta y empieza a ser parte de cómo trabajas — los días en que todo fluye, y los días en que no.`;

// ─── 7 tooltips (provisional · autorización D-bis · léxico formador real) ─
const ACTIVIDADES = [
  "Clase virtual",
  "Asesoría 1:1",
  "Corrección de evaluaciones",
  "Mensaje a familias",
  "Revisión de avances",
  "Planificación semanal",
  "Pausa",
];

interface Punto {
  /** Tamaño del punto en px (φ entre 4 y 12) */ size: number;
  /** Saturación 0-1 · drives gradient line-strong → primary */ sat: number;
  /** Índice de actividad (0-6) que aplica al tooltip */ act: number;
}

// Patrón NO uniforme: L denso, M-X medio, X ligero, J-V medio-denso, S-D 1-2 puntos.
const COLUMNAS: { dia: string; puntos: Punto[] }[] = [
  // Lunes · denso (5 puntos)
  {
    dia: "L",
    puntos: [
      { size: 11, sat: 0.95, act: 0 },
      { size: 9,  sat: 0.85, act: 1 },
      { size: 8,  sat: 0.70, act: 4 },
      { size: 10, sat: 0.90, act: 0 },
      { size: 7,  sat: 0.55, act: 3 },
    ],
  },
  // Martes · medio-alto (4 puntos)
  {
    dia: "M",
    puntos: [
      { size: 9,  sat: 0.75, act: 2 },
      { size: 11, sat: 0.95, act: 0 },
      { size: 7,  sat: 0.55, act: 4 },
      { size: 8,  sat: 0.70, act: 1 },
    ],
  },
  // Miércoles · ligero (3 puntos pequeños)
  {
    dia: "X",
    puntos: [
      { size: 6,  sat: 0.45, act: 5 },
      { size: 8,  sat: 0.65, act: 1 },
      { size: 5,  sat: 0.40, act: 4 },
    ],
  },
  // Jueves · medio-denso (5 puntos)
  {
    dia: "J",
    puntos: [
      { size: 10, sat: 0.90, act: 0 },
      { size: 9,  sat: 0.80, act: 2 },
      { size: 7,  sat: 0.60, act: 3 },
      { size: 8,  sat: 0.70, act: 1 },
      { size: 9,  sat: 0.80, act: 0 },
    ],
  },
  // Viernes · medio (4 puntos)
  {
    dia: "V",
    puntos: [
      { size: 11, sat: 0.95, act: 0 },
      { size: 8,  sat: 0.70, act: 4 },
      { size: 7,  sat: 0.60, act: 2 },
      { size: 6,  sat: 0.45, act: 3 },
    ],
  },
  // Sábado · 2 puntos pequeños
  {
    dia: "S",
    puntos: [
      { size: 6, sat: 0.45, act: 5 },
      { size: 5, sat: 0.35, act: 6 },
    ],
  },
  // Domingo · 1 punto muy pequeño
  {
    dia: "D",
    puntos: [
      { size: 5, sat: 0.30, act: 6 },
    ],
  },
];

export function RitmoSemanal() {
  return (
    <SectionWrapper tone="bg-deep" spacing="2xl" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
            Cómo se siente
          </div>
        </Reveal>

        {/* Cita italic · max 760 · centrada */}
        <Reveal delay={120}>
          <div className="max-w-[820px] mx-auto text-center">
            <p
              className="font-serif italic text-text-strong leading-[1.45]"
              style={{ fontSize: "clamp(22px, 2.6vw, 28px)" }}
              data-provisional="cita-formador"
            >
              &ldquo;{CITA}&rdquo;
            </p>
            {/* prov. · cita propuesta · pendiente revisión con Samuel (D-bis) */}
          </div>
        </Reveal>

        {/* Diagrama ritmo · tooltips con léxico provisional · pendiente revisión con Samuel (D-bis) */}
        <Reveal delay={240}>
          <div className="mt-20" data-provisional="tooltips-actividades">
            <DiagramaRitmo />
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

function DiagramaRitmo() {
  const [hover, setHover] = useState<{ col: number; pt: number } | null>(null);
  const COL_W = 100;
  const SVG_W = COL_W * COLUMNAS.length;
  const SVG_H = 160;

  return (
    <div className="relative mx-auto" style={{ maxWidth: 720 }}>
      <svg
        role="img"
        aria-label="Distribución semanal de actividades del formador a lo largo de los siete días"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto"
      >
        {/* línea base */}
        <line
          x1={0}
          y1={SVG_H - 20}
          x2={SVG_W}
          y2={SVG_H - 20}
          stroke="#363B68"
          strokeOpacity="0.45"
          strokeWidth="0.6"
        />

        {COLUMNAS.map((col, ci) => {
          const cx = ci * COL_W + COL_W / 2;
          // Distribuir puntos verticalmente entre y=20 y y=120
          const N = col.puntos.length;
          const span = 100;
          const top = 20;

          return (
            <g key={ci}>
              {/* Etiqueta del día */}
              <text
                x={cx}
                y={SVG_H - 4}
                textAnchor="middle"
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="11"
                fontWeight="700"
                fill="#7B82A6"
                style={{ letterSpacing: "0.20em", textTransform: "uppercase" }}
              >
                {col.dia}
              </text>

              {col.puntos.map((p, pi) => {
                // saturación → mezcla de #363B68 (line-strong) → #A5B4FC (primary)
                const r = (216 - 54) * p.sat + 54; // R: 0x36→0xA5
                const g = (180 - 59) * p.sat + 59; // G
                const b = (252 - 104) * p.sat + 104; // B
                const fill = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
                const cy = top + (pi + 0.5) * (span / N);
                const isHover = hover?.col === ci && hover?.pt === pi;
                return (
                  <g
                    key={pi}
                    role="group"
                    aria-label={ACTIVIDADES[p.act]}
                    tabIndex={0}
                    onMouseEnter={() => setHover({ col: ci, pt: pi })}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover({ col: ci, pt: pi })}
                    onBlur={() => setHover(null)}
                    style={{ cursor: "default", outline: "none" }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={p.size / 2}
                      fill={fill}
                      style={{
                        transition: "transform 200ms ease, filter 200ms ease",
                        transformOrigin: `${cx}px ${cy}px`,
                        transformBox: "fill-box",
                        transform: isHover ? "scale(1.25)" : "scale(1)",
                        filter: isHover
                          ? "drop-shadow(0 0 6px rgba(165,180,252,0.55))"
                          : "none",
                      }}
                    />
                    {/* Tooltip mientras hover/focus */}
                    {isHover && (
                      <g pointerEvents="none">
                        <rect
                          x={cx - 60}
                          y={cy - p.size / 2 - 32}
                          width={120}
                          height={22}
                          rx={4}
                          fill="#1D2145"
                          stroke="#363B68"
                          strokeOpacity="0.75"
                          strokeWidth="0.6"
                        />
                        <text
                          x={cx}
                          y={cy - p.size / 2 - 17}
                          textAnchor="middle"
                          fontFamily="var(--font-geist-mono), monospace"
                          fontSize="9"
                          fontWeight="500"
                          fill="#ECEEF8"
                          style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}
                        >
                          {ACTIVIDADES[p.act].toUpperCase()}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
