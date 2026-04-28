import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección 2 · Qué es Aulentra (Propuesta 4 · ejecución premium).
 *
 * Composición:
 *   · Grid 12 columnas · split 5/7 · gap-x 64px · divisor vertical sutil
 *   · Columna izquierda  → negación atenuada (anchor) + sigilo isotipo + documento institucional
 *   · Columna derecha    → afirmación gradient dominante + 2 sub-bloques con jerarquía cruzada
 *
 * Espacio vacío de la columna izquierda resuelto con DOS capas (recomendación P3 + P1):
 *   1. Sigilo isotipo (P1) — fondo, marca de agua arquitectónica con halo radial.
 *      Usa el PNG transparent existente; sin recuadro porque el archivo lleva canal alpha.
 *   2. Documento institucional (P3) — artefacto SVG editorial al frente.
 *      Acta / resolución / cédula / constancia: la unidad atómica de cualquier institución LATAM.
 */
export function IdentityDeclaration() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Eyebrow */}
      <Reveal>
        <div className="text-caption uppercase tracking-[0.32em] text-primary mb-16">
          Qué es Aulentra
        </div>
      </Reveal>

      {/* Grid 12 columnas · 5 / 7 con gap 64px */}
      <div className="grid lg:grid-cols-12 gap-x-16 gap-y-16">
        {/* ─────────────── Columna izquierda · negación + activos visuales · 5 cols ─────────────── */}
        <div className="lg:col-span-5 relative">
          {/* Negación · anchor tipográfico atenuado */}
          <Reveal delay={80}>
            <h2 className="relative text-display-sm md:text-display-lg text-text-subtle">
              <span className="block">No es un LMS.</span>
              <span className="block">No es software</span>
              <span className="block">administrativo.</span>
            </h2>
          </Reveal>

          {/* Documento institucional (P3) + Sigilo isotipo (P1) detrás · centrados en la columna */}
          <Reveal delay={300}>
            <div className="mt-16 flex flex-col items-center">
              {/* Wrapper documento + sigilo · ambos centrados, sigilo alineado con el documento */}
              <div className="relative flex items-center justify-center">
                {/* Halo radial · atmósfera muy sutil centrada con el documento */}
                <div
                  aria-hidden
                  className="absolute w-[460px] h-[460px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(103,232,249,0.02) 40%, transparent 72%)",
                  }}
                />

                {/* Sigilo isotipo (P1) · centrado con el documento · escala mayor para envolverlo */}
                <div
                  aria-hidden
                  className="absolute w-[340px] h-[340px] pointer-events-none opacity-[0.11]"
                  style={{
                    maskImage:
                      "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.45) 65%, transparent 90%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.45) 65%, transparent 90%)",
                  }}
                >
                  <Image
                    src="/brand/aulentra_symbol_transparent.png"
                    alt=""
                    width={720}
                    height={720}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Documento institucional · al frente */}
                <DocumentoInstitucional />
              </div>

              {/* Caption mono debajo del wrapper */}
              <p className="mt-8 font-mono text-caption uppercase tracking-[0.32em] text-text-subtle text-center">
                acta · resolución · cédula · constancia
              </p>
            </div>
          </Reveal>
        </div>

        {/* ─────────────── Columna derecha · afirmación + sub-bloques · 7 cols ─────────────── */}
        <div className="lg:col-span-7 lg:border-l lg:border-line-soft lg:pl-16 space-y-16">
          {/* Afirmación dominante · gradient horizon */}
          <Reveal delay={120}>
            <h3 className="text-display-xs md:text-display-md font-bold leading-[1.05] tracking-[-0.025em] bg-clip-text text-transparent max-w-[560px] bg-horizon-gradient-h-soft">
              Es la infraestructura sobre la que la institución funciona.
            </h3>
            <div
              aria-hidden
              className="mt-6 h-px w-12 bg-horizon-gradient-h-soft-50"
            />
          </Reveal>

          {/* Sub-bloque 1 · diagnóstico + acción · jerarquía cruzada (introduce → afirma) */}
          <Reveal delay={240}>
            <div className="max-w-[520px] space-y-3">
              <p className="text-body-soft text-text-subtle">
                La operación académica está fragmentada por diseño.
              </p>
              <p className="text-body-soft text-text-strong font-medium">
                Aulentra la unifica en una sola arquitectura.
              </p>
            </div>
          </Reveal>

          {/* Sub-bloque 2 · consecuencia estructural */}
          <Reveal delay={340}>
            <div className="max-w-[520px] space-y-3">
              <p className="text-body-soft text-text-subtle">
                Una sola fuente de verdad.
              </p>
              <p className="text-body-soft text-text-strong font-medium">
                Nada queda fuera del sistema.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/**
 * Documento institucional como artefacto editorial.
 * SVG ilustrado: NO afirma feature, evoca el universo simbólico de instituciones LATAM
 * (acta de matrícula, resolución, cédula). Tinte horizon en el sello para integrarse
 * al sistema de marca sin saturar.
 */
function DocumentoInstitucional() {
  return (
    <svg
      viewBox="0 0 220 300"
      className="block w-[180px] md:w-[220px] h-auto"
      style={{
        transform: "rotate(-3deg)",
        filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.4))",
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="aul-seal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#67E8F9" />
        </linearGradient>
      </defs>

      {/* Papel */}
      <rect
        x="0"
        y="0"
        width="220"
        height="300"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.2"
      />

      {/* Header con escudo abstracto + 3 líneas */}
      <circle
        cx="30"
        cy="30"
        r="11"
        fill="none"
        stroke="rgba(165,180,252,0.55)"
        strokeWidth="1"
      />
      <circle
        cx="30"
        cy="30"
        r="6"
        fill="none"
        stroke="rgba(165,180,252,0.4)"
        strokeWidth="0.6"
      />
      <line x1="50" y1="22" x2="180" y2="22" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="50" y1="32" x2="155" y2="32" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
      <line x1="50" y1="40" x2="135" y2="40" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />

      {/* Divisor */}
      <line x1="20" y1="62" x2="200" y2="62" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />

      {/* Cuerpo · líneas placeholder */}
      {[82, 92, 102, 112, 130, 140, 150, 160, 178, 188].map((y, i) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2={i % 4 === 3 ? 170 : i % 4 === 1 ? 195 : 200}
          y2={y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.5"
        />
      ))}

      {/* Pie · línea de firma */}
      <line x1="20" y1="240" x2="100" y2="240" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
      <text
        x="20"
        y="252"
        fontFamily="var(--font-geist-mono)"
        fontSize="6"
        fill="rgba(255,255,255,0.42)"
        letterSpacing="1.1"
      >
        FIRMA
      </text>

      {/* Sello circular con arc indigo→cyan */}
      <circle
        cx="170"
        cy="248"
        r="22"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.6"
        strokeDasharray="2 1.5"
      />
      <path
        d="M 148 248 A 22 22 0 0 1 192 248"
        fill="none"
        stroke="url(#aul-seal-grad)"
        strokeWidth="1.5"
        opacity="0.75"
      />
      <circle
        cx="170"
        cy="248"
        r="6"
        fill="none"
        stroke="rgba(165,180,252,0.45)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
