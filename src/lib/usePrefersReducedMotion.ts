"use client";

import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion — Sprint C · C.5 · 2026-04-28.
 *
 * Hook que respeta `prefers-reduced-motion: reduce` del SO. Útil donde la
 * accesibilidad CSS (animation-duration: 0ms) no basta porque la transición
 * se controla con `setTimeout` en JS (p. ej. cross-fades por etapas en
 * /acceso, redirecciones diferidas).
 *
 * Patrón de uso:
 *   const reduceMotion = usePrefersReducedMotion();
 *   setTimeout(() => doRedirect(), reduceMotion ? 0 : 850);
 */
export function usePrefersReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduceMotion;
}
