"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { type AulentraSession } from "@/lib/aulentra-auth";
import { roleLabel } from "@/lib/aulentra-mock-data";

interface Props {
  session: AulentraSession;
  onLogout: () => void;
}

/**
 * Top bar de Mi espacio — izquierda wordmark Aulentra, centro chip contextual
 * (institución/formador), derecha avatar con menú.
 */
export function MiEspacioTopBar({ session, onLogout }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const { data } = session;
  const isInstitution = data.kind === "institution";
  const contextLabel =
    data.kind === "institution" ? data.institution.name : "Formador particular";
  const contextSub =
    data.kind === "institution"
      ? `${roleLabel(data.role)} · ${data.cargo}`
      : data.tagline;

  return (
    <header className="sticky top-0 z-30 bg-bg-deep/95 backdrop-blur-md border-b border-line-soft">
      <div className="h-16 px-5 md:px-8 flex items-center justify-between gap-4">
        <Link href="/mi-espacio" aria-label="Mi espacio · Inicio" className="inline-flex items-center shrink-0">
          <Wordmark tone="fg" size="sm" withSymbol />
        </Link>

        {/* Contexto de perfil — visible en md+ para no saturar mobile */}
        <div className="hidden md:flex items-center gap-3 min-w-0">
          <div className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center text-white font-semibold text-small shrink-0",
            isInstitution ? "bg-horizon-gradient" : "bg-horizon-gradient-soft"
          )}>
            {session.user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-small font-semibold text-fg truncate leading-tight tracking-normal normal-case">
              {contextLabel}
            </p>
            <p className="text-caption text-fg-soft truncate tracking-normal normal-case">
              {contextSub}
            </p>
          </div>
        </div>

        {/* Avatar + menú */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={cn(
              "inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-pill border transition-colors",
              menuOpen ? "border-primary/40 bg-primary-light" : "border-line hover:border-primary/30"
            )}
          >
            <span className="w-8 h-8 rounded-full bg-elevated border border-primary/40 flex items-center justify-center text-primary font-semibold text-small">
              {session.user.initials}
            </span>
            <span className="hidden sm:inline text-small text-fg font-medium max-w-[140px] truncate tracking-normal normal-case">
              {session.user.name}
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("text-fg-soft transition-transform duration-300", menuOpen && "rotate-180")}>
              <polyline points="2,3.5 5,6.5 8,3.5" />
            </svg>
          </button>

          <div
            role="menu"
            className={cn(
              "absolute right-0 top-full mt-2 w-[280px] origin-top-right",
              "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              menuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <div className="rounded-lg bg-elevated border border-primary/20 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-primary/5 overflow-hidden">
              <div className="h-[2px] bg-horizon-gradient" />

              <div className="p-4 border-b border-line-soft">
                <p className="text-small font-semibold text-fg truncate">{session.user.name}</p>
                <p className="text-caption text-fg-soft truncate tracking-normal normal-case">
                  {session.user.email}
                </p>

                {/* Chip contexto — visible aquí para mobile */}
                <div className="mt-3 md:hidden inline-flex items-center gap-2">
                  <span className={cn(
                    "w-6 h-6 rounded-[4px] flex items-center justify-center text-white font-semibold text-[9pt]",
                    isInstitution ? "bg-horizon-gradient" : "bg-horizon-gradient-soft"
                  )}>
                    {session.user.initials}
                  </span>
                  <span className="text-caption text-fg-soft tracking-normal normal-case">
                    {contextLabel}
                  </span>
                </div>
              </div>

              <div className="py-2">
                <MenuItem disabled>Mi perfil</MenuItem>
                <MenuItem disabled>Preferencias</MenuItem>
              </div>
              <div className="border-t border-line-soft py-2">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-small text-fg-soft hover:text-primary hover:bg-primary-light transition-colors tracking-normal normal-case"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuItem({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={disabled ? "Disponible pronto" : undefined}
      className={cn(
        "w-full text-left px-4 py-2 text-small transition-colors tracking-normal normal-case",
        disabled ? "text-muted cursor-not-allowed" : "text-fg-soft hover:text-primary hover:bg-primary-light"
      )}
    >
      {children}
      {disabled && <span className="ml-2 text-[9pt] text-muted">· pronto</span>}
    </button>
  );
}
