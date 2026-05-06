"use client";

import { useEffect } from "react";

/**
 * AtmosphereProvider — Inyecta variables globales reactivas al cursor.
 *
 * Captura la posición del ratón y actualiza las variables CSS `--mouse-x`
 * y `--mouse-y` en el documentElement. Esto permite que cualquier elemento
 * (halos radiales, spotlights) responda al cursor de forma eficiente.
 *
 * Mejora 2026-05-05 — Interpolación lineal (lerp):
 *   En lugar de actualizar la posición del cursor en cada frame directamente,
 *   el sistema usa lerp (Linear Interpolation) con factor 0.08 por frame.
 *   Resultado: el spotlight "persigue" al cursor con un lag suave de ~150ms.
 *   Este es el efecto de "luz flotante" característico de webs premium
 *   como Vercel, Linear y Stripe. La diferencia con el ojo humano es inmediata.
 *
 *   lerp(a, b, t) = a + (b - a) * t
 *   Con t=0.08 y 60fps, el spotlight alcanza el 99% de la posición en ~75 frames (~1.25s)
 *   pero se siente fluido a partir del primer frame.
 */
export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Solo activamos en desktop para no interferir con touch
    if (!window.matchMedia("(min-width: 768px)").matches) {
      // En mobile: posición fija en el centro
      document.documentElement.style.setProperty("--mouse-x", "50%");
      document.documentElement.style.setProperty("--mouse-y", "30%");
      return;
    }

    // Posición objetivo (donde está el cursor)
    let targetX = 50;
    let targetY = -10;

    // Posición actual (la que se aplica al CSS — sigue al cursor con lerp)
    let currentX = 50;
    let currentY = -10;

    // Factor de interpolación — 0.08 = lag suave (~150ms de retraso perceptible)
    const LERP_FACTOR = 0.08;

    let rafId: number;
    let isRunning = false;

    // Captura la posición objetivo en cada mousemove
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;

      // Arrancar el loop si no está corriendo
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Loop de animación: interpola la posición actual hacia la objetivo
    const tick = () => {
      // lerp suave
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;

      document.documentElement.style.setProperty("--mouse-x", `${currentX}%`);
      document.documentElement.style.setProperty("--mouse-y", `${currentY}%`);

      // Continuar el loop si hay movimiento significativo
      const deltaX = Math.abs(targetX - currentX);
      const deltaY = Math.abs(targetY - currentY);

      if (deltaX > 0.05 || deltaY > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    // Inicializar en posición central
    document.documentElement.style.setProperty("--mouse-x", "50%");
    document.documentElement.style.setProperty("--mouse-y", "-10%");

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
