import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface ProvisionalProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tamaño del label. `inline` = baseline con texto; `block` = línea propia. */
  variant?: "inline" | "block";
}

/**
 * Provisional — label dashed muted que marca contenido propuesto pendiente
 * de validación. Distingue qué texto viene de docs oficiales vs propuesta
 * de Claude.
 */
export function Provisional({
  className,
  variant = "inline",
  children = "Provisional",
  ...props
}: ProvisionalProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        "border border-dashed border-fg/30 text-fg/55 bg-fg/[0.03]",
        variant === "inline" && "ml-2 align-middle",
        variant === "block" && "mb-3",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
