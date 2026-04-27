import { Reveal } from "@/components/ui/Reveal";

const capabilities: {
  index: string;
  title: string;
  description: string[];
}[] = [
  {
    index: "01",
    title: "Operación en una sola estructura.",
    description: [
      "Sin fragmentación. Sin coordinación manual.",
      "Toda la institución dentro de un mismo sistema.",
    ],
  },
  {
    index: "02",
    title: "Trayectoria visible en sistema.",
    description: [
      "Cada estudiante, un recorrido legible.",
      "El proceso académico se vuelve observable.",
    ],
  },
  {
    index: "03",
    title: "Lectura institucional directa.",
    description: [
      "Estado actual, sin reportes que reconstruir.",
      "Decisiones con datos vivos, no atrasados.",
    ],
  },
  {
    index: "04",
    title: "Entornos institucionales independientes.",
    description: [
      "Misma estructura. Reglas propias. Identidad propia.",
      "Cada institución, dentro de su entorno.",
    ],
  },
];

/**
 * Sección 4 · Cómo opera.
 *
 * Grid 2×2 con divisores sutiles formando una cruz visual.
 * Números de baja opacidad como referencia editorial, título dominante,
 * descripción en 2 líneas. Spacing 64/48/24.
 */
export function Capabilities() {
  return (
    <div className="max-w-[1120px] mx-auto">
      <Reveal>
        <div className="mb-20 md:mb-24">
          {/* Eyebrow alineado izquierda · sin counter editorial (P4 suprime) */}
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-10">
            Cómo opera
          </div>

          {/* Headline en grid 7/5 · jerarquía declarativa */}
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-8 items-end">
            <h2 className="lg:col-span-8 text-h1 md:text-display font-bold text-fg leading-[1.02] tracking-[-0.025em]">
              Cuatro capacidades.
              <br />
              <span className="text-fg/55">Una sola arquitectura.</span>
            </h2>
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-line-soft/50">
              <p className="text-body-l text-fg-soft/70 leading-[1.55]">
                Cada capacidad resuelve una fractura distinta de la operación académica.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Grid 2×2 con divisores formando cruz · padding interno coherente */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-line-soft/70">
        {capabilities.map((c, i) => {
          const isRight = i % 2 === 1;
          const isBottomRow = i >= 2;
          return (
            <Reveal key={c.index} delay={80 * (i + 1)}>
              <article
                className={[
                  "group relative py-12 md:py-16 lg:py-20",
                  // Bordes internos · cruz en md+ · borde inferior en mobile
                  "border-b border-line-soft/70 md:border-b-0",
                  isBottomRow ? "md:border-t md:border-line-soft/70" : "",
                  !isRight ? "md:border-r md:border-line-soft/70" : "",
                  // Padding lateral según posición · respiración hacia el centro
                  isRight ? "md:pl-12 lg:pl-16 md:pr-2" : "md:pr-12 lg:pr-16 md:pl-2",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Línea acento que aparece en hover · ancla la card sin marcar exceso */}
                <span
                  className="absolute top-0 left-0 h-px w-0 group-hover:w-12 bg-gradient-to-r from-primary to-cyan-300 transition-all duration-500 ease-out"
                  aria-hidden="true"
                />

                {/* Header · número monumental dominante · gradient saturado */}
                <div className="mb-10">
                  <div
                    className="font-mono text-[80px] md:text-[104px] font-extralight leading-[0.82] tracking-[-0.05em] bg-clip-text text-transparent select-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,rgba(165,180,252,1) 0%,rgba(103,232,249,0.78) 100%)",
                    }}
                    aria-hidden="true"
                  >
                    {c.index}
                  </div>
                </div>

                {/* Title · peso extrabold · tracking más cerrado */}
                <h3 className="text-h3 md:text-h2 font-extrabold text-fg leading-[1.12] tracking-[-0.025em] max-w-[420px]">
                  {c.title}
                </h3>

                {/* Description · jerarquía interna marcada · línea 1 65% / línea 2 30% */}
                <div className="mt-6 max-w-[440px]">
                  {c.description.map((line, j) => (
                    <p
                      key={j}
                      className={
                        j === 0
                          ? "text-body text-fg-soft/65 leading-[1.6]"
                          : "text-small text-fg-soft/30 leading-[1.6] mt-1.5"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
