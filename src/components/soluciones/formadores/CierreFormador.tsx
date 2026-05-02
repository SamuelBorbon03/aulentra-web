import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

/**
 * CierreFormador · Sección 7 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * Un solo CTA primario (refleja autonomía individual). Mini núcleo central
 * con 3 líneas curvas que se desvanecen hacia los bordes — eco refinado del
 * hero, sin sigilo grande. Ancho `max-w-[760px]` (más estrecho que cierre
 * Instituciones).
 */
export function CierreFormador() {
  return (
    /* Atmósfera A+B+D · halo={false} — el mini núcleo eco ya provee atmosphere. */
    <SectionWrapper tone="bg" spacing="2xl" halo={false} className="border-t border-line-soft">
      <div className="max-w-[760px] mx-auto text-center">
        <Reveal>
          <MiniNucleoEco />
        </Reveal>
        <Reveal delay={160}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mt-12 mb-6">
            Una sola persona. Un solo sistema. Todas las posibilidades.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="text-body-l text-text-default leading-relaxed mb-10">
            Empieza tu práctica con Aulentra.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <Button href="/solicitar-acceso" variant="primary">
            Solicitar acceso
          </Button>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

function MiniNucleoEco() {
  return (
    <svg
      role="img"
      aria-label="Mini núcleo · eco editorial del sistema"
      viewBox="0 0 240 120"
      className="mx-auto"
      style={{ width: "clamp(180px, 28vw, 240px)", height: "auto" }}
    >
      <defs>
        <radialGradient id="mini-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.35" />
          <stop offset="60%"  stopColor="#7DD3FC" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#101328" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mini-fill" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#C7D2FE" />
          <stop offset="60%"  stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#818CF8" />
        </radialGradient>
        <linearGradient id="mini-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0" />
          <stop offset="50%"  stopColor="#A5B4FC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="60" r="55" fill="url(#mini-halo)" />

      {/* 3 líneas curvas que se desvanecen */}
      <g stroke="url(#mini-stroke)" strokeWidth="0.85" fill="none">
        <path d="M 20 60 Q 70 30 120 60 T 220 60" />
        <path d="M 30 80 Q 75 70 120 60 T 215 50" strokeOpacity="0.7" />
        <path d="M 30 40 Q 75 50 120 60 T 210 70" strokeOpacity="0.55" />
      </g>

      {/* Núcleo */}
      <g className="animate-nucleus-pulse" style={{ transformOrigin: "120px 60px" }}>
        <circle cx="120" cy="60" r="20" fill="url(#mini-fill)" />
        <circle cx="120" cy="60" r="14" fill="none" stroke="#FFFFFF" strokeOpacity="0.30" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
