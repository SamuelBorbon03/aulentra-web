"use client";

import { useEffect, useState } from "react";
import { type AulentraSession, loadSession } from "@/lib/aulentra-auth";
import { LaunchpadHero } from "@/components/espacio/LaunchpadHero";
import { SubscriptionCard } from "@/components/espacio/SubscriptionCard";

/**
 * Home de "Mi espacio Aulentra" — bloques 1 + 2.
 * Bloque 1: Launchpad (hero con CTA dominante "Entrar a Aulentra").
 * Bloque 2: Suscripción y facturación (variante según perfil).
 */
export default function MiEspacioHomePage() {
  const [session, setSession] = useState<AulentraSession | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  if (!session) return null;

  return (
    <div className="max-w-[1120px] mx-auto space-y-10 md:space-y-12">
      <LaunchpadHero session={session} />
      <SubscriptionCard session={session} />
    </div>
  );
}
