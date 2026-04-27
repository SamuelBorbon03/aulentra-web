"use client";

import { useEffect, useState } from "react";
import { type AulentraSession, loadSession } from "@/lib/aulentra-auth";
import { AcademyView } from "@/components/espacio/AcademyView";

export default function AcademiaPage() {
  const [session, setSession] = useState<AulentraSession | null>(null);
  useEffect(() => { setSession(loadSession()); }, []);
  if (!session) return null;
  return (
    <div className="max-w-[1120px] mx-auto">
      <AcademyView session={session} />
    </div>
  );
}
