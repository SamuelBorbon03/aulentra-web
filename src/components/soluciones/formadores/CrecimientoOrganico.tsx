"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedPath } from "../shared/AnimatedPath";

/**
 * CrecimientoOrganico · Sección 4 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * Headline + 3 momentos + curva Bezier ascendente con 4 hitos sobre la curva
 * (etiquetas verticales del SPEC: 30 / 80 / 180 / 300+). `+` editorial al
 * final + curva continúa más allá del frame con stroke-dasharray. Fill
 * gradient sutil debajo de la curva. Trazado animado 1600ms.
 *
 * Sprint C · D-fix · 2026-04-27 · viewBox ampliado lateralmente
 * (1000→1080, 320→340) para que la etiqueta "300+" y su caption
 * "ESTUDIANTES" no se corten contra el borde derecho. Coordenadas
 * de curva, hitos y `+` editorial mantenidas.
 *
 * Sprint C · D-fix · 2026-04-27 · viewBox ampliado verticalmente
 * por arriba (y=0 → y=-30, height 340 → 380) para que la etiqueta
 * "300+" del último hito (y=30, fontSize 22) no se corte contra el
 * borde superior. Coordenadas internas no cambian; solo el viewBox
 * gana margen superior.
 */
const MOMENTOS = [
  {
    head: "Empiezas en solitario.",
    body: "Tú eres el sistema completo.",
  },
  {
    head: "Crece tu base.",
    body:
      "Más estudiantes, más programas, más comunicación con familias. El sistema sostiene la carga.",
  },
  {
    head: "Si algún día tu práctica se vuelve institución",
    body: "Aulentra ya tiene esa lógica esperándote — sin migrar de plataforma.",
  },
] as const;

const CURVE_D =
  "M 40 280 C 200 270, 300 240, 420 200 S 640 130, 760 90 S 920 50, 980 30";
const CURVE_FILL_D =
  "M 40 280 C 200 270, 300 240, 420 200 S 640 130, 760 90 S 920 50, 980 30 L 980 320 L 40 320 Z";

const HITOS = [
  { x: 200, y: 269, label: "30" },
  { x: 420, y: 199, label: "80" },
  { x: 760, y: 90,  label: "180" },
  { x: 980, y: 30,  label: "300+" },
];

export function CrecimientoOrganico() {
  return (
    /* Atmósfera A+B+D · halo={false} — la curva Bezier ⊕ ya provee atmosphere. */
    <SectionWrapper tone="bg-deep" spacing="2xl" halo={false} className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
            <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
              Escala
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[920px]">
            Treinta estudiantes hoy. Trescientos el próximo año. El mismo sistema.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-12 max-w-[760px]">
            Aulentra es la herramienta para tu práctica actual y para la práctica en la que te vas a convertir.
          </p>
        </Reveal>

        {/* Curva */}
        <Reveal delay={260}>
          <CurvaCrecimiento />
        </Reveal>

        {/* 3 momentos · grid 1×3 */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 border-t border-line-soft pt-12">
          {MOMENTOS.map((m, i) => (
            <Reveal key={m.head} delay={340 + i * 80}>
              <div>
                <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                  {m.head}
                </h3>
                <p className="text-body text-text-muted leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function CurvaCrecimiento() {
  return (
    <svg
      role="img"
      aria-label="Curva orgánica de crecimiento de la práctica formativa con cuatro hitos · 30, 80, 180 y más de 300 estudiantes"
      viewBox="0 -30 1080 380"
      className="w-full h-auto"
      style={{ maxWidth: 1080 }}
    >
      <defs>
        <linearGradient id="curve-fill" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0" />
          <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="curve-stroke" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.65" />
          <stop offset="60%"  stopColor="#7DD3FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Fill bajo la curva */}
      <path d={CURVE_FILL_D} fill="url(#curve-fill)" />

      {/* Curva principal · animada */}
      <AnimatedPath
        d={CURVE_D}
        stroke="url(#curve-stroke)"
        strokeWidth="1.75"
        fill="none"
        duration={1600}
        delay={0}
        strokeLinecap="round"
      />

      {/* Continuación dashed más allá del frame */}
      <path
        d="M 980 30 C 1000 22, 1010 18, 1020 14"
        stroke="#67E8F9"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hitos */}
      {HITOS.map((h, i) => (
        <g key={i}>
          {/* Línea vertical guía sutil */}
          <line
            x1={h.x}
            y1={h.y + 6}
            x2={h.x}
            y2={310}
            stroke="#363B68"
            strokeOpacity="0.45"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          {/* Punto */}
          <circle cx={h.x} cy={h.y} r="5" fill="#A5B4FC" />
          <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="#A5B4FC" strokeOpacity="0.30" />
          {/* Etiqueta */}
          <text
            x={h.x}
            y={h.y - 18}
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            fontSize="22"
            fontWeight="200"
            fill="#ECEEF8"
            style={{ letterSpacing: "-0.05em" }}
          >
            {h.label}
          </text>
          {/* Caption "estudiantes" solo bajo el primer y último hito */}
          {(i === 0 || i === HITOS.length - 1) && (
            <text
              x={h.x}
              y={310 - 4}
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              fontWeight="500"
              fill="#7B82A6"
              style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              ESTUDIANTES
            </text>
          )}
        </g>
      ))}

      {/* `+` editorial al final */}
      <text
        x="1010"
        y="14"
        textAnchor="end"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontSize="34"
        fontWeight="200"
        fill="#67E8F9"
        fillOpacity="0.85"
        style={{ letterSpacing: "-0.05em" }}
      >
        +
      </text>
    </svg>
  );
}
