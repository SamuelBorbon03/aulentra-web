/**
 * Lógica mock de autenticación Aulentra — compartida entre desktop (UserMenu)
 * y mobile (MobileLoginPanel). Simulación visual; Fase 2 reemplaza por backend real.
 *
 * Recuperación con dos niveles de exigencia vía cantidad de datos solicitados:
 *  - Institución: email + nombre completo + nombre de la institución
 *  - Formador particular: solo email (flujo estándar)
 */

import {
  type AulentraProfile,
  resolveProfileByEmail,
  userInitials as deriveInitials,
} from "./aulentra-mock-data";

export type Profile = "institution" | "independent";

export interface AuthenticatedUser {
  name: string;
  email: string;
  profile: Profile;
  institutionName?: string;
}

export type AuthState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: "invalid" | "not_found" | "wrong_tab" | "empty"; suggestedTab?: Profile }
  | { kind: "authenticated"; user: AuthenticatedUser }
  | { kind: "recovery" }
  | { kind: "recovery_loading" }
  | { kind: "recovery_error"; message: "empty" | "invalid" | "not_found" }
  | { kind: "recovery_sent"; email: string; profile: Profile; institutionName?: string };

/**
 * Detecta si el email pertenece al universo institucional.
 * "edu" en cualquier segmento del dominio (.edu, .edu.co, .edu.mx, etc.)
 */
export function mockLookup(email: string): { profile: Profile; institutionName?: string } | null {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  const parts = trimmed.split("@")[1].split(".");
  if (parts.includes("edu")) {
    const orgBase = parts[0];
    const institutionName = orgBase.charAt(0).toUpperCase() + orgBase.slice(1);
    return { profile: "institution", institutionName };
  }
  return { profile: "independent" };
}

export function displayName(email: string): string {
  const base = email.split("@")[0].split(/[.\-_]/)[0] ?? "Usuario";
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/**
 * Sesión extendida usada por "Mi espacio" post-login.
 * Persiste en localStorage para sobrevivir recargas. Fase 2 reemplaza por cookie
 * httpOnly + JWT verificado en servidor.
 */
export interface AulentraSession {
  user: {
    name: string;
    email: string;
    initials: string;
    profile: Profile;
  };
  data: AulentraProfile;
}

const SESSION_STORAGE_KEY = "aulentra.session";

/**
 * Construye una AulentraSession completa a partir del email + perfil detectado
 * por el login. Si hay datos en el seed (PDF), se usan; si no, genera perfil
 * genérico para que la demo nunca se rompa.
 */
export function buildSessionFromLogin(email: string, profile: Profile): AulentraSession | null {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;

  const seed = resolveProfileByEmail(trimmed);
  if (seed) {
    return {
      user: {
        name: seed.fullName,
        email: trimmed,
        initials: deriveInitials(seed.fullName),
        profile: seed.kind === "institution" ? "institution" : "independent",
      },
      data: seed,
    };
  }

  // Fallback genérico para emails no semillados
  const derivedName = displayName(trimmed);
  if (profile === "institution") {
    const domain = trimmed.split("@")[1];
    const base = domain.split(".")[0];
    const instName = base.charAt(0).toUpperCase() + base.slice(1);
    return {
      user: { name: derivedName, email: trimmed, initials: deriveInitials(derivedName), profile },
      data: {
        kind: "institution",
        fullName: derivedName,
        cargo: "Miembro de la institución",
        role: "TEACHER",
        institution: {
          name: instName,
          country: "—",
          type: "Institución educativa",
          plan: "Aulentra · Plan Institucional",
          licensesUsed: 0,
          licensesTotal: 0,
          renewalDate: "—",
          accountManagerName: "Ana Martínez",
        },
        roleData: {},
      },
    };
  }
  return {
    user: { name: derivedName, email: trimmed, initials: deriveInitials(derivedName), profile },
    data: {
      kind: "independent",
      fullName: derivedName,
      tagline: "Formador particular",
      plan: { name: "Aulentra · Solo", price: "€19 / mes", cadence: "mensual" },
      activeStudents: 0,
      modality: "—",
      paymentMethod: "Sin método de pago",
      nextRenewal: "—",
      invoices: [],
    },
  };
}

export function saveSession(session: AulentraSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // noop
  }
}

export function loadSession(): AulentraSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AulentraSession;

    // Migración defensiva: si la sesión es de una versión anterior sin los
    // campos enriquecidos (data.kind / data específicos), invalidamos.
    if (!parsed?.data?.kind) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // noop
  }
}
