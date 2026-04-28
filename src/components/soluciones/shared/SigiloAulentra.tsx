import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * SigiloAulentra — primitive: isotipo Aulentra con halo radial atmosférico.
 *
 * Sprint C · D · 2026-04-28. Patrón extraído de IdentityDeclaration y reusado
 * en cierres de /soluciones/instituciones y /soluciones/formadores.
 *
 * Composición fija:
 *   · halo radial (rgba primary-light → accent-cyan-light → transparent)
 *   · sigilo PNG transparent + mask radial editorial (fade interno → fade externo)
 *
 * El tamaño se controla 100% con `style.width/height` o tailwind clases en `wrapperClassName`.
 * El halo siempre es 1.45× el sigilo.
 */
interface SigiloAulentraProps {
  /** Lado del sigilo en px o expresión clamp(). */
  size: string;
  /** Opacidad del sigilo. Default 0.18. */
  opacity?: number;
  /** Si true, agrega un pulso lento 4s scale 1→1.04. Respeta reduce-motion vía CSS global. */
  pulse?: boolean;
  /** Clases extra al wrapper (posicionamiento, etc.). */
  wrapperClassName?: string;
  /** Clases extra al halo. */
  haloClassName?: string;
}

export function SigiloAulentra({
  size,
  opacity = 0.18,
  pulse = false,
  wrapperClassName,
  haloClassName,
}: SigiloAulentraProps) {
  return (
    <div
      aria-hidden
      className={cn("relative flex items-center justify-center pointer-events-none", wrapperClassName)}
      style={{ width: size, height: size }}
    >
      {/* Halo radial · 1.45× el sigilo, centrado */}
      <div
        className={cn("absolute pointer-events-none", haloClassName)}
        style={{
          width: `calc(${size} * 1.45)`,
          height: `calc(${size} * 1.45)`,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(103,232,249,0.025) 40%, transparent 72%)",
        }}
      />
      {/* Sigilo PNG transparent · mask radial editorial */}
      <div
        className={cn("relative w-full h-full", pulse && "animate-sigilo-pulse")}
        style={{
          opacity,
          maskImage:
            "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.45) 65%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.45) 65%, transparent 90%)",
        }}
      >
        <Image
          src="/brand/aulentra_symbol_transparent.png"
          alt=""
          width={720}
          height={720}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
