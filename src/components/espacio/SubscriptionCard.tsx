"use client";

import { type AulentraSession } from "@/lib/aulentra-auth";
import { type AulentraProfile } from "@/lib/aulentra-mock-data";
import { cn } from "@/lib/cn";

interface Props { session: AulentraSession }

/**
 * Bloque 2 · Suscripción y facturación
 *
 * La visibilidad y profundidad de este bloque cambia por perfil:
 *  - Institución ADMIN → lectura del plan + licencias + link al Portal Noventor
 *    (regla del atajo con salto — la gestión de licencias vive en Noventor)
 *  - Institución TEACHER/STUDENT → tarjeta informativa breve con los datos
 *    generales del plan institucional (sin controles editables)
 *  - Formador particular → gestión directa: plan, método de pago, renovación
 *    y historial de facturas (único perfil que contrata directo).
 */
export function SubscriptionCard({ session }: Props) {
  const { data } = session;
  if (data.kind === "institution") return <InstitutionVariant data={data} />;
  return <IndependentVariant data={data} />;
}

/* ==================================================================
   Variante institución — ADMIN ve todo; TEACHER/STUDENT ven resumen.
   ================================================================== */
function InstitutionVariant({ data }: { data: Extract<AulentraProfile, { kind: "institution" }> }) {
  const isAdmin = data.role === "ADMIN";
  const pct = Math.min(100, Math.round((data.institution.licensesUsed / data.institution.licensesTotal) * 100));

  return (
    <section aria-label="Plan institucional" className="space-y-4">
      <header>
        <h2 className="text-h3 font-semibold text-fg leading-tight">
          {isAdmin ? "Plan de tu institución" : "Plan institucional vigente"}
        </h2>
        <p className="mt-1 text-small text-fg-soft tracking-normal normal-case">
          {isAdmin
            ? "Resumen del contrato con Noventor. La gestión detallada de licencias vive en el Portal Empresarial."
            : "Este plan lo administra la dirección de tu institución."}
        </p>
      </header>

      <article className="rounded-lg border border-line-soft bg-card overflow-hidden">
        <div className="h-[2px] bg-horizon-gradient-soft" />

        {/* Resumen del plan */}
        <div className="p-6 md:p-7 border-b border-line-soft">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-caption uppercase tracking-[0.16em] text-muted mb-1">Plan activo</p>
              <p className="text-body-l font-semibold text-fg tracking-normal normal-case">
                {data.institution.plan}
              </p>
              <p className="mt-1 text-small text-fg-soft tracking-normal normal-case">
                Renovación: <span className="text-fg font-medium">{data.institution.renewalDate}</span>
              </p>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-accent-light border border-accent/30 text-accent-cyan text-caption font-semibold tracking-normal normal-case">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              Institucional activo
            </span>
          </div>

          {/* Barra de licencias */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-caption uppercase tracking-[0.16em] text-muted">Licencias del centro</span>
              <span className="text-small text-fg font-medium tracking-normal normal-case">
                <strong className="text-fg">{data.institution.licensesUsed.toLocaleString("es-CO")}</strong>
                <span className="text-muted"> / {data.institution.licensesTotal.toLocaleString("es-CO")}</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-pill bg-bg-deep border border-line-soft overflow-hidden">
              <div className="h-full bg-horizon-gradient-soft transition-[width] duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Acciones — diferenciadas por rol */}
        <div className="p-6 md:p-7 bg-bg-deep/40">
          {isAdmin ? (
            <div className="grid md:grid-cols-2 gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                title="Próximamente · abrirá el Portal Empresarial de Noventor"
                className={cn(
                  "group inline-flex items-center justify-between px-4 py-3 rounded-md",
                  "bg-horizon-gradient text-white font-semibold text-small tracking-normal normal-case",
                  "hover:brightness-110 transition"
                )}
              >
                <span>Gestionar licencias en Noventor</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <button
                type="button"
                disabled
                title="Disponible pronto"
                className="inline-flex items-center justify-between px-4 py-3 rounded-md border border-line text-small text-fg-soft font-medium tracking-normal normal-case cursor-not-allowed opacity-70"
              >
                <span>Contactar gestor Noventor</span>
                <span className="text-[9pt] text-muted">· pronto</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <p className="text-small text-fg-soft leading-relaxed tracking-normal normal-case flex-1">
                {data.role === "TEACHER"
                  ? "Tus grupos, evaluaciones y comunicaciones con familias viven dentro de la plataforma Aulentra."
                  : "Tu calendario de clases, tareas y evaluaciones viven dentro de la plataforma Aulentra."}
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="shrink-0 text-small font-semibold text-primary hover:text-primary-hover transition-colors tracking-normal normal-case"
              >
                Ver cómo pidas ayuda a tu institución →
              </a>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

/* ==================================================================
   Variante formador particular — gestión directa de plan y facturas.
   ================================================================== */
function IndependentVariant({ data }: { data: Extract<AulentraProfile, { kind: "independent" }> }) {
  return (
    <section aria-label="Tu suscripción" className="space-y-4">
      <header>
        <h2 className="text-h3 font-semibold text-fg leading-tight">Tu suscripción y facturación</h2>
        <p className="mt-1 text-small text-fg-soft tracking-normal normal-case">
          Gestiona tu plan, método de pago y revisa tus facturas.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Columna 1: plan + precio (span 2 en desktop) */}
        <article className="md:col-span-2 rounded-lg border border-line-soft bg-card overflow-hidden">
          <div className="h-[2px] bg-horizon-gradient-soft" />
          <div className="p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-caption uppercase tracking-[0.16em] text-muted mb-1">Plan activo</p>
                <p className="text-body-l font-semibold text-fg tracking-normal normal-case">
                  {data.plan.name}
                </p>
                <p className="mt-1 text-small text-fg-soft tracking-normal normal-case">
                  <strong className="text-fg">{data.plan.price}</strong>
                  {" · "}
                  <span className="capitalize">facturación {data.plan.cadence}</span>
                </p>
              </div>

              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-primary-light border border-primary/30 text-primary text-caption font-semibold tracking-normal normal-case">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Activa
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-line-soft">
              <MetaField label="Próxima renovación" value={data.nextRenewal} />
              <MetaField label="Alumnos activos" value={data.activeStudents.toString()} />
              <MetaField label="Modalidad" value={data.modality} />
              <MetaField label="Método de pago" value={data.paymentMethod} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                disabled
                title="Disponible pronto"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-horizon-gradient text-white font-semibold text-small tracking-normal normal-case opacity-80 cursor-not-allowed"
              >
                <span>Actualizar plan</span>
                <span className="text-[9pt]">· pronto</span>
              </button>
              <button
                type="button"
                disabled
                title="Disponible pronto"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line text-fg-soft font-medium text-small tracking-normal normal-case opacity-80 cursor-not-allowed"
              >
                <span>Cambiar método de pago</span>
              </button>
            </div>
          </div>
        </article>

        {/* Columna 2: facturas */}
        <article className="rounded-lg border border-line-soft bg-card overflow-hidden flex flex-col">
          <div className="h-[2px] bg-horizon-gradient-soft" />
          <div className="p-6 flex-1">
            <p className="text-caption uppercase tracking-[0.16em] text-muted mb-3">Facturas</p>

            {data.invoices.length === 0 ? (
              <p className="text-small text-fg-soft tracking-normal normal-case">
                Aún no tienes facturas emitidas.
              </p>
            ) : (
              <ul className="divide-y divide-line-soft">
                {data.invoices.slice(0, 4).map((inv, i) => (
                  <li key={i} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-small text-fg font-medium tracking-normal normal-case truncate">
                        {inv.amount}
                      </p>
                      <p className="text-caption text-fg-soft tracking-normal normal-case">{inv.date}</p>
                    </div>
                    <button
                      type="button"
                      disabled
                      title="Descarga disponible pronto"
                      className="shrink-0 text-caption font-semibold text-primary/70 cursor-not-allowed tracking-normal normal-case"
                    >
                      PDF ↓
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-line-soft p-4 text-center">
            <button
              type="button"
              disabled
              className="text-caption font-semibold text-primary/70 cursor-not-allowed tracking-normal normal-case"
            >
              Ver historial completo · pronto
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-caption uppercase tracking-[0.16em] text-muted mb-1">{label}</p>
      <p className="text-small text-fg font-medium tracking-normal normal-case">{value}</p>
    </div>
  );
}
