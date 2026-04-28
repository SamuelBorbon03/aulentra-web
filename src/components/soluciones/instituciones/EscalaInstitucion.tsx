import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * EscalaInstitucion · Sección 5 de /soluciones/instituciones.
 *
 * Sprint C · D.1 · 2026-04-28.
 *
 * 3 cards horizontales sin imagen (descanso visual entre Cobertura y la
 * Implementación supervisada). Padding 40px 48px · `bg-card` · border
 * `line-soft` · hover sube borde a `line-strong` + translateY(-2px).
 *
 * Nota editorial italic centrada al cierre.
 */
const ESCALAS = [
  {
    title: "Colegio o centro formativo",
    body:
      "La operación de un colegio gira en torno a la coordinación, el equipo docente y la relación con las familias. Aulentra se ajusta a esa realidad sin imponer estructura adicional.",
  },
  {
    title: "Universidad o red educativa",
    body:
      "Una universidad o red educativa opera con múltiples programas, facultades o sedes. Aulentra se acomoda a esa profundidad, respetando los niveles de gobierno que ya existen.",
  },
  {
    title: "Cualquier otra institución educativa",
    body:
      "Jardines, institutos técnicos, academias, escuelas de oficios, centros de formación profesional. Cada institución define su forma de operar, y Aulentra se adapta a ella.",
  },
] as const;

export function EscalaInstitucion() {
  return (
    <SectionWrapper tone="bg" spacing="2xl" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
            Escala
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[920px]">
            Cada institución opera distinto. El sistema se ajusta a esa realidad.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[760px]">
            La estructura del sistema responde a la realidad de cada institución, no a un esquema fijo.
          </p>
        </Reveal>

        <div className="space-y-5">
          {ESCALAS.map((e, i) => (
            <Reveal key={e.title} delay={260 + i * 90}>
              <article className="group rounded-lg bg-card border border-line-soft hover:border-line-strong px-8 md:px-12 py-8 md:py-10 transition-all duration-300 hover:-translate-y-[2px]">
                <div className="md:flex md:items-baseline md:gap-12">
                  <h3 className="text-h3 font-semibold text-text-strong mb-3 md:mb-0 md:w-[320px] md:flex-shrink-0 leading-snug">
                    {e.title}
                  </h3>
                  <p className="text-body text-text-muted leading-relaxed flex-1">{e.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260 + ESCALAS.length * 90 + 80}>
          <p className="mt-16 font-serif italic text-text-default text-h3 leading-relaxed text-center max-w-[760px] mx-auto">
            Aulentra no se entrega con un esquema fijo. Se configura sobre la operación que ya tienes.
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
