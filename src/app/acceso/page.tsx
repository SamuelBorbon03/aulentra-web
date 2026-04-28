"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findOrgBySlug, lookupOrgByEmail, type AulentraOrg } from "@/lib/aulentra-orgs";
import {
  buildRedirectToExternalTool,
  clearLoginSession,
  loadLoginSession,
  savePendingLogin,
} from "@/lib/aulentra-login";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL, mailtoUrl } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { TramaGenerativa } from "@/components/access/TramaGenerativa";
import { DocumentoCredencial } from "@/components/access/DocumentoCredencial";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { Field, Input } from "@/components/ui/Field";

/**
 * /acceso · Fase 1 + Fase 2 del flujo SaaS de login Aulentra (2026-04-24).
 *
 * Fase 1 — Acceso: el usuario ingresa su correo institucional.
 * Fase 2 — Reconocimiento (nueva): al detectar la org, cross-fade de 750ms
 *          que muestra "Te estamos conectando con tu institución..." +
 *          avatar institucional antes de navegar a /acceso/[slug].
 *
 * Estados:
 *  - form:         pantalla de email
 *  - recognizing:  transición Aulentra → institución
 *  - unknown_org:  vista dedicada con 2 CTAs (Solicitar acceso / Contactar)
 *  - generic_error: fallback para errores no esperados
 *
 * En producción, Fase 5 (redirect) vive en el subdominio institucional.
 * Aquí simulamos con ruta por slug; middleware reescribe en prod.
 */
type Phase =
  | "loading"
  | "resume"
  | "form"
  | "credential"
  | "recognizing"
  | "unknown_org"
  | "generic_error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccesoPage() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>("loading");
  const [busy, setBusy] = useState(false);
  const [busyLong, setBusyLong] = useState(false);
  const [matchedOrg, setMatchedOrg] = useState<AulentraOrg | null>(null);
  const [formatError, setFormatError] = useState(false);
  const [resumeSession, setResumeSession] = useState<{ email: string; org: AulentraOrg } | null>(null);

  const emailValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);

  // Microcopy >600ms · Sprint C · C.5: pasa de "Verificando…" a
  // "Verificando con tu institución…" cuando el roundtrip se siente largo.
  useEffect(() => {
    if (!busy) {
      setBusyLong(false);
      return;
    }
    const t = window.setTimeout(() => setBusyLong(true), 600);
    return () => window.clearTimeout(t);
  }, [busy]);

  // Hidratación inicial: si hay sesión activa, ofrecemos retomarla.
  useEffect(() => {
    const session = loadLoginSession();
    if (!session) {
      setPhase("form");
      return;
    }
    const org = findOrgBySlug(session.orgSlug);
    if (!org) {
      // Sesión apunta a una org que ya no existe — limpiamos y mostramos form.
      clearLoginSession();
      setPhase("form");
      return;
    }
    setResumeSession({ email: session.email, org });
    setPhase("resume");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || busy) {
      if (!emailValid) setFormatError(true);
      return;
    }
    setBusy(true);
    setFormatError(false);

    // Latencia simulada para sensación de verificación real
    setTimeout(() => {
      try {
        const result = lookupOrgByEmail(email);
        if (!result.ok) {
          if (result.reason === "invalid_email") {
            setFormatError(true);
            setBusy(false);
            return;
          }
          // unknown_org → pantalla dedicada
          setPhase("unknown_org");
          setBusy(false);
          return;
        }

        savePendingLogin({
          email: result.email,
          orgSlug: result.org.slug,
          at: new Date().toISOString(),
        });
        setMatchedOrg(result.org);
        // P3 — fragmento credencial antes de recognizing
        setPhase("credential");
      } catch {
        setPhase("generic_error");
        setBusy(false);
      }
    }, 360);
  };

  // Fase 2 — Reconocimiento: tras ~850ms navegamos al paso 2.
  // Si el usuario pidió reduce-motion, redirección inmediata.
  useEffect(() => {
    if (phase !== "recognizing" || !matchedOrg) return;
    const delay = reduceMotion ? 0 : 850;
    const t = window.setTimeout(() => {
      router.push(`/acceso/${matchedOrg.slug}`);
    }, delay);
    return () => window.clearTimeout(t);
  }, [phase, matchedOrg, router, reduceMotion]);

  // Estado de la trama generativa según phase del flow
  const tramaState =
    phase === "credential" || phase === "recognizing"
      ? "valid"
      : phase === "unknown_org" || phase === "generic_error"
      ? "error"
      : email.length > 3
      ? "typing"
      : "idle";

  return (
    <div className="min-h-[calc(100vh-160px)] relative overflow-hidden flex items-center justify-center px-5 py-16">
      {/* P8 · Trama generativa reactiva · capa más profunda */}
      <TramaGenerativa
        state={tramaState}
        accent={matchedOrg?.brandColor ?? "#A5B4FC"}
        accent2="#67E8F9"
        intensity={1}
      />

      {/* Fondo · halo radial + grid sutil (constante en todas las fases) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full opacity-40 transition-all duration-700"
          style={{
            background: matchedOrg
              ? `radial-gradient(circle,${matchedOrg.brandColor}30 0%,transparent 65%)`
              : "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.14) 0%,transparent 60%)" }}
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(165,180,252,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(165,180,252,0.3) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 w-full max-w-[460px]">
        {phase === "loading" && <LoadingView />}

        {phase === "resume" && resumeSession && (
          <ResumeView
            session={resumeSession}
            onContinue={() => {
              const url = buildRedirectToExternalTool(resumeSession.org, resumeSession.email);
              window.location.href = url;
            }}
            onSwitchAccount={() => {
              clearLoginSession();
              setResumeSession(null);
              setEmail("");
              setPhase("form");
            }}
          />
        )}

        {phase === "form" && (
          <FormView
            email={email}
            setEmail={(v) => {
              setEmail(v);
              if (formatError) setFormatError(false);
            }}
            emailValid={emailValid}
            busy={busy}
            busyLong={busyLong}
            formatError={formatError}
            onSubmit={handleSubmit}
          />
        )}

        {phase === "credential" && matchedOrg && (
          <div className="flex flex-col items-center animate-fade-in-up">
            <DocumentoCredencial
              variant="fragment"
              data={{
                correo: email,
                dominio: email.split("@")[1] ?? "",
                institucion: matchedOrg.name,
                estado: "Verificado",
              }}
              accent={matchedOrg.brandColor}
              onComplete={() => setPhase("recognizing")}
            />
          </div>
        )}

        {phase === "recognizing" && matchedOrg && <RecognizingView org={matchedOrg} />}

        {phase === "unknown_org" && (
          <UnknownOrgView
            email={email}
            onRetry={() => {
              setEmail("");
              setPhase("form");
            }}
          />
        )}

        {phase === "generic_error" && (
          <GenericErrorView
            onRetry={() => {
              setPhase("form");
              setBusy(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ═══════════ Form (Fase 1) ═══════════ */
function FormView({
  email,
  setEmail,
  emailValid,
  busy,
  busyLong,
  formatError,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  emailValid: boolean;
  busy: boolean;
  busyLong: boolean;
  formatError: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="animate-fade-in-up">
      {/* Brand header */}
      <div className="flex flex-col items-center mb-10">
        <Link href="/" className="group flex items-center gap-3 mb-6" aria-label="Volver al home de Aulentra">
          <Image
            src="/brand/aulentra_symbol_transparent.png"
            alt=""
            width={240}
            height={240}
            className="w-16 h-16 object-contain"
            priority
          />
        </Link>
        <div className="text-micro uppercase text-primary/90 mb-2.5">
          Acceso · Sistema operativo académico
        </div>
        <div className="text-h3 font-bold tracking-[0.12em] bg-clip-text text-transparent bg-horizon-gradient-h-wordmark">
          AULENTRA
        </div>
      </div>

      {/* Tarjeta de login */}
      <div className="relative rounded-lg border border-line-strong bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg">
        <div className="h-[2px] bg-horizon-gradient" />
        <div className="px-7 py-8">
          <form onSubmit={onSubmit}>
            <div className="text-caption uppercase tracking-[0.22em] text-primary mb-2">
              Paso 1 · Identificación
            </div>
            <h2 className="text-h3 font-bold text-fg leading-tight mb-2">Accede a tu institución.</h2>
            <p className="text-small text-text-muted mb-6 leading-relaxed">
              Ingresa tu correo institucional para continuar.
            </p>

            <Field
              label="Correo institucional"
              htmlFor="acceso-email"
              error={formatError ? "Ingresa un correo con formato válido." : undefined}
            >
              <div className="relative">
                <Input
                  id="acceso-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@institucion.edu"
                  autoComplete="email"
                  required
                  autoFocus
                  invalid={formatError}
                  className={cn(
                    "pr-10",
                    !formatError && emailValid && "border-primary/50 focus:border-primary",
                  )}
                />
                {/* Indicador validación tiempo real */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  {email && emailValid && !formatError && <Icon name="check" size={16} />}
                </div>
              </div>
            </Field>

            <button
              type="submit"
              disabled={busy || !emailValid}
              className="mt-6 w-full rounded-md py-3.5 font-semibold text-small tracking-wide text-bg-deep disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 bg-horizon-gradient-h-soft"
            >
              {busy ? (
                <>
                  <Spinner size={14} />
                  {busyLong ? "Verificando con tu institución…" : "Verificando…"}
                </>
              ) : (
                <>Continuar</>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-caption-mono-xs text-muted leading-relaxed normal-case tracking-normal">
        Solo acceden instituciones autorizadas y formadores registrados en Aulentra.
        <br />
        ¿Tu institución aún no está registrada?{" "}
        <Link href="/solicitar-acceso" className="text-primary hover:text-primary-hover transition-colors">
          Solicitar acceso
        </Link>
        .
      </div>
    </div>
  );
}

/* ═══════════ Reconocimiento (Fase 2) ═══════════ */
function RecognizingView({ org }: { org: AulentraOrg }) {
  const reduceMotion = usePrefersReducedMotion();
  // Progresión en 3 estados para timeline del cross-fade:
  //   t=0:    Aulentra visible, institución oculta
  //   t=80:   ambos visibles (cross-fade inicia)
  //   t=350:  Aulentra oculto, institución plena
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const d1 = reduceMotion ? 0 : 80;
    const d2 = reduceMotion ? 0 : 380;
    const t1 = window.setTimeout(() => setStage(1), d1);
    const t2 = window.setTimeout(() => setStage(2), d2);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Zona del logo con cross-fade */}
      <div className="relative w-24 h-24 mb-8">
        {/* Aulentra symbol */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: stage === 2 ? 0 : 1,
            transform: stage === 2 ? "scale(0.85)" : "scale(1)",
          }}
        >
          <Image
            src="/brand/aulentra_symbol_transparent.png"
            alt=""
            width={240}
            height={240}
            className="w-20 h-20 object-contain"
            priority
          />
        </div>

        {/* Institution avatar */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "scale(1)" : "scale(0.92)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg,${org.brandColor} 0%,${org.brandColor}99 100%)`,
            }}
          >
            <span className="text-h2 font-bold text-white leading-none tracking-wide">
              {orgInitials(org.name)}
            </span>
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
          </div>
        </div>
      </div>

      {/* Copy transicional */}
      <div
        className="transition-opacity duration-400"
        style={{ opacity: stage >= 1 ? 1 : 0 }}
      >
        <div className="text-caption uppercase tracking-[0.22em] text-primary mb-3">
          Reconocido
        </div>
        <h2 className="text-h2 font-bold text-fg mb-2">{org.name}</h2>
        <p className="text-small text-text-muted">
          Te estamos conectando con tu institución…
        </p>
      </div>

      {/* Progress track sutil */}
      <div className="mt-10 w-48 h-[2px] bg-line-soft rounded-full overflow-hidden">
        <div
          className="h-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: stage === 0 ? "10%" : stage === 1 ? "55%" : "100%",
            background: `linear-gradient(90deg,${org.brandColor} 0%,#67E8F9 100%)`,
            transitionDuration: stage === 0 ? "200ms" : "500ms",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════ Unknown org ═══════════ */
function UnknownOrgView({ email, onRetry }: { email: string; onRetry: () => void }) {
  const contactHref = mailtoUrl({
    subject: "Consulta sobre acceso institucional a Aulentra",
    body: `Hola,\n\nEstoy intentando acceder a Aulentra con el correo ${email} pero mi institución aún no aparece registrada.\n\n¿Pueden ayudarme a coordinar el proceso?\n\nGracias.`,
  });

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full border border-line-strong bg-card flex items-center justify-center mb-5 text-text-muted">
          <Icon name="info" size={24} />
        </div>
        <div className="text-caption uppercase tracking-[0.22em] text-text-muted mb-3">
          Sin registro
        </div>
        <h2 className="text-h2 font-bold text-fg text-center leading-tight mb-3">
          No encontramos tu correo asociado a una institución autorizada.
        </h2>
        <p className="text-small text-text-muted text-center leading-relaxed max-w-[360px]">
          El correo <span className="font-mono text-text-default">{email}</span> no está asociado a ninguna
          institución ni formador registrado.
        </p>
      </div>

      <div className="rounded-lg border border-line-strong bg-card/70 backdrop-blur-sm overflow-hidden">
        <div className="h-[2px] bg-horizon-gradient-soft" />
        <div className="p-6 space-y-3">
          <Link
            href="/solicitar-acceso"
            className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-md border border-line-strong hover:border-primary/60 hover:bg-primary/5 transition-colors group"
          >
            <div>
              <div className="text-small font-semibold text-fg group-hover:text-primary transition-colors">
                ¿Aún no tienes acceso? Solicita acceso.
              </div>
              <div className="text-caption text-text-muted mt-0.5">
                Inicia el proceso de incorporación a Aulentra.
              </div>
            </div>
            <Icon name="arrow-right" size={16} className="text-primary" />
          </Link>

          <a
            href={contactHref}
            className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-md border border-line-strong hover:border-primary/60 hover:bg-primary/5 transition-colors group"
          >
            <div>
              <div className="text-small font-semibold text-fg group-hover:text-primary transition-colors">
                Contactar al equipo
              </div>
              <div className="text-caption text-text-muted mt-0.5">
                Escríbenos para coordinar la incorporación de tu institución.
              </div>
            </div>
            <Icon name="arrow-right" size={16} className="text-primary" />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-caption text-text-muted hover:text-primary transition-colors"
        >
          <Icon name="arrow-left" size={12} />
          Probar con otro correo
        </button>
      </div>
    </div>
  );
}

/* ═══════════ Error genérico ═══════════ */
function GenericErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="animate-fade-in-up text-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full border border-line-strong bg-card flex items-center justify-center mb-5 text-text-muted">
          <Icon name="alert-triangle" size={24} />
        </div>
        <h2 className="text-h2 font-bold text-fg mb-3">No pudimos completar la solicitud.</h2>
        <p className="text-small text-text-muted max-w-[360px] mx-auto leading-relaxed">
          Intenta de nuevo en unos segundos. Si el problema continúa, escríbenos a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:text-primary-hover transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-3 rounded-md text-small font-semibold text-bg-deep bg-horizon-gradient-h-soft"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}

/* ═══════════ Loading inicial (chequeo de sesión) ═══════════ */
function LoadingView() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3 text-text-subtle text-small">
        <Spinner size={16} />
        Verificando sesión…
      </div>
    </div>
  );
}

/* ═══════════ Resume — sesión activa detectada ═══════════ */
function ResumeView({
  session,
  onContinue,
  onSwitchAccount,
}: {
  session: { email: string; org: AulentraOrg };
  onContinue: () => void;
  onSwitchAccount: () => void;
}) {
  const { email, org } = session;
  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col items-center mb-8">
        <div className="text-micro uppercase text-primary/90 mb-5">
          Sesión activa
        </div>

        <div
          className="relative w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
          style={{
            background: `linear-gradient(135deg,${org.brandColor} 0%,${org.brandColor}99 100%)`,
          }}
        >
          <span className="text-h2 font-bold text-white leading-none tracking-wide">
            {orgInitials(org.name)}
          </span>
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15 pointer-events-none" />
        </div>

        <h2 className="text-h2 font-bold text-fg text-center leading-tight">
          Bienvenido de vuelta.
        </h2>
        <p className="mt-2 text-small text-text-default text-center max-w-[360px] leading-relaxed">
          Ya estás conectado con <span className="text-text-strong">{org.name}</span>.
        </p>
        <p className="mt-1 text-caption text-muted font-mono">{email}</p>
      </div>

      <div className="rounded-lg border border-line-strong bg-card/85 backdrop-blur-sm overflow-hidden shadow-lg">
        <div
          className="h-[2px]"
          style={{ background: `linear-gradient(90deg,${org.brandColor} 0%,#67E8F9 100%)` }}
        />
        <div className="px-7 py-7">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-md py-3.5 font-semibold text-small tracking-wide text-white transition-opacity flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(90deg,${org.brandColor} 0%,#06B6D4 100%)`,
            }}
          >
            Continuar a {org.name}
            <Icon name="arrow-right" size={14} />
          </button>

          <button
            type="button"
            onClick={onSwitchAccount}
            className="mt-4 w-full text-center text-caption text-text-muted hover:text-primary transition-colors"
          >
            No soy yo · cambiar cuenta
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-caption-mono-xs text-muted leading-relaxed normal-case tracking-normal">
        Al continuar, te llevaremos al entorno operativo de tu institución.
      </p>
    </div>
  );
}

/* ---------- helpers ---------- */
function orgInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
