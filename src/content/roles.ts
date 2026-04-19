/**
 * Página /roles — 4 personas que habitan Aulentra.
 * Fuente: 02-copy/05-roles.md.
 *
 * Contenido extraído literal de la documentación oficial.
 */

export const roles = {
  hero: {
    eyebrow: "Los roles",
    headline: "Cuatro roles. Un mismo sistema.",
    subtitle: "Cada persona ve lo que necesita ver. Nada más. Nada menos.",
  },

  items: [
    {
      code: "ADMIN",
      core: "Control total.",
      body:
        "Quien configura la estructura, asigna las personas, define el calendario y ve la institución completa. Aulentra le da la posición desde la que se dirige una institución — no desde la que se apagan incendios.",
    },
    {
      code: "TEACHER",
      core: "Ejecución clara.",
      body:
        "Quien enseña. Entra, ve lo que le toca hoy, lo hace, sale. Aulentra le quita todo lo que no es enseñar. No lo convierte en administrativo.",
    },
    {
      code: "STUDENT",
      core: "Experiencia organizada.",
      body:
        "Quien aprende. Encuentra su ruta académica sin tener que preguntarla. Aulentra le devuelve claridad sobre su propio proceso.",
    },
    {
      code: "GUARDIAN",
      core: "Visibilidad.",
      body:
        "Quien acompaña. Ve el progreso académico sin interrumpirlo. Aulentra le permite estar presente sin estorbar.",
    },
  ],

  closer: "Un solo sistema. Cuatro formas de habitarlo.",

  // Notas editoriales sobre el diseño de roles (de 02-copy/05-roles.md "Reglas")
  notas: {
    eyebrow: "Sobre los nombres",
    items: [
      "Los nombres de rol van en inglés y en mayúsculas. Son etiquetas técnicas, no cargos locales — coherencia entre landing, producto y documentación.",
      "Cada frase-núcleo es intencional: ADMIN promete control, TEACHER promete ejecución sin fricción, STUDENT promete claridad, GUARDIAN promete información (no participación forzada).",
    ],
  },
} as const;
