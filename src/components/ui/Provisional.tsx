import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

/**
 * Provisional — etiqueta sobria que marca contenido propuesto pendiente de
 * validación. Distingue copy elevado de docs oficiales vs propuesta interna.
 *
 * Sprint B-2 · 2026-04-27 — refactor a 4 variantes con `watermark` por
 * defecto. La pill dashed (legacy) queda accesible via `inline` / `block`
 * para call sites que aún la requieran, pero el patrón nuevo es el watermark
 * en esquina superior derecha del contenedor con `position: relative`.
 */

type Variant = "watermark" | "eyebrow-suffix" | "inline" | "block";

interface ProvisionalProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `watermark`        — esquina superior derecha del contenedor padre.
   * `eyebrow-suffix`   — sufijo inline al final del eyebrow.
   * `inline` / `block` — legacy pill dashed.
   */
  variant?: Variant;
  /** Solo aplica a `watermark`: añade un AlertCircle 10×10 antes del texto. */
  withIcon?: boolean;
}

export function Provisional({
  className,
  variant = "watermark",
  withIcon = false,
  children,
  ...props
}: ProvisionalProps) {
  const a11y = {
    role: "note",
    "aria-label": "Contenido provisional, sujeto a revisión",
  } as const;

  if (variant === "watermark") {
    return (
      <span
        {...a11y}
        className={cn(
          // posición · esquina superior derecha del contenedor padre (requiere relative)
          "pointer-events-none absolute z-10 inline-flex items-center",
          "top-3 right-3 md:top-4 md:right-4",
          // tipografía · uppercase, monospace, weight medio, leading apretado
          "font-mono uppercase font-medium leading-none",
          "text-[9px] tracking-[0.28em] md:text-[10px] md:tracking-[0.32em]",
          // color sin caja
          "text-fg/30",
          // gap interno cuando lleva icono
          withIcon ? "gap-1 md:gap-1.5" : undefined,
          className
        )}
        {...props}
      >
        {withIcon && <AlertCircleGlyph />}
        {children ?? "Provisional"}
      </span>
    );
  }

  if (variant === "eyebrow-suffix") {
    return (
      <span
        {...a11y}
        className={cn("italic text-fg/35", className)}
        {...props}
      >
        {" · "}
        {children ?? "provisional"}
      </span>
    );
  }

  // legacy · pill dashed (variant === "inline" | "block")
  return (
    <span
      {...a11y}
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        "border border-dashed border-fg/30 text-fg/55 bg-fg/[0.03]",
        variant === "inline" && "ml-2 align-middle",
        variant === "block" && "mb-3",
        className
      )}
      {...props}
    >
      {children ?? "Provisional"}
    </span>
  );
}

/**
 * AlertCircleGlyph — círculo con exclamación en SVG inline. Evita dependencia
 * extra (lucide-react no está en este bundle Aulentra) y mantiene control
 * fino sobre stroke/size. 10×10 final, strokeWidth 1.5.
 */
function AlertCircleGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
