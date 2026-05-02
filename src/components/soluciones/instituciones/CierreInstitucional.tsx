import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { SigiloAulentra } from "../shared/SigiloAulentra";

/**
 * CierreInstitucional · Sección 7 de /soluciones/instituciones.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * Headline + subhead a la izquierda, sigilo grande con halo radial pulsando
 * a la derecha. Un solo CTA primario.
 *
 * Sigilo `clamp(220px, 22vw, 320px)` opacity 0.18 · halo radial sutil ·
 * pulso 4s (respeta reduce-motion vía `.animate-sigilo-pulse`).
 */
export function CierreInstitucional() {
  return (
    /* Atmósfera A+B+D · halo={false} — el sigilo grande con halo+pulse local
       ya gestiona la atmósfera de cierre. */
    <SectionWrapper tone="bg" spacing="2xl" halo={false} className="relative overflow-hidden border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[680px]">
                Tu institución merece un sistema. No una herramienta.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-body-l text-text-default leading-relaxed mb-10 max-w-[600px]">
                Hablemos de cómo Aulentra se adapta a tu estructura.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Button href="/solicitar-acceso" variant="primary">
                Solicitar acceso institucional
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal delay={260}>
              <SigiloAulentra
                size="clamp(220px, 22vw, 320px)"
                opacity={0.18}
                pulse
              />
            </Reveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
