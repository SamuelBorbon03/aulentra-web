"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * AnimatedPath — primitive: trazado SVG que se "dibuja" cuando entra en viewport.
 *
 * Sprint C · D · 2026-04-28. Aparece en 3 secciones de /soluciones:
 *   · Constelación institucional (líneas Bezier entre nodos)
 *   · Implementación supervisada (línea horizon entre 3 estaciones)
 *   · Crecimiento orgánico formador (curva ascendente)
 *
 * Implementa stroke-dasharray reveal usando el atributo `pathLength="1"` para
 * normalizar la longitud — evita medir cada path manualmente con getTotalLength().
 *
 * Respeta `prefers-reduced-motion`: si está activo, el trazado aparece pintado.
 */
interface AnimatedPathProps extends Omit<SVGProps<SVGPathElement>, "pathLength"> {
  /** Duración del trazado en ms. Default 1400. */
  duration?: number;
  /** Delay antes de empezar a dibujar. Default 0. */
  delay?: number;
  /** Threshold del IntersectionObserver. Default 0.2. */
  threshold?: number;
}

export function AnimatedPath({
  duration = 1400,
  delay = 0,
  threshold = 0.2,
  style,
  ...rest
}: AnimatedPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, threshold]);

  return (
    <path
      ref={ref}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={drawn ? 0 : 1}
      style={{
        transition: reduceMotion
          ? "none"
          : `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    />
  );
}
