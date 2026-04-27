"use client";

import { useEffect, useState } from "react";
import { type AulentraSession, loadSession } from "@/lib/aulentra-auth";
import { SupportView } from "@/components/espacio/SupportView";

export default function SoportePage() {
  const [session, setSession] = useState<AulentraSession | null>(null);
  useEffect(() => { setSession(loadSession()); }, []);
  if (!session) return null;
  return (
    <div className="max-w-[1120px] mx-auto">
      <SupportView session={session} />
    </div>
  );
}
