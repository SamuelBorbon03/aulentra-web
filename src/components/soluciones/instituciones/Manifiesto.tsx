import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Manifiesto · Sección 2 de /soluciones/instituciones.
 *
 * Frase única IBM Plex Serif italic centrada · regla 1px horizon · firma caption.
 * Línea horizon atmosférica horizontal a 60% altura del bloque.
 *
 * Sprint C · D.1 · 2026-04-28.
 */
export function Manifiesto() {
  return (
    <SectionWrapper tone="bg-deep" spacing="2xl" className="relative overflow-hidden border-t border-line-soft">
      {/* Línea horizon atmosférica · 100vw · 60% altura */}
      <div
        aria-hidden
        className="absolute left-0 right-0 h-px pointer-events-none bg-horizon-fade-h"
        style={{ top: "60%", opacity: 0.55 }}
      />
      <div className="relative max-w-[840px] mx-auto text-center">
        <Reveal>
          {/* tokens: h2 (32px) base · display-xs (36px) sm · display-sm (40px) md+ */}
          <p className="font-serif italic text-text-strong leading-[1.35] text-h2 sm:text-display-xs md:text-display-sm tracking-[-0.01em]">
            Cuando cada equipo entiende su parte y el sistema sostiene el conjunto, una institución empieza a operar como una sola pieza.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mx-auto mt-12 h-px w-20 bg-line-strong" />
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-6 text-caption-mono-xs text-text-subtle uppercase">
            Aulentra · Instituciones
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
