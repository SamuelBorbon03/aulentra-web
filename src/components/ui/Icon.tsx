import {
  AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Check, Info,
  // ─── Sprint C · D · ampliación PARTE D ───
  // users-round → marcadores "intervención humana" en /soluciones/instituciones (Implementación)
  // users / book-open / clipboard-check / mail → grid 2×2 capacidades en /soluciones/formadores
  UsersRound, Users, BookOpen, ClipboardCheck, Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Icon — wrapper canónico sobre Lucide.
 *
 * Sprint C · A.4 · Whitelist explícita: solo iconos pre-aprobados pueden
 * importarse. Cualquier nuevo ícono debe agregarse aquí (tabla cerrada),
 * NO importarse directamente desde "lucide-react" en call sites.
 *
 * Reemplaza:
 *   · SVGs inline ad-hoc
 *   · Unicode usado como ícono (●, →, ✕)
 *   · Variantes ligeramente distintas del mismo símbolo
 *
 * Coherencia visual: stroke 1.75px en todas las medidas.
 */
const ICONS = {
  "alert-circle":   AlertCircle,
  "alert-triangle": AlertTriangle,
  "arrow-left":     ArrowLeft,
  "arrow-right":    ArrowRight,
  "check":          Check,
  "info":           Info,
  // ─── PARTE D ─── (Sprint C · 2026-04-28)
  "users-round":      UsersRound,      // intervención humana · Instituciones · Implementación
  "users":            Users,           // capacidad Estudiantes · Formadores
  "book-open":        BookOpen,        // capacidad Programas y contenidos · Formadores
  "clipboard-check":  ClipboardCheck,  // capacidad Evaluación y seguimiento · Formadores
  "mail":             Mail,            // capacidad Comunicación con acudientes · Formadores
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  /** Solo medidas canónicas — evita escalas arbitrarias. */
  size?: 12 | 14 | 16 | 20 | 24;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 16,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  strokeWidth = 1.75,
}: IconProps) {
  const LucideIconComponent = ICONS[name];
  return (
    <LucideIconComponent
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden ? "true" : undefined}
      aria-label={ariaLabel}
      className={cn("flex-shrink-0", className)}
    />
  );
}
