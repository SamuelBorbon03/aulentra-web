"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección "Triada" — Sprint C · C.1 · 2026-04-28.
 *
 * Tres distinciones que separan a Aulentra de cualquier herramienta SaaS
 * educativa. Vive entre IdentityDeclaration (qué es) y DualPlatform
 * (para quién), justo donde el lector pregunta "¿en qué se diferencia?".
 *
 * Tono: editorial, declarativo. NO listas de features.
 * Layout: grid 1×3 desktop · 1 columna mobile · top-borders dibujados al entrar.
 *
 * Mejora visual 2026-05-05:
 *   El border-t de cada distinción ya no es estático. Se dibuja de izquierda
 *   a derecha con la clase `.border-draw` al entrar en el viewport, reforzando
 *   la sensación de que el sistema "se construye" ante el usuario.
 */

const DISTINCIONES = [
  {
    title: "Estructura, no agregados.",
    body: "Un solo sistema. Una solución total.",
  },
  {
    title: "Operación, no digitalización.",
    body: "Aulentra no copia tus procesos a una pantalla. Los vuelve sistema.",
  },
  {
    title: "Infraestructura, no aplicación.",
    body: "Tu institución opera en sincronía con Aulentra, no fuera de ella.",
  },
];

/** Distinción individual con border animado */
function Distincion({
  title,
  body,
  delay,
}: {
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeta prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={delay}>
      <div ref={ref} className="relative pt-6">
        {/* Borde superior animado — se dibuja de izquierda a derecha */}
        <div
          className={`absolute top-0 left-0 h-px w-full bg-gradient-to-r from-primary/60 via-line-soft to-transparent border-draw ${
            visible ? "border-draw-active" : ""
          }`}
          style={{ animationDelay: `${delay + 100}ms` }}
        />
        <h3 className="text-h3 font-semibold text-text-strong mb-3">
          {title}
        </h3>
        <p className="text-body text-text-muted leading-relaxed">{body}</p>
      </div>
    </Reveal>
  );
}

export function Triada() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <span className="block h-px w-6 bg-primary shrink-0" aria-hidden="true" />
          <span className="text-small font-semibold uppercase tracking-[0.22em] text-primary">
            ¿Cómo Pensamos?
          </span>
        </div>
      </Reveal>
      <Reveal delay={120} blur>
        <h2 className="text-display-md md:text-display font-bold tracking-[-0.025em] mb-20 max-w-[920px]">
          Tres distinciones que separan a Aulentra de cualquier otra herramienta.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {DISTINCIONES.map((item, i) => (
          <Distincion
            key={item.title}
            title={item.title}
            body={item.body}
            delay={200 + i * 80}
          />
        ))}
      </div>
    </div>
  );
}
