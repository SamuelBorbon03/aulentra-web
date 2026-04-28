"use client";

import { AnimatedPath } from "../shared/AnimatedPath";

/**
 * HeroConstelacion — SVG inline de 18 nodos en 3 anillos orgánicos.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * Composición:
 *   · Anillo 1 (Gobierno · 4 nodos)        → órbita interna φ≈100
 *   · Anillo 2 (Gestión · 6 nodos)         → órbita media   φ≈180
 *   · Anillo 3 (Operación · 8 nodos)       → órbita externa φ≈250
 *   · Curvas Bezier finas conectan nodos contiguos del mismo anillo
 *     y tres puentes diagonales atraviesan los anillos (gobierno↔operación)
 *   · 3 nodos primarios pulsan en loop (anillo de eco scale 1→1.45)
 *   · Etiquetas micro laterales en uppercase tracking 0.22em
 *
 * Etiquetas (provisionales · Frontend autorizado D-bis · revisar con Samuel):
 *   gobierno     → Dirección · Rectoría · Junta · Auditoría
 *   gestión      → Coordinación · Académica · Admisiones · Tesorería · Comunicaciones · Tutoría
 *   operación    → Docentes · Estudiantes · Acudientes · Secretaría · Bienestar · Soporte · Datos · Infraestructura
 *
 * viewBox 0 0 560 560 · escalado fluido `clamp(380px, 38vw, 560px)`.
 */
const CENTER = 280;

interface Node {
  /** Polar coords */ angle: number; radius: number;
  /** Etiqueta lateral micro (provisional) */ label: string;
  /** Lado para offset del label */ side: "L" | "R" | "T" | "B";
  /** Nodo primario (pulso) */ primary?: boolean;
}

const RING_GOVERNMENT: Node[] = [
  { angle: -90,  radius: 92, label: "Dirección",   side: "T", primary: true  },
  { angle:   0,  radius: 92, label: "Rectoría",    side: "R" },
  { angle:  90,  radius: 92, label: "Auditoría",   side: "B" },
  { angle: 180,  radius: 92, label: "Junta",       side: "L" },
];

const RING_MANAGEMENT: Node[] = [
  { angle: -60, radius: 178, label: "Académica",     side: "R", primary: true },
  { angle:   0, radius: 178, label: "Admisiones",    side: "R" },
  { angle:  60, radius: 178, label: "Tesorería",     side: "R" },
  { angle: 120, radius: 178, label: "Comunicaciones",side: "L" },
  { angle: 180, radius: 178, label: "Coordinación",  side: "L" },
  { angle: 240, radius: 178, label: "Tutoría",       side: "L" },
];

const RING_OPERATION: Node[] = [
  { angle: -112, radius: 248, label: "Datos",          side: "T" },
  { angle:  -68, radius: 248, label: "Docentes",       side: "R", primary: true },
  { angle:  -22, radius: 248, label: "Estudiantes",    side: "R" },
  { angle:   24, radius: 248, label: "Acudientes",     side: "R" },
  { angle:   72, radius: 248, label: "Secretaría",     side: "B" },
  { angle:  118, radius: 248, label: "Bienestar",      side: "L" },
  { angle:  168, radius: 248, label: "Soporte",        side: "L" },
  { angle: -158, radius: 248, label: "Infraestructura",side: "L" },
];

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + Math.cos(rad) * radius, y: CENTER + Math.sin(rad) * radius };
}

function bezierBetween(a: { x: number; y: number }, b: { x: number; y: number }, curve = 0.18) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Vector perpendicular para curvar suavemente
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * len * curve;
  const cy = my + (dx / len) * len * curve;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function HeroConstelacion() {
  // Etiquetas provisionales (autorización Frontend D-bis)
  return (
    <svg
      role="img"
      aria-label="Constelación institucional · 18 áreas conectadas en tres anillos"
      viewBox="0 0 560 560"
      className="w-full h-auto"
      style={{
        width: "clamp(380px, 38vw, 560px)",
        maxWidth: "100%",
      }}
    >
      <defs>
        <radialGradient id="constelacion-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.10" />
          <stop offset="55%"  stopColor="#67E8F9" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#101328" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="constelacion-ring-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Halo radial atmosférico */}
      <circle cx={CENTER} cy={CENTER} r="270" fill="url(#constelacion-halo)" />

      {/* 3 anillos guía sutiles */}
      <circle cx={CENTER} cy={CENTER} r="92"  fill="none" stroke="#363B68" strokeOpacity="0.35" strokeDasharray="2 4" />
      <circle cx={CENTER} cy={CENTER} r="178" fill="none" stroke="#363B68" strokeOpacity="0.30" strokeDasharray="2 4" />
      <circle cx={CENTER} cy={CENTER} r="248" fill="none" stroke="#363B68" strokeOpacity="0.25" strokeDasharray="2 4" />

      {/* Conexiones entre anillos contiguos · 3 puentes Bezier diagonales */}
      <g stroke="url(#constelacion-ring-stroke)" strokeWidth="0.85" fill="none" strokeOpacity="0.7">
        {/* gobierno → gestión */}
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[0].angle, 92), polar(RING_MANAGEMENT[0].angle, 178), 0.12)} duration={1400} delay={120} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[1].angle, 92), polar(RING_MANAGEMENT[1].angle, 178), 0.12)} duration={1400} delay={200} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[2].angle, 92), polar(RING_MANAGEMENT[3].angle, 178), 0.12)} duration={1400} delay={280} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[3].angle, 92), polar(RING_MANAGEMENT[4].angle, 178), 0.12)} duration={1400} delay={360} />
        {/* gestión → operación */}
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[0].angle, 178), polar(RING_OPERATION[1].angle, 248), 0.10)} duration={1400} delay={440} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[1].angle, 178), polar(RING_OPERATION[2].angle, 248), 0.10)} duration={1400} delay={520} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[2].angle, 178), polar(RING_OPERATION[4].angle, 248), 0.10)} duration={1400} delay={600} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[3].angle, 178), polar(RING_OPERATION[5].angle, 248), 0.10)} duration={1400} delay={680} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[4].angle, 178), polar(RING_OPERATION[6].angle, 248), 0.10)} duration={1400} delay={760} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[5].angle, 178), polar(RING_OPERATION[7].angle, 248), 0.10)} duration={1400} delay={840} />
      </g>

      {/* Conexiones entre nodos contiguos del MISMO anillo · gestión + operación */}
      <g stroke="#363B68" strokeOpacity="0.45" strokeWidth="0.6" fill="none">
        {RING_MANAGEMENT.map((n, i) => {
          const next = RING_MANAGEMENT[(i + 1) % RING_MANAGEMENT.length];
          return (
            <AnimatedPath
              key={`mgmt-${i}`}
              d={bezierBetween(polar(n.angle, 178), polar(next.angle, 178), 0.06)}
              duration={1200}
              delay={920 + i * 50}
            />
          );
        })}
        {RING_OPERATION.map((n, i) => {
          const next = RING_OPERATION[(i + 1) % RING_OPERATION.length];
          return (
            <AnimatedPath
              key={`op-${i}`}
              d={bezierBetween(polar(n.angle, 248), polar(next.angle, 248), 0.05)}
              duration={1200}
              delay={1240 + i * 40}
            />
          );
        })}
      </g>

      {/* Nodos · pintar al frente */}
      {[...RING_GOVERNMENT, ...RING_MANAGEMENT, ...RING_OPERATION].map((n, i) => {
        const p = polar(n.angle, n.radius);
        const r = n.primary ? 5 : 3.2;
        return (
          <g key={`node-${i}`}>
            {n.primary && (
              <circle
                cx={p.x}
                cy={p.y}
                r={r + 1.5}
                fill="none"
                stroke="#A5B4FC"
                strokeOpacity="0.6"
                className="animate-node-ring"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={r}
              fill={n.primary ? "#A5B4FC" : "#67E8F9"}
              fillOpacity={n.primary ? 1 : 0.85}
            />
          </g>
        );
      })}

      {/* Etiquetas micro · solo anillo externo (operación) para no saturar */}
      <g
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        fill="#7B82A6"
        style={{ letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
      >
        {RING_OPERATION.map((n, i) => {
          const p = polar(n.angle, n.radius + 14);
          const anchor =
            n.side === "R" ? "start" : n.side === "L" ? "end" : "middle";
          return (
            <text key={`label-${i}`} x={p.x} y={p.y} textAnchor={anchor} dominantBaseline="middle">
              {n.label.toUpperCase()}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
