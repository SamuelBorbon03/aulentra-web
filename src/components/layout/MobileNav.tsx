"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_LINKS, NAV_CTA } from "./nav-config";
import { MobileLoginPanel } from "./MobileLoginPanel";

/**
 * MobileNav — botón hamburger + card flotante.
 * La card baja desde cerca del botón, ocupa ancho compacto (~380px o full en pantallas chicas)
 * y NO es un drawer a pantalla completa. Cierra al navegar, Escape, click afuera.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-nav-card"
        className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-fg hover:text-primary transition-colors"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="5" y1="5"  x2="17" y2="17" />
            <line x1="17" y1="5" x2="5"  y2="17" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="3" y1="6"  x2="19" y2="6" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" />
          </svg>
        )}
      </button>

      {/* Backdrop — oscurece la página detrás de la card */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-bg-deep/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Card flotante */}
      <div
        id="mobile-nav-card"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={cn(
          "md:hidden fixed z-50 top-[5rem] right-4 left-4 sm:left-auto sm:w-[380px]",
          "origin-top-right transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col max-h-[calc(100dvh-6rem)] rounded-card bg-card border border-primary/20 overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(165,180,252,0.08)] ring-1 ring-primary/5">
          {/* Banda Horizon */}
          <div className="h-[2px] bg-horizon-gradient shrink-0" />

          {/* Header compacto */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-line-soft shrink-0">
            <span className="font-mono text-caption uppercase tracking-[0.22em] text-primary">
              Menú
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="inline-flex items-center justify-center w-8 h-8 -mr-1 text-fg-soft hover:text-primary transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="5" y1="5"  x2="15" y2="15" />
                <line x1="15" y1="5" x2="5"  y2="15" />
              </svg>
            </button>
          </div>

          {/* Scroll body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <nav aria-label="Navegación principal mobile" className="flex flex-col px-3 py-2">
              <Link
                href="/"
                className={cn(
                  "px-3 py-3 rounded-md text-body font-medium transition-colors",
                  pathname === "/" ? "text-primary bg-primary-light" : "text-fg hover:bg-hover"
                )}
              >
                Inicio
              </Link>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-3 rounded-md text-body font-medium transition-colors",
                      active ? "text-primary bg-primary-light" : "text-fg hover:bg-hover"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-5 pb-2">
              <Link
                href={NAV_CTA.href}
                className="flex items-center justify-center w-full px-5 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-small"
              >
                {NAV_CTA.label}
              </Link>
            </div>

            <div className="px-5 pb-5">
              <MobileLoginPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
