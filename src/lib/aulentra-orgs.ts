/**
 * aulentra-orgs — seed de instituciones registradas en Aulentra + detección por email.
 *
 * Este módulo es la fuente de verdad provisional para el flujo de login de 2 pasos.
 * El paso 1 (`/acceso`) resuelve el email contra esta lista y, si matchea, redirige
 * al paso 2 en el slug correspondiente (`/acceso/{slug}`).
 *
 * Cuando entre backend real, esta tabla se reemplaza por una query a la DB que
 * devuelve el tenant al que pertenece un email.
 */

export type OrgType = "institucion" | "formador";

export interface AulentraOrg {
  /** Slug del subdominio · `colegiosanjose.aulentra.com` */
  slug: string;
  /** Nombre oficial mostrado en la landing de la institución */
  name: string;
  /** Tagline corto para el hero institucional · máx 80 chars */
  tagline: string;
  /** Dominios corporativos que resuelven a esta org */
  domains: string[];
  /** Color primario institucional · gradiente accent si aplica */
  brandColor: string;
  /** Tipo de cliente */
  type: OrgType;
  /** Contador de usuarios para mostrar en la vista branded */
  users: number;
  /** Ubicación institucional */
  location: string;
}

/**
 * Whitelist mock de organizaciones. Cualquier correo cuyo dominio NO aparezca aquí
 * y que tampoco se reconozca como formador registrado queda fuera del flujo.
 */
export const AULENTRA_ORGS: AulentraOrg[] = [
  {
    slug: "colegiosanjose",
    name: "Colegio San José",
    tagline: "Educación humanista · 1972",
    domains: ["colegiosanjose.edu.co", "csanjose.edu.co"],
    brandColor: "#4F46E5",
    type: "institucion",
    users: 842,
    location: "Medellín · Colombia",
  },
  {
    slug: "institutonorandino",
    name: "Instituto Norandino",
    tagline: "Formación técnica de excelencia",
    domains: ["norandino.edu.co", "institutonorandino.co"],
    brandColor: "#3B82F6",
    type: "institucion",
    users: 563,
    location: "Bogotá · Colombia",
  },
  {
    slug: "academialaurel",
    name: "Academia Laurel",
    tagline: "Idiomas · preparación universitaria",
    domains: ["academialaurel.com", "laurel-academy.com"],
    brandColor: "#06B6D4",
    type: "institucion",
    users: 217,
    location: "Ciudad de México · México",
  },
];

/**
 * Formadores particulares registrados. A diferencia de las instituciones, aquí
 * el slug se deriva del email (no hay subdominio corporativo) y el branding es
 * el propio de Aulentra (no hay marca institucional sobrepuesta).
 */
export const AULENTRA_FORMADORES: AulentraOrg[] = [
  {
    slug: "lucia-mendez",
    name: "Lucía Méndez",
    tagline: "Formadora de idiomas · 8 años",
    domains: ["luciamendez.edu"], // email corporativo del formador
    brandColor: "#A5B4FC",
    type: "formador",
    users: 24,
    location: "Remoto · Ecuador",
  },
];

/**
 * Extrae el dominio de un email. `null` si el email es inválido.
 */
function extractDomain(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return normalized.split("@")[1] ?? null;
}

export type LookupResult =
  | { ok: true; org: AulentraOrg; email: string }
  | { ok: false; reason: "invalid_email" | "unknown_org" };

/**
 * Busca a qué organización (institución o formador) pertenece un email.
 * En producción esto lo resuelve el backend contra la tabla de tenants.
 */
export function lookupOrgByEmail(email: string): LookupResult {
  const normalized = email.trim().toLowerCase();
  const domain = extractDomain(normalized);
  if (!domain) return { ok: false, reason: "invalid_email" };

  const institucional = AULENTRA_ORGS.find((o) => o.domains.includes(domain));
  if (institucional) return { ok: true, org: institucional, email: normalized };

  const formador = AULENTRA_FORMADORES.find((o) => o.domains.includes(domain));
  if (formador) return { ok: true, org: formador, email: normalized };

  return { ok: false, reason: "unknown_org" };
}

export function findOrgBySlug(slug: string): AulentraOrg | null {
  return (
    AULENTRA_ORGS.find((o) => o.slug === slug) ??
    AULENTRA_FORMADORES.find((o) => o.slug === slug) ??
    null
  );
}
