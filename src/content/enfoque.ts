/**
 * Página /enfoque — Declaración filosófica de Aulentra (2026-04-24).
 * Reemplaza al eliminado /casos (que delataba la etapa inicial del producto).
 *
 * Copy escrito iterativamente con el socio. Tono ejecutivo declarativo:
 * frases cortas partidas en líneas, puntuación limpia (sin guiones largos),
 * paralelismos. No revela la limitación del producto en desarrollo.
 */

export const enfoque = {
  hero: {
    eyebrow: "Enfoque",
    headlineLines: [
      "Aulentra evoluciona con la educación.",
      "Tu institución evoluciona con ella.",
    ],
    subtitle:
      "Aulentra no es una herramienta más. Es la infraestructura que convierte el avance de la educación en avance real para tu institución, integrando cada proceso formativo en un solo entorno.",
  },

  declarative: {
    stanzas: [
      ["La educación siempre avanza.", "Lo que cambia es quién puede seguirle el ritmo."],
      ["Aulentra existe para que esa elección deje de ser necesaria."],
      [
        "Operar el presente formativo y evolucionarlo dejan de ser procesos separados.",
        "Se convierten en una sola forma de trabajar dentro de un mismo sistema.",
      ],
    ],
  },

  pillars: [
    {
      n: "01",
      title: "Gestión",
      body:
        "El control de la operación formativa en un solo entorno, donde cada rol, proceso y decisión se conecta con el sistema completo.",
    },
    {
      n: "02",
      title: "Claridad",
      body:
        "Cada decisión se toma con contexto real, no con suposiciones, permitiendo entender lo que ocurre en cada nivel de la institución.",
    },
    {
      n: "03",
      title: "Estructura",
      body:
        "Una base sólida que organiza la institución desde dentro, eliminando el desorden y permitiendo operar con coherencia.",
    },
    {
      n: "04",
      title: "Evolución",
      body:
        "Un sistema que crece con la institución, adaptándose a su desarrollo sin perder consistencia ni calidad.",
    },
  ],

  closing: {
    lines: ["La formación no se sostiene con esfuerzo.", "Se sostiene con estructura."],
    emphasis: "Aulentra es esa estructura.",
    cta: { label: "Acceder a Aulentra", href: "/acceso" },
  },
} as const;
