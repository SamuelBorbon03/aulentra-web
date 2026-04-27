"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { type Profile } from "@/lib/aulentra-auth";

interface NavItem {
  id: string;
  href: string;
  label: string;
  /** si está en un bloque futuro, marca el número del bloque pendiente */
  pendingBlock?: number;
  /** perfiles para los que este item aparece (undefined = todos) */
  onlyForProfiles?: Profile[];
}

/**
 * Sidebar de Mi espacio — 5 items alineados con el PDF propuesta.
 * Hoy: Inicio + Suscripción activos (bloques 1+2). Academia, Novedades, Soporte
 * quedan marcados "pronto" hasta construirse.
 */
const NAV: NavItem[] = [
  { id: "home", href: "/mi-espacio", label: "Inicio" },
  { id: "academy", href: "/mi-espacio/academia", label: "Academia Aulentra" },
  { id: "news", href: "/mi-espacio/novedades", label: "Novedades del producto" },
  { id: "support", href: "/mi-espacio/soporte", label: "Soporte" },
];

interface Props { profile: Profile }

export function MiEspacioSidebar({ profile }: Props) {
  const pathname = usePathname();
  const visible = NAV.filter((n) => !n.onlyForProfiles || n.onlyForProfiles.includes(profile));

  return (
    <aside className="hidden lg:block w-[240px] shrink-0 border-r border-line-soft min-h-[calc(100vh-4rem)] sticky top-16 self-start bg-bg-deep">
      <nav aria-label="Navegación de mi espacio" className="p-4 pt-6">
        <p className="px-3 mb-3 text-caption uppercase tracking-[0.18em] text-muted">
          Mi espacio
        </p>

        <ul className="space-y-0.5">
          {visible.map((item) => {
            const isHome = item.id === "home" || item.id === "subscription";
            const active = isHome ? pathname === "/mi-espacio" : pathname === item.href;
            const disabled = item.pendingBlock !== undefined;

            if (disabled) {
              return (
                <li key={item.id}>
                  <span
                    className="flex items-center justify-between px-3 py-2 rounded-md text-small text-muted cursor-not-allowed select-none tracking-normal normal-case"
                    title="Disponible pronto"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="text-[9pt] text-subtle shrink-0 ml-2">pronto</span>
                  </span>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-small transition-colors tracking-normal normal-case",
                    active
                      ? "bg-primary-light text-primary border border-primary/25"
                      : "text-fg-soft hover:text-primary hover:bg-primary-light/50 border border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 pt-5 border-t border-line-soft px-3">
          <p className="text-caption uppercase tracking-[0.18em] text-muted mb-2">Contexto</p>
          <p className="text-caption text-fg-soft leading-relaxed tracking-normal normal-case">
            {profile === "institution"
              ? "Estás en tu espacio institucional. La plataforma Aulentra se abre en una ventana aparte."
              : "Gestiona tu plan, accede a recursos y abre la plataforma Aulentra desde aquí."}
          </p>
        </div>
      </nav>
    </aside>
  );
}
