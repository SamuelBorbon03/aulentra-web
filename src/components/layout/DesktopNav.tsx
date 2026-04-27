"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_GROUPS, type NavGroup, type NavItem } from "./nav-config";

/**
 * DesktopNav — navegación central con dropdowns SaaS.
 * - Apertura por hover con delay de cierre (evita parpadeo al cruzar el gap).
 * - Fade + slide en apertura.
 * - Items comingSoon renderizados como texto muted + badge, no clickeables.
 * - Cierre al perder foco (keyboard users) y al hacer click fuera.
 */
export function DesktopNav() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openGroup = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveGroup(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveGroup(null), 140);
  };

  // Cierre con Escape
  useEffect(() => {
    if (!activeGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveGroup(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeGroup]);

  return (
    <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
      {NAV_GROUPS.map((group) => (
        <NavGroupItem
          key={group.label}
          group={group}
          isOpen={activeGroup === group.label}
          onOpen={() => openGroup(group.label)}
          onClose={scheduleClose}
        />
      ))}
    </nav>
  );
}

function NavGroupItem({
  group,
  isOpen,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const hasActive = group.items.some(
    (i) => i.href && (pathname === i.href || pathname.startsWith(`${i.href}/`))
  );

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(e) => {
        // Solo cerrar si el foco sale del grupo completo (no por foco entre items)
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-small font-medium transition-colors",
          hasActive || isOpen ? "text-fg" : "text-fg/75 hover:text-fg"
        )}
      >
        <span>{group.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn(
            "transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-60",
            isOpen && "rotate-180 opacity-100"
          )}
        >
          <polyline points="2.5,3.75 5,6.25 7.5,3.75" />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        role="menu"
        aria-label={group.label}
        className={cn(
          "absolute left-0 top-full pt-3 min-w-[340px] z-50",
          "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "rounded-card bg-card border border-line-soft overflow-hidden",
            "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(165,180,252,0.05)]",
            "ring-1 ring-primary/5"
          )}
        >
          <div className="h-[1px] bg-horizon-gradient-soft" aria-hidden="true" />
          <div className="p-2">
            {group.items.map((item) => (
              <NavDropdownItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavDropdownItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active =
    item.href !== undefined && (pathname === item.href || pathname.startsWith(`${item.href}/`));

  // Ítem "Próximamente" — no clickeable, visual muted, badge al costado
  if (item.comingSoon || !item.href) {
    return (
      <div
        aria-disabled="true"
        className="flex flex-col gap-1 px-4 py-3 rounded-md cursor-not-allowed opacity-55"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-small font-semibold text-fg">{item.label}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted border border-line-soft rounded-pill px-2 py-0.5">
            Próximamente
          </span>
        </div>
        {item.description && (
          <span className="text-caption text-muted leading-snug">{item.description}</span>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      role="menuitem"
      className={cn(
        "flex flex-col gap-1 px-4 py-3 rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-fg hover:bg-bg-deep/60 hover:text-primary"
      )}
    >
      <span className="text-small font-semibold">{item.label}</span>
      {item.description && (
        <span className={cn("text-caption leading-snug", active ? "text-primary/80" : "text-fg-soft")}>
          {item.description}
        </span>
      )}
    </Link>
  );
}
