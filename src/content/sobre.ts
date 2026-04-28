/**
 * Página /sobre — Identidad de Aulentra + relación con Noventor.
 * Versión final 2026-04-25 alineada al brief institucional definitivo.
 *
 * Tono: ejecutivo, declarativo, estructural. Sin guiones largos.
 * Aulentra como consecuencia del método Noventor, no como producto suelto.
 */

export const sobre = {
  hero: {
    eyebrow: "Sobre Aulentra",
    // Sprint C · C.4 · headline reescrito para abrir con causa, no eslogan.
    // La frase anterior ("Aulentra no cambia lo que haces. Cambia cómo funciona.")
    // queda parafraseada en `quees.body` (línea 25) como cierre interno.
    headline:
      "Aulentra existe porque la operación educativa no debería sostenerse con esfuerzo.",
    subtitle:
      "Aulentra reúne en un solo sistema todo lo que las instituciones y los formadores hoy gestionan en herramientas separadas.",
  },

  // — Qué es Aulentra
  quees: {
    eyebrow: "Qué es Aulentra",
    headline: "Aulentra es un sistema. No una herramienta más.",
    body: [
      "La operación académica está fragmentada por diseño. Plataformas distintas para tareas, comunicación, gestión y datos. Cada una resuelve una parte. Ninguna sostiene el todo.",
      "No estamos proponiendo una mejor forma de trabajar.",
      "Estamos eliminando la necesidad de improvisar.",
      "Aulentra unifica esa operación. No digitaliza procesos. Estructura la institución entera dentro de una sola arquitectura.",
    ],
  },

  // — Propósito
  proposito: {
    eyebrow: "Propósito",
    body:
      "Aulentra existe para que toda institución educativa o formador independiente opere sobre un sistema. No sobre un conjunto de herramientas desconectadas.",
  },

  // — Visión
  vision: {
    eyebrow: "Visión",
    headline: "Aulentra crece con la institución.",
    body:
      "No es un sistema que se ajusta cuando la institución cambia. Es un sistema que escala como escala tu institución. Está diseñado para ser estructura. No herramienta.",
    contrast: [
      "Lo que funciona con 50 estudiantes funciona con 5.000.",
      "Lo que sostiene una sede sostiene diez.",
    ],
  },

  // — Para quién
  paraquien: {
    eyebrow: "Para quién",
    headline: "Aulentra está pensado para dos públicos.",
    items: [
      {
        title: "Instituciones educativas",
        body:
          "Colegios, universidades, academias y centros formativos que necesitan organizar la operación completa en un solo sistema coherente.",
      },
      {
        title: "Formadores particulares o independientes",
        body:
          "Maestros, tutores y educadores que enseñan por cuenta propia y necesitan estructura sin tener que armar la suya desde cero.",
      },
    ],
    cierre: "El sistema es el mismo. La escala se adapta a tu contexto.",
  },

  // — Relación con Noventor
  noventor: {
    eyebrow: "Una solución de Noventor",
    headline: "Aulentra no nace como producto. Es una consecuencia del método Noventor.",
    body: [
      "Aulentra no es una empresa independiente. No es un spin-off. Es una solución creada por Noventor tras investigar las problemáticas del sector educativo institucional y de los formadores particulares.",
      "Noventor no construye herramientas.",
      "Construye sistemas que hacen que dejen de ser necesarias.",
      "Noventor es una empresa de progreso empresarial que utiliza investigación, innovación y tecnología como instrumentos para resolver problemáticas reales en sectores que necesitan transformación. Aulentra es la primera de sus marcas.",
    ],
    porque: {
      title: "Por qué importa esta conexión",
      items: [
        {
          bold: "Legitimidad.",
          body:
            "Aulentra no es un proyecto suelto. Tiene una empresa detrás con método, visión y estructura.",
        },
        {
          bold: "Coherencia.",
          body:
            "Un visitante que conoce ambas webs percibe un sistema. No dos proyectos aislados.",
        },
        {
          bold: "Escalabilidad.",
          body:
            "El método Noventor garantiza que Aulentra evoluciona con disciplina. No por moda.",
        },
      ],
    },
  },

  cierre:
    "Aulentra no observa tu crecimiento. Crece contigo.",
} as const;
