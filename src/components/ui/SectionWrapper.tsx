import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
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
 */
interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  tone?: "bg" | "bg-deep" | "card" | "elevated";
  spacing?: "flush" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  as?: "section" | "article" | "div";
  id?: string;
}

const toneClasses: Record<NonNullable<SectionWrapperProps["tone"]>, string> = {
  // bg = #151935 (fondo dominante)
  bg:        "bg-bg text-fg",
  // bg-deep = #101328 (sidebar/deep)
  "bg-deep": "bg-bg-deep text-fg",
  // card = #1D2145 (bloques / cards)
  card:      "bg-card text-fg",
  // elevated = #242852 (hover / superficies superiores)
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

export function SectionWrapper({
  className,
  tone = "bg",
  spacing = "md",
  as: Tag = "section",
  id,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
      {...props}
    >
      <Container>{children}</Container>
    </Tag>
  );
}
