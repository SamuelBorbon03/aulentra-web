/**
 * Página /producto — Las 5 capas de Aulentra a fondo.
 * Versión final post-brief 2026-04-25.
 *
 * Tono: ejecutivo, declarativo, estructural. Frases cortas. Sin guiones largos.
 * Aulentra como sistema, no como herramienta. Roles en español.
 */

export const producto = {
  hero: {
    eyebrow: "El producto",
    headline: "Cómo opera una institución con sistema.",
    subtitle: "Cinco capas. Una sola lógica.",
  },

  intro: [
    "Una institución con sistema se organiza en capas.",
    "Cada capa sostiene a la siguiente.",
    "",
    "Nada es opcional.",
    "Nada es modular.",
    "",
    "Aulentra las sostiene.",
  ],

  layers: [
    {
      n: "01",
      title: "Estructura",
      core: "Grupos. Periodos. Jerarquías.",
      body:
        "El modelo lo define la institución. Aulentra lo sostiene sin imponerlo. Niveles, sedes, modalidades, periodos. Tú defines la estructura. Aulentra la sostiene.",
    },
    {
      n: "02",
      title: "Personas",
      core: "Roles claros. Accesos precisos.",
      body:
        "Cuatro roles. Administración, Docente, Estudiante, Acudiente. Cada persona ve exactamente lo que necesita ver. Ni más, ni menos.",
    },
    {
      n: "03",
      title: "Operación académica",
      core: "El ciclo vivo.",
      body:
        "Asignación de materias, calificaciones, evaluaciones, seguimiento. Todo ocurre dentro de la estructura. No en planillas paralelas.",
    },
    {
      n: "04",
      title: "Horarios",
      core: "Una sola fuente de verdad del tiempo.",
      body:
        "Horarios, cambios, ajustes, cancelaciones. Los cambios no se comunican. Se propagan. Quien los necesita los ve cuando los necesita.",
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
    "Cinco capas. Un sistema. Cambiar una no rompe las demás. Agregar algo nuevo encaja. No se agrega encima.",

  // Experiencia por rol — copy estructural, no escenas largas.
  experiencia: {
    eyebrow: "Una experiencia por rol",
    headline: "Lo mismo para todos. No lo mismo para cada uno.",
    intro: [
      "No es un sistema con vistas distintas.",
      "",
      "Son experiencias distintas sobre una misma estructura.",
      "",
      "Aulentra las conecta.",
    ],
    items: [
      {
        code: "ADMINISTRACIÓN",
        persona: "Dirección académica",
        promise: "Control total.",
        scenario:
          "Una sola vista. La institución entera, ordenada antes de la primera clase del día.",
        uses: [
          "Configura la estructura",
          "Asigna personas y grupos",
          "Define calendario académico",
          "Ve la institución completa",
        ],
      },
      {
        code: "DOCENTE",
        persona: "Docente",
        promise: "Ejecución sin fricción.",
        scenario:
          "Entre clase y clase. El plan, el grupo, la nota. Sin abrir nada más.",
        uses: [
          "Plan del día",
          "Calificaciones y evaluaciones",
          "Seguimiento por grupo",
          "Observaciones pedagógicas",
        ],
      },
      {
        code: "ESTUDIANTE",
        persona: "Estudiante",
        promise: "Claridad sobre su proceso.",
        scenario:
          "Sus tareas, su progreso, su feedback. Todo en un lugar. Todo a tiempo.",
        uses: [
          "Tareas y fechas",
          "Feedback docente",
          "Progreso académico",
          "Ruta del periodo",
        ],
      },
      {
        code: "ACUDIENTE",
        persona: "Acudiente",
        promise: "Visibilidad sin ruido.",
        scenario:
          "Tres minutos, una vez a la semana. Presente sin estorbar.",
        uses: [
          "Progreso del estudiante",
          "Alertas y avisos",
          "Agenda con docentes",
          "Información académica clave",
        ],
      },
    ],
    closer: "Un sistema. Cuatro experiencias. Cero fricción entre ellas.",
  },

  // Beneficios — afirmación + razón. Lenguaje narrativo declarativo.
  beneficios: {
    eyebrow: "Lo que cambia con sistema",
    headline: "Los beneficios no son features. Son consecuencias.",
    items: [
      {
        n: "01",
        title: "Los errores dejan de escalar.",
        body: "Porque la ambigüedad desaparece donde nacía.",
      },
      {
        n: "02",
        title: "El control deja de depender de personas.",
        body: "Porque la información no se fragmenta.",
      },
      {
        n: "03",
        title: "El tiempo deja de perderse coordinando herramientas.",
        body: "Porque el sistema lo resuelve.",
      },
      {
        n: "04",
        title: "Cada rol sabe qué hacer.",
        body: "Sin tener que interpretarlo.",
      },
      {
        n: "05",
        title: "La institución crece sin desordenarse.",
        body: "Porque la estructura no cambia al escalar.",
      },
    ],
    closer: "Todo esto no se gana usando Aulentra. Se gana teniendo sistema.",
  },
} as const;
