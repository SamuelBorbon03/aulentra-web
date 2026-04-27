/**
 * Seed de datos mock para "Mi espacio" de Aulentra.
 * Seis perfiles de ejemplo alineados con el PDF Perfiles de prueba:
 *   - 3 institución (ADMIN / TEACHER / STUDENT)
 *   - 3 formador particular (Plan Solo + Plan Pro + Solo anual)
 *
 * El PDF es la fuente única de verdad; cualquier cambio aquí debe reflejarse allá.
 */

export type AulentraRole = "ADMIN" | "TEACHER" | "STUDENT" | "GUARDIAN";

export interface InstitutionProfile {
  kind: "institution";
  fullName: string;
  cargo: string;
  role: AulentraRole;
  institution: {
    name: string;
    country: string;
    type: string;
    /** datos visibles en bloque 2 (suscripción) para admins; ignorados para otros roles */
    plan: string;
    licensesUsed: number;
    licensesTotal: number;
    renewalDate: string;
    accountManagerName: string;
  };
  /** datos específicos del rol pedagógico para futuros bloques (academia, actividad) */
  roleData: {
    /** ADMIN: departamentos/facultades */
    divisions?: number;
    /** ADMIN: estudiantes totales del centro */
    totalStudents?: number;
    /** ADMIN: docentes del centro */
    totalTeachers?: number;
    /** TEACHER: grupos asignados */
    groups?: number;
    /** TEACHER: estudiantes bajo su cargo */
    studentsInCharge?: number;
    /** TEACHER: materia principal */
    mainSubject?: string;
    /** STUDENT: asignaturas inscritas */
    subjectsEnrolled?: number;
    /** STUDENT: promedio actual */
    currentAverage?: string;
    /** STUDENT: grado */
    grade?: string;
  };
}

export interface IndependentProfile {
  kind: "independent";
  fullName: string;
  tagline: string;
  plan: {
    /** Solo / Pro */
    name: string;
    /** texto visible, ej. "€19 / mes" */
    price: string;
    /** mensual | anual */
    cadence: "mensual" | "anual";
  };
  activeStudents: number;
  modality: string;
  paymentMethod: string;
  nextRenewal: string;
  /** últimas facturas visibles en bloque 2 (expandido) */
  invoices: Array<{ date: string; amount: string; status: "paid" | "pending" }>;
}

export type AulentraProfile = InstitutionProfile | IndependentProfile;

/* ------------------------------------------------------------------
   Overrides por email — clave única. El PDF de Perfiles es fuente de verdad.
   ------------------------------------------------------------------ */
const PROFILES_BY_EMAIL: Record<string, AulentraProfile> = {
  /* ─── Institución · ADMIN ─────────────────────────────────── */
  "carolina@universidadpacifico.edu.co": {
    kind: "institution",
    fullName: "Carolina Muñoz",
    cargo: "Administradora Académica",
    role: "ADMIN",
    institution: {
      name: "Universidad del Pacífico",
      country: "Colombia",
      type: "Universidad",
      plan: "Aulentra · Plan Institucional Universidades",
      licensesUsed: 1280,
      licensesTotal: 1500,
      renewalDate: "20 de octubre de 2026",
      accountManagerName: "Ana Martínez",
    },
    roleData: {
      divisions: 4,
      totalStudents: 1280,
      totalTeachers: 94,
    },
  },

  /* ─── Institución · TEACHER ───────────────────────────────── */
  "ricardo@institutomoderno.edu.mx": {
    kind: "institution",
    fullName: "Ricardo Torres",
    cargo: "Docente titular de Matemáticas",
    role: "TEACHER",
    institution: {
      name: "Instituto Moderno",
      country: "México",
      type: "Instituto bilingüe",
      plan: "Aulentra · Plan Institucional",
      licensesUsed: 320,
      licensesTotal: 400,
      renewalDate: "12 de agosto de 2026",
      accountManagerName: "David Castro",
    },
    roleData: {
      groups: 5,
      studentsInCharge: 142,
      mainSubject: "Matemáticas (Álgebra + Cálculo)",
    },
  },

  /* ─── Institución · STUDENT ───────────────────────────────── */
  "valentina@colegiolaurel.edu.ar": {
    kind: "institution",
    fullName: "Valentina Castro",
    cargo: "Estudiante de 10° grado",
    role: "STUDENT",
    institution: {
      name: "Colegio Laurel",
      country: "Argentina",
      type: "Colegio de bachillerato",
      plan: "Aulentra · Plan Institucional",
      licensesUsed: 540,
      licensesTotal: 600,
      renewalDate: "1 de febrero de 2027",
      accountManagerName: "Ana Martínez",
    },
    roleData: {
      subjectsEnrolled: 8,
      currentAverage: "4.3 / 5.0",
      grade: "10°",
    },
  },

  /* ─── Formador particular · Plan Solo mensual ─────────────── */
  "lucia.mendez@gmail.com": {
    kind: "independent",
    fullName: "Lucía Méndez",
    tagline: "Formadora de idiomas · Inglés + Francés",
    plan: { name: "Aulentra · Solo", price: "€19 / mes", cadence: "mensual" },
    activeStudents: 24,
    modality: "Clases 1-a-1 + grupos pequeños (máx. 6)",
    paymentMethod: "Tarjeta Visa •••• 4582",
    nextRenewal: "12 de mayo de 2026",
    invoices: [
      { date: "12 abr 2026", amount: "€19,00", status: "paid" },
      { date: "12 mar 2026", amount: "€19,00", status: "paid" },
      { date: "12 feb 2026", amount: "€19,00", status: "paid" },
      { date: "12 ene 2026", amount: "€19,00", status: "paid" },
    ],
  },

  /* ─── Formador particular · Plan Pro mensual ──────────────── */
  "andres.pena@outlook.com": {
    kind: "independent",
    fullName: "Andrés Peña",
    tagline: "Tutor preuniversitario · Matemáticas + Física",
    plan: { name: "Aulentra · Pro", price: "€49 / mes", cadence: "mensual" },
    activeStudents: 38,
    modality: "Clases grupales intensivas (12–15) + tutorías",
    paymentMethod: "PSE · Bancolombia ahorros",
    nextRenewal: "28 de julio de 2026",
    invoices: [
      { date: "28 mar 2026", amount: "€49,00", status: "paid" },
      { date: "28 feb 2026", amount: "€49,00", status: "paid" },
      { date: "28 ene 2026", amount: "€49,00", status: "paid" },
      { date: "28 dic 2025", amount: "€49,00", status: "paid" },
    ],
  },

  /* ─── Formador particular · Plan Solo anual ───────────────── */
  "marcela.rios@proton.me": {
    kind: "independent",
    fullName: "Marcela Ríos",
    tagline: "Academia de música online · Piano + Teoría",
    plan: { name: "Aulentra · Solo (anual)", price: "€190 / año", cadence: "anual" },
    activeStudents: 12,
    modality: "Clases individuales semanales + masterclasses",
    paymentMethod: "PayPal · marcela.rios@proton.me",
    nextRenewal: "3 de octubre de 2026",
    invoices: [
      { date: "3 oct 2025", amount: "€190,00", status: "paid" },
      { date: "3 oct 2024", amount: "€170,00", status: "paid" },
    ],
  },
};

/** Busca un perfil por email; null si no existe override. */
export function resolveProfileByEmail(email: string): AulentraProfile | null {
  return PROFILES_BY_EMAIL[email.trim().toLowerCase()] ?? null;
}

/** Iniciales (2 letras) del nombre visible. */
export function userInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Label humanizado del rol Aulentra. */
export function roleLabel(role: AulentraRole): string {
  const map: Record<AulentraRole, string> = {
    ADMIN: "Administración",
    TEACHER: "Docente",
    STUDENT: "Estudiante",
    GUARDIAN: "Acudiente",
  };
  return map[role];
}

/** URL del producto Aulentra (launchpad). Fase 5 lo reemplaza por SSO real. */
export const AULENTRA_APP_URL = "https://app.aulentra.com";

/* ==================================================================
   BLOQUE 3 · Academia Aulentra — rutas de formación por perfil.
   ================================================================== */

export type AcademyResourceType = "module" | "tutorial" | "webinar" | "template";

export interface AcademyResource {
  id: string;
  type: AcademyResourceType;
  title: string;
  summary: string;
  /** duración legible (videos) o formato (plantillas) */
  meta: string;
  /** ruta a la que pertenece el recurso */
  track: AcademyTrackId;
  /** orden dentro del módulo */
  order: number;
}

export type AcademyTrackId =
  | "admin_institution"
  | "teacher"
  | "student"
  | "guardian"
  | "independent_languages"
  | "independent_stem"
  | "independent_creative";

export interface AcademyTrack {
  id: AcademyTrackId;
  label: string;
  description: string;
  /** número total de módulos de la ruta (los resources type=module cuentan hacia aquí) */
  totalModules: number;
}

export const ACADEMY_TRACKS: Record<AcademyTrackId, AcademyTrack> = {
  admin_institution: {
    id: "admin_institution",
    label: "Ruta · Administración institucional",
    description: "Configura tu centro, gestiona roles y deja el sistema listo para el año académico.",
    totalModules: 8,
  },
  teacher: {
    id: "teacher",
    label: "Ruta · Docente",
    description: "Planifica clases, evalúa con rúbricas y comunícate con familias sin fricción.",
    totalModules: 7,
  },
  student: {
    id: "student",
    label: "Ruta · Estudiante",
    description: "Aprovecha tu calendario, entregas y evaluaciones desde un solo lugar.",
    totalModules: 5,
  },
  guardian: {
    id: "guardian",
    label: "Ruta · Acudiente",
    description: "Sigue el progreso académico y comunícate con la institución de forma directa.",
    totalModules: 4,
  },
  independent_languages: {
    id: "independent_languages",
    label: "Ruta · Formador de idiomas",
    description: "Organiza alumnos, lecciones y certificaciones. Orientada a profesorado de idiomas.",
    totalModules: 10,
  },
  independent_stem: {
    id: "independent_stem",
    label: "Ruta · Formador STEM",
    description: "Prepara clases grupales intensivas, simulacros y seguimiento individualizado.",
    totalModules: 10,
  },
  independent_creative: {
    id: "independent_creative",
    label: "Ruta · Formador creativo",
    description: "Gestiona masterclasses, piezas de repertorio y progresiones personalizadas.",
    totalModules: 8,
  },
};

export const ACADEMY_RESOURCES: AcademyResource[] = [
  // — Ruta admin institución —
  { id: "mod-ai-1", type: "module", title: "Configuración inicial del centro", summary: "Define grados, períodos, áreas académicas y estructura jerárquica.", meta: "Módulo · 22 min", track: "admin_institution", order: 1 },
  { id: "mod-ai-2", type: "module", title: "Invitación y roles de usuarios", summary: "Añade administradores, docentes, estudiantes y acudientes con los permisos correctos.", meta: "Módulo · 18 min", track: "admin_institution", order: 2 },
  { id: "mod-ai-3", type: "module", title: "Calendario académico institucional", summary: "Períodos, recesos, fechas clave y su propagación al resto del sistema.", meta: "Módulo · 15 min", track: "admin_institution", order: 3 },
  { id: "mod-ai-4", type: "module", title: "Configuración de evaluaciones", summary: "Escalas, ponderaciones, rúbricas base y reglas de promoción.", meta: "Módulo · 24 min", track: "admin_institution", order: 4 },
  { id: "tut-ai-1", type: "tutorial", title: "Crear tu primer grado en 5 minutos", summary: "Paso a paso breve para dar de alta un grado completo.", meta: "Tutorial · 5 min", track: "admin_institution", order: 100 },
  { id: "web-ai-1", type: "webinar", title: "Buenas prácticas de onboarding institucional", summary: "Webinar con el equipo de producto de Aulentra. Miércoles 24 abril, 10:00 COT.", meta: "Webinar · próximo", track: "admin_institution", order: 200 },
  { id: "tpl-ai-1", type: "template", title: "Plantilla · Plan de onboarding anual", summary: "Documento estructurado para preparar la puesta en marcha de cada año académico.", meta: "Plantilla · PDF editable", track: "admin_institution", order: 300 },

  // — Ruta docente —
  { id: "mod-t-1", type: "module", title: "Tu espacio de docente", summary: "Recorrido por tu dashboard: grupos, calendario, tareas y comunicaciones.", meta: "Módulo · 12 min", track: "teacher", order: 1 },
  { id: "mod-t-2", type: "module", title: "Planificación de unidades", summary: "Estructura unidades con objetivos, contenidos y evaluaciones asociadas.", meta: "Módulo · 20 min", track: "teacher", order: 2 },
  { id: "mod-t-3", type: "module", title: "Evaluación con rúbricas", summary: "Usa rúbricas institucionales o crea las tuyas para evaluar con claridad.", meta: "Módulo · 18 min", track: "teacher", order: 3 },
  { id: "mod-t-4", type: "module", title: "Comunicación con familias", summary: "Canal directo con acudientes: mensajes, reportes de progreso y citas.", meta: "Módulo · 14 min", track: "teacher", order: 4 },
  { id: "tut-t-1", type: "tutorial", title: "Publicar una tarea en 3 pasos", summary: "Flujo rápido para crear, configurar y publicar una tarea calificable.", meta: "Tutorial · 4 min", track: "teacher", order: 100 },
  { id: "tpl-t-1", type: "template", title: "Plantilla · Rúbrica de ensayo argumentativo", summary: "Rúbrica lista para adaptar con criterios y niveles de logro.", meta: "Plantilla · CSV + PDF", track: "teacher", order: 300 },
  { id: "tpl-t-2", type: "template", title: "Plantilla · Reporte de progreso trimestral", summary: "Estructura institucional para informes a familias.", meta: "Plantilla · PDF editable", track: "teacher", order: 301 },

  // — Ruta estudiante —
  { id: "mod-s-1", type: "module", title: "Tu primer día en Aulentra", summary: "Recorrido por tu calendario, tareas y mensajes.", meta: "Módulo · 8 min", track: "student", order: 1 },
  { id: "mod-s-2", type: "module", title: "Entregar tareas y recibir feedback", summary: "Cómo adjuntar entregas, revisar correcciones y pedir aclaraciones.", meta: "Módulo · 10 min", track: "student", order: 2 },
  { id: "mod-s-3", type: "module", title: "Preparar evaluaciones", summary: "Gestiona tu agenda de evaluaciones y accede a materiales de estudio.", meta: "Módulo · 7 min", track: "student", order: 3 },
  { id: "tut-s-1", type: "tutorial", title: "Sincronizar Aulentra con Google Calendar", summary: "Conecta tu calendario académico con tu calendario personal.", meta: "Tutorial · 3 min", track: "student", order: 100 },
  { id: "web-s-1", type: "webinar", title: "Webinar · Estudiar mejor con Aulentra", summary: "Sesión en vivo para estudiantes. Sábado 27 de abril, 11:00 COT.", meta: "Webinar · próximo", track: "student", order: 200 },

  // — Ruta formador idiomas —
  { id: "mod-fi-1", type: "module", title: "Tu perfil público de formador", summary: "Configura cómo te presentas a nuevos alumnos antes de contratarte.", meta: "Módulo · 12 min", track: "independent_languages", order: 1 },
  { id: "mod-fi-2", type: "module", title: "Alta de alumnos y grupos reducidos", summary: "Registra alumnos, arma grupos y asigna niveles (A1-C2).", meta: "Módulo · 16 min", track: "independent_languages", order: 2 },
  { id: "mod-fi-3", type: "module", title: "Planificación de lecciones y tareas", summary: "Estructura tus clases por niveles y competencias lingüísticas.", meta: "Módulo · 18 min", track: "independent_languages", order: 3 },
  { id: "mod-fi-4", type: "module", title: "Seguimiento de progreso y certificaciones", summary: "Registra avance hacia certificaciones oficiales (DELF, Cambridge, etc.).", meta: "Módulo · 14 min", track: "independent_languages", order: 4 },
  { id: "tpl-fi-1", type: "template", title: "Plantilla · Plan de curso A2 (30 sesiones)", summary: "Esqueleto de plan de curso completo nivel A2 para adaptar.", meta: "Plantilla · PDF editable", track: "independent_languages", order: 300 },
  { id: "tpl-fi-2", type: "template", title: "Plantilla · Examen de colocación multinivel", summary: "Prueba diagnóstica para ubicar alumnos nuevos en el nivel correcto.", meta: "Plantilla · PDF + DOCX", track: "independent_languages", order: 301 },

  // — Ruta formador STEM —
  { id: "mod-fs-1", type: "module", title: "Preparación de clases intensivas", summary: "Diseña programas con cobertura amplia en pocas semanas (preuni, refuerzo).", meta: "Módulo · 20 min", track: "independent_stem", order: 1 },
  { id: "mod-fs-2", type: "module", title: "Simulacros y análisis de resultados", summary: "Monta simulacros, corrige en lote y detecta áreas débiles.", meta: "Módulo · 16 min", track: "independent_stem", order: 2 },
  { id: "mod-fs-3", type: "module", title: "Tutorías individuales y seguimiento", summary: "Gestiona sesiones 1-a-1 sobre contenido de clases grupales.", meta: "Módulo · 12 min", track: "independent_stem", order: 3 },
  { id: "tpl-fs-1", type: "template", title: "Plantilla · Banco de problemas cálculo I", summary: "120 problemas categorizados por temática para reutilizar.", meta: "Plantilla · PDF + LaTeX", track: "independent_stem", order: 300 },
  { id: "web-fs-1", type: "webinar", title: "Webinar grabado · Optimizar clases preuniversitarias", summary: "Estrategias para cubrir temario extenso sin perder profundidad.", meta: "Webinar · grabado · 48 min", track: "independent_stem", order: 200 },

  // — Ruta formador creativo —
  { id: "mod-fc-1", type: "module", title: "Alta de alumnos y repertorio", summary: "Configura tu biblioteca de piezas y asigna progresiones individuales.", meta: "Módulo · 14 min", track: "independent_creative", order: 1 },
  { id: "mod-fc-2", type: "module", title: "Masterclasses y sesiones grupales", summary: "Organiza encuentros puntuales con varios alumnos a la vez.", meta: "Módulo · 12 min", track: "independent_creative", order: 2 },
  { id: "mod-fc-3", type: "module", title: "Seguimiento del repertorio trabajado", summary: "Registra piezas estudiadas, nivel alcanzado y observaciones.", meta: "Módulo · 10 min", track: "independent_creative", order: 3 },
  { id: "tpl-fc-1", type: "template", title: "Plantilla · Progresión de repertorio (piano)", summary: "Secuencia recomendada de piezas por nivel técnico.", meta: "Plantilla · PDF editable", track: "independent_creative", order: 300 },
];

/* ==================================================================
   BLOQUE 4 · Novedades del producto — feed changelog Aulentra.
   ================================================================== */

export type AulentraNewsCategory = "new_feature" | "improvement" | "fix" | "note";

export interface AulentraNewsItem {
  id: string;
  date: string;
  category: AulentraNewsCategory;
  title: string;
  summary: string;
  /** módulo/área afectada */
  area?: string;
}

export function newsCategoryLabel(cat: AulentraNewsCategory): string {
  const map: Record<AulentraNewsCategory, string> = {
    new_feature: "Nueva funcionalidad",
    improvement: "Mejora",
    fix: "Corrección",
    note: "Nota de producto",
  };
  return map[cat];
}

export const AULENTRA_NEWS: AulentraNewsItem[] = [
  { id: "news-2026-04-rubrics", date: "2026-04-20", category: "new_feature", title: "Rúbricas configurables por institución", summary: "Los centros pueden definir rúbricas propias con criterios, pesos y niveles de logro. Los docentes las aplican en un par de clicks al corregir.", area: "Evaluación" },
  { id: "news-2026-04-calendar-sync", date: "2026-04-14", category: "new_feature", title: "Sincronización con Google Calendar y Outlook", summary: "Estudiantes y docentes pueden conectar su calendario externo y ver las fechas académicas desde donde ya viven.", area: "Calendario" },
  { id: "news-2026-04-grading-batch", date: "2026-04-08", category: "improvement", title: "Calificación por lotes desde la lista de clase", summary: "Nuevo modo para corregir todo un grupo en una sola pantalla sin entrar fila por fila.", area: "Evaluación" },
  { id: "news-2026-04-reports-pdf", date: "2026-04-02", category: "new_feature", title: "Informes académicos exportables en PDF", summary: "Diseño institucional aplicado automáticamente. Una firma de marca por centro.", area: "Reportes" },
  { id: "news-2026-03-comms-inbox", date: "2026-03-22", category: "improvement", title: "Bandeja de comunicaciones renovada", summary: "Filtros por grupo, tipo de mensaje y estado de lectura. Menos ruido, más foco.", area: "Comunicaciones" },
  { id: "news-2026-03-mobile", date: "2026-03-15", category: "improvement", title: "Mejoras de rendimiento en móvil", summary: "Tiempo de carga reducido 35% en conexiones de red lenta. Optimización para conexiones 3G.", area: "Plataforma" },
  { id: "news-2026-03-roadmap", date: "2026-03-10", category: "note", title: "Roadmap Q2 2026", summary: "Principios detrás de los próximos tres meses: menos fricción en evaluación, más integraciones abiertas.", area: "Producto" },
  { id: "news-2026-02-permissions-fix", date: "2026-02-28", category: "fix", title: "Corrección en herencia de permisos por grupo", summary: "Los permisos heredados ahora respetan correctamente las excepciones definidas a nivel de subgrupo.", area: "Permisos" },
];

/* ==================================================================
   BLOQUE 5 · Soporte — FAQ + tickets.
   ================================================================== */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  /** categoría para agrupar */
  topic: "access" | "grades" | "communication" | "subscription" | "platform";
}

export const FAQ_ITEMS: FAQItem[] = [
  { id: "faq-1", topic: "access", question: "¿Cómo invito a un nuevo docente a mi centro?", answer: "Desde Aulentra (plataforma), ve a Configuración > Usuarios y selecciona 'Invitar'. Ingresa el correo del docente y su rol. La invitación llega por email con un enlace para activar su cuenta." },
  { id: "faq-2", topic: "access", question: "No recuerdo mi contraseña. ¿Cómo la recupero?", answer: "En la pantalla de login haz click en '¿Olvidaste tu contraseña?'. Para cuentas institucionales pedimos datos adicionales de verificación (nombre, institución, rol); para formadores particulares solo tu email." },
  { id: "faq-3", topic: "grades", question: "¿Puedo configurar escalas de calificación personalizadas?", answer: "Sí. Desde Configuración institucional puedes definir escalas numéricas (1-10, 0-100) o cualitativas (E, S, A, I, D). La escala se aplica a todas las evaluaciones del año académico." },
  { id: "faq-4", topic: "grades", question: "¿Cómo funcionan las rúbricas?", answer: "Las rúbricas se componen de criterios con pesos y niveles de logro. Puedes crear rúbricas propias o usar las institucionales. Aplicarlas durante la corrección solo toma unos clicks." },
  { id: "faq-5", topic: "communication", question: "¿Los acudientes ven todas las comunicaciones?", answer: "Los acudientes ven las comunicaciones dirigidas a sus acudidos y las institucionales generales. Las conversaciones privadas entre docentes no son visibles para ellos." },
  { id: "faq-6", topic: "subscription", question: "¿Qué pasa si supero el número de licencias contratadas?", answer: "El sistema no permite asignar más licencias de las contratadas. Si necesitas ampliar tu plan, contacta a tu gestor Noventor desde el Portal Empresarial o desde 'Mi espacio > Tu suscripción'." },
  { id: "faq-7", topic: "subscription", question: "¿Puedo cambiar mi plan como formador particular?", answer: "Sí, directamente desde 'Mi espacio > Tu suscripción y facturación'. Los cambios se aplican en el siguiente período de facturación." },
  { id: "faq-8", topic: "platform", question: "¿Aulentra funciona sin conexión?", answer: "La plataforma principal requiere conexión. Ciertas funciones (visualización de tareas descargadas) funcionan sin conexión y sincronizan cuando recuperas internet." },
  { id: "faq-9", topic: "platform", question: "¿Cómo protegen mis datos?", answer: "Usamos cifrado en tránsito y en reposo, segmentación de datos por institución y auditorías regulares. Los datos residen en la región que tu centro haya seleccionado (UE, US o LATAM-Sur)." },
];

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketCategory = "technical" | "billing" | "training" | "suggestion";

export interface SupportTicket {
  id: string;
  createdAt: string;
  status: TicketStatus;
  category: TicketCategory;
  subject: string;
  description: string;
  /** última respuesta (mock) */
  lastUpdate?: string;
  lastUpdateFromClient?: boolean;
}

export function ticketStatusLabel(s: TicketStatus): string {
  return s === "open" ? "Abierto" : s === "in_progress" ? "En revisión" : s === "resolved" ? "Resuelto" : "Cerrado";
}
export function ticketCategoryLabel(c: TicketCategory): string {
  const map: Record<TicketCategory, string> = {
    technical: "Soporte técnico",
    billing: "Facturación",
    training: "Formación",
    suggestion: "Sugerencia",
  };
  return map[c];
}

/** Tickets semilla por email — cada perfil tiene un histórico distinto. */
const SEED_TICKETS: Record<string, SupportTicket[]> = {
  "carolina@universidadpacifico.edu.co": [
    { id: "tk-car-001", createdAt: "2026-04-16", status: "in_progress", category: "training", subject: "Configuración de grados superiores por facultad", description: "Necesitamos que cada facultad tenga su propia escala de grados sin afectar al resto.", lastUpdate: "2026-04-18", lastUpdateFromClient: false },
    { id: "tk-car-002", createdAt: "2026-03-10", status: "resolved", category: "technical", subject: "Error al importar listado de docentes", description: "Al cargar el CSV inicial fallaban 3 filas sin mensaje claro.", lastUpdate: "2026-03-12", lastUpdateFromClient: false },
  ],
  "ricardo@institutomoderno.edu.mx": [
    { id: "tk-ric-001", createdAt: "2026-04-05", status: "resolved", category: "technical", subject: "Las calificaciones no se muestran en el boletín", description: "Los parciales publicados no aparecen en el boletín descargable.", lastUpdate: "2026-04-07", lastUpdateFromClient: false },
  ],
  "valentina@colegiolaurel.edu.ar": [
    { id: "tk-val-001", createdAt: "2026-04-12", status: "resolved", category: "technical", subject: "No encuentro mi calendario de evaluaciones", description: "El calendario está vacío aunque mis profesores publicaron fechas.", lastUpdate: "2026-04-13", lastUpdateFromClient: false },
  ],
  "lucia.mendez@gmail.com": [
    { id: "tk-luc-001", createdAt: "2026-04-18", status: "open", category: "suggestion", subject: "Integración con plataformas de videollamada", description: "¿Está en el roadmap integrar Zoom o Meet para clases virtuales?", lastUpdate: "2026-04-18", lastUpdateFromClient: true },
  ],
  "andres.pena@outlook.com": [],
  "marcela.rios@proton.me": [
    { id: "tk-mar-001", createdAt: "2026-03-28", status: "closed", category: "billing", subject: "Cambio de método de pago anual", description: "Quería confirmar cómo actualizar PayPal antes de la próxima renovación.", lastUpdate: "2026-03-30", lastUpdateFromClient: false },
  ],
};

export function seedTicketsForEmail(email: string): SupportTicket[] {
  return SEED_TICKETS[email.trim().toLowerCase()] ?? [];
}

/** Resuelve la ruta de academia sugerida por perfil. */
export function academyTrackForProfile(profile: AulentraProfile): AcademyTrackId {
  if (profile.kind === "institution") {
    if (profile.role === "ADMIN") return "admin_institution";
    if (profile.role === "TEACHER") return "teacher";
    if (profile.role === "STUDENT") return "student";
    return "guardian";
  }
  // Formadores — mapa por email (alineado con el PDF)
  const email = profile.fullName.toLowerCase();
  if (email.includes("lucía") || email.includes("lucia")) return "independent_languages";
  if (email.includes("andrés") || email.includes("andres")) return "independent_stem";
  if (email.includes("marcela")) return "independent_creative";
  return "independent_languages";
}
