"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * SistemaRoles · Sección 3 de /soluciones/instituciones.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * Visual: SVG inline custom · "mapa de territorios" (no grid) · 5 zonas
 * orgánicas con paths Bezier (Gobierno · Gestión académica · Operación ·
 * Comunidad · Datos) · cada zona con 2-4 nodos punto + etiqueta lateral ·
 * placeholder dashed "+ activar nuevo rol" · hover sube zona a opacity 0.16
 * + translateY(-2px). viewBox 0 0 720 480.
 *
 * 3 bloques cortos en grid 1×3 alineados con la promesa "el sistema crece
 * cuando tu institución crece".
 */
const BLOCKS = [
  {
    head: "El sistema reconoce los roles que tu institución ya tiene.",
    body: "Administración, equipo docente, estudiantes, familias. Cada uno entra a Aulentra a lo que le corresponde — ni más, ni menos.",
  },
  {
    head: "Los permisos siguen tu estructura, no una plantilla.",
    body: "Lo que puede ver un coordinador no es lo que puede ver un docente. Lo que firma dirección no lo aprueba un administrativo.",
  },
  {
    head: "El sistema crece cuando tu institución crece.",
    body: "Se activan los roles que necesites cuando los necesites.",
  },
] as const;

export function SistemaRoles() {
  return (
    <SectionWrapper tone="bg" spacing="2xl" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
            El sistema
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[920px]">
            Roles que se reparten la responsabilidad. Procesos que se reparten el tiempo.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[760px]">
            Cada institución decide quién administra, quién enseña, quién acompaña, quién aprende. Aulentra se adapta a esa estructura — no la reemplaza.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <MapaTerritorios />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 border-t border-line-soft pt-14">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.head} delay={340 + i * 80}>
              <div className="border-l-2 border-primary/40 pl-5">
                <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                  {b.head}
                </h3>
                <p className="text-body text-text-muted leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * MapaTerritorios — 5 zonas orgánicas + nodos + zona placeholder
 * ─────────────────────────────────────────────────────────────────*/

interface Zone {
  id: string;
  label: string;
  /** Path Bezier que delimita la zona */ d: string;
  /** Nodos dentro de la zona */ nodes: { x: number; y: number }[];
  /** Posición de la etiqueta */ labelAt: { x: number; y: number; anchor: "start" | "middle" | "end" };
  /** Color del fill / stroke */ tone: "primary" | "accent";
}

const ZONES: Zone[] = [
  {
    id: "gobierno",
    label: "Gobierno",
    // arriba-izquierda · suave forma de óvalo deformado
    d: "M 70 60 Q 60 30 140 30 Q 230 25 270 70 Q 280 110 230 140 Q 170 165 110 145 Q 60 130 70 60 Z",
    nodes: [
      { x: 130, y: 70 },
      { x: 195, y: 80 },
      { x: 165, y: 120 },
    ],
    labelAt: { x: 75, y: 175, anchor: "start" },
    tone: "primary",
  },
  {
    id: "gestion",
    label: "Gestión académica",
    // centro-superior derecha
    d: "M 320 50 Q 360 25 460 40 Q 545 60 555 130 Q 555 195 470 200 Q 380 205 340 165 Q 295 120 320 50 Z",
    nodes: [
      { x: 380, y: 80 },
      { x: 450, y: 95 },
      { x: 495, y: 145 },
      { x: 405, y: 165 },
    ],
    labelAt: { x: 470, y: 235, anchor: "middle" },
    tone: "primary",
  },
  {
    id: "operacion",
    label: "Operación",
    // centro-bajo · zona ancha
    d: "M 150 220 Q 130 260 160 310 Q 210 360 320 360 Q 430 365 470 320 Q 500 270 460 230 Q 400 200 320 215 Q 240 230 150 220 Z",
    nodes: [
      { x: 210, y: 270 },
      { x: 280, y: 290 },
      { x: 350, y: 305 },
      { x: 420, y: 290 },
    ],
    labelAt: { x: 320, y: 405, anchor: "middle" },
    tone: "accent",
  },
  {
    id: "comunidad",
    label: "Comunidad",
    // izquierda media-baja
    d: "M 35 250 Q 25 290 55 340 Q 95 390 165 390 Q 200 395 200 360 Q 195 320 145 295 Q 90 270 35 250 Z",
    nodes: [
      { x: 80, y: 305 },
      { x: 135, y: 335 },
      { x: 175, y: 365 },
    ],
    labelAt: { x: 50, y: 425, anchor: "start" },
    tone: "accent",
  },
  {
    id: "datos",
    label: "Datos",
    // derecha media-baja
    d: "M 540 240 Q 590 250 605 305 Q 615 365 565 395 Q 510 415 490 380 Q 480 340 510 305 Q 525 270 540 240 Z",
    nodes: [
      { x: 555, y: 295 },
      { x: 585, y: 345 },
      { x: 525, y: 365 },
    ],
    labelAt: { x: 605, y: 425, anchor: "end" },
    tone: "primary",
  },
];

function MapaTerritorios() {
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <svg
      role="img"
      aria-label="Mapa de territorios institucionales · cinco zonas orgánicas conectadas con espacio para activar nuevos roles"
      viewBox="0 0 720 480"
      className="w-full h-auto"
      style={{ maxWidth: "clamp(420px, 50vw, 720px)" }}
    >
      <defs>
        <linearGradient id="zone-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#A5B4FC" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="zone-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#67E8F9" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Zonas */}
      {ZONES.map((z) => {
        const isHover = hoverId === z.id;
        return (
          <g
            key={z.id}
            role="group"
            aria-label={z.label}
            tabIndex={0}
            onMouseEnter={() => setHoverId(z.id)}
            onMouseLeave={() => setHoverId(null)}
            onFocus={() => setHoverId(z.id)}
            onBlur={() => setHoverId(null)}
            style={{
              transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease",
              transform: isHover ? "translateY(-2px)" : "translateY(0)",
              transformOrigin: "center",
              outline: "none",
              cursor: "default",
            }}
          >
            <path
              d={z.d}
              fill={`url(#zone-${z.tone})`}
              stroke={z.tone === "primary" ? "#A5B4FC" : "#67E8F9"}
              strokeOpacity={isHover ? 0.55 : 0.30}
              strokeWidth={1}
              style={{
                opacity: isHover ? 1 : 0.85,
                transition: "stroke-opacity 320ms ease, opacity 320ms ease",
              }}
            />
            {z.nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={3.2}
                fill={z.tone === "primary" ? "#A5B4FC" : "#67E8F9"}
                fillOpacity={isHover ? 1 : 0.80}
              />
            ))}
            <text
              x={z.labelAt.x}
              y={z.labelAt.y}
              textAnchor={z.labelAt.anchor}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="10"
              fontWeight="700"
              fill={isHover ? "#A5B4FC" : "#7B82A6"}
              style={{
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                transition: "fill 320ms ease",
              }}
            >
              {z.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Placeholder dashed · "+ activar nuevo rol" */}
      <g role="group" aria-label="Espacio para activar un nuevo rol">
        <path
          d="M 380 220 Q 420 195 480 215 Q 530 240 540 285 Q 545 325 510 340 Q 470 350 430 335 Q 385 315 380 270 Q 378 245 380 220 Z"
          fill="none"
          stroke="#363B68"
          strokeWidth="1"
          strokeDasharray="4 5"
          opacity="0.55"
        />
        <text
          x="460"
          y="280"
          textAnchor="middle"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="9"
          fontWeight="500"
          fill="#7B82A6"
          style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          + ACTIVAR
        </text>
        <text
          x="460"
          y="296"
          textAnchor="middle"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="9"
          fontWeight="500"
          fill="#7B82A6"
          style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          NUEVO ROL
        </text>
      </g>
    </svg>
  );
}
