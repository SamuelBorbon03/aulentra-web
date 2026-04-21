/**
 * Lógica mock de autenticación Aulentra — compartida entre desktop (UserMenu)
 * y mobile (MobileLoginPanel). Simulación visual; Fase 2 reemplaza por backend real.
 *
 * Recuperación con dos niveles de exigencia vía cantidad de datos solicitados:
 *  - Institución: email + nombre completo + nombre de la institución
 *  - Formador particular: solo email (flujo estándar)
 */

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
