/**
 * Constantes de contacto Aulentra.
 *
 * Sprint B-2 · 2026-04-27 — centralización del email institucional. Todas
 * las superficies (footer, forms, cierres, mailto:) deben importar desde
 * aquí. Cuando se cablee el backend de soporte, este archivo concentra la
 * sustitución de canal sin tocar 5+ call sites.
 */

export const CONTACT_EMAIL = "hola@aulentra.com";

/**
 * Construye un `mailto:` con subject y body codificados. Útil para flujos
 * que pre-rellenan plantillas (p. ej. "Sin registro" en /acceso).
 */
export function mailtoUrl({
  subject,
  body,
}: {
  subject?: string;
  body?: string;
} = {}): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length ? `?${params.join("&")}` : "";
  return `mailto:${CONTACT_EMAIL}${query}`;
}
