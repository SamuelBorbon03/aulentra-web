"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type AulentraSession,
  loadSession,
  clearSession,
} from "@/lib/aulentra-auth";
import { MiEspacioTopBar } from "@/components/espacio/MiEspacioTopBar";
import { MiEspacioSidebar } from "@/components/espacio/MiEspacioSidebar";

// Cambiar a true para reactivar Mi Espacio cuando se decida continuar con este módulo
const MI_ESPACIO_ENABLED = false;

/**
 * Layout de "Mi espacio Aulentra" (post-login).
 * - Gate client-side: si no hay sesión mock, redirige a /.
 * - Oculta Header/Footer público via pathname check en esos componentes.
 * - Provee topbar contextual + sidebar con los 5 bloques del PDF propuesta.
 */
export default function MiEspacioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<AulentraSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!MI_ESPACIO_ENABLED) {
      router.replace("/");
      return;
    }
    const s = loadSession();
    if (!s) {
      router.replace("/");
      return;
    }
    setSession(s);
    setHydrated(true);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  if (!hydrated || !session) {
    return (
      <div className="min-h-screen bg-bg-deep flex items-center justify-center">
        <div className="flex items-center gap-3 text-fg-soft text-small tracking-normal normal-case">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Cargando tu espacio…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-deep">
      <MiEspacioTopBar session={session} onLogout={handleLogout} />
      <div className="flex">
        <MiEspacioSidebar profile={session.user.profile} />
        <main className="flex-1 min-w-0 px-5 md:px-10 py-8 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
