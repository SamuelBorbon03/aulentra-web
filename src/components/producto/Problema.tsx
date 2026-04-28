import { Reveal } from "@/components/ui/Reveal";

/**
 * /producto · Sección Problema — Sprint C · C.3 · 2026-04-28.
 *
 * Diagnóstico editorial al inicio de la página, antes de la intro de
 * las 5 capas. Estructura: eyebrow + headline a 2 voces + 2 párrafos
 * declarativos + lista de 5 fricciones + cita italic con border-l.
 *
 * Tono: ejecutivo · NO genérico SaaS · sin diminutivos.
 */
export function Problema() {
  return (
    <div className="max-w-[920px] mx-auto">
      <Reveal>
        <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
          El diagnóstico
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] mb-12">
          El problema no es la falta de esfuerzo.
          <br />
          Es la falta de sistema.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-body-l text-text-default leading-relaxed mb-6">
          La mayoría de instituciones operan con herramientas desconectadas, procesos manuales y visibilidad fragmentada.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <p className="text-body-l text-text-default leading-relaxed mb-12">
          El resultado no es caos aparente. Es desgaste silencioso: errores que se acumulan, tiempo que se pierde, decisiones que se toman sin información completa.
        </p>
      </Reveal>
      <Reveal delay={340}>
        <ul className="space-y-3 mb-12 max-w-[760px]">
          <li className="text-body text-text-muted">— Herramientas que no hablan entre sí.</li>
          <li className="text-body text-text-muted">— Información que vive en archivos, no en sistemas.</li>
          <li className="text-body text-text-muted">— Reportes que toman días cuando deberían tomar segundos.</li>
          <li className="text-body text-text-muted">— Cambios que no llegan a tiempo a quien los necesita.</li>
          <li className="text-body text-text-muted">— Decisiones que dependen de cruzar datos a mano.</li>
        </ul>
      </Reveal>
      <Reveal delay={460}>
        <p className="text-h3 font-serif italic text-text-strong leading-relaxed border-l-2 border-primary pl-6 max-w-[760px]">
          No es que los equipos no trabajen. Es que el sistema no los sostiene.
        </p>
      </Reveal>
    </div>
  );
}
