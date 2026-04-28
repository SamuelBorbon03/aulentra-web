import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección "Triada" — Sprint C · C.1 · 2026-04-28.
 *
 * Tres distinciones que separan a Aulentra de cualquier herramienta SaaS
 * educativa. Vive entre IdentityDeclaration (qué es) y DualPlatform
 * (para quién), justo donde el lector pregunta "¿en qué se diferencia?".
 *
 * Tono: editorial, declarativo. NO listas de features.
 * Layout: grid 1×3 desktop · 1 columna mobile · top-borders sutiles para
 * marcar cada distinción como entrada de un index editorial.
 */
export function Triada() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
          Cómo pensamos
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="text-display-md md:text-display font-bold tracking-[-0.025em] mb-20 max-w-[920px]">
          Tres distinciones que separan a Aulentra de cualquier otra herramienta.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {[
          {
            title: "Estructura, no agregados.",
            body: "Un solo sistema. Una solución total.",
          },
          {
            title: "Operación, no digitalización.",
            body: "Aulentra no copia tus procesos a una pantalla. Los vuelve sistema.",
          },
          {
            title: "Infraestructura, no aplicación.",
            body: "Tu institución opera en sincronía con Aulentra, no fuera de ella.",
          },
        ].map((item, i) => (
          <Reveal key={item.title} delay={200 + i * 80}>
            <div className="border-t border-line-soft pt-6">
              <h3 className="text-h3 font-semibold text-text-strong mb-3">
                {item.title}
              </h3>
              <p className="text-body text-text-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
