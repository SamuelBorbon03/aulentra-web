import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "184", label: "Suscripciones activas", hint: "Operando hoy" },
  { value: "99.82%", label: "Uptime operativo", hint: "Último trimestre" },
  { value: "+39%", label: "Crecimiento 6 meses", hint: "Adopción compuesta" },
  { value: "< 48h", label: "Respuesta de soporte", hint: "Acompañamiento directo" },
];

/**
 * Sección 5 · Evidencia.
 *
 * Panel de datos. Header alineado a izquierda, números dominantes (text-[64-72]),
 * cards con fondo elevated y padding generoso. Hint en font-mono uppercase
 * para acento técnico/institucional.
 */
export function ImpactMetrics() {
  return (
    <div className="max-w-[1120px] mx-auto">
      <Reveal>
        <div className="mb-24 max-w-[700px]">
          <div className="text-caption uppercase tracking-[0.28em] text-primary mb-6">
            Evidencia
          </div>
          <h2 className="text-h1 md:text-display font-bold text-fg leading-[1.02] tracking-[-0.02em]">
            El sistema ya está operando.
          </h2>
        </div>
      </Reveal>

      {/* Grid panel-de-datos · 4 cards con separación 24px */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={80 * (i + 1)}>
            <div className="relative rounded-xl border border-line-strong bg-elevated/60 px-6 py-10 md:py-12 overflow-hidden hover-lift h-full flex flex-col">
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg,transparent 0%,rgba(165,180,252,0.5) 50%,transparent 100%)",
                }}
              />

              {/* Hint técnico arriba — discreto pero presente */}
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-soft/45 mb-6">
                {m.hint}
              </div>

              {/* Valor dominante · 64-72px · gradient horizon */}
              <div
                className="text-[52px] md:text-[64px] lg:text-[68px] font-bold leading-[0.95] tracking-[-0.03em] bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#A5B4FC 0%,#7DD3FC 60%,#67E8F9 100%)",
                }}
              >
                {m.value}
              </div>

              {/* Label · 24px desde el valor */}
              <div className="mt-6 text-small text-fg-soft/80 leading-snug">
                {m.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
