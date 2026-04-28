/**
 * Nav config Aulentra — NAV-A (Sprint C · 2026-04-28).
 *
 * Estructura cerrada: 3 grupos · 6 items reales · 1 comingSoon.
 * Sin anchors falsos. Sin items duplicados.
 *
 * Reglas:
 *   · Click en label de grupo SIEMPRE abre dropdown (también en grupos
 *     con un solo item · evita "lleva a /producto sin previsualizar").
 *   · Cada item lleva a una página dedicada (no a fragmentos).
 *   · `comingSoon: true` = item visible pero no clickeable.
 */

export type NavItem = {
  label: string;
  href?: string;
  description?: string;
  comingSoon?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Producto",
    items: [
      {
        label: "Qué es Aulentra",
        href: "/producto",
        description: "La arquitectura del sistema.",
      },
    ],
  },
  {
    label: "Soluciones",
    items: [
      {
        label: "Instituciones educativas",
        href: "/soluciones/instituciones",
        description: "Colegios, universidades y centros formativos.",
      },
      {
        label: "Formadores independientes",
        href: "/soluciones/formadores",
        description: "Consultores, equipos y profesionales autónomos.",
      },
    ],
  },
  {
    label: "Empresa",
    items: [
      {
        label: "Enfoque",
        href: "/enfoque",
        description: "Nuestra mirada sobre la formación.",
      },
      {
        label: "Sobre Aulentra",
        href: "/sobre",
        description: "¿Por qué existe Aulentra?",
      },
      {
        label: "Sobre Noventor",
        description: "El holding tecnológico detrás de Aulentra.",
        comingSoon: true,
      },
    ],
  },
];

// Link simple de login (existente)
export const NAV_LOGIN = { label: "Acceder", href: "/acceso" } as const;

// CTA principal — solicitud de acceso para prospectos
export const NAV_CTA = { label: "Solicitar acceso", href: "/solicitar-acceso" } as const;

// Compat — algunos componentes (Footer) leen NAV_LINKS. Mapeo plano a primer item de cada grupo.
export const NAV_LINKS = NAV_GROUPS.map((g) => {
  const firstReal = g.items.find((i) => i.href);
  return { label: g.label, href: firstReal?.href ?? "#" };
}) as readonly { label: string; href: string }[];
