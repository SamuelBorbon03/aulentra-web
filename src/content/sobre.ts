/**
 * Página /sobre — Identidad de Aulentra + relación con Noventor.
 * Fuentes: 01-context/01-documento-maestro.md, 01-context/04-relacion-con-noventor.md.
 *
 * Identidad de Aulentra (qué es, propósito) extraída literal del doc maestro.
 * Bloque "Relación con Noventor" extraído literal del doc oficial.
 */

export const sobre = {
  hero: {
    eyebrow: "Sobre Aulentra",
    headline: "Aulentra transforma la manera en que una institución funciona.",
    subtitle:
      "No reemplaza tus procesos. Los estructura. No digitaliza el caos. Lo ordena.",
  },

  // — Qué es Aulentra (de 01-documento-maestro.md § 2)
  quees: {
    eyebrow: "Qué es Aulentra",
    headline: "Aulentra es un sistema. No una herramienta más.",
    body: [
      "Aulentra nace como una respuesta estructural a un problema silencioso pero constante en la educación: la falta de un sistema claro, integrado y confiable para organizar la operación académica.",
      "No se limita a resolver tareas individuales. No se limita a digitalizar procesos. Aulentra transforma la manera en que una institución funciona.",
    ],
  },

  // — Propósito (síntesis del documento maestro)
  proposito: {
    eyebrow: "Propósito",
    body: "Aulentra existe para que toda institución educativa o formador independiente opere sobre un sistema, no sobre un conjunto de herramientas desconectadas.",
  },

  // — Visión (de 02-copy/07-vision.md)
  vision: {
    eyebrow: "Visión",
    headline: "Aulentra crece con la institución.",
    body:
      "No es un sistema que se ajusta cuando la institución cambia. Es un sistema que escala como escala tu institución — porque está diseñado para ser estructura, no herramienta.",
    contrast: [
      "Lo que funciona con 50 estudiantes funciona con 5.000.",
      "Lo que sostiene una sede sostiene diez.",
    ],
  },

  // — Para quién (declaración explícita de los dos públicos)
  paraquien: {
    eyebrow: "Para quién",
    headline: "Aulentra está pensado para dos públicos.",
    items: [
      {
        title: "Instituciones educativas",
        body: "Colegios, universidades, academias y centros formativos que necesitan organizar la operación completa en un solo sistema coherente.",
      },
      {
        title: "Formadores particulares o independientes",
        body: "Maestros, tutores y educadores que enseñan por cuenta propia y necesitan estructura sin tener que armar la suya desde cero.",
      },
    ],
    cierre:
      "El sistema es el mismo. La escala se adapta a tu contexto.",
  },

  // — Relación con Noventor (de 01-context/04-relacion-con-noventor.md)
  noventor: {
    eyebrow: "Una solución de Noventor",
    headline: "Aulentra es una marca de Noventor.",
    body: [
      "Aulentra no es una empresa independiente. No es un spin-off. Es una solución creada por Noventor tras investigar las problemáticas del sector educativo institucional y de los formadores particulares.",
      "Noventor es una empresa de progreso empresarial que utiliza investigación, innovación y tecnología como instrumentos para resolver problemáticas reales en sectores que necesitan transformación. Aulentra es la primera de sus marcas.",
    ],
    porque: {
      title: "Por qué importa esta conexión",
      items: [
        "Legitimidad — Aulentra no es un proyecto suelto. Tiene una empresa detrás con método, visión y estructura.",
        "Coherencia — Un visitante que conoce ambas webs percibe un sistema, no dos proyectos aislados.",
        "Escalabilidad — El método Noventor garantiza que Aulentra evoluciona con disciplina, no por moda.",
      ],
    },
  },

  cierre:
    "Aulentra no observa tu crecimiento. Crece contigo.",
} as const;
