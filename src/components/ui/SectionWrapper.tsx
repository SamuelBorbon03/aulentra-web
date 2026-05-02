import { cn } from "@/lib/cn";
import type { CSSProperties, HTMLAttributes } from "react";
import { Container } from "./Container";

/**
 * SectionWrapper — superficie + ritmo vertical canónicos del sitio.
 *
 * Sprint C · A.6 · Spacing extendido:
 *   · flush  → py-0           (cuando el child controla padding propio · ej. heros con altura completa)
 *   · xs     → py-4 / md:6
 *   · sm     → py-8 / md:10
 *   · md     → py-10 / md:14
 *   · lg     → py-14 / md:20
 *   · xl     → py-20 / md:28
 *   · 2xl    → py-24 / md:32
 *
 * Uso esperado: 90% de las secciones interiores con `xl`. `flush` se reserva
 * para wrappers donde el componente hijo ya gestiona altura (heros con
 * min-h-[calc(100svh-Nrem)] o similares).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Sprint atmósfera · A+B+D · 2026-04-28 · prop `halo`
 * ──────────────────────────────────────────────────────────────────────────
 * Backward-compatible: `halo` por defecto es `false` — ninguna sección
 * existente recibe halo automáticamente. Sólo se activa en las secciones
 * declaradas explícitamente en el sprint A+B+D.
 *
 *   · false     → sin halo (default)
 *   · "default" → indigo · alpha section (0.055)
 *   · "hero"    → indigo · alpha hero    (0.085)
 *   · "closure" → cyan   · alpha closure (0.070)
 *
 * Exención automática: si `tone === "card" | "elevated"` el halo se ignora
 * (esos tones son bloques contenidos, no fondos atmósfera). En desarrollo
 * se emite `console.warn` para detectar declaraciones contradictorias.
 *
 * Implementación: ::before posicionado top-center (-10%), elipse 70vw×60vh
 * con max 1000×600px, radial-gradient con stops 0% / 60% / 100%.
 * Inline styles vía CSS vars (--halo-rgb, --halo-alpha) — los stops fijos
 * viven en el style del ::before generado por Tailwind arbitrary group.
 */
type Halo = false | "default" | "hero" | "closure";
type Tone = "bg" | "bg-deep" | "card" | "elevated";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  spacing?: "flush" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  as?: "section" | "article" | "div";
  id?: string;
  /** Halo radial atmosférico. Default `false`. */
  halo?: Halo;
}

const toneClasses: Record<Tone, string> = {
  bg:        "bg-bg text-fg",
  "bg-deep": "bg-bg-deep text-fg",
  card:      "bg-card text-fg",
  elevated:  "bg-elevated text-fg",
};

const spacingClasses: Record<NonNullable<SectionWrapperProps["spacing"]>, string> = {
  flush: "py-0",
  xs:    "py-4 md:py-6",
  sm:    "py-8 md:py-10",
  md:    "py-10 md:py-14",
  lg:    "py-14 md:py-20",
  xl:    "py-20 md:py-28",
  "2xl": "py-24 md:py-32",
};

/** Resolución de halo a (rgb-var, alpha-var). null si halo desactivado. */
function resolveHalo(halo: Halo): { rgb: string; alpha: string } | null {
  if (!halo) return null;
  if (halo === "closure") {
    return { rgb: "var(--halo-cyan)", alpha: "var(--halo-alpha-closure)" };
  }
  if (halo === "hero") {
    return { rgb: "var(--halo-primary)", alpha: "var(--halo-alpha-hero)" };
  }
  // "default"
  return { rgb: "var(--halo-primary)", alpha: "var(--halo-alpha-section)" };
}

export function SectionWrapper({
  className,
  tone = "bg",
  spacing = "md",
  as: Tag = "section",
  id,
  halo = false,
  children,
  style,
  ...props
}: SectionWrapperProps) {
  // Exención automática: card/elevated nunca reciben halo
  let effectiveHalo: Halo = halo;
  if (halo && (tone === "card" || tone === "elevated")) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[SectionWrapper] halo="${halo}" ignorado en tone="${tone}" — los tones card/elevated están exentos del sistema atmósfera.`,
      );
    }
    effectiveHalo = false;
  }

  const haloRes = resolveHalo(effectiveHalo);

  const haloStyle: CSSProperties | undefined = haloRes
    ? ({
        // Estas vars las consume la regla [data-halo]::before en globals
        ["--halo-rgb" as never]: haloRes.rgb,
        ["--halo-a" as never]: haloRes.alpha,
        ...style,
      } as CSSProperties)
    : style;

  return (
    <Tag
      id={id}
      data-halo={haloRes ? effectiveHalo : undefined}
      className={cn(
        toneClasses[tone],
        spacingClasses[spacing],
        haloRes && "relative isolate halo-section",
        className,
      )}
      style={haloStyle}
      {...props}
    >
      <Container>{children}</Container>
    </Tag>
  );
}
