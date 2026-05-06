"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import { AnimatedPath } from "../shared/AnimatedPath";

/**
 * Implementacion · Sección 6 de /soluciones/instituciones.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * 3 momentos en línea horizontal con curva Bezier sutil. La línea se "dibuja"
 * en entrada (AnimatedPath con stroke-dasharray 1400ms). Cada estación lleva
 * un marcador Lucide `users-round` 14px que evoca "intervención humana".
 *
 * VERIFICAR con Samuel:
 *   · Card "Configuración acompañada" — nivel real de personalización mock
 *     (lo que el SPEC etiqueta como "personalización mock vs futuro").
 */
const MOMENTOS = [
  {
    title: "Diagnóstico inicial",
    body:
      "Entendemos cómo opera tu institución hoy — antes de configurar nada.",
  },
  {
    title: "Configuración acompañada",
    body:
      "Los roles, los flujos y los permisos se definen contigo, no por defecto.",
    verify:
      "VERIFICAR con Samuel: nivel real de personalización mock vs futuro (¿qué se configura ya en mock localStorage vs qué requiere backend?).",
  },
  {
    title: "Activación supervisada",
    body:
      "El sistema entra en operación con seguimiento del equipo Aulentra durante las primeras semanas.",
  },
] as const;

export function Implementacion() {
  return (
    /* Atmósfera A+B+D · halo="closure" — el closure cyan vive AQUÍ, no en
       CierreInstitucional (que tiene su propio sigilo+pulso). */
    <SectionWrapper tone="bg-deep" spacing="2xl" halo="closure" className="relative overflow-hidden border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
            <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
              ¿Cómo Se Entra?
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[920px]">
            No te entregamos un acceso. Te acompañamos a operar.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-20 max-w-[760px]">
            La incorporación de una institución a Aulentra es un proceso supervisado — no un onboarding automático.
          </p>
        </Reveal>

        {/* SVG con 3 estaciones · curva Bezier sutil */}
        <Reveal delay={260}>
          <LineaImplementacion />
        </Reveal>

        {/* 3 momentos en grid 1×3 alineados con las 3 estaciones */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {MOMENTOS.map((m, i) => (
            <Reveal key={m.title} delay={340 + i * 180}>
              <div>
                <div className="flex items-center gap-2 mb-4 text-text-subtle">
                  <Icon name="users-round" size={14} aria-label="Intervención humana del equipo Aulentra" />
                  <span className="text-caption-mono-xs uppercase">Equipo Aulentra</span>
                </div>
                <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                  {m.title}
                </h3>
                <p className="text-body text-text-muted leading-relaxed">{m.body}</p>
                {"verify" in m && m.verify && (
                  <span className="sr-only" data-verify-with-samuel>
                    {m.verify}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/**
 * LineaImplementacion — SVG con 3 estaciones conectadas por curva Bezier
 * sutil. La línea se "dibuja" en entrada (stroke-dasharray 1400ms).
 * Cada estación es un nodo doble (anillo + punto sólido).
 */
function LineaImplementacion() {
  return (
    <svg
      role="img"
      aria-label="Línea de implementación supervisada con tres estaciones"
      viewBox="0 0 1200 120"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="impl-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#7DD3FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* curva Bezier que pasa por las 3 estaciones a x = 200, 600, 1000 · y = 60 */}
      <AnimatedPath
        d="M 80 60 C 200 30, 380 90, 600 60 C 820 30, 980 90, 1120 60"
        stroke="url(#impl-line)"
        strokeWidth="1.5"
        fill="none"
        duration={1400}
        delay={0}
      />

      {/* 3 estaciones · anillo + punto sólido */}
      {[200, 600, 1000].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={60}
            r="13"
            fill="none"
            stroke="#A5B4FC"
            strokeOpacity="0.30"
          />
          <circle
            cx={cx}
            cy={60}
            r="7"
            fill="#A5B4FC"
          />
        </g>
      ))}
    </svg>
  );
}
