/**
 * aulentra-login — estado del flujo de login de 2 pasos.
 *
 * El paso 1 guarda el email identificado para que el paso 2 (ruta por slug)
 * pueda leerlo y pre-rellenar la vista branded. El paso 2 finaliza el login
 * y dispara el redirect a la herramienta externa de Samuel.
 *
 * `EXTERNAL_TOOL_URL` apunta al endpoint que Samuel nos comparta. Mientras no
 * exista, usamos un placeholder que el usuario puede sobrescribir vía env.
 */

import type { AulentraOrg } from "./aulentra-orgs";

/**
 * URL placeholder de la herramienta externa que Samuel está construyendo.
 * Cuando esté lista, basta con sobrescribir `NEXT_PUBLIC_AULENTRA_TOOL_URL`
 * en el `.env` para apuntar al endpoint real sin tocar código.
 */
export const EXTERNAL_TOOL_URL =
  process.env.NEXT_PUBLIC_AULENTRA_TOOL_URL ??
  "https://app.aulentra.com"; // placeholder hasta handshake con Samuel

export const LOGIN_MOCK_PASSWORD = "aulentra2026";

const PENDING_KEY = "aulentra.login.pending";
const SESSION_KEY = "aulentra.login.session";

export interface PendingLogin {
  email: string;
  orgSlug: string;
  at: string;
}

export interface LoginSession {
  email: string;
  orgSlug: string;
  loggedInAt: string;
}

export function savePendingLogin(pending: PendingLogin): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // noop
  }
}

export function loadPendingLogin(): PendingLogin | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingLogin;
  } catch {
    return null;
  }
}

export function clearPendingLogin(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PENDING_KEY);
  } catch {
    // noop
  }
}

export function saveLoginSession(session: LoginSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // noop
  }
}

export function loadLoginSession(): LoginSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LoginSession;
  } catch {
    return null;
  }
}

export function clearLoginSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // noop
  }
}

/**
 * Construye la URL de redirect a la herramienta externa con el contexto
 * necesario (tenant + email). La forma exacta del query string se ajustará
 * cuando Samuel defina el contrato.
 */
export function buildRedirectToExternalTool(org: AulentraOrg, email: string): string {
  const url = new URL(EXTERNAL_TOOL_URL);
  url.searchParams.set("tenant", org.slug);
  url.searchParams.set("email", email);
  url.searchParams.set("source", "aulentra-web");
  return url.toString();
}
