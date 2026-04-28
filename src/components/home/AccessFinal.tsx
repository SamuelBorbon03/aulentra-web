import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección 6 · CTA final.
 *
 * Cierre institucional. Ancho reducido (680px), espacio superior amplio,
 * declaración en 3 capas con pausa explícita entre la 2da y 3ra línea.
 */
export function AccessFinal() {
  return (
    <div className="relative max-w-[680px] mx-auto text-center pt-12 md:pt-20">
      {/* Halo horizon detrás del bloque */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[420px] pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(99,102,241,0.18) 0%,rgba(6,182,212,0.08) 45%,transparent 75%)",
        }}
      />

      <div className="relative">
        {/* Eyebrow con ícono · sin counter (P4 suprime) · spacing amplio antes del headline */}
        <Reveal>
          <div className="inline-flex items-center gap-4 mb-16 md:mb-20">
            <Image
              src="/brand/aulentra_symbol_transparent.png"
              alt=""
              width={120}
              height={120}
              className="w-6 h-6 object-contain opacity-70"
            />
            <span className="font-mono text-caption uppercase tracking-[0.32em] text-primary">
              Acceso institucional
            </span>
          </div>
        </Reveal>

        {/* Headline a 2 voces · arco temporal hoy → mañana */}
        <Reveal delay={80}>
          <h2 className="text-h1 md:text-display font-extrabold text-fg leading-[1.0] tracking-[-0.03em]">
            <span className="block">Hoy gestionas tu institución.</span>
            <span className="block text-text-subtle">Mañana puede operarse sola.</span>
          </h2>
        </Reveal>

        {/* Afirmación gradient · peso 700 · cierre del arco con la promesa Aulentra */}
        <Reveal delay={200}>
          <div className="mt-10 inline-block text-h1 md:text-display font-bold leading-[1.05] tracking-[-0.025em] bg-clip-text text-transparent bg-horizon-gradient-h-soft">
            Aulentra construye ese mañana.
          </div>
        </Reveal>

        {/* Línea separadora editorial · ancla el bloque CTA */}
        <Reveal delay={280}>
          <div className="mt-20 mb-10 mx-auto w-12 h-px bg-line-soft/60" />
        </Reveal>

        {/* CTAs · 16px entre botones */}
        <Reveal delay={320}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/acceso" variant="primary">
              Acceder
            </Button>
            <Button href="/solicitar-acceso" variant="secondary">
              Solicitar acceso
            </Button>
          </div>
        </Reveal>

        {/* Microcopy institucional · uppercase tracking */}
        <Reveal delay={420}>
          <p className="mt-10 font-mono text-micro uppercase text-text-subtle">
            Solo organizaciones autorizadas · *.aulentra.com
          </p>
        </Reveal>
      </div>
    </div>
  );
}
