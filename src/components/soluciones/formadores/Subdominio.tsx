"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Subdominio · Sección 3 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * URL bar editorial: tipografía grande `text-numeral-lg` (80px) con segmento
 * `tunombre` rotando 3 ejemplos cada 3s con cross-fade 400ms. Cursor parpadea
 * 1.2s sobre `tunombre`. Debajo lockup tenant pequeño (wordmark + iniciales
 * miniatura) y 3 puntos cortos.
 *
 * VERIFICAR con Samuel:
 *   · Si subdominio aplica realmente a formadores particulares (vs solo a
 *     instituciones). El SPEC lo deja indicado para validar.
 *
 * Ejemplos rotando (autorizado D-bis · revisar con Samuel):
 *   - silvia.aulentra.com
 *   - mfernandez.aulentra.com
 *   - instituto-borbon.aulentra.com
 */
const EJEMPLOS = ["silvia", "mfernandez", "instituto-borbon"] as const;

const PUNTOS = [
  {
    head: "Subdominio propio.",
    body: "tunombre.aulentra.com o el formato que se cierre en producción.",
  },
  {
    head: "Identidad visual.",
    body: "Tu logotipo, tus colores, tu lenguaje.",
  },
  {
    head: "Aulentra opera por debajo.",
    body: "La infraestructura es nuestra. La marca es tuya.",
  },
] as const;

export function Subdominio() {
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const fadeOut = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setIndex((i) => (i + 1) % EJEMPLOS.length);
        setOpacity(1);
      }, 400);
    }, 3000);
    return () => clearInterval(fadeOut);
  }, [reduceMotion]);

  return (
    <SectionWrapper tone="bg" spacing="2xl" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
            Identidad
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[840px]">
            Operas desde tu propio dominio. Tus estudiantes ven tu marca, no la nuestra.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[760px]">
            Tu plataforma vive en un subdominio configurado para ti. La experiencia que reciben tus estudiantes es la tuya.
          </p>
        </Reveal>

        {/* VERIFICAR con Samuel: si subdominio aplica a formadores */}
        <span className="sr-only" data-verify-with-samuel>
          VERIFICAR con Samuel: si la promesa &quot;tu subdominio&quot; aplica realmente a formadores
          particulares en el modelo final, o si es exclusiva de instituciones.
        </span>

        {/* URL bar editorial */}
        <Reveal delay={260}>
          <div className="my-16 md:my-20">
            <div
              className="font-mono leading-none tracking-[-0.03em] text-text-strong text-center"
              style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 700 }}
            >
              <span className="inline-flex items-center">
                <span
                  className="bg-clip-text text-transparent bg-horizon-gradient-h-wordmark inline-block"
                  style={{
                    transition: reduceMotion ? "none" : "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity,
                    minWidth: "0.5em",
                  }}
                >
                  {EJEMPLOS[index]}
                </span>
                <span
                  aria-hidden
                  className="inline-block w-[3px] md:w-[4px] ml-1 bg-primary animate-cursor-blink"
                  style={{ height: "0.78em" }}
                />
                <span className="text-text-muted ml-1">.aulentra.com</span>
              </span>
            </div>

            {/* Lockup tenant miniatura */}
            <div className="mt-10 flex items-center justify-center gap-4 text-text-subtle">
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-elevated text-caption-mono-xs text-text-muted font-semibold"
              >
                {EJEMPLOS[index].slice(0, 2).toUpperCase()}
              </span>
              <span className="text-caption-mono-xs uppercase">Tu marca · Tu dominio</span>
            </div>
          </div>
        </Reveal>

        {/* 3 puntos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 border-t border-line-soft pt-14">
          {PUNTOS.map((p, i) => (
            <Reveal key={p.head} delay={340 + i * 80}>
              <div>
                <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                  {p.head}
                </h3>
                <p className="text-body text-text-muted leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
