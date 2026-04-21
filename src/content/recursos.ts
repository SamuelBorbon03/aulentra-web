/**
 * Página /recursos — Documentación, guías y notas de producto.
 *
 * NOTA: Aulentra está en construcción de su corpus de documentación.
 * Toda esta página está marcada PROVISIONAL — los recursos reales
 * aparecerán a medida que el equipo los publique.
 */

export const recursos = {
  provisional: true,

  hero: {
    eyebrow: "Recursos · próximamente",
    headline: "Guías para implementar Aulentra.",
    subtitle:
      "Documentación práctica para administradores, formadores y equipos académicos. En construcción a medida que el equipo escribe los primeros recursos definitivos.",
  },

  categorias: {
    eyebrow: "Categorías planeadas",
    items: [
      {
        title: "Implementación",
        body: "Pasos para configurar Aulentra desde cero · estructurar grupos, importar personas, definir roles.",
      },
      {
        title: "Operación diaria",
        body: "Flujos que un administrador o formador realiza semana a semana · calificaciones, horarios, comunicación.",
      },
      {
        title: "Notas de producto",
        body: "Decisiones de diseño, principios de la plataforma, qué decisiones tomamos y por qué.",
      },
    ],
  },

  cierre: {
    body:
      "Mientras tanto, en /producto encuentras la base conceptual completa de Aulentra.",
  },
} as const;
