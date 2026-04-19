"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_LINKS, NAV_CTA } from "./nav-config";

/**
 * MobileNav — botón hamburger + drawer fullscreen.
 * Cierra al navegar, soporta Escape, bloquea scroll del body cuando abierto.
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
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-fg hover:text-primary transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="3" y1="6"  x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </svg>
      </button>

      <div
        onClick={() => setOpen(false)}
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-bg-deep/85 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "md:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px]",
          "bg-card border-l border-line",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-line">
          <span className="font-mono text-caption uppercase tracking-[0.32em] text-fg">
            Menú
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-fg hover:text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="4" y1="4"  x2="16" y2="16" />
              <line x1="16" y1="4" x2="4"  y2="16" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navegación principal mobile" className="flex flex-col gap-1 p-6">
          <Link
            href="/"
            className={cn(
              "text-h3 py-3 transition-colors",
              pathname === "/" ? "text-primary" : "text-fg hover:text-primary"
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
                  "text-h3 py-3 transition-colors",
                  active ? "text-primary" : "text-fg hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-6 pt-6 border-t border-line">
            <Link
              href={NAV_CTA.href}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-base"
            >
              {NAV_CTA.label}
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
