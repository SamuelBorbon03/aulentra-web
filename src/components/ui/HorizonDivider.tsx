import { cn } from "@/lib/cn";

/**
 * HorizonDivider — capa D del sistema atmósfera (A+B+D · 2026-04-28).
 *
 * Línea horizontal full-bleed con:
 *   · 1px sólido en color line-strong @ 0.45  (CSS var --horizon-line)
 *   · glow indigo opacity 0.10 blur 3px       (CSS var --horizon-line-glow)
 *   · fade lateral con mask-image (15%-85%) para que la línea se desvanezca
 *     en los bordes y no se lea como un border duro.
 *
 * Uso esperado: SOLO entre secciones con tone distinto. Si dos
 * SectionWrapper consecutivos comparten tone, NO usar este divider —
 * el cambio tonal es lo que justifica el énfasis horizontal.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ Patrón:                                                     │
 * │   <SectionWrapper tone="bg">…</SectionWrapper>              │
 * │   <HorizonDivider />                                        │
 * │   <SectionWrapper tone="bg-deep">…</SectionWrapper>         │
 * └─────────────────────────────────────────────────────────────┘
 *
 * El componente NO añade ritmo vertical — vive entre secciones que
 * ya tienen su `spacing`. Su altura intrínseca es 1px (más el glow).
 *
 * Accesibilidad: decorativo. No se anuncia a screen readers
 * (`aria-hidden`). Bajo `prefers-contrast: more` la línea pierde
 * el fade y se vuelve sólida (regla en globals.css).
 */
interface HorizonDividerProps {
  /** Clases adicionales (margin overrides, etc.). Casos de uso raros. */
  className?: string;
}

export function HorizonDivider({ className }: HorizonDividerProps) {
  return (
    <div
      aria-hidden
      data-horizon-divider
      className={cn(
        "relative h-px w-full pointer-events-none",
        // Fade lateral: línea visible 15-85, transparente en los bordes
        "[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]",
        className,
      )}
      style={{
        background: "var(--horizon-line)",
        // Glow indigo soft via box-shadow vertical
        boxShadow: "0 0 3px 0 var(--horizon-line-glow)",
      }}
    />
  );
}
