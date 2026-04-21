/**
 * Página /casos — Historias de instituciones y formadores que usan Aulentra.
 *
 * NOTA: Aulentra es producto nuevo · no hay casos reales aún. Toda esta
 * página está marcada PROVISIONAL hasta que existan instituciones o
 * formadores en operación con casos documentados que se puedan publicar.
 */

export const casos = {
  provisional: true,

  hero: {
    eyebrow: "Casos · próximamente",
    headline: "Historias de instituciones y formadores con Aulentra.",
    subtitle:
      "Aulentra está en sus primeras implementaciones. Los casos documentados aparecerán aquí a medida que existan resultados verificables que se puedan publicar.",
  },

  estado: {
    eyebrow: "Estado actual",
    title: "Sin casos publicados todavía.",
    body:
      "No publicamos historias hasta que la institución o el formador tenga resultados verificables y haya autorizado compartirlos. Es la misma disciplina del método Noventor: no declaramos victoria hasta que el progreso sea verificable.",
    nota:
      "Si ya estás usando Aulentra y quieres compartir tu experiencia, escríbenos.",
  },

  cierre: {
    body:
      "Mientras llenamos esta página, conoce el sistema completo en /producto.",
  },
} as const;
