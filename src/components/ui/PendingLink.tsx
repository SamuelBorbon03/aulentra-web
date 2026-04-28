"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PendingLinkProps extends HTMLAttributes<HTMLSpanElement> {
  /** Texto del link sin destino activo. */
  children: ReactNode;
  /**
   * Tooltip nativo. Default: "Próximamente".
   * Usa `title` HTML estándar; no implementamos tooltip custom para
   * mantener el componente lean.
   */
  tooltip?: string;
}

/**
 * PendingLink — placeholder accesible para links institucionales sin
 * destino aún (Aviso legal, Privacidad, Términos, etc.).
 *
 * Sprint B-2 · 2026-04-27 — sustituye `href="#"` que el QA marcó como
 * dead-anchor. Hereda el styling de un link inactivo (cursor-not-allowed,
 * opacidad reducida) y expone `aria-disabled` para tecnologías de apoyo.
 *
 * Cuando exista la página real, migrar el call site a `<Link href="...">`.
 */
export function PendingLink({
  children,
  tooltip = "Próximamente",
  className,
  ...props
}: PendingLinkProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      title={tooltip}
      className={cn(
        "cursor-not-allowed select-none opacity-60 transition-opacity hover:opacity-80",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
