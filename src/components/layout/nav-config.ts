/**
 * Nav config Aulentra — punto único para añadir, quitar o reordenar rutas.
 * Compartido entre Header (desktop) y MobileNav (drawer).
 */
export const NAV_LINKS = [
  { label: "Producto",  href: "/producto" },
  { label: "Casos",     href: "/casos" },
  { label: "Recursos",  href: "/recursos" },
  { label: "Sobre",     href: "/sobre" },
] as const;

// CTA: scroll a la sección del form en el home (no usamos "demo" jamás)
export const NAV_CTA = { label: "Conocer Aulentra", href: "/#cta-form" } as const;
