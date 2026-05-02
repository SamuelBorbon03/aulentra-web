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
// viewBox ampliado 2026-04-28: 560×560 → 800×580 para acomodar etiquetas
// largas (INFRAESTRUCTURA, ACUDIENTES, etc.). Centro recolocado a (400, 290)
// para mantener radios 92/178/248 sin escalar. Margen lateral ≈ 152px,
// suficiente para las 18 etiquetas en mono 8px tracking 0.22em.
//
// Sprint C · D-fix · 2026-04-27: viewBox 800×580 → 880×640 + clamp container
// 420/44vw/720 → 480/50vw/800 para hacer la constelación más prominente
// respecto al texto del hero (parent passes lg:col-span-7). Centro recolocado
// a (440, 320) para mantener todos los radios y conexiones sin tocar polar().
//
// Sprint C · D-final · 2026-04-27: expansión XL "más aire, no más zoom".
// viewBox 880×640 → 1200×880 (+36% ancho, +38% alto). Centro 440,320 →
// 600,440. Radios polares ampliados ~+47-50% (92/178/248 → 165/300/425)
// para que las 18 etiquetas respiren sin que los nodos crezcan. Tamaño de
// nodos casi sin cambio: r central 14→16, demás iguales. font-size labels
// 12→13. Clamp width: clamp(480-800) → clamp(620, 72vw, 1100). Las
// animaciones (AnimatedPath, ring-pulse) NO se tocan.
const CENTER_X = 600;
const CENTER_Y = 440;
const RING_1 = 165; // gobierno
const RING_2 = 300; // gestión
const RING_3 = 425; // operación

interface Node {
  /** Polar coords */ angle: number; radius: number;
  /** Etiqueta lateral micro (provisional) */ label: string;
  /** Lado para offset del label */ side: "L" | "R" | "T" | "B";
  /** Nodo primario (pulso) */ primary?: boolean;
}

const RING_GOVERNMENT: Node[] = [
  { angle: -90,  radius: RING_1, label: "Dirección",   side: "T", primary: true  },
  { angle:   0,  radius: RING_1, label: "Rectoría",    side: "R" },
  { angle:  90,  radius: RING_1, label: "Auditoría",   side: "B" },
  { angle: 180,  radius: RING_1, label: "Junta",       side: "L" },
];

const RING_MANAGEMENT: Node[] = [
  { angle: -60, radius: RING_2, label: "Académica",     side: "R", primary: true },
  { angle:   0, radius: RING_2, label: "Admisiones",    side: "R" },
  { angle:  60, radius: RING_2, label: "Tesorería",     side: "R" },
  { angle: 120, radius: RING_2, label: "Comunicaciones",side: "L" },
  { angle: 180, radius: RING_2, label: "Coordinación",  side: "L" },
  { angle: 240, radius: RING_2, label: "Tutoría",       side: "L" },
];

const RING_OPERATION: Node[] = [
  { angle: -112, radius: RING_3, label: "Datos",          side: "T" },
  { angle:  -68, radius: RING_3, label: "Docentes",       side: "R", primary: true },
  { angle:  -22, radius: RING_3, label: "Estudiantes",    side: "R" },
  { angle:   24, radius: RING_3, label: "Acudientes",     side: "R" },
  { angle:   72, radius: RING_3, label: "Secretaría",     side: "B" },
  { angle:  118, radius: RING_3, label: "Bienestar",      side: "L" },
  { angle:  168, radius: RING_3, label: "Soporte",        side: "L" },
  { angle: -158, radius: RING_3, label: "Infraestructura",side: "L" },
];

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER_X + Math.cos(rad) * radius, y: CENTER_Y + Math.sin(rad) * radius };
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
      viewBox="0 0 1200 880"
      className="w-full h-auto"
      style={{
        width: "clamp(620px, 72vw, 1100px)",
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

      {/* Halo radial atmosférico — proporcional al nuevo radio externo */}
      <circle cx={CENTER_X} cy={CENTER_Y} r={RING_3 + 30} fill="url(#constelacion-halo)" />

      {/* 3 anillos guía sutiles */}
      <circle cx={CENTER_X} cy={CENTER_Y} r={RING_1} fill="none" stroke="#363B68" strokeOpacity="0.35" strokeDasharray="2 4" />
      <circle cx={CENTER_X} cy={CENTER_Y} r={RING_2} fill="none" stroke="#363B68" strokeOpacity="0.30" strokeDasharray="2 4" />
      <circle cx={CENTER_X} cy={CENTER_Y} r={RING_3} fill="none" stroke="#363B68" strokeOpacity="0.25" strokeDasharray="2 4" />

      {/* Conexiones entre anillos contiguos · 3 puentes Bezier diagonales */}
      <g stroke="url(#constelacion-ring-stroke)" strokeWidth="0.85" fill="none" strokeOpacity="0.7">
        {/* gobierno → gestión */}
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[0].angle, RING_1), polar(RING_MANAGEMENT[0].angle, RING_2), 0.12)} duration={1400} delay={120} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[1].angle, RING_1), polar(RING_MANAGEMENT[1].angle, RING_2), 0.12)} duration={1400} delay={200} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[2].angle, RING_1), polar(RING_MANAGEMENT[3].angle, RING_2), 0.12)} duration={1400} delay={280} />
        <AnimatedPath d={bezierBetween(polar(RING_GOVERNMENT[3].angle, RING_1), polar(RING_MANAGEMENT[4].angle, RING_2), 0.12)} duration={1400} delay={360} />
        {/* gestión → operación */}
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[0].angle, RING_2), polar(RING_OPERATION[1].angle, RING_3), 0.10)} duration={1400} delay={440} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[1].angle, RING_2), polar(RING_OPERATION[2].angle, RING_3), 0.10)} duration={1400} delay={520} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[2].angle, RING_2), polar(RING_OPERATION[4].angle, RING_3), 0.10)} duration={1400} delay={600} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[3].angle, RING_2), polar(RING_OPERATION[5].angle, RING_3), 0.10)} duration={1400} delay={680} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[4].angle, RING_2), polar(RING_OPERATION[6].angle, RING_3), 0.10)} duration={1400} delay={760} />
        <AnimatedPath d={bezierBetween(polar(RING_MANAGEMENT[5].angle, RING_2), polar(RING_OPERATION[7].angle, RING_3), 0.10)} duration={1400} delay={840} />
      </g>

      {/* Conexiones entre nodos contiguos del MISMO anillo · gestión + operación */}
      <g stroke="#363B68" strokeOpacity="0.45" strokeWidth="0.6" fill="none">
        {RING_MANAGEMENT.map((n, i) => {
          const next = RING_MANAGEMENT[(i + 1) % RING_MANAGEMENT.length];
          return (
            <AnimatedPath
              key={`mgmt-${i}`}
              d={bezierBetween(polar(n.angle, RING_2), polar(next.angle, RING_2), 0.06)}
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
              d={bezierBetween(polar(n.angle, RING_3), polar(next.angle, RING_3), 0.05)}
              duration={1200}
              delay={1240 + i * 40}
            />
          );
        })}
      </g>

      {/* Nodos · pintar al frente.
       * Spec D-final 2026-04-27: el "nodo central" simbólico (primary del
       * anillo de gobierno · "Dirección") se eleva a r=16 para anclar la
       * constelación visualmente. El resto de los nodos se mantienen IGUAL
       * (primary del resto = 5, secundarios = 3.2). El crecimiento es del
       * lienzo (viewBox 1200×880, radios 165/300/425), no del símbolo. */}
      {[...RING_GOVERNMENT, ...RING_MANAGEMENT, ...RING_OPERATION].map((n, i) => {
        const p = polar(n.angle, n.radius);
        // Nodo más grande SOLO el primary del anillo de gobierno (centro
        // simbólico de la constelación). Identificamos por radius === RING_1
        // y primary === true.
        const isHeart = n.primary === true && n.radius === RING_1;
        const r = isHeart ? 16 : n.primary ? 5 : 3.2;
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

      {/* Etiquetas micro · solo anillo externo (operación) para no saturar.
       * font-size 12→13 (Designer spec D-final 2026-04-27). Offset 14→18
       * para dar más aire en el lienzo XL. */}
      <g
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="13"
        fill="#7B82A6"
        style={{ letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
      >
        {RING_OPERATION.map((n, i) => {
          const p = polar(n.angle, n.radius + 18);
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
