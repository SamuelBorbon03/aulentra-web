import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * InterfazUnica · Sección 2 de /soluciones/formadores.
 *
 * Sprint C · D.2 · 2026-04-28.
 * Sprint C · D-fix · 2026-04-27 · Anotaciones laterales eliminadas
 * (decisión Samuel — opción A) y ajustes anti-overflow del mockup:
 * sidebar 200→180px, contenedores flex con `min-w-0` para que `truncate`
 * funcione, columna descriptiva movida a xl+ para no presionar el nombre
 * en breakpoints intermedios.
 *
 * 3 bloques cortos arriba + mockup compacto HTML/CSS del dashboard del
 * formador (NO raster, NO `Image`). Marco redondeado 12px · sombra premium
 * · ratio 16:10 aprox · top bar wordmark + iniciales · sidebar 180px con
 * 6 entradas tipográficas · canvas 3 zonas (estudiantes 40% / agenda 30%
 * / accesos rápidos 30%).
 */
const BLOQUES = [
  {
    head: "Una sola sesión.",
    body:
      "Toda tu gestión — estudiantes, programas, evaluación, comunicación — desde una interfaz construida para que la maneje una persona.",
  },
  {
    head: "Sin configuración institucional.",
    body:
      "No defines roles ni permisos. El sistema reconoce que tú eres quien opera todo.",
  },
  {
    head: "Tus estudiantes. Opcionalmente, sus acudientes.",
    body:
      "Si trabajas con menores o con familias involucradas, puedes activar el acceso de acudientes. Si no, tu plataforma vive contigo y con tus estudiantes.",
  },
] as const;

export function InterfazUnica() {
  return (
    /* Atmósfera A+B+D · halo={false} — el DashboardMockup tiene shadow
       elevado propio, halo de sección competiría con el frame. */
    <SectionWrapper id="seccion-control" tone="bg-deep" spacing="2xl" halo={false} className="border-t border-line-soft">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-caption uppercase tracking-[0.32em] text-primary mb-6">
            El control
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display-sm md:text-display-lg font-bold tracking-[-0.02em] text-text-strong mb-6 max-w-[840px]">
            Tú administras. Tú enseñas. Tú decides.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body-l text-text-default leading-relaxed mb-16 max-w-[760px]">
            No hay coordinación, ni jerarquías, ni permisos que delegar. Aulentra te entrega el sistema completo desde tu cuenta.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-20">
          {BLOQUES.map((b, i) => (
            <Reveal key={b.head} delay={260 + i * 80}>
              <div className="border-l-2 border-primary/40 pl-5">
                <h3 className="text-h3 font-semibold text-text-strong mb-3 leading-snug">
                  {b.head}
                </h3>
                <p className="text-body text-text-muted leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mockup del dashboard formador · HTML/CSS · sin raster */}
        <Reveal delay={520}>
          <DashboardMockup />
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * DashboardMockup · marco + topbar + sidebar + canvas 3 zonas.
 * Anotaciones laterales eliminadas en Sprint C · D-fix (2026-04-27).
 * ─────────────────────────────────────────────────────────────────*/

function DashboardMockup() {
  return (
    <div className="relative mx-auto" style={{ width: "clamp(720px, 80vw, 1080px)", maxWidth: "100%" }}>
      {/*
        Frame del dashboard · 16:10 SOLO en md+ (desktop).
        En <md, altura natural según contenido — el ratio aplastaba el canvas
        a ~213px en 375-440px y colapsaba topbar + sidebar + 3 zonas.
      */}
      <div
        className="relative rounded-xl bg-card border border-line-strong overflow-hidden md:aspect-[16/10]"
        style={{
          boxShadow: "0 24px 80px rgba(0,0,0,0.40), 0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-bg-deep">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="block w-2 h-2 rounded-full bg-line-strong" />
              <span className="block w-2 h-2 rounded-full bg-line-strong" />
              <span className="block w-2 h-2 rounded-full bg-line-strong" />
            </div>
            <span className="ml-3 text-caption-mono-xs uppercase text-text-faint">
              tunombre.aulentra.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-wordmark-sm hidden md:inline-block bg-clip-text text-transparent bg-horizon-gradient-h-wordmark" style={{ fontSize: "13px", letterSpacing: "0.18em" }}>
              AULENTRA
            </span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-elevated text-caption-mono-xs text-text-default font-semibold">
              MF
            </span>
          </div>
        </div>

        {/* En md+ ocupa el alto del frame (con aspect-ratio); en mobile altura natural. */}
        <div className="flex md:h-[calc(100%-44px)]">
          {/* Sidebar 180px (200→180 en D-fix para dar más ancho al canvas y evitar truncate agresivo) */}
          <aside className="hidden md:flex flex-col gap-1 px-3 py-4 border-r border-line bg-bg-deep" style={{ width: 180 }}>
            {[
              { label: "Estudiantes", active: true },
              { label: "Programas",   active: false },
              { label: "Evaluaciones",active: false },
              { label: "Agenda",      active: false },
              { label: "Pagos",       active: false },
              { label: "Mensajes",    active: false },
            ].map((n) => (
              <div
                key={n.label}
                className={[
                  "px-3 py-2 rounded text-body-soft transition-colors",
                  n.active
                    ? "bg-elevated text-text-strong border-l-2 border-primary"
                    : "text-text-muted",
                ].join(" ")}
              >
                {n.label}
              </div>
            ))}
          </aside>

          {/* Canvas · 3 zonas */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-10 gap-3 p-4 min-w-0">
            {/* Zona 1 · Lista estudiantes 40% */}
            <div className="md:col-span-4 rounded-md bg-elevated border border-line-soft p-4 min-w-0">
              <div className="text-caption-mono-xs uppercase text-text-subtle mb-3">
                Tus estudiantes
              </div>
              <div className="space-y-2">
                {[
                  { n: "Luciana M.", c: "Programa avanzado", dot: "primary" },
                  { n: "Carlos R.",  c: "Cohorte 2026-A",     dot: "accent"  },
                  { n: "Sofía P.",   c: "Asesoría 1:1",       dot: "accent"  },
                  { n: "Andrés B.",  c: "Programa avanzado",  dot: "primary" },
                  { n: "Marina T.",  c: "Cohorte 2026-A",     dot: "accent"  },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-line-soft last:border-0 min-w-0">
                    <span
                      className="block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: s.dot === "primary" ? "#A5B4FC" : "#67E8F9" }}
                    />
                    <span className="text-body-soft text-text-default flex-1 truncate min-w-0">{s.n}</span>
                    <span className="text-caption-mono-xs uppercase text-text-faint hidden xl:inline flex-shrink-0">{s.c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zona 2 · Agenda 30% */}
            <div className="md:col-span-3 rounded-md bg-elevated border border-line-soft p-4">
              <div className="text-caption-mono-xs uppercase text-text-subtle mb-3">
                Hoy
              </div>
              <div className="space-y-2.5">
                {[
                  { h: "09:00", t: "Clase grupal" },
                  { h: "11:30", t: "Asesoría 1:1" },
                  { h: "14:00", t: "Revisión" },
                  { h: "16:30", t: "Clase grupal" },
                ].map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-caption-mono-xs uppercase text-text-faint flex-shrink-0 w-10">{a.h}</span>
                    <span className="text-body-soft text-text-default">{a.t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zona 3 · Accesos rápidos 30% */}
            <div className="md:col-span-3 rounded-md bg-elevated border border-line-soft p-4 flex flex-col gap-2.5">
              <div className="text-caption-mono-xs uppercase text-text-subtle mb-1">
                Atajos
              </div>
              {["Crear evaluación", "Mensaje a familias", "Subir material", "Nuevo programa"].map((s) => (
                <div
                  key={s}
                  className="rounded-md bg-card border border-line-soft px-3 py-2 text-body-soft text-text-default"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

