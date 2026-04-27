import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección 3 · Institución / Formador.
 *
 * Cards sólidas (no flotantes) con padding interno 40px, separación 24px,
 * fondo elevated para diferenciarse del bg de la sección. Hover lift sobrio.
 */
export function DualPlatform() {
  return (
    <div className="max-w-[1120px] mx-auto">
      <Reveal>
        <div className="mb-20 md:mb-24">
          {/* Eyebrow alineado a la izquierda · sin counter editorial (P4 suprime) */}
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-10">
            Institución · Formador
          </div>

          {/* Headline + sub-afirmación en grid 7/5 · jerarquía clara */}
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-8 items-end">
            <h2 className="lg:col-span-7 text-h1 md:text-display font-bold text-fg leading-[1.02] tracking-[-0.025em]">
              Dos realidades.
              <br />
              <span className="text-fg/55">Una misma estructura.</span>
            </h2>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-line-soft/50">
              <p className="text-body-l text-fg-soft/70 leading-[1.55]">
                <span className="block">La escala cambia.</span>
                <span className="block text-fg/85 font-medium">La estructura no.</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <Reveal delay={100}>
          <Card
            index="A"
            label="Instituciones educativas"
            title="La institución completa, dentro de un sistema."
            stats={[
              {
                k: "Estructura",
                v: "Definida una vez. Sostenida en todo momento.",
              },
              {
                k: "Operación",
                v: "Coordinada entre Administración, Docente, Estudiante y Acudiente.",
              },
              {
                k: "Lectura",
                v: "Estado académico completo, en una sola vista.",
              },
            ]}
            accent="#818CF8"
          />
        </Reveal>
        <Reveal delay={180}>
          <Card
            index="B"
            label="Formadores independientes"
            title="La misma estructura, a escala individual."
            stats={[
              {
                k: "Práctica",
                v: "Formación estructurada, no improvisada.",
              },
              {
                k: "Seguimiento",
                v: "Individual por estudiante, sin perder contexto.",
              },
              {
                k: "Operación",
                v: "Coherente, sin fricción operativa.",
              },
            ]}
            accent="#22D3EE"
          />
        </Reveal>
      </div>
    </div>
  );
}

function Card({
  index,
  label,
  title,
  stats,
  accent,
}: {
  index: string;
  label: string;
  title: string;
  stats: { k: string; v: string }[];
  accent: string;
}) {
  return (
    <div
      className="group relative rounded-2xl border border-line-strong bg-elevated/70 p-8 md:p-10 lg:p-12 overflow-hidden h-full transition-all duration-300 ease-out hover:-translate-y-[3px] hover:bg-elevated hover:border-line-strong/80 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)]"
    >
      {/* Glow sutil en hover · sigue al accent · no decorativo, da identidad */}
      <div
        className="absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full opacity-0 group-hover:opacity-100 blur-3xl pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(circle,${accent}33 0%,transparent 70%)` }}
      />

      {/* Header de la card · index editorial + label */}
      <div className="relative flex items-center gap-4 mb-8">
        <span
          className="font-mono text-[11px] font-medium tracking-[0.28em] uppercase px-2.5 py-1 rounded-md border"
          style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0D` }}
        >
          {index}
        </span>
        <span className="font-mono text-caption uppercase tracking-[0.24em] text-fg-soft/65">
          {label}
        </span>
      </div>

      {/* Title — peso editorial · max-w para ritmo */}
      <h3 className="relative text-h3 md:text-h2 font-bold text-fg leading-[1.15] tracking-[-0.015em] max-w-[440px]">
        {title}
      </h3>

      {/* Separador interno · accent → transparente · 48px desde title */}
      <div
        className="relative mt-12 mb-8 h-px w-16"
        style={{ background: `linear-gradient(90deg,${accent} 0%,transparent 100%)` }}
      />

      {/* Stats con estructura k:v · sub-bloques con jerarquía clara */}
      <dl className="relative space-y-5">
        {stats.map((s) => (
          <div
            key={s.k}
            className="grid grid-cols-[88px_1fr] gap-4 items-baseline pb-5 border-b border-line-soft/40 last:border-b-0 last:pb-0"
          >
            <dt
              className="font-mono text-[10px] uppercase tracking-[0.24em]"
              style={{ color: `${accent}CC` }}
            >
              {s.k}
            </dt>
            <dd className="text-small text-fg-soft/85 leading-[1.55]">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
