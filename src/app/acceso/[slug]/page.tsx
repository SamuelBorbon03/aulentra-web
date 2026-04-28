"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { findOrgBySlug, type AulentraOrg } from "@/lib/aulentra-orgs";
import {
  LOGIN_MOCK_PASSWORD,
  buildRedirectToExternalTool,
  clearPendingLogin,
  loadPendingLogin,
  saveLoginSession,
} from "@/lib/aulentra-login";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { TramaGenerativa } from "@/components/access/TramaGenerativa";
import { DocumentoCredencial } from "@/components/access/DocumentoCredencial";
import { Spinner } from "@/components/ui/Spinner";
import { Icon } from "@/components/ui/Icon";
import { Field, Input } from "@/components/ui/Field";

/**
 * /acceso/[slug] · Fase 3 + Fase 4 del flujo SaaS de login.
 *
 * Fase 3 — Login institucional: campo de contraseña con branding de la org.
 * Fase 4 — Transición a sistema (nueva): al autenticar, ~600ms de pantalla
 *          "Entrando a tu entorno…" con logo institucional antes del redirect
 *          a la herramienta externa.
 *
 * En producción vive en `{slug}.aulentra.com/login`.
 */
type Phase = "form" | "credential" | "entering";

export default function AccesoSlugPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const slug = params.slug;

  const [org, setOrg] = useState<AulentraOrg | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<"bad_password" | "no_pending" | "generic" | null>(null);
  const [phase, setPhase] = useState<Phase>("form");

  useEffect(() => {
    const found = findOrgBySlug(slug);
    if (!found) {
      router.replace("/acceso");
      return;
    }
    setOrg(found);

    const pending = loadPendingLogin();
    if (!pending || pending.orgSlug !== found.slug) {
      setError("no_pending");
      setHydrated(true);
      return;
    }
    setEmail(pending.email);
    setHydrated(true);
  }, [slug, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org || !email || !password || busy) return;
    setBusy(true);
    setError(null);

    setTimeout(() => {
      try {
        if (password !== LOGIN_MOCK_PASSWORD) {
          setError("bad_password");
          setBusy(false);
          return;
        }
        saveLoginSession({
          email,
          orgSlug: org.slug,
          loggedInAt: new Date().toISOString(),
        });
        clearPendingLogin();

        // P3 · documento credencial antes de Fase 4 (entering)
        setPhase("credential");
      } catch {
        setError("generic");
        setBusy(false);
      }
    }, 360);
  };

  /* ───── Hidratando / cargando ───── */
  if (!hydrated || !org) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-subtle text-small">
          <Spinner size={16} />
          Preparando tu entorno…
        </div>
      </div>
    );
  }

  /* ───── Error: sesión incompleta ───── */
  if (error === "no_pending") {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-5">
        <div className="max-w-[440px] w-full rounded-lg border border-line-strong bg-card p-8 text-center">
          <div className="text-caption uppercase tracking-[0.22em] text-primary mb-3">Sesión incompleta</div>
          <h2 className="text-h3 font-bold text-fg mb-3">Necesitas identificarte primero.</h2>
          <p className="text-small text-text-muted mb-6 leading-relaxed">
            Aulentra requiere que ingreses tu correo institucional antes de mostrarte el entorno de tu institución.
          </p>
          <Link
            href="/acceso"
            className="inline-block px-5 py-2.5 rounded-md text-small font-semibold text-bg-deep bg-horizon-gradient-h-soft"
          >
            Ir a identificación
          </Link>
        </div>
      </div>
    );
  }

  /* ───── Fondo branded por institución ───── */
  const tramaState =
    phase === "credential" ? "valid" : phase === "entering" ? "valid" : "idle";
  const Background = (
    <>
      {/* P8 · Trama generativa reactiva tinted con brandColor del tenant */}
      <TramaGenerativa
        state={tramaState}
        accent={org.brandColor}
        accent2="#67E8F9"
        intensity={0.85}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full opacity-45"
          style={{ background: `radial-gradient(circle,${org.brandColor}33 0%,transparent 60%)` }}
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

      {/* Sigilos laterales · marcas de agua arquitectónicas (xl+) */}

      {/* Sigilo Aulentra · izquierda · A del brand · clamp para escalas medianas */}
      <div
        aria-hidden
        className="hidden xl:block absolute top-1/2 -translate-y-1/2 left-[6%] pointer-events-none opacity-[0.15]"
        style={{
          width: "clamp(380px, 32vw, 640px)",
          height: "clamp(380px, 32vw, 640px)",
          maskImage:
            "radial-gradient(circle at center, black 35%, rgba(0,0,0,0.45) 65%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 35%, rgba(0,0,0,0.45) 65%, transparent 92%)",
        }}
      >
        <Image
          src="/brand/aulentra_symbol_transparent.png"
          alt=""
          width={720}
          height={720}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Sigilo Tenant · derecha · iniciales tipográficas · clamp coordinado */}
      <div
        aria-hidden
        className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-[6%] pointer-events-none opacity-[0.15] items-center justify-center"
        style={{
          width: "clamp(380px, 32vw, 640px)",
          height: "clamp(380px, 32vw, 640px)",
          maskImage:
            "radial-gradient(circle at center, black 35%, rgba(0,0,0,0.45) 65%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 35%, rgba(0,0,0,0.45) 65%, transparent 92%)",
        }}
      >
        <span
          className="font-bold leading-none tracking-tight select-none"
          style={{
            fontSize: "clamp(180px, 22vw, 360px)",
            color: org.brandColor,
          }}
        >
          {orgInitials(org.name)}
        </span>
      </div>
    </>
  );

  /* ───── Fase intermedia · documento credencial (P3) ───── */
  if (phase === "credential") {
    const { firstName: fn } = splitName(email);
    return (
      <div className="min-h-[calc(100vh-160px)] relative overflow-hidden flex items-center justify-center px-5 py-16">
        {Background}
        <div className="relative z-10">
          <DocumentoCredencial
            variant="full"
            data={{
              identificacion: fn ?? email.split("@")[0],
              correo: email,
              institucion: org.name,
              ubicacion: org.location,
              estado: "Activo",
            }}
            accent={org.brandColor}
            onComplete={() => {
              setPhase("entering");
              const url = buildRedirectToExternalTool(org, email);
              const delay = reduceMotion ? 0 : 600;
              window.setTimeout(() => {
                window.location.href = url;
              }, delay);
            }}
          />
        </div>
      </div>
    );
  }

  /* ───── Fase 4 — Entrando al entorno ───── */
  if (phase === "entering") {
    return (
      <div className="min-h-[calc(100vh-160px)] relative overflow-hidden flex items-center justify-center px-5 py-16">
        {Background}
        <div className="relative z-10">
          <EnteringView org={org} />
        </div>
      </div>
    );
  }

  const { firstName } = splitName(email);

  /* ───── Fase 3 — Login institucional ───── */
  return (
    <div className="min-h-[calc(100vh-160px)] relative overflow-hidden flex items-center justify-center px-5 py-16">
      {Background}

      <div className="relative z-10 w-full max-w-[480px]">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-6 text-caption text-text-subtle uppercase tracking-[0.22em]">
            <Image
              src="/brand/aulentra_symbol_transparent.png"
              alt=""
              width={120}
              height={120}
              className="w-6 h-6 object-contain opacity-70"
            />
            <span>Aulentra · entorno institucional</span>
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

          <h1 className="text-h2 font-bold text-fg text-center leading-tight">
            Bienvenido a {org.name}.
          </h1>
          <div className="mt-2 text-small text-text-default text-center">
            Accede a tu entorno académico.
          </div>
          <div className="mt-3 flex items-center gap-4 text-caption text-muted">
            <span>{org.users.toLocaleString("es-ES")} usuarios</span>
            <span className="w-1 h-1 rounded-full bg-muted/60" />
            <span>{org.location}</span>
          </div>
        </div>

        <div className="relative rounded-lg border border-line-strong bg-card/85 backdrop-blur-sm overflow-hidden shadow-lg">
          <div
            className="h-[2px]"
            style={{ background: `linear-gradient(90deg,${org.brandColor} 0%,#67E8F9 100%)` }}
          />
          <div className="px-7 py-7">
            <form onSubmit={handleSubmit} className="animate-fade-in-up">
              <div className="text-caption uppercase tracking-[0.22em] text-primary mb-2">
                Paso 2 · Autenticación
              </div>
              <h2 className="text-h3 font-bold text-fg leading-tight mb-2">
                Hola{firstName ? `, ${firstName}` : ""}.
              </h2>
              <p className="text-small text-text-muted mb-6 leading-relaxed">
                Ingresa tu contraseña para entrar al entorno de {org.name}.
              </p>

              <div className="mb-4">
                <label className="block text-caption uppercase tracking-[0.16em] text-text-muted mb-2">
                  Correo identificado
                </label>
                <div className="w-full rounded-md bg-bg-deep/60 border border-line text-text-default text-small px-4 py-3 flex items-center justify-between">
                  <span className="font-mono text-caption-mono truncate normal-case tracking-normal">{email}</span>
                  <Link
                    href="/acceso"
                    className="text-caption text-primary hover:text-primary-hover transition-colors whitespace-nowrap ml-3"
                  >
                    cambiar
                  </Link>
                </div>
              </div>

              <Field
                label="Contraseña"
                htmlFor="acceso-password"
                error={
                  error === "bad_password"
                    ? "Contraseña incorrecta."
                    : error === "generic"
                      ? "No pudimos completar la solicitud. Intenta de nuevo en unos segundos."
                      : undefined
                }
              >
                <Input
                  id="acceso-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña institucional"
                  autoComplete="current-password"
                  required
                  autoFocus
                  invalid={error === "bad_password" || error === "generic"}
                />
              </Field>

              <button
                type="submit"
                disabled={busy || !password}
                className="mt-6 w-full rounded-md py-3.5 font-semibold text-small tracking-wide text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(90deg,${org.brandColor} 0%,#06B6D4 100%)`,
                }}
              >
                {busy ? (
                  <>
                    <Spinner size={14} trackOpacity={0.35} />
                    Validando…
                  </>
                ) : (
                  <>Entrar a {org.name}</>
                )}
              </button>

              <p className="mt-4 text-caption-mono-xs text-muted text-center leading-relaxed normal-case tracking-normal">
                Al ingresar, te llevaremos al entorno operativo de tu institución.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ Fase 4 — Entrando al entorno ═══════════ */
function EnteringView({ org }: { org: AulentraOrg }) {
  const reduceMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState<0 | 1>(0);
  useEffect(() => {
    const t = window.setTimeout(() => setStage(1), reduceMotion ? 0 : 60);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative w-24 h-24 mb-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: stage === 1 ? 1 : 0,
          transform: stage === 1 ? "scale(1)" : "scale(0.92)",
        }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative"
          style={{
            background: `linear-gradient(135deg,${org.brandColor} 0%,${org.brandColor}99 100%)`,
          }}
        >
          <span className="text-h2 font-bold text-white leading-none tracking-wide">
            {orgInitials(org.name)}
          </span>
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
          {/* Halo animado sutil · respeta reduce-motion */}
          {!reduceMotion && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: `${org.brandColor}22`, animationDuration: "1.8s" }}
            />
          )}
        </div>
      </div>

      <div
        className="transition-opacity duration-500"
        style={{ opacity: stage === 1 ? 1 : 0 }}
      >
        <div className="text-caption uppercase tracking-[0.22em] text-primary mb-3">
          Acceso concedido
        </div>
        <h2 className="text-h2 font-bold text-fg mb-2">{org.name}</h2>
        <p className="text-small text-text-muted">Redirigiendo a tu espacio…</p>
      </div>

      <div className="mt-10 w-48 h-[2px] bg-line-soft rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: stage === 1 ? "100%" : "10%",
            background: `linear-gradient(90deg,${org.brandColor} 0%,#67E8F9 100%)`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function splitName(email: string): { firstName: string | null } {
  const local = email.split("@")[0];
  if (!local) return { firstName: null };
  const firstPart = local.split(/[.\-_]/)[0] ?? "";
  if (!firstPart) return { firstName: null };
  return { firstName: firstPart.charAt(0).toUpperCase() + firstPart.slice(1) };
}

function orgInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
