/**
 * Página /producto — Las 5 capas de Aulentra a fondo.
 * Fuente: 02-copy/04-how-it-works.md, 01-context/01-documento-maestro.md.
 *
 * Contenido extraído literal. La página completa el detalle de cada capa
 * (descripción larga + frase-núcleo) que en home solo se ve compacto.
 */

export const producto = {
  hero: {
    eyebrow: "El producto",
    headline: "Cómo funciona Aulentra.",
    subtitle: "Cinco capas. Una sola lógica.",
  },

  intro:
    "Aulentra organiza la institución en capas. Cada capa sostiene a la siguiente. Nada es opcional, nada es modular — es un sistema.",

  layers: [
    {
      n: "01",
      title: "Estructura",
      core: "Grupos. Periodos. Jerarquías.",
      body:
        "La base de la institución, definida una vez. Aulentra no asume un modelo académico — se adapta al tuyo. Niveles, sedes, modalidades, periodos: tú defines la estructura; Aulentra la sostiene.",
    },
    {
      n: "02",
      title: "Personas",
      core: "Roles claros. Accesos precisos.",
      body:
        "Cuatro roles: ADMIN, TEACHER, STUDENT, GUARDIAN. Cada persona ve exactamente lo que necesita ver. Ni más, ni menos.",
    },
    {
      n: "03",
      title: "Operación académica",
      core: "El ciclo vivo.",
      body:
        "Asignación de materias, calificaciones, evaluaciones, seguimiento. Todo ocurre dentro de la estructura — no en planillas paralelas.",
    },
    {
      n: "04",
      title: "Horarios",
      core: "Una sola fuente de verdad del tiempo.",
      body:
        "Horarios, cambios, ajustes, cancelaciones. Los cambios no se comunican: se propagan. Quien los necesita los ve cuando los necesita.",
    },
    {
      n: "05",
      title: "Visibilidad total",
      core: "Información en contexto, por rol.",
      body:
        "No hay que buscar información en Aulentra. El sistema la muestra donde corresponde, a quien corresponde.",
    },
  ],

  closer:
    "Cinco capas, un sistema. Cambiar una no rompe las demás. Agregar algo nuevo encaja — no se agrega encima.",

  // Beneficios — derivados naturalmente de tener sistema (de 06-beneficios.md)
  beneficios: {
    eyebrow: "Lo que cambia con sistema",
    headline: "Los beneficios no son features. Son consecuencias.",
    items: [
      { n: "01", title: "Menos errores",         body: "Porque el sistema no deja las ambigüedades donde los errores nacen." },
      { n: "02", title: "Más control",           body: "Porque la información no está fragmentada entre herramientas." },
      { n: "03", title: "Ahorro de tiempo",      body: "Porque el tiempo que hoy se gasta coordinando herramientas se recupera." },
      { n: "04", title: "Claridad operativa",    body: "Porque cada rol sabe qué hacer, dónde, cuándo." },
      { n: "05", title: "Crecimiento sin caos",  body: "Porque sumar grupos, periodos o personas no multiplica fricciones." },
    ],
    closer: "Todo esto no se gana usando Aulentra. Se gana teniendo sistema.",
  },
} as const;
