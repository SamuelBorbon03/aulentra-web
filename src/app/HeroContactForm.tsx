"use client";

import { useState, type ReactNode } from "react";
import { landing } from "@/content/landing";

const inputClasses =
  "w-full px-4 py-2.5 rounded-md bg-bg-deep border border-line text-fg placeholder-fg/30 text-small focus:outline-none focus:border-primary transition-colors";

const labelClasses =
  "block text-caption uppercase tracking-[0.18em] text-fg/55 mb-1.5";

function FieldLabel({ htmlFor, children, optional = false }: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
      {optional && (
        <span className="ml-2 text-[10px] tracking-normal lowercase text-fg/35 align-middle">
          opcional
        </span>
      )}
    </label>
  );
}

/**
 * HeroContactForm — Aulentra · lead capture con campo "Tu perfil"
 * condicional (institución vs formador particular).
 *
 * Si "Tu perfil" = institución → muestra "Nombre de la institución" +
 * "Cantidad aproximada de estudiantes". Si = formador particular,
 * solo nombre + email + perfil.
 *
 * Sin la palabra "demo" — Aulentra no ofrece demos. Submit dice
 * "Quiero conocer Aulentra".
 */
export function HeroContactForm() {
  const { eyebrow, headline, helper, submit, microcopy, perfilOptions } =
    landing.heroForm;

  const [perfil, setPerfil] = useState<string>("");
  const isInstitucion = perfil === "institucion";

  return (
    <form
      id="cta-form"
      onSubmit={(e) => e.preventDefault()}
      className="relative p-6 md:p-7 rounded-card bg-card border border-line overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-horizon-gradient-soft" />

      <div className="text-caption uppercase tracking-[0.22em] text-primary mb-2">
        {eyebrow}
      </div>
      <h2 className="text-h3 text-fg font-bold leading-snug mb-3">
        {headline}
      </h2>
      <p className="text-small text-fg/70 leading-relaxed mb-6">{helper}</p>

      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="hf-nombre">Nombre completo</FieldLabel>
          <input
            id="hf-nombre"
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre"
            className={inputClasses}
            autoComplete="name"
          />
        </div>

        <div>
          <FieldLabel htmlFor="hf-perfil">Tu perfil</FieldLabel>
          <select
            id="hf-perfil"
            name="perfil"
            required
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Selecciona tu perfil
            </option>
            {perfilOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional: solo aparece si Tu perfil = Institución educativa */}
        {isInstitucion && (
          <div className="animate-fade-in-up">
            <FieldLabel htmlFor="hf-institucion">Nombre de la institución</FieldLabel>
            <input
              id="hf-institucion"
              name="institucion"
              type="text"
              required
              placeholder="Colegio, academia, universidad…"
              className={inputClasses}
            />
          </div>
        )}

        <div>
          <FieldLabel htmlFor="hf-email">Email</FieldLabel>
          <input
            id="hf-email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className={inputClasses}
            autoComplete="email"
          />
        </div>

        {/* Conditional: solo aparece si Tu perfil = Institución educativa */}
        {isInstitucion && (
          <div className="animate-fade-in-up">
            <FieldLabel htmlFor="hf-estudiantes" optional>
              Cantidad aproximada de estudiantes
            </FieldLabel>
            <input
              id="hf-estudiantes"
              name="estudiantes"
              type="number"
              min="1"
              placeholder="Ej. 350"
              className={inputClasses}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-7 w-full px-7 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-base hover:opacity-90 active:scale-[0.98] shadow-md hover:shadow-lg transition-all"
      >
        {submit}
      </button>

      <p className="mt-3 text-caption text-fg/45 leading-relaxed">
        {microcopy}
      </p>
    </form>
  );
}
