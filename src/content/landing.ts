/**
 * Home (/) de Aulentra — contenido "abrebocas".
 *
 * Resumen que genera apropiación con la marca e invita a profundizar en
 * las páginas interiores. NO duplica el contenido completo de /producto,
 * /roles, /casos, /recursos, /sobre.
 *
 * Sin la palabra "demo" en NINGÚN copy (decisión del usuario).
 */

export const landing = {
  meta: {
    brand: "Aulentra",
    tagline: "Sistema operativo académico",
  },

  // — Hero (de identidad de marca + 02-copy/01-hero.md)
  hero: {
    eyebrow: "Sistema operativo académico",
    headline: "La educación no necesita más herramientas. Necesita estructura.",
    subtitle:
      "Aulentra organiza, conecta y estructura toda la operación de una institución educativa o de un formador independiente. En una sola capa. Sin fricciones. Sin caos.",
    ctaPrimary:   { label: "Conocer el producto",  href: "/producto" },
    ctaSecondary: { label: "Conocer Aulentra",     href: "#cta-form" },
  },

  // — Promesa al lead (al lado del form, anclada al fondo de columna izquierda)
  heroPromesa: {
    eyebrow: "Antes de conversar",
    body: "Tu sistema lo construyes tú. Aulentra lo sostiene.",
  },

  // — Form de contacto Aulentra (lead capture · sin la palabra "demo")
  heroForm: {
    eyebrow: "Inicia una conversación",
    headline: "Conoce Aulentra desde dentro.",
    helper:
      "Te contactamos en menos de 48h con información adaptada a tu contexto.",
    submit: "Quiero conocer Aulentra",
    microcopy: "Una respuesta concreta a tu caso, no plantillas.",
    perfilOptions: [
      { value: "institucion", label: "Institución educativa" },
      { value: "particular",  label: "Formador particular o independiente" },
    ],
  },

  // — Manifiesto (resumen condensado · de 02-copy/02-problema.md + 03-solucion.md)
  manifiesto: {
    eyebrow: "Nuestra premisa",
    headline: "El problema no es la falta de esfuerzo. Es la falta de sistema.",
    quote: "Aulentra convierte la operación académica en un sistema.",
    link: { label: "Conoce el producto", href: "/producto" },
  },

  // — 5 capas (compacto · de 02-copy/04-how-it-works.md)
  capas: {
    eyebrow: "Cómo funciona",
    headline: "Cinco capas, una sola lógica.",
    helper: "Click en cualquier capa para ver el detalle.",
    items: [
      {
        n: "01",
        title: "Estructura",
        brief: "Grupos. Periodos. Jerarquías.",
        body:
          "La base de la institución, definida una vez. Niveles, sedes, modalidades, periodos: tú defines la estructura; Aulentra la sostiene.",
      },
      {
        n: "02",
        title: "Personas",
        brief: "Roles claros. Accesos precisos.",
        body:
          "Cuatro roles: ADMIN, TEACHER, STUDENT, GUARDIAN. Cada persona ve exactamente lo que necesita ver. Ni más, ni menos.",
      },
      {
        n: "03",
        title: "Operación académica",
        brief: "El ciclo vivo.",
        body:
          "Asignación de materias, calificaciones, evaluaciones, seguimiento. Todo ocurre dentro de la estructura — no en planillas paralelas.",
      },
      {
        n: "04",
        title: "Horarios",
        brief: "Una sola fuente de verdad del tiempo.",
        body:
          "Horarios, cambios, ajustes, cancelaciones. Los cambios no se comunican: se propagan. Quien los necesita los ve cuando los necesita.",
      },
      {
        n: "05",
        title: "Visibilidad total",
        brief: "Información en contexto, por rol.",
        body:
          "No hay que buscar información en Aulentra. El sistema la muestra donde corresponde, a quien corresponde.",
      },
    ],
    link: { label: "Ver el producto completo", href: "/producto" },
  },

  // — Cuatro roles (compacto · de 02-copy/05-roles.md)
  roles: {
    eyebrow: "Los roles",
    headline: "Cuatro roles. Un mismo sistema.",
    items: [
      { code: "ADMIN",    core: "Control total." },
      { code: "TEACHER",  core: "Ejecución clara." },
      { code: "STUDENT",  core: "Experiencia organizada." },
      { code: "GUARDIAN", core: "Visibilidad." },
    ],
    link: { label: "Conoce los cuatro roles", href: "/roles" },
  },

  // — CTA final (de 02-copy/08-cta.md, sin la palabra "demo")
  cta: {
    eyebrow: "Empezar",
    headline: "Aulentra no observa tu crecimiento. Crece contigo.",
    subtitle:
      "Estructura tu institución o tu trabajo docente sobre un sistema diseñado para durar.",
    ctaPrimary:   { label: "Conocer Aulentra", href: "#cta-form" },
    ctaSecondary: { label: "Ver el producto",  href: "/producto" },
    support: "Conversación con nuestro equipo. Sin compromiso.",
  },
} as const;
