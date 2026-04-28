"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Spinner } from "@/components/ui/Spinner";
import { Icon } from "@/components/ui/Icon";
import { CONTACT_EMAIL } from "@/lib/contact";

/**
 * SolicitudForm — formulario mock con persistencia en localStorage.
 *
 * Sprint A · 2026-04-27. La entrada queda persistida bajo
 * `aulentra.solicitudes` como array de objetos { nombre, email,
 * organizacion, mensaje, ts }. El backend real se conectará en Sprint B.
 *
 * Visual alineado con el patrón del flujo /acceso: inputs sobre `bg-deep`,
 * borde `line-strong`, focus `primary`, botón con `horizon-gradient`.
 */
type Solicitud = {
  nombre: string;
  email: string;
  organizacion: string;
  mensaje: string;
  ts: string;
};

const STORAGE_KEY = "aulentra.solicitudes";

function persistSolicitud(s: Solicitud): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: Solicitud[] = raw ? (JSON.parse(raw) as Solicitud[]) : [];
    list.unshift(s);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* noop */
  }
}

export function SolicitudForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formatError, setFormatError] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit =
    nombre.trim().length >= 2 &&
    emailValid &&
    organizacion.trim().length >= 2 &&
    !submitting;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) {
      if (!emailValid) setFormatError(true);
      return;
    }
    setFormatError(false);
    setSubmitting(true);

    // Simulación de latencia para feedback visible. Sin esto el cambio de
    // estado es imperceptible y el usuario duda si pulsó.
    window.setTimeout(() => {
      persistSolicitud({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        organizacion: organizacion.trim(),
        mensaje: mensaje.trim(),
        ts: new Date().toISOString(),
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="max-w-[640px] mx-auto text-center">
        <Reveal>
          <Badge tone="primary">Solicitud recibida</Badge>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 text-h1 text-fg font-bold leading-[1.1]">
            <span className="block">Hemos recibido tu solicitud.</span>
            <span className="block">
              Un experto del equipo revisará tu solicitud. Recibirás una respuesta pronto.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-8 text-body-l text-fg-soft leading-relaxed">
            Revisaremos tu solicitud. También puedes contactarnos directamente a{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:text-primary-hover underline-offset-4 hover:underline transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10 h-px w-28 bg-horizon-gradient-soft mx-auto" />
        <Reveal delay={380}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="secondary" className="!text-small">
              Volver al inicio
            </Button>
            <Button href="/acceso" variant="link">
              Ya tengo acceso
            </Button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] mx-auto">
      <div className="text-center">
        <Reveal>
          <Badge tone="primary">Solicitar acceso</Badge>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 text-h1 text-fg font-bold leading-[1.1]">
            <span className="block">Aulentra opera bajo acceso controlado.</span>
            <span className="block">Comencemos conversando.</span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-8 text-body-l text-fg-soft leading-relaxed">
            Incorporamos instituciones educativas y formadores independientes dentro
            de un proceso supervisado, para asegurar que cada implementación se
            diseñe sobre tu realidad operativa.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10 h-px w-28 bg-horizon-gradient-soft mx-auto" />
      </div>

      <Reveal delay={380}>
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-12 grid gap-5"
          aria-label="Formulario de solicitud de acceso"
        >
          <Field label="Nombre completo" htmlFor="solicitud-nombre" required>
            <Input
              id="solicitud-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre y apellido"
              autoComplete="name"
              required
            />
          </Field>

          <Field
            label="Correo"
            htmlFor="solicitud-email"
            required
            error={formatError ? "Ingresa un correo con formato válido." : undefined}
          >
            <Input
              id="solicitud-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formatError) setFormatError(false);
              }}
              placeholder="tu@institucion.edu"
              autoComplete="email"
              required
              invalid={formatError}
            />
          </Field>

          <Field
            label="Institución u organización"
            htmlFor="solicitud-organizacion"
            required
          >
            <Input
              id="solicitud-organizacion"
              type="text"
              value={organizacion}
              onChange={(e) => setOrganizacion(e.target.value)}
              placeholder="Universidad, colegio, academia, formador independiente…"
              autoComplete="organization"
              required
            />
          </Field>

          <Field label="Cuéntanos brevemente" htmlFor="solicitud-mensaje" optional>
            <Textarea
              id="solicitud-mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="El contexto que quieras compartir."
              rows={4}
            />
          </Field>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-full rounded-md py-3.5 font-semibold text-small tracking-wide text-bg-deep disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 bg-horizon-gradient-h-soft"
          >
            {submitting ? (
              <>
                <Spinner size={14} />
                Enviando…
              </>
            ) : (
              <>
                Enviar solicitud
                <Icon name="arrow-right" size={14} />
              </>
            )}
          </button>

          <p className="text-caption-mono-xs text-muted leading-relaxed text-center mt-2 normal-case tracking-normal">
            Al enviar aceptas que el equipo de Aulentra te contacte por correo.
            <br />
            ¿Ya tienes acceso?{" "}
            <Link
              href="/acceso"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Inicia sesión
            </Link>
            .
          </p>
        </form>
      </Reveal>
    </div>
  );
}
