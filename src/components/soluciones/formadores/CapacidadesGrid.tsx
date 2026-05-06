import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * CapacidadesGrid · Sección 5 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 *
 * Grid 2×2 con 4 capacidades. Ícono Lucide 24px arriba derecha. Padding
 * 48px 40px · solo `border-bottom 1px line-soft` (no caja completa, mantiene
 * sensación editorial).
 *
 * Sprint C · D-fix · 2026-04-27 · Uniform height · `auto-rows-fr` en el
 * grid + Reveal/article con `h-full flex flex-col` para que las 4 cards
 * alineen su borde inferior incluso cuando los headlines tienen 1 vs
 * 2 líneas.
 *
 * Íconos extendidos en whitelist Sprint C-D:
 *   users / book-open / clipboard-check / mail
 */
const CAPACIDADES: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "users",
    title: "Estudiantes",
    body: "Quiénes son, qué cursan contigo, cómo avanzan.",
  },
  {
    icon: "book-open",
    title: "Programas y contenidos",
    body:
      "Tus cursos, tus módulos, tus materiales — organizados como tú los enseñas.",
  },
  {
    icon: "clipboard-check",
    title: "Evaluación y seguimiento",
    body:
      "Registras avances, generas observaciones, mantienes el historial sin hojas de cálculo paralelas.",
  },
  {
    icon: "mail",
    title: "Comunicación con acudientes (opcional)",
    body:
      "Si trabajas con menores, las familias acceden al avance del estudiante sin canales informales.",
  },
];

export function CapacidadesGrid() {
  return (
    /* Atmósfera A+B+D · halo="closure" — cyan que cierra el arco. */
    <SectionWrapper tone="bg" spacing="2xl" halo="closure" className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
            <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
              Alcance
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[840px]">
            El sistema cubre tu práctica entera.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[680px]">
            Lo esencial para empezar. Lo profundo para cuando crezcas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr border-t border-line-soft">
          {CAPACIDADES.map((c, i) => (
            <Reveal key={c.title} delay={260 + i * 90} className="h-full">
              <article
                className={[
                  "group relative h-full flex flex-col px-10 py-12 md:px-12 md:py-14 border-b border-line-soft",
                  // Línea vertical separadora interna en md+ (solo segundo de cada fila)
                  i % 2 === 0 ? "md:border-r md:border-line-soft" : "",
                ].join(" ")}
              >
                <div className="absolute top-10 right-10 md:top-12 md:right-12 text-text-subtle group-hover:text-primary transition-colors">
                  <Icon name={c.icon} size={24} />
                </div>
                <h3 className="text-h3 font-semibold text-text-strong mb-4 max-w-[80%] leading-snug">
                  {c.title}
                </h3>
                <p className="text-body text-text-muted leading-relaxed max-w-[480px]">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
