import { cn } from "@/lib/cn";

/**
 * Spinner — indicador de carga unificado.
 *
 * Sprint C · A.5 · Reemplaza ~5 SVG inline con `animate-spin` repartidos
 * por el flujo /acceso, /solicitar-acceso. Usa `currentColor`, así
 * el caller controla el tono via `text-*` o `style.color`.
 *
 * Track opacity configurable: el login institucional usa 0.35 (override
 * consciente para fondos gradient saturados); resto del sitio usa 0.25.
 */
export interface SpinnerProps {
  size?: 12 | 14 | 16 | 20 | 24;
  trackOpacity?: number;
  className?: string;
  "aria-label"?: string;
}

export function Spinner({
  size = 16,
  trackOpacity = 0.25,
  className,
  "aria-label": ariaLabel = "Cargando",
}: SpinnerProps) {
  return (
    <svg
      className={cn("animate-spin", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ariaLabel}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity={trackOpacity} />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
