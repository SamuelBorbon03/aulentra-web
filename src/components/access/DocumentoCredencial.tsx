"use client";

import { useEffect, useState } from "react";

/**
 * P3 · Documento credencial animado.
 *
 * Tarjeta institucional que se "imprime" línea por línea con typewriter effect.
 * Sello arc indigo→cyan se dibuja 360° al final.
 *
 * Variantes:
 *   · "fragment" — 4 líneas. Se usa en Fase 1 entre validación y recognizing (~600ms).
 *   · "full"     — 5 líneas + sello. Se usa en Fase 3 entre login y entering (~1000ms).
 *
 * Coherente con el documento institucional del home Identity (mismo lenguaje visual).
 */
export interface CredencialData {
  identificacion?: string;
  correo: string;
  institucion?: string;
  ubicacion?: string;
  estado?: string;
  dominio?: string;
}

interface DocumentoCredencialProps {
  variant: "fragment" | "full";
  data: CredencialData;
  /** Color de acento para el sello (gradient horizon por defecto) */
  accent?: string;
  /** Callback al terminar la animación completa */
  onComplete?: () => void;
}

export function DocumentoCredencial({
  variant,
  data,
  accent = "#A5B4FC",
  onComplete,
}: DocumentoCredencialProps) {
  const [revealedLines, setRevealedLines] = useState(0);
  const [sealRevealed, setSealRevealed] = useState(false);

  // Líneas según variante
  const lines: { k: string; v: string }[] =
    variant === "fragment"
      ? [
          { k: "Identificación", v: data.correo.split("@")[0] || "—" },
          { k: "Dominio", v: data.dominio || data.correo.split("@")[1] || "—" },
          { k: "Institución", v: data.institucion || "Reconociendo…" },
          { k: "Estado", v: data.estado || "Verificando" },
        ]
      : [
          { k: "Identificación", v: data.identificacion || data.correo.split("@")[0] || "—" },
          { k: "Correo", v: data.correo },
          { k: "Institución", v: data.institucion || "—" },
          { k: "Ubicación", v: data.ubicacion || "—" },
          { k: "Estado", v: data.estado || "Activo" },
        ];

  useEffect(() => {
    let cancelled = false;
    const lineDelay = variant === "fragment" ? 110 : 140;
    const timers: number[] = [];

    // Reveal cada línea con stagger
    lines.forEach((_, i) => {
      const t = window.setTimeout(() => {
        if (!cancelled) setRevealedLines(i + 1);
      }, lineDelay * (i + 1));
      timers.push(t);
    });

    if (variant === "full") {
      // Sello aparece tras la última línea
      const sealTimer = window.setTimeout(() => {
        if (!cancelled) setSealRevealed(true);
      }, lineDelay * (lines.length + 1));
      timers.push(sealTimer);

      // Callback tras sello + pausa final
      const completeTimer = window.setTimeout(() => {
        if (!cancelled && onComplete) onComplete();
      }, lineDelay * (lines.length + 1) + 700);
      timers.push(completeTimer);
    } else {
      // Fragment: callback tras última línea + pausa breve
      const completeTimer = window.setTimeout(() => {
        if (!cancelled && onComplete) onComplete();
      }, lineDelay * lines.length + 250);
      timers.push(completeTimer);
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [variant, onComplete, lines.length]);

  const isFragment = variant === "fragment";
  const widthClass = isFragment ? "w-[280px]" : "w-[340px]";
  const padding = isFragment ? "px-5 py-5" : "px-6 py-6";

  return (
    <div
      className={`relative ${widthClass} bg-card/80 backdrop-blur-sm border border-line-strong rounded-md overflow-hidden ${padding} animate-fade-in-up`}
      style={{
        boxShadow:
          "0 24px 48px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(165,180,252,0.08)",
        transform: "rotate(-2deg)",
      }}
      role="presentation"
      aria-hidden
    >
      {/* Top accent line · gradient horizon horizontal */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-horizon-gradient-h-soft" />

      {/* Header · Aulentra Credencial */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-line-soft">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
        >
          <circle cx="7" cy="7" r="5.5" fill="none" stroke={accent} strokeWidth="1" />
          <circle cx="7" cy="7" r="2.5" fill={accent} opacity="0.6" />
        </svg>
        <span className="font-mono text-micro uppercase text-primary">
          Aulentra · Credencial
        </span>
      </div>

      {/* Líneas con typewriter reveal */}
      <div className="space-y-2.5">
        {lines.map((line, i) => {
          const visible = i < revealedLines;
          return (
            <div
              key={line.k}
              className="flex items-baseline justify-between gap-3 transition-opacity duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(4px)",
                transition:
                  "opacity 200ms ease-out, transform 200ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span className="font-mono text-micro-xs uppercase text-text-muted flex-shrink-0">
                {line.k}
              </span>
              <span className="font-medium text-text-default text-right truncate font-mono text-micro">
                {line.v}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sello · solo en variant full */}
      {variant === "full" && (
        <div className="mt-5 pt-4 flex items-center justify-between border-t border-line-soft/50">
          <span className="font-mono text-micro-xs uppercase text-text-subtle">
            Firma ─────
          </span>
          <SealArc revealed={sealRevealed} />
        </div>
      )}
    </div>
  );
}

/**
 * Sello arc indigo→cyan que se dibuja 360° con stroke-dasharray animation.
 */
function SealArc({ revealed }: { revealed: boolean }) {
  return (
    <svg width="36" height="36" viewBox="0 0 60 60" aria-hidden>
      <defs>
        <linearGradient id="cred-seal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#67E8F9" />
        </linearGradient>
      </defs>
      {/* Círculo dashed exterior */}
      <circle
        cx="30"
        cy="30"
        r="22"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.8"
        strokeDasharray="2 1.5"
      />
      {/* Arc principal · animado con stroke-dasharray */}
      <path
        d="M 8 30 A 22 22 0 0 1 52 30 A 22 22 0 0 1 8 30"
        fill="none"
        stroke="url(#cred-seal-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 138,
          strokeDashoffset: revealed ? 0 : 138,
          transition: "stroke-dashoffset 480ms ease-out",
        }}
      />
      {/* Centro */}
      <circle
        cx="30"
        cy="30"
        r="6"
        fill="none"
        stroke="rgba(165,180,252,0.55)"
        strokeWidth="0.6"
      />
    </svg>
  );
}
