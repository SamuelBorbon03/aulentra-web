"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_GROUPS, NAV_CTA, NAV_LOGIN, type NavItem } from "./nav-config";

/**
 * MobileNav — botón hamburger + card flotante con acordeones por grupo.
 * La card baja desde cerca del botón, ocupa ancho compacto y NO es un drawer full-screen.
 * Cierra al navegar, Escape o click afuera.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setExpandedGroup(null);
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

  const toggleGroup = (label: string) =>
    setExpandedGroup((cur) => (cur === label ? null : label));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-nav-card"
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-fg hover:text-primary transition-colors"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="5" y1="5" x2="17" y2="17" />
            <line x1="17" y1="5" x2="5" y2="17" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="3" y1="6" x2="19" y2="6" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-bg-deep/70 backdrop-blur-sm transition-opacity duration-300",
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
          "lg:hidden fixed z-50 top-[5rem] right-4 left-4 sm:left-auto sm:w-[400px]",
          "origin-top-right transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col max-h-[calc(100dvh-6rem)] rounded-card bg-card border border-primary/20 overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(165,180,252,0.08)] ring-1 ring-primary/5">
          <div className="h-[2px] bg-horizon-gradient shrink-0" />

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
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Inicio */}
            <nav aria-label="Navegación principal mobile" className="flex flex-col px-3 pt-3 pb-2">
              <Link
                href="/"
                className={cn(
                  "px-3 py-3 rounded-md text-body font-medium transition-colors",
                  pathname === "/" ? "text-primary bg-primary-light" : "text-fg hover:bg-hover"
                )}
              >
                Inicio
              </Link>

              {/* Grupos con acordeón */}
              {NAV_GROUPS.map((group) => {
                const expanded = expandedGroup === group.label;
                return (
                  <div key={group.label} className="border-t border-line-soft/40 first:border-t-0 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.label)}
                      aria-expanded={expanded}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-md text-body font-medium text-fg hover:bg-hover transition-colors"
                    >
                      <span>{group.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-200 opacity-60",
                          expanded && "rotate-180 opacity-100"
                        )}
                      >
                        <polyline points="3,4.5 6,7.5 9,4.5" />
                      </svg>
                    </button>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-4 pb-2 pt-1 flex flex-col gap-0.5">
                          {group.items.map((item) => (
                            <MobileNavItem key={item.label} item={item} pathname={pathname} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* CTA + Acceder */}
            <div className="px-5 pt-3 pb-2 flex flex-col gap-2 border-t border-line-soft">
              <Link
                href={NAV_CTA.href}
                className="flex items-center justify-center w-full px-5 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-small"
              >
                {NAV_CTA.label}
              </Link>
              <Link
                href={NAV_LOGIN.href}
                className="flex items-center justify-center w-full px-5 py-3 rounded-md border border-line-strong text-fg font-medium text-small hover:border-primary hover:text-primary transition-colors"
              >
                {NAV_LOGIN.label}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function MobileNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  if (item.comingSoon || !item.href) {
    return (
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md opacity-55 cursor-not-allowed">
        <span className="text-small font-medium text-fg">{item.label}</span>
        <span className="font-mono text-micro uppercase text-muted border border-line-soft rounded-pill px-2 py-0.5 shrink-0">
          Próximamente
        </span>
      </div>
    );
  }

  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-3 py-2.5 rounded-md text-small transition-colors",
        active
          ? "text-primary bg-primary/10 font-semibold pl-4 border-l-2 border-primary"
          : "text-fg-soft hover:text-primary hover:bg-hover",
      )}
    >
      {item.label}
    </Link>
  );
}
