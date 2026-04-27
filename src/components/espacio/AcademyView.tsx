"use client";

import { useEffect, useMemo, useState } from "react";
import { type AulentraSession } from "@/lib/aulentra-auth";
import {
  ACADEMY_TRACKS,
  ACADEMY_RESOURCES,
  type AcademyResource,
  type AcademyResourceType,
  academyTrackForProfile,
} from "@/lib/aulentra-mock-data";
import { loadAcademyProgress, toggleAcademyCompleted } from "@/lib/aulentra-mock-store";
import { cn } from "@/lib/cn";

interface Props { session: AulentraSession }

const TYPE_LABEL: Record<AcademyResourceType, string> = {
  module: "Módulo",
  tutorial: "Tutorial",
  webinar: "Webinar",
  template: "Plantilla",
};

/**
 * Bloque 3 · Academia Aulentra
 * Biblioteca de recursos por perfil con progreso personal persistente.
 */
export function AcademyView({ session }: Props) {
  const trackId = academyTrackForProfile(session.data);
  const track = ACADEMY_TRACKS[trackId];
  const email = session.user.email;

  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | AcademyResourceType>("all");

  useEffect(() => { setProgress(loadAcademyProgress(email)); }, [email]);

  const trackResources = useMemo(
    () => ACADEMY_RESOURCES.filter((r) => r.track === trackId).sort((a, b) => a.order - b.order),
    [trackId]
  );

  const filteredResources = useMemo(() => {
    if (filter === "all") return trackResources;
    return trackResources.filter((r) => r.type === filter);
  }, [trackResources, filter]);

  const modules = trackResources.filter((r) => r.type === "module");
  const modulesCompleted = modules.filter((m) => progress[m.id]).length;
  const pct = modules.length === 0 ? 0 : Math.round((modulesCompleted / modules.length) * 100);

  const toggle = (id: string) => setProgress(toggleAcademyCompleted(email, id));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-h2 font-bold text-fg leading-tight">Academia Aulentra</h1>
        <p className="mt-2 text-body text-fg-soft tracking-normal normal-case max-w-[680px]">
          Rutas y recursos para sacar partido de Aulentra. La ruta se adapta a tu perfil y guardamos tu progreso aquí mismo.
        </p>
      </header>

      {/* Hero de la ruta */}
      <section className="rounded-lg border border-line-soft bg-card overflow-hidden">
        <div className="h-[2px] bg-horizon-gradient-soft" />
        <div className="p-6 md:p-8">
          <p className="font-mono text-caption uppercase tracking-[0.22em] text-primary mb-2">Tu ruta</p>
          <h2 className="text-h3 font-semibold text-fg leading-tight mb-2">{track.label}</h2>
          <p className="text-body text-fg-soft tracking-normal normal-case max-w-[680px] mb-5 leading-relaxed">
            {track.description}
          </p>

          {/* Progreso global */}
          <div className="pt-5 border-t border-line-soft">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-caption uppercase tracking-[0.16em] text-muted">Progreso en módulos</span>
              <span className="text-small text-fg font-medium tracking-normal normal-case">
                <strong>{modulesCompleted}</strong>
                <span className="text-muted"> / {track.totalModules}</span>
                <span className="ml-2 text-muted">· {pct}%</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-pill bg-bg-deep border border-line-soft overflow-hidden">
              <div className="h-full bg-horizon-gradient-soft transition-[width] duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 pb-3 border-b border-line-soft" role="tablist" aria-label="Filtrar recursos">
        <FilterPill active={filter === "all"} label="Todos" onClick={() => setFilter("all")} />
        <FilterPill active={filter === "module"} label="Módulos" onClick={() => setFilter("module")} />
        <FilterPill active={filter === "tutorial"} label="Tutoriales" onClick={() => setFilter("tutorial")} />
        <FilterPill active={filter === "webinar"} label="Webinars" onClick={() => setFilter("webinar")} />
        <FilterPill active={filter === "template"} label="Plantillas" onClick={() => setFilter("template")} />
      </div>

      {/* Grid de recursos */}
      {filteredResources.length === 0 ? (
        <p className="text-small text-fg-soft tracking-normal normal-case">Sin recursos en esta categoría para tu ruta.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {filteredResources.map((r) => (
            <li key={r.id}>
              <ResourceCard
                resource={r}
                completed={!!progress[r.id]}
                onToggle={() => toggle(r.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterPill({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-pill text-small font-medium transition-colors tracking-normal normal-case border",
        active ? "bg-primary-light text-primary border-primary/30" : "text-fg-soft hover:text-primary border-transparent hover:border-primary/20"
      )}
    >
      {label}
    </button>
  );
}

function ResourceCard({ resource, completed, onToggle }: {
  resource: AcademyResource; completed: boolean; onToggle: () => void;
}) {
  const isCompletable = resource.type === "module" || resource.type === "tutorial";
  return (
    <article className="rounded-lg border border-line-soft bg-card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <TypePill type={resource.type} />
        <span className="text-caption text-muted tracking-normal normal-case">{resource.meta}</span>
      </div>

      <h3 className="text-body font-semibold text-fg leading-tight mb-1.5 tracking-normal normal-case">
        {resource.title}
      </h3>
      <p className="text-small text-fg-soft leading-relaxed tracking-normal normal-case mb-4">
        {resource.summary}
      </p>

      <div className="mt-auto pt-4 border-t border-line-soft flex items-center justify-between gap-3">
        {isCompletable ? (
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              className="accent-primary w-4 h-4"
            />
            <span className="text-caption text-fg-soft tracking-normal normal-case">
              {completed ? "Completado" : "Marcar como completado"}
            </span>
          </label>
        ) : resource.type === "webinar" ? (
          <span className="text-caption text-fg-soft tracking-normal normal-case">
            Inscribirme · disponible pronto
          </span>
        ) : (
          <span className="text-caption text-fg-soft tracking-normal normal-case">
            Descargar · disponible pronto
          </span>
        )}

        <button
          type="button"
          disabled
          title="Disponible pronto (requiere backend)"
          className="text-caption font-semibold text-primary/60 cursor-not-allowed tracking-normal normal-case"
        >
          Abrir →
        </button>
      </div>
    </article>
  );
}

function TypePill({ type }: { type: AcademyResourceType }) {
  const color: Record<AcademyResourceType, string> = {
    module: "bg-primary-light text-primary border-primary/25",
    tutorial: "bg-accent-light text-accent-cyan border-accent/25",
    webinar: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    template: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-pill border text-caption font-semibold tracking-normal normal-case",
      color[type]
    )}>
      {TYPE_LABEL[type]}
    </span>
  );
}
