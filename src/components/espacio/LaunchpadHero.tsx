"use client";

import { type AulentraSession } from "@/lib/aulentra-auth";
import { AULENTRA_APP_URL, roleLabel } from "@/lib/aulentra-mock-data";

interface Props { session: AulentraSession }

/**
 * Bloque 1 · Launchpad
 * Hero dominante con saludo, contexto y CTA "Entrar a Aulentra".
 * La función central del Customer Hub: abrir la plataforma real por SSO.
 */
export function LaunchpadHero({ session }: Props) {
  const greeting = greetByTime();
  const { data } = session;

  const contextBlurb =
    data.kind === "institution"
      ? `Accedes a Aulentra como ${roleLabel(data.role).toLowerCase()} de ${data.institution.name}. Abre la plataforma para continuar con tu trabajo o explora las opciones de tu cuenta desde aquí.`
      : `Gestionas tu práctica formativa con Aulentra. Abre la plataforma para atender a tus alumnos o ajusta tu plan y facturación desde este espacio.`;

  const chipLabel =
    data.kind === "institution"
      ? `${roleLabel(data.role)} · ${data.institution.name}`
      : "Formador particular";

  const handleOpen = () => {
    window.open(AULENTRA_APP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-label="Abrir Aulentra"
      className="relative overflow-hidden rounded-lg border border-line-soft bg-card"
    >
      {/* Línea de marca superior */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-horizon-gradient" />

      <div className="p-6 md:p-10">
        <p className="font-mono text-caption uppercase tracking-[0.22em] text-primary mb-3">
          Mi espacio Aulentra
        </p>

        <h1 className="text-h2 md:text-h1 font-bold text-fg leading-tight mb-4">
          {greeting}, {session.user.name}.
        </h1>

        {/* Chip de contexto: institución o formador */}
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-pill bg-primary-light border border-primary/25">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-small text-primary font-medium tracking-normal normal-case">
            {chipLabel}
          </span>
        </div>

        <p className="text-body-l text-fg-soft max-w-[680px] leading-relaxed mb-8 tracking-normal normal-case">
          {contextBlurb}
        </p>

        {/* CTA dominante — el gesto central del Customer Hub */}
        <button
          type="button"
          onClick={handleOpen}
          className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 rounded-md bg-horizon-gradient text-white font-semibold text-body shadow-lg hover:brightness-110 transition-[filter,transform] duration-200 hover:translate-y-[-1px]"
        >
          <span>Entrar a Aulentra</span>
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >↗</span>
        </button>

        <p className="mt-4 text-caption text-fg-soft tracking-normal normal-case">
          Se abre en una pestaña nueva · sesión iniciada por enlace seguro
        </p>
      </div>
    </section>
  );
}

function greetByTime(): string {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}
