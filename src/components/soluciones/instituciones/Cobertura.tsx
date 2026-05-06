import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Cobertura · Sección 4 de /soluciones/instituciones.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * 5 cards de procesos + 1 celda visual decorativa, grid 2×3 (md+).
 * Cada card lleva un micro-diagrama SVG inline 96×96 stroke 1px que evoca
 * la naturaleza del proceso (admisión → puerta · gestión → trama · evaluación
 * → check repetido · comunicación → flujo · reportes → barras + cumbre).
 *
 * VERIFICAR con Samuel (marcado inline):
 *   · Card "Admisiones" — alcance real del módulo.
 *   · Card "Reportes y dirección" — nivel de reporting actual vs futuro.
 */
const PROCESOS = [
  {
    id: "admisiones",
    title: "Admisiones",
    body:
      "Recibe candidatos, organiza información de aspirantes y cierra el ciclo de ingreso sin hojas sueltas.",
    icon: AdmisionesGlyph,
    verify:
      "VERIFICAR con Samuel: alcance real del módulo de admisiones (¿captura web? ¿flujo de aprobación? ¿integración con tesorería?).",
  },
  {
    id: "gestion",
    title: "Gestión académica",
    body:
      "Programas, asignaturas, cohortes y planificación, conectados al equipo docente desde el primer día.",
    icon: GestionGlyph,
  },
  {
    id: "evaluacion",
    title: "Evaluación y seguimiento",
    body:
      "El docente registra. La coordinación supervisa. La dirección consulta. Sin duplicar información.",
    icon: EvaluacionGlyph,
  },
  {
    id: "comunicacion",
    title: "Comunicación con acudientes",
    body:
      "Las familias acceden a lo que les corresponde sobre sus estudiantes — sin mensajes dispersos en canales informales.",
    icon: ComunicacionGlyph,
  },
  {
    id: "reportes",
    title: "Reportes y dirección",
    body:
      "La capa directiva ve lo que está pasando en la institución sin pedirlo a tres áreas distintas.",
    icon: ReportesGlyph,
    verify:
      "VERIFICAR con Samuel: nivel real de reporting actual vs lo que se promete aquí.",
  },
] as const;

export function Cobertura() {
  return (
    /* Atmósfera A+B+D · halo="default" — refuerzo medio del scroll. */
    <SectionWrapper tone="bg-deep" spacing="2xl" halo="default" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
            <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
              Cobertura
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[840px]">
            De la admisión al reporte final. En un solo lugar.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[680px]">
            El año académico no son módulos separados. Aulentra los conecta.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESOS.map((p, i) => {
            const Glyph = p.icon;
            return (
              <Reveal key={p.id} delay={260 + i * 70}>
                <article className="group relative h-full rounded-lg bg-card border border-line-soft hover:border-line-strong p-7 transition-colors">
                  {/* VERIFICAR inline */}
                  {"verify" in p && p.verify && (
                    <span className="sr-only" data-verify-with-samuel>
                      {p.verify}
                    </span>
                  )}
                  {/* glyph 96×96 esquina superior */}
                  <div className="mb-6 text-text-subtle group-hover:text-primary transition-colors">
                    <Glyph />
                  </div>
                  <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-body text-text-muted leading-relaxed">{p.body}</p>
                </article>
              </Reveal>
            );
          })}

          {/* Celda visual decorativa · 6ª posición · resumen tipográfico */}
          <Reveal delay={260 + PROCESOS.length * 70}>
            <div
              className="relative h-full rounded-lg overflow-hidden p-7 border border-line-soft"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(165,180,252,0.10) 0%, rgba(103,232,249,0.04) 45%, transparent 75%)",
              }}
            >
              <ConexionGlyph />
              <div className="mt-4 text-caption-mono-xs text-text-subtle uppercase">
                El mismo sistema
              </div>
              <p className="mt-2 font-serif italic text-text-default text-h3 leading-snug">
                Cinco procesos. Un solo lugar donde existen.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Glyphs · 96×96 · stroke 1px · uso en composición Cobertura
 * ─────────────────────────────────────────────────────────────────*/

const G_W = 64; // ancho lógico interno
const GLYPH_PROPS = {
  width: 64,
  height: 64,
  viewBox: "0 0 64 64",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function AdmisionesGlyph() {
  // entrada institucional · marco con puerta abierta + flecha entrante
  return (
    <svg {...GLYPH_PROPS}>
      <rect x="14" y="12" width="36" height="40" rx="2" />
      <path d="M 32 12 L 32 52" />
      <path d="M 24 32 L 32 32" />
      <path d="M 4 32 L 14 32 M 9 27 L 14 32 L 9 37" strokeOpacity="0.65" />
      <circle cx="42" cy="32" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GestionGlyph() {
  // trama de columnas + cohortes
  return (
    <svg {...GLYPH_PROPS}>
      <rect x="10" y="14" width="44" height="36" rx="1.5" />
      <path d="M 10 24 L 54 24" />
      <path d="M 22 14 L 22 50" strokeOpacity="0.55" />
      <path d="M 32 14 L 32 50" strokeOpacity="0.55" />
      <path d="M 42 14 L 42 50" strokeOpacity="0.55" />
      <circle cx="16" cy="32" r="1.4" fill="currentColor" />
      <circle cx="27" cy="32" r="1.4" fill="currentColor" />
      <circle cx="37" cy="32" r="1.4" fill="currentColor" />
      <circle cx="48" cy="32" r="1.4" fill="currentColor" />
      <circle cx="16" cy="42" r="1.4" fill="currentColor" />
      <circle cx="27" cy="42" r="1.4" fill="currentColor" />
      <circle cx="37" cy="42" r="1.4" fill="currentColor" />
    </svg>
  );
}

function EvaluacionGlyph() {
  // 3 líneas de seguimiento · check al final de la 3ª
  return (
    <svg {...GLYPH_PROPS}>
      <path d="M 10 18 L 50 18" />
      <path d="M 10 30 L 50 30" />
      <path d="M 10 42 L 42 42" />
      <path d="M 14 14 L 14 22" strokeOpacity="0.55" />
      <path d="M 14 26 L 14 34" strokeOpacity="0.55" />
      <path d="M 14 38 L 14 46" strokeOpacity="0.55" />
      <path d="M 46 38 L 50 42 L 56 36" strokeWidth="1.4" />
    </svg>
  );
}

function ComunicacionGlyph() {
  // 2 nodos + flujo Bezier conectándolos
  return (
    <svg {...GLYPH_PROPS}>
      <circle cx="14" cy="32" r="5" />
      <circle cx="50" cy="32" r="5" />
      <path d="M 19 32 Q 32 18 45 32" strokeOpacity="0.85" />
      <path d="M 19 32 Q 32 46 45 32" strokeOpacity="0.45" strokeDasharray="2 2" />
    </svg>
  );
}

function ReportesGlyph() {
  // barras ascendentes · cumbre
  return (
    <svg {...GLYPH_PROPS}>
      <path d="M 10 50 L 54 50" />
      <rect x="14" y="36" width="6" height="14" />
      <rect x="24" y="28" width="6" height="22" />
      <rect x="34" y="20" width="6" height="30" />
      <rect x="44" y="14" width="6" height="36" />
      <path d="M 10 14 L 14 14" strokeOpacity="0.45" />
    </svg>
  );
}

function ConexionGlyph() {
  // nodo central + 5 satélites con líneas Bezier
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      aria-hidden="true"
      className="text-primary"
    >
      <g stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4">
        <path d="M 90 60 Q 60 35 30 28" />
        <path d="M 90 60 Q 130 30 158 22" />
        <path d="M 90 60 Q 50 80 22 90" />
        <path d="M 90 60 Q 130 90 158 96" />
        <path d="M 90 60 Q 90 35 90 14" />
      </g>
      <circle cx="90" cy="60" r="4" fill="currentColor" />
      <g fill="currentColor" fillOpacity="0.7">
        <circle cx="30" cy="28" r="2.4" />
        <circle cx="158" cy="22" r="2.4" />
        <circle cx="22" cy="90" r="2.4" />
        <circle cx="158" cy="96" r="2.4" />
        <circle cx="90" cy="14" r="2.4" />
      </g>
    </svg>
  );
}

// keep G_W reference quiet (used implicitly via viewBox 0 0 64 64)
void G_W;
