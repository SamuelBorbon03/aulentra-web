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

  // Experiencia por rol — absorbida desde /roles (decisión 2026-04-21).
  // Copy editorial, escenificado (persona + escena concreta), no jerga abstracta.
  // Cada rol promete algo distinto: control, ejecución, claridad, visibilidad.
  experiencia: {
    eyebrow: "Una experiencia por rol",
    headline: "Lo mismo para todos. Pero no lo mismo para cada uno.",
    intro:
      "Aulentra no es un sistema único con vistas distintas. Son cuatro experiencias que comparten la misma columna vertebral — y cada persona entra directamente a la suya.",
    items: [
      {
        code: "ADMIN",
        persona: "Dirección académica",
        promise: "Control total.",
        scenario:
          "Lunes, 7:15 AM. Abre Aulentra y en una sola vista encuentra: asistencia del viernes, docentes sin plan de clase registrado, tres incidencias que requieren intervención. Antes de la primera clase del día ya tiene decididas sus acciones.",
        uses: [
          "Configura la estructura",
          "Asigna personas y grupos",
          "Define calendario académico",
          "Ve la institución completa",
        ],
      },
      {
        code: "TEACHER",
        persona: "Docente",
        promise: "Ejecución sin fricción.",
        scenario:
          "Entre clase y clase abre la app en el celular. Ve su plan del día, su grupo del momento, y un espacio para cargar la nota que acaba de calificar. No abre ocho pestañas. No busca. Entra, hace, sale.",
        uses: [
          "Plan del día",
          "Calificaciones y evaluaciones",
          "Seguimiento por grupo",
          "Observaciones pedagógicas",
        ],
      },
      {
        code: "STUDENT",
        persona: "Estudiante",
        promise: "Claridad sobre su proceso.",
        scenario:
          "Entra al terminar su última clase. Ve sus tareas ordenadas por fecha, el feedback que le dejó su profesora, su progreso de la semana. Sabe qué sigue sin tener que preguntarlo — y su acudiente no tiene que recordárselo.",
        uses: [
          "Tareas y fechas",
          "Feedback docente",
          "Progreso académico",
          "Ruta del periodo",
        ],
      },
      {
        code: "GUARDIAN",
        persona: "Acudiente",
        promise: "Visibilidad sin ruido.",
        scenario:
          "Entra una vez a la semana, tres minutos. Ve cómo va su estudiante, las alertas relevantes, y agenda reuniones con docentes cuando las necesita. No recibe cuarenta notificaciones al día. Está presente sin estorbar.",
        uses: [
          "Progreso del estudiante",
          "Alertas y avisos",
          "Agenda con docentes",
          "Información académica clave",
        ],
      },
    ],
    closer:
      "Un sistema. Cuatro experiencias. Cero fricción entre ellas.",
  },

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
