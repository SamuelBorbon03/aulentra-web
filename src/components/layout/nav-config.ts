/**
 * Nav config Aulentra — versión final post-brief 2026-04-25.
 *
 * Estructura plana y sobria con 3 grupos. Sin dropdowns vacíos.
 * Items sin página propia se marcan `comingSoon: true` y quedan inactivos.
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
      {
        label: "Cómo funciona",
        href: "/producto#como-funciona",
        description: "Arquitectura en cinco capas.",
      },
      {
        label: "Capacidades",
        href: "/producto#capacidades",
        description: "Cómo opera dentro de tu institución.",
      },
    ],
  },
  {
    label: "Soluciones",
    items: [
      {
        label: "Instituciones educativas",
        href: "/producto",
        description: "Colegios, universidades y centros formativos.",
      },
      {
        label: "Formadores independientes",
        href: "/producto",
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
        description: "Quiénes construyen el sistema.",
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

// Compat — algunos componentes todavía leen NAV_LINKS. Mapeo plano a los grupos.
export const NAV_LINKS = NAV_GROUPS.map((g) => ({
  label: g.label,
  href: g.items.find((i) => i.href)?.href ?? "#",
})) as readonly { label: string; href: string }[];
