"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Layer {
  readonly n: string;
  readonly title: string;
  readonly brief: string;
  readonly body: string;
}

interface CapasSectionProps {
  layers: readonly Layer[];
  helper: string;
}

/**
 * CapasSection — timeline interactiva de las 5 capas de Aulentra.
 * Cada capa muestra siempre número + título + brief; click expande
 * el detalle abajo. Click otra vez o en otra capa cambia el panel.
 *
 * Mismo patrón que CycleSection de Noventor pero con tokens Aulentra
 * (primary horizon-gradient-soft).
 */
export function CapasSection({ layers, helper }: CapasSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayer = activeIndex !== null ? layers[activeIndex] : null;

  return (
    <>
      <p className="text-small text-fg/45 italic mb-8">{helper}</p>

      <div
        role="tablist"
        aria-label="Capas del sistema Aulentra"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8"
      >
        {layers.map((s, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={s.n}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="capas-detail-panel"
              onClick={() => setActiveIndex(isActive ? null : i)}
              className={cn(
                "group text-left pt-4 border-t-2 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm",
                isActive
                  ? "border-primary"
                  : "border-primary/40 hover:border-primary/80"
              )}
            >
              <div
                className={cn(
                  "font-mono text-caption tracking-wider mb-2 transition-colors",
                  isActive ? "text-primary" : "text-primary/75"
                )}
              >
                {s.n}
              </div>
              <div className="text-h3 font-bold mb-2 leading-tight text-fg">
                {s.title}
              </div>
              <p className="text-small text-fg/60 leading-relaxed">
                {s.brief}
              </p>
            </button>
          );
        })}
      </div>

      <div
        id="capas-detail-panel"
        role="region"
        aria-live="polite"
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin-top] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
          activeLayer
            ? "grid-rows-[1fr] opacity-100 mt-8"
            : "grid-rows-[0fr] opacity-0 mt-0"
        )}
      >
        <div className="overflow-hidden">
          {activeLayer && (
            <div
              key={activeLayer.n}
              className="relative p-6 md:p-8 rounded-card bg-card border border-primary/30 animate-fade-in-up"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-horizon-gradient-soft" />

              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-caption text-primary tracking-wider">
                    {activeLayer.n}
                  </span>
                  <span className="text-h2 font-bold text-fg">
                    {activeLayer.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Cerrar detalle"
                  className="text-fg/55 hover:text-primary transition-colors text-body leading-none p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-body text-fg leading-relaxed max-w-[780px]">
                {activeLayer.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
