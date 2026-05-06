"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraBackground — Sistema de fondo atmosférico.
 *
 * ESTRATEGIA CORRECTA para fondos oscuros:
 *   - z-index alto (z-[100]) + mix-blend-mode: screen
 *   - Con blend-mode "screen", el color se SUMA al fondo en lugar de reemplazarlo.
 *     Sobre negro puro: screen(negro, color) = color. Sobre azul oscuro: suma el color.
 *   - pointer-events: none asegura que no bloquea clics ni hover.
 *   - Opacidades altas (0.5–0.7) porque screen sobre oscuro necesita intensidad para verse.
 *
 * Por qué falló la versión anterior:
 *   - z-index: 0 coloca la aurora DETRÁS de las secciones con fondo sólido.
 *     Los fondos bg/bg-deep (#151935 / #101328) son completamente opacos y la cubren.
 *   - Quitar mix-blend-screen SIN cambiar la estrategia no resuelve nada.
 */
export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Paralaje ultra sutil al mover el ratón — solo desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      requestAnimationFrame(() => {
        if (container) {
          container.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // z-[20]: encima del contenido de las secciones, debajo del Header (z-30 sticky).
    // pointer-events: none = no bloquea ningún clic ni hover del contenido.
    // mix-blend-mode: screen en cada nebulosa suma color al fondo oscuro sin tapar texto.
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[20]"
      aria-hidden="true"
    >
      {/* Capa de nebulosas con paralaje */}
      <div
        ref={containerRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-[1800ms] ease-out"
      >
        {/* Nebulosa 1 — Indigo amplia, arriba-izquierda · blend screen para sumar al oscuro */}
        <div
          className="absolute top-[5%] left-[5%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full animate-aurora-1"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.20) 0%, rgba(99, 102, 241, 0.05) 45%, rgba(99, 102, 241, 0) 70%)",
            filter: "blur(100px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Nebulosa 2 — Cyan, abajo-derecha */}
        <div
          className="absolute bottom-[5%] right-[3%] w-[38vw] h-[38vw] max-w-[580px] max-h-[580px] rounded-full animate-aurora-2"
          style={{
            background:
              "radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 45%, rgba(6, 182, 212, 0) 70%)",
            filter: "blur(110px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Nebulosa 3 — Indigo profunda, centro */}
        <div
          className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[65vw] h-[45vw] max-w-[1000px] max-h-[680px] rounded-full animate-aurora-3"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.03) 50%, rgba(99, 102, 241, 0) 75%)",
            filter: "blur(130px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Nebulosa 4 — Violeta central pulsante, scroll medio */}
        <div
          className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[42vw] h-[42vw] max-w-[640px] max-h-[640px] rounded-full animate-aurora-breathe"
          style={{
            background:
              "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.03) 50%, rgba(99, 102, 241, 0) 75%)",
            filter: "blur(90px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Spotlight principal — sigue al cursor, radio 350px (mitad) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, -20%), rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.01) 40%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Spotlight ambiental — aura difusa de 800px */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(99, 102, 241, 0.02) 0%, rgba(6, 182, 212, 0.01) 50%, transparent 80%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
