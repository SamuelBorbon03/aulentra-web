import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
import { Container } from "./Container";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  /** Tono de la sección (dark-mode). */
  tone?: "bg" | "bg-deep" | "card" | "elevated";
  spacing?: "sm" | "md" | "lg" | "xl";
  as?: "section" | "article" | "div";
  id?: string;
}

const toneClasses: Record<NonNullable<SectionWrapperProps["tone"]>, string> = {
  // bg = #151935 (fondo dominante)
  bg:       "bg-bg text-fg",
  // bg-deep = #101328 (sidebar/deep)
  "bg-deep": "bg-bg-deep text-fg",
  // card = #1D2145 (bloques / cards)
  card:     "bg-card text-fg",
  // elevated = #242852 (hover / superficies superiores)
  elevated: "bg-elevated text-fg",
};

const spacingClasses: Record<NonNullable<SectionWrapperProps["spacing"]>, string> = {
  sm: "py-8 md:py-10",
  md: "py-10 md:py-14",
  lg: "py-14 md:py-20",
  xl: "py-20 md:py-28",
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
