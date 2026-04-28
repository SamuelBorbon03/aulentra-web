import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * /sobre · Master Board — Sprint C · C.4 · 2026-04-28.
 *
 * Composición editorial del sistema visual de marca:
 *   · Isotipo grande centrado (PNG transparent oficial)
 *   · Wordmark con gradient horizon horizontal
 *   · Tagline en caption-mono uppercase
 *   · 4 atributos (Propósito · Enfoque · Resultado · Visión) en grid
 *
 * Implementado con HTML/CSS/SVG · NO usa el PNG entero del manual de marca
 * (la fila "5 versiones aprobadas del logo" del PNG queda fuera por
 * decisión editorial · no aporta a un visitante institucional).
 */

const ATRIBUTOS = [
  {
    label: "Propósito",
    body: "Dar estructura, claridad y sentido a la operación educativa.",
  },
  {
    label: "Enfoque",
    body: "Organización, conexión y visibilidad en un solo sistema.",
  },
  {
    label: "Resultado",
    body: "Menos fricciones, más control, crecimiento sin caos.",
  },
  {
    label: "Visión",
    body: "Sistema operativo académico de referencia en Latinoamérica.",
  },
] as const;

export function MasterBoard() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-caption uppercase tracking-[0.32em] text-primary mb-8">
          Sistema de marca
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="text-display-sm md:text-display font-bold tracking-[-0.02em] mb-16 max-w-[840px]">
          El sistema visual completo, sin recortes.
        </h2>
      </Reveal>

      {/* Composición editorial · isotipo + wordmark + tagline */}
      <Reveal delay={200}>
        <div className="flex flex-col items-center text-center mb-20">
          <Image
            src="/brand/aulentra_symbol_transparent.png"
            alt="Isotipo Aulentra"
            width={220}
            height={220}
            className="mb-12"
          />
          <div className="text-numeral-lg md:text-numeral-xl bg-clip-text text-transparent bg-horizon-gradient-h-wordmark mb-8">
            AULENTRA
          </div>
          <div className="text-caption-mono uppercase text-text-muted max-w-[640px]">
            La educación no necesita más herramientas.
            <br />
            Necesita estructura.
          </div>
        </div>
      </Reveal>

      {/* 4 atributos · grid 1×1, 2×2 o 1×4 según breakpoint */}
      <Reveal delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-line-soft pt-16">
          {ATRIBUTOS.map((item) => (
            <div key={item.label} className="border-l-2 border-primary/40 pl-5">
              <div className="text-caption uppercase tracking-[0.32em] text-primary mb-3">
                {item.label}
              </div>
              <p className="text-body text-text-default leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
