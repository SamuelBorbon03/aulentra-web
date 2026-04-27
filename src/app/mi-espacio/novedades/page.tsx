"use client";

import { useEffect, useState } from "react";
import { type AulentraSession, loadSession } from "@/lib/aulentra-auth";
import { NewsFeed } from "@/components/espacio/NewsFeed";

export default function NovedadesPage() {
  const [session, setSession] = useState<AulentraSession | null>(null);
  useEffect(() => { setSession(loadSession()); }, []);
  if (!session) return null;
  return (
    <div className="max-w-[1120px] mx-auto">
      <NewsFeed />
    </div>
  );
}
