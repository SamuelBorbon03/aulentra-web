"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * SistemaRoles · Sección 3 de /soluciones/instituciones.
 *
 * Sprint atmósfera · Estratos editoriales · 2026-04-28 · REEMPLAZO TOTAL.
 * Designer + Samuel descartaron el iceberg orgánico (silueta Bezier única) por
 * lectura ambigua. Esta versión implementa la spec híbrida P1 + columna Función
 * de P5 — entregada y validada por Samuel:
 *
 *   · Cinco bandas tipográficas separadas por reglas horizon (gradient
 *     horizontal token bg-horizon-fade-h).
 *   · Grid 12 columnas en desktop: numeral · zona+roles · función · anotación.
 *   · Banda OPERACIÓN como "corazón del sistema": tipografía display,
 *     halo radial cyan latido (heartbeat-cyan) local a la banda.
 *   · Regla "waterline" entre II y III: única regla con glow cyan superpuesto.
 *   · Anotaciones laterales LO VISIBLE (banda I) y LO PROFUNDO (banda IV).
 *   · "+ Activar nueva capa" en cursiva al final.
 *
 * Modelo de roles · validado por Samuel:
 *   I.   GOBIERNO          → Junta directiva · Rectoría · Auditoría    · DIRECCIÓN
 *   II.  GESTIÓN ACADÉMICA → Coordinación · Tutoría · Programas         · COORDINACIÓN
 *   III. OPERACIÓN ◉       → Docentes · Estudiantes · Acudientes        · PEDAGOGÍA
 *   IV.  COMUNIDAD         → Bienestar · Soporte                        · ACOMPAÑAMIENTO
 *   V.   DATOS             → Infraestructura · Reportes                 · OBSERVACIÓN
 *
 * Atmósfera: SectionWrapper.halo sigue `false` (no toca el sistema A+B+D).
 * El halo cyan vive LOCAL a la banda III via clase `.banda-core` definida
 * en globals.css (animación heartbeat-cyan 2.4s loop).
 *
 * Animación: stagger 180ms top→bottom (entrada por banda + regla inferior),
 * cubic-bezier(0.22, 0.61, 0.36, 1), 720ms cada banda. "+ Activar nueva capa"
 * fade 1200ms con delay 1100ms. Heartbeat halo: loop infinito 2.4s.
 *
 * MANTIENE: eyebrow + headline + subhead + bloque "Capas del sistema" +
 * grid 3 BLOCKS final.
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
    /* halo={false} mantenido (sprint atmósfera A+B+D · 2026-04-28).
       La banda III gestiona su propio halo cyan local. */
    <SectionWrapper tone="bg" spacing="2xl" halo={false} className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
            <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
              El Sistema
            </span>
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

        <Reveal delay={240}>
          <div className="mb-8">
            <div className="text-caption-mono-xs text-text-muted uppercase">
              Capas del sistema
            </div>
            <p className="mt-2 font-serif italic text-caption text-text-subtle">
              Lo visible es solo una parte. El sistema sostiene también lo que no se ve.
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <Estratos />
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
 * Datos · ZONES (inline · validado por Samuel · modelo B)
 * ─────────────────────────────────────────────────────────────────*/

type SideAnnotation =
  | { kind: "visible-marker"; text: "── LO VISIBLE" }
  | { kind: "profundo-marker"; text: "── LO PROFUNDO" }
  | { kind: "core"; text: "◉ corazón del sistema" }
  | null;

interface Zone {
  numeral: "I" | "II" | "III" | "IV" | "V";
  label: string;
  roles: string[];
  funcion: string;
  sideAnnotation: SideAnnotation;
  isCore: boolean;
}

const ZONES: Zone[] = [
  {
    numeral: "I",
    label: "GOBIERNO",
    roles: ["Junta directiva", "Rectoría", "Auditoría"],
    funcion: "DIRECCIÓN",
    sideAnnotation: { kind: "visible-marker", text: "── LO VISIBLE" },
    isCore: false,
  },
  {
    numeral: "II",
    label: "GESTIÓN ACADÉMICA",
    roles: ["Coordinación", "Tutoría", "Programas"],
    funcion: "COORDINACIÓN",
    sideAnnotation: null,
    isCore: false,
  },
  {
    numeral: "III",
    label: "OPERACIÓN",
    roles: ["Docentes", "Estudiantes", "Acudientes"],
    funcion: "PEDAGOGÍA",
    sideAnnotation: { kind: "core", text: "◉ corazón del sistema" },
    isCore: true,
  },
  {
    numeral: "IV",
    label: "COMUNIDAD",
    roles: ["Bienestar", "Soporte"],
    funcion: "ACOMPAÑAMIENTO",
    sideAnnotation: { kind: "profundo-marker", text: "── LO PROFUNDO" },
    isCore: false,
  },
  {
    numeral: "V",
    label: "DATOS",
    roles: ["Infraestructura", "Reportes"],
    funcion: "OBSERVACIÓN",
    sideAnnotation: null,
    isCore: false,
  },
];

/* Tiempos · stagger entrada y "+ Activar nueva capa" */
const STAGGER_MS = 180;
const BAND_DURATION_MS = 720;
const ACTIVAR_DELAY_MS = 5 * STAGGER_MS + 200; // 1100ms (5 bandas terminan stagger)
const ACTIVAR_DURATION_MS = 1200;
const EASE_OUT = "cubic-bezier(0.22, 0.61, 0.36, 1)";

/* ─────────────────────────────────────────────────────────────────
 * <Estratos /> — orquesta bandas + reglas horizon + activar nueva capa
 * ─────────────────────────────────────────────────────────────────*/
function Estratos() {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={ref} role="group" aria-label="Cinco capas del sistema institucional">
      {/* Regla horizon antes de la primera banda */}
      <HorizonRule
        kind="default"
        active={active}
        reduceMotion={reduceMotion}
        delayMs={0}
      />

      {ZONES.map((zone, i) => {
        const bandDelay = reduceMotion ? 0 : i * STAGGER_MS;
        // La regla bajo cada banda aparece sincronizada con la banda inferior:
        // - regla bajo banda i = aparece junto con banda i (entra al mismo tiempo)
        const ruleDelay = reduceMotion ? 0 : i * STAGGER_MS;
        // Excepción: la regla entre II y III (i=1, divisor inferior de banda II)
        // es la "waterline" — visualmente más cargada.
        const isWaterlineDivider = i === 1;

        return (
          <div key={zone.numeral}>
            <EstratoBand
              zone={zone}
              active={active}
              reduceMotion={reduceMotion}
              delayMs={bandDelay}
            />
            <HorizonRule
              kind={isWaterlineDivider ? "waterline" : "default"}
              active={active}
              reduceMotion={reduceMotion}
              delayMs={ruleDelay}
            />
          </div>
        );
      })}

      {/* "+ Activar nueva capa" — fade lento al final */}
      <p
        className="mt-12 text-center font-serif italic text-text-subtle"
        style={{
          fontSize: "14px",
          letterSpacing: "0.02em",
          opacity: active ? 1 : 0,
          transition: reduceMotion
            ? "opacity 300ms ease"
            : `opacity ${ACTIVAR_DURATION_MS}ms ${EASE_OUT} ${ACTIVAR_DELAY_MS}ms`,
        }}
      >
        + Activar nueva capa
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * <HorizonRule /> — regla horizontal con gradient horizon-fade-h.
 * Variante "waterline" superpone glow cyan blur 2px (entre banda II y III).
 * ─────────────────────────────────────────────────────────────────*/
function HorizonRule({
  kind,
  active,
  reduceMotion,
  delayMs,
}: {
  kind: "default" | "waterline";
  active: boolean;
  reduceMotion: boolean;
  delayMs: number;
}) {
  const transition = reduceMotion
    ? "opacity 300ms ease"
    : `opacity ${BAND_DURATION_MS}ms ${EASE_OUT} ${delayMs}ms`;

  if (kind === "waterline") {
    return (
      <div
        className="relative h-px w-full"
        aria-hidden="true"
        style={{
          opacity: active ? 1 : 0,
          transition,
        }}
      >
        <div className="absolute inset-0 bg-horizon-fade-h opacity-[0.45]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 30%, rgb(91 196 255 / 0.32) 50%, transparent 70%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="h-px w-full bg-horizon-fade-h opacity-[0.45]"
      aria-hidden="true"
      style={{
        opacity: active ? 0.45 : 0,
        transition,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
 * <EstratoBand /> — una banda completa.
 * Desktop: grid 12 cols (numeral · zona+roles · función · anotación).
 * Mobile: flex column con numeral+función en primera fila.
 * Banda core (III): clase `banda-core` activa halo radial cyan local.
 * ─────────────────────────────────────────────────────────────────*/
function EstratoBand({
  zone,
  active,
  reduceMotion,
  delayMs,
}: {
  zone: Zone;
  active: boolean;
  reduceMotion: boolean;
  delayMs: number;
}) {
  const transition = reduceMotion
    ? "opacity 300ms ease"
    : `opacity ${BAND_DURATION_MS}ms ${EASE_OUT} ${delayMs}ms, transform ${BAND_DURATION_MS}ms ${EASE_OUT} ${delayMs}ms`;

  // Spacing vertical · banda core levanta padding (py-12 mobile / py-16 desktop)
  const paddingClass = zone.isCore
    ? "py-10 md:py-12 lg:py-16"
    : "py-8 md:py-9 lg:py-11";

  // Wrapper aplica `banda-core` solo cuando isCore (halo CSS local).
  const wrapperClass = [
    "relative isolate",
    paddingClass,
    zone.isCore ? "banda-core" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Numeral · banda core mayor presencia (text-default vs text-subtle)
  const numeralClass = zone.isCore
    ? "font-serif font-normal text-[28px] md:text-[34px] leading-none tracking-[0.02em] text-text-default"
    : "font-serif font-normal text-[24px] md:text-[28px] leading-none tracking-[0.02em] text-text-subtle";

  // Render zona+roles. Banda core usa display-xs sans (titular). Resto: caption-mono uppercase (etiqueta).
  const labelNode = zone.isCore ? (
    <span className="text-display-sm md:text-display-xs uppercase text-text-strong">
      {zone.label}
    </span>
  ) : (
    <span className="font-mono text-caption-mono uppercase text-text-strong">
      {zone.label}
    </span>
  );

  // Roles continuos con middle-dot literal (espacio + U+00B7 + espacio).
  const rolesString = zone.roles.join("  ·  ");

  // Margin entre label y roles: banda core mt-5, resto mt-3.
  const rolesMarginClass = zone.isCore ? "mt-5" : "mt-3";

  // Función · banda core caption-mono-sm text-muted; resto caption-mono-xs text-subtle.
  const funcionClass = zone.isCore
    ? "font-mono text-caption-mono-sm uppercase text-text-muted"
    : "font-mono text-caption-mono-xs uppercase text-text-subtle";

  return (
    <div
      className={wrapperClass}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition,
      }}
    >
      {/* Mobile · primera fila numeral + función (baseline align) */}
      <div className="flex justify-between items-baseline md:hidden">
        <div className={numeralClass}>{zone.numeral}</div>
        <div className={funcionClass}>{zone.funcion}</div>
      </div>

      {/* Mobile · zona + roles (full width) */}
      <div className="mt-3 md:hidden">
        <div>{labelNode}</div>
        <p className={`${rolesMarginClass} text-body-soft text-text-muted`}>
          {rolesString}
        </p>
      </div>

      {/* Mobile · anotación lateral (al final del stack) */}
      {zone.sideAnnotation && (
        <div className="mt-3 md:hidden">
          <SideAnnotation annotation={zone.sideAnnotation} />
        </div>
      )}

      {/* Desktop · grid 12 cols */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-x-6 md:items-start">
        {/* Numeral · col 1 */}
        <div className={`${numeralClass} md:col-span-1`}>{zone.numeral}</div>

        {/* Zona + roles · col 6 */}
        <div className="md:col-span-6">
          <div>{labelNode}</div>
          <p className={`${rolesMarginClass} text-body-soft text-text-muted`}>
            {rolesString}
          </p>
        </div>

        {/* Función · col 2 */}
        <div className={`${funcionClass} md:col-span-2`}>{zone.funcion}</div>

        {/* Anotación lateral · col 3 */}
        <div className="md:col-span-3">
          {zone.sideAnnotation && (
            <SideAnnotation annotation={zone.sideAnnotation} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * <SideAnnotation /> — anotación lateral derecha.
 * Tres variantes: visible-marker (banda I) · profundo-marker (banda IV) ·
 * core (banda III, italic con glifo ◉ U+25C9).
 * ─────────────────────────────────────────────────────────────────*/
function SideAnnotation({ annotation }: { annotation: NonNullable<SideAnnotation> }) {
  if (annotation.kind === "core") {
    // ◉ glifo Unicode aprobado puntualmente por Samuel (carga semántica).
    // NO sienta precedente para emojis arbitrarios en otras piezas.
    return (
      <span className="font-serif italic text-[13px] leading-tight text-text-muted">
        {annotation.text}
      </span>
    );
  }
  // visible-marker / profundo-marker — micro mono uppercase
  return (
    <span className="font-mono text-micro uppercase text-text-subtle">
      {annotation.text}
    </span>
  );
}
