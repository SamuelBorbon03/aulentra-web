"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * RitmoSemanal · Sección 6 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 * Sprint C · D-fix · 2026-04-27 · Sistema A — 3 glifos diferenciados por
 * presencia (mensaje · sesión 1:1 · clase virtual), mini-leyenda integrada
 * y tooltip HTML overlay con hit-area generoso. Reemplaza el patrón anterior
 * de puntos por tamaño/saturación variable.
 *
 * Glifos:
 *   · Mensaje      → círculo sólido φ=4   · ink @ 0.55
 *   · Sesión 1:1   → ring φ=8 + núcleo φ=2 · ink @ 0.7 / 0.9
 *   · Clase virtual→ sólido φ=10 + halo blur φ=22 · accent-cyan @ 0.85 / 0.18
 *
 * Tooltip:
 *   · DIV HTML overlay (no SVG) — permite pointer-events:none + overflow visible.
 *   · Hit-area rect transparente 24×24 dentro del <g> captura eventos.
 *   · Posicionamiento smart: si glifo en mitad izquierda del SVG → tooltip a
 *     la derecha; si en mitad derecha → a la izquierda. Centrado vertical.
 *   · Delays 120ms aparición / 80ms desaparición · fade 160/100ms.
 *
 * COPY PROVISIONAL · autorización Frontend D-bis (Samuel revisa):
 *   - Cita italic: composición editorial siguiendo tono Aulentra.
 *   - Mini-leyenda y tooltips: léxico que reconoce un formador real.
 */

// ─── Cita italic (provisional · autorización D-bis) ─────────────────────
const CITA = `Cuando enseñas por cuenta propia, el sistema deja de ser una herramienta y empieza a ser parte de cómo trabajas — los días en que todo fluye, y los días en que no.`;

// ─── Tipos de glifos (Sistema A) ────────────────────────────────────────
type GlyphType = "mensaje" | "sesion" | "clase";

interface GlyphMeta {
  /** Etiqueta breve mostrada en el tooltip (línea 1) */
  label: string;
  /** Detalle opcional (línea 2) */
  detail: string;
}

const GLYPH_META: Record<GlyphType, GlyphMeta> = {
  mensaje: {
    label: "Mensaje",
    detail: "Comunicación rápida con familias o estudiantes.",
  },
  sesion: {
    label: "Sesión 1:1",
    detail: "Encuentro individual con un estudiante.",
  },
  clase: {
    label: "Clase virtual",
    detail: "Clase con presencia ampliada — tu marca, tu subdominio.",
  },
};

interface Punto {
  /** Tipo de actividad — drives el glifo y el tooltip */ tipo: GlyphType;
}

// Patrón NO uniforme: L denso, M-J medio-alto, X ligero, V medio, S-D 1-2 puntos.
// Mezcla intencional de tipos por columna (no todos los días tienen clases).
const COLUMNAS: { dia: string; puntos: Punto[] }[] = [
  // Lunes · denso (5 puntos · 2 clases + 1 sesión + 2 mensajes)
  {
    dia: "L",
    puntos: [
      { tipo: "clase" },
      { tipo: "sesion" },
      { tipo: "mensaje" },
      { tipo: "clase" },
      { tipo: "mensaje" },
    ],
  },
  // Martes · medio-alto (4 puntos)
  {
    dia: "M",
    puntos: [
      { tipo: "mensaje" },
      { tipo: "clase" },
      { tipo: "mensaje" },
      { tipo: "sesion" },
    ],
  },
  // Miércoles · ligero (3 puntos)
  {
    dia: "X",
    puntos: [
      { tipo: "mensaje" },
      { tipo: "sesion" },
      { tipo: "mensaje" },
    ],
  },
  // Jueves · medio-denso (5 puntos)
  {
    dia: "J",
    puntos: [
      { tipo: "clase" },
      { tipo: "mensaje" },
      { tipo: "sesion" },
      { tipo: "mensaje" },
      { tipo: "clase" },
    ],
  },
  // Viernes · medio (4 puntos)
  {
    dia: "V",
    puntos: [
      { tipo: "clase" },
      { tipo: "mensaje" },
      { tipo: "sesion" },
      { tipo: "mensaje" },
    ],
  },
  // Sábado · 2 puntos
  {
    dia: "S",
    puntos: [
      { tipo: "mensaje" },
      { tipo: "mensaje" },
    ],
  },
  // Domingo · 1 punto
  {
    dia: "D",
    puntos: [
      { tipo: "mensaje" },
    ],
  },
];

// Distribución vertical por columna (spec): mapeo N → array de Y dentro del
// rango [80, 280] (spec) escalado al SVG (viewBox y=80..280 sobre H=360).
const Y_BY_COUNT: Record<number, number[]> = {
  1: [170],
  2: [120, 220],
  3: [100, 170, 240],
  4: [90, 150, 210, 270],
  5: [80, 130, 180, 230, 280],
};

// ─── viewBox SVG ────────────────────────────────────────────────────────
const SVG_VB_W = 720;
const SVG_VB_H = 360;
const COL_W = SVG_VB_W / COLUMNAS.length;

export function RitmoSemanal() {
  return (
    /* Atmósfera A+B+D · halo={false} — los glifos ⊕ ya atmosfera la sección. */
    <SectionWrapper tone="bg-deep" spacing="2xl" halo={false} className="border-t border-line-soft">
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

        {/* Diagrama ritmo */}
        <Reveal delay={240}>
          <div className="mt-20" data-provisional="tooltips-actividades">
            {/* Eyebrow contextual narrativo */}
            <div
              className="text-caption uppercase tracking-[0.32em] text-text-muted text-center mb-4"
              data-provisional="eyebrow-ritmo"
            >
              Una semana típica
            </div>
            <DiagramaRitmo />
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * Hover state con delays — resuelve intermitencia
 * ────────────────────────────────────────────────────────────────────*/
interface HoverTarget { col: number; pt: number; }

function useHoverWithDelay() {
  const [active, setActive] = useState<HoverTarget | null>(null);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);

  const cancelTimers = () => {
    if (enterTimer.current !== null) { window.clearTimeout(enterTimer.current); enterTimer.current = null; }
    if (leaveTimer.current !== null) { window.clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  };

  const onEnter = (t: HoverTarget) => {
    cancelTimers();
    enterTimer.current = window.setTimeout(() => setActive(t), 120);
  };

  const onLeave = () => {
    cancelTimers();
    leaveTimer.current = window.setTimeout(() => setActive(null), 80);
  };

  // Cleanup en unmount
  useEffect(() => () => cancelTimers(), []);

  return { active, onEnter, onLeave };
}

/* ─────────────────────────────────────────────────────────────────────
 * DiagramaRitmo
 * ────────────────────────────────────────────────────────────────────*/
function DiagramaRitmo() {
  const reduceMotion = usePrefersReducedMotion();
  const { active, onEnter, onLeave } = useHoverWithDelay();

  return (
    <div
      className="relative mx-auto"
      style={{ width: "100%", maxWidth: "clamp(480px, 80vw, 880px)" }}
    >
      {/* SVG con overflow visible para que el tooltip pueda salir si fuera necesario */}
      <svg
        role="img"
        aria-label="Distribución semanal de actividades del formador a lo largo de los siete días"
        viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`}
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Halo radial para clase virtual · accent-cyan @ 0.18 → 0 */}
          <radialGradient id="halo-clase" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#67E8F9" stopOpacity="0.28" />
            <stop offset="60%"  stopColor="#67E8F9" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Línea base */}
        <line
          x1={0}
          y1={SVG_VB_H - 30}
          x2={SVG_VB_W}
          y2={SVG_VB_H - 30}
          stroke="#363B68"
          strokeOpacity="0.45"
          strokeWidth="0.6"
        />

        {COLUMNAS.map((col, ci) => {
          const cx = ci * COL_W + COL_W / 2;
          const ys = Y_BY_COUNT[col.puntos.length] ?? [];

          return (
            <g key={ci}>
              {/* Etiqueta del día */}
              <text
                x={cx}
                y={SVG_VB_H - 8}
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
                const cy = ys[pi];
                const isHover = active?.col === ci && active?.pt === pi;
                const meta = GLYPH_META[p.tipo];
                return (
                  <g
                    key={pi}
                    role="group"
                    aria-label={`${meta.label} · ${col.dia}`}
                    tabIndex={0}
                    onMouseEnter={() => onEnter({ col: ci, pt: pi })}
                    onMouseLeave={onLeave}
                    onFocus={() => onEnter({ col: ci, pt: pi })}
                    onBlur={onLeave}
                    style={{ cursor: "default", outline: "none" }}
                  >
                    {/* Refuerzo opcional: línea vertical sutil al header del día durante hover */}
                    {isHover && (
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={SVG_VB_H - 22}
                        stroke="#7B82A6"
                        strokeOpacity="0.30"
                        strokeWidth="0.6"
                      />
                    )}

                    <Glyph type={p.tipo} cx={cx} cy={cy} hover={isHover} reduceMotion={reduceMotion} />

                    {/* Hit-area generoso · 24×24 transparente captura eventos */}
                    <rect
                      x={cx - 12}
                      y={cy - 12}
                      width={24}
                      height={24}
                      fill="transparent"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Mini-leyenda integrada · bottom-right · alineada al último día (Domingo) */}
        <LeyendaIntegrada />
      </svg>

      {/* Tooltip HTML overlay (fuera del SVG para pointer-events:none + overflow libre) */}
      <TooltipOverlay active={active} reduceMotion={reduceMotion} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * Glyph · 3 tipos diferenciados por presencia (Sistema A)
 * ────────────────────────────────────────────────────────────────────*/
interface GlyphProps {
  type: GlyphType;
  cx: number;
  cy: number;
  hover: boolean;
  reduceMotion: boolean;
}

function Glyph({ type, cx, cy, hover, reduceMotion }: GlyphProps) {
  const transition = reduceMotion
    ? "none"
    : "all 200ms cubic-bezier(0.22, 0.61, 0.36, 1)";

  if (type === "mensaje") {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={hover ? 2.5 : 2}
        fill="#ECEEF8"
        opacity={hover ? 0.85 : 0.55}
        style={{ transition }}
      />
    );
  }

  if (type === "sesion") {
    return (
      <g>
        {/* Ring exterior φ=8 */}
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="none"
          stroke="#ECEEF8"
          strokeOpacity={hover ? 0.95 : 0.7}
          strokeWidth={1}
          style={{ transition }}
        />
        {/* Núcleo sólido φ=2 */}
        <circle
          cx={cx}
          cy={cy}
          r={1}
          fill="#ECEEF8"
          opacity={hover ? 1 : 0.9}
          style={{ transition }}
        />
      </g>
    );
  }

  // clase virtual · sólido φ=10 + halo radial blur φ=22
  return (
    <g>
      {/* Halo radial · offset Y -1 (compensación perceptual) */}
      <circle
        cx={cx}
        cy={cy - 1}
        r={11}
        fill="url(#halo-clase)"
        opacity={hover ? 1 : 0.7}
        style={{ transition }}
      />
      {/* Glifo principal */}
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#67E8F9"
        opacity={hover ? 1 : 0.85}
        style={{ transition }}
      />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * Mini-leyenda integrada · bottom-right · debajo del último día
 * Layout vertical 3 filas · spacing 14px · glifo + label
 * ────────────────────────────────────────────────────────────────────*/
function LeyendaIntegrada() {
  // Posición: lado derecho del SVG, alineada bajo Domingo
  // Coordenada base: x=SVG_VB_W - 110, y=20 (parte superior derecha)
  // Decisión: la dejamos arriba-derecha para no chocar con la línea base
  // y los días, manteniendo el lado derecho como contrato visual.
  const baseX = SVG_VB_W - 130;
  const baseY = 20;
  const rowGap = 18;

  const rows: { type: GlyphType; label: string }[] = [
    { type: "mensaje", label: "Mensaje" },
    { type: "sesion",  label: "Sesión 1:1" },
    { type: "clase",   label: "Clase virtual" },
  ];

  return (
    <g role="group" aria-label="Leyenda del ritmo semanal">
      {/* Borde superior sutil */}
      <line
        x1={baseX - 6}
        y1={baseY - 8}
        x2={baseX + 124}
        y2={baseY - 8}
        stroke="#272B50"
        strokeOpacity="0.4"
        strokeWidth="0.6"
      />
      {rows.map((r, i) => {
        const y = baseY + i * rowGap;
        return (
          <g key={r.type}>
            {/* Glifo a escala compacta (no hover) — duplicamos formas para
                evitar dependencia con estado hover */}
            <LegendGlyph type={r.type} cx={baseX} cy={y} />
            <text
              x={baseX + 14}
              y={y + 3}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="10"
              fontWeight="500"
              fill="#7B82A6"
              opacity={0.85}
              style={{ letterSpacing: "0.06em" }}
            >
              {r.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function LegendGlyph({ type, cx, cy }: { type: GlyphType; cx: number; cy: number }) {
  if (type === "mensaje") {
    return <circle cx={cx} cy={cy} r={2} fill="#ECEEF8" opacity={0.55} />;
  }
  if (type === "sesion") {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="none" stroke="#ECEEF8" strokeOpacity={0.7} strokeWidth={1} />
        <circle cx={cx} cy={cy} r={1} fill="#ECEEF8" opacity={0.9} />
      </g>
    );
  }
  return (
    <g>
      <circle cx={cx} cy={cy - 1} r={9} fill="url(#halo-clase)" opacity={0.7} />
      <circle cx={cx} cy={cy} r={4} fill="#67E8F9" opacity={0.85} />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * TooltipOverlay · DIV HTML posicionado absoluto sobre el wrapper
 * Sale del SVG para evitar overflow:hidden y permitir pointer-events:none.
 * ────────────────────────────────────────────────────────────────────*/
function TooltipOverlay({
  active,
  reduceMotion,
}: {
  active: HoverTarget | null;
  reduceMotion: boolean;
}) {
  // Mantener el último target visible durante el fade-out
  const [render, setRender] = useState<HoverTarget | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setRender(active);
      // Force next frame to apply visible class for fade-in
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      // Esperar fade-out antes de desmontar contenido
      const t = window.setTimeout(() => setRender(null), 120);
      return () => window.clearTimeout(t);
    }
  }, [active]);

  if (!render) return null;

  const col = COLUMNAS[render.col];
  const punto = col.puntos[render.pt];
  const meta = GLYPH_META[punto.tipo];

  // Posición lógica del glifo en el viewBox
  const cxVB = render.col * COL_W + COL_W / 2;
  const cyVB = (Y_BY_COUNT[col.puntos.length] ?? [])[render.pt];

  // Convertir a porcentaje del viewBox para posicionar el tooltip overlay
  const xPct = (cxVB / SVG_VB_W) * 100;
  const yPct = (cyVB / SVG_VB_H) * 100;

  // Smart positioning: si glifo en mitad izq → tooltip a la derecha, y viceversa
  const placeRight = cxVB < SVG_VB_W * 0.5;

  // Offset horizontal del tooltip respecto al punto (en px del wrapper)
  // 14px hacia el lado opuesto al apuntador
  const transformX = placeRight ? "translate(14px, -50%)" : "translate(calc(-100% - 14px), -50%)";

  // Animación entrada: fade + translateX desde el lado opuesto al apuntador
  const enterTranslate = placeRight ? "-4px" : "4px";

  return (
    <div
      role="tooltip"
      aria-live="polite"
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: transformX,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: reduceMotion
          ? "none"
          : visible
            ? "opacity 160ms cubic-bezier(0.22, 0.61, 0.36, 1)"
            : "opacity 100ms ease-out",
        zIndex: 1000,
        maxWidth: 220,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(16, 19, 40, 0.96)",
          border: "1px solid rgba(54, 59, 104, 0.5)",
          borderRadius: 4,
          padding: "8px 12px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
          // Translate de entrada: empieza desplazado hacia el lado opuesto
          marginLeft: visible ? 0 : enterTranslate,
          transition: reduceMotion
            ? "none"
            : "margin-left 160ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {/* Triángulo apuntador */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            [placeRight ? "left" : "right"]: -6,
            transform: "translateY(-50%) rotate(45deg)",
            width: 8,
            height: 8,
            background: "rgba(16, 19, 40, 0.96)",
            borderTop: placeRight ? "none" : "1px solid rgba(54, 59, 104, 0.5)",
            borderRight: placeRight ? "none" : "1px solid rgba(54, 59, 104, 0.5)",
            borderLeft: placeRight ? "1px solid rgba(54, 59, 104, 0.5)" : "none",
            borderBottom: placeRight ? "1px solid rgba(54, 59, 104, 0.5)" : "none",
          }}
        />
        <div
          className="text-caption"
          style={{
            color: "#ECEEF8",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {meta.label}
        </div>
        <div
          style={{
            color: "rgba(236, 238, 248, 0.65)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          {meta.detail}
        </div>
      </div>
    </div>
  );
}
