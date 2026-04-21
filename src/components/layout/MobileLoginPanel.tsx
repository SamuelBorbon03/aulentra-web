"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  type Profile,
  type AuthState,
  mockLookup,
  displayName,
} from "@/lib/aulentra-auth";

export function MobileLoginPanel() {
  const [tab, setTab] = useState<Profile>("institution");
  const [auth, setAuth] = useState<AuthState>({ kind: "idle" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryName, setRecoveryName] = useState("");
  const [recoveryInstitution, setRecoveryInstitution] = useState("");
  const [recoveryRole, setRecoveryRole] = useState<"ADMIN" | "TEACHER" | "STUDENT" | "GUARDIAN" | "">("");
  const [recoveryCaptcha, setRecoveryCaptcha] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuth({ kind: "error", message: "empty" });
      return;
    }
    setAuth({ kind: "loading" });
    setTimeout(() => {
      const lookup = mockLookup(email);
      if (!lookup) { setAuth({ kind: "error", message: "invalid" }); return; }
      if (password.length < 4) { setAuth({ kind: "error", message: "invalid" }); return; }
      if (lookup.profile !== tab) {
        setAuth({ kind: "error", message: "wrong_tab", suggestedTab: lookup.profile });
        return;
      }
      setAuth({
        kind: "authenticated",
        user: {
          name: displayName(email),
          email: email.trim().toLowerCase(),
          profile: lookup.profile,
          institutionName: lookup.institutionName,
        },
      });
    }, 900);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setAuth({ kind: "recovery_error", message: "empty" }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setAuth({ kind: "recovery_error", message: "invalid" }); return;
    }
    if (tab === "institution") {
      if (!recoveryName.trim() || !recoveryInstitution.trim() || !recoveryRole) {
        setAuth({ kind: "recovery_error", message: "empty" }); return;
      }
    } else {
      if (!recoveryCaptcha) { setAuth({ kind: "recovery_error", message: "empty" }); return; }
    }
    setAuth({ kind: "recovery_loading" });
    setTimeout(() => {
      const lookup = mockLookup(trimmed);
      setAuth({
        kind: "recovery_sent",
        email: trimmed,
        profile: tab,
        institutionName: tab === "institution" ? recoveryInstitution.trim() : lookup?.institutionName,
      });
    }, 900);
  };

  const resetRecoveryFields = () => {
    setRecoveryName(""); setRecoveryInstitution(""); setRecoveryRole(""); setRecoveryCaptcha(false);
  };

  const handleLogout = () => {
    setAuth({ kind: "idle" }); setEmail(""); setPassword(""); resetRecoveryFields();
  };

  const switchToSuggested = (suggested: Profile) => {
    setTab(suggested); setAuth({ kind: "idle" });
  };

  const isAuthenticated = auth.kind === "authenticated";
  const isRecoveryMode =
    auth.kind === "recovery" ||
    auth.kind === "recovery_loading" ||
    auth.kind === "recovery_error" ||
    auth.kind === "recovery_sent";

  return (
    <div className="mt-6 pt-6 border-t border-line">
      <div className="rounded-lg bg-elevated border border-primary/20 overflow-hidden">
        <div className="h-[2px] bg-horizon-gradient" />

        {isAuthenticated && (
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-horizon-gradient flex items-center justify-center text-white font-semibold">
                {auth.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-body font-semibold text-fg truncate">Hola, {auth.user.name}</p>
                <p className="text-caption text-fg-soft truncate normal-case tracking-normal">{auth.user.email}</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-primary-light text-primary text-caption font-medium tracking-normal normal-case">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {auth.user.profile === "institution"
                  ? auth.user.institutionName ? `${auth.user.institutionName} · Institución` : "Perfil institucional"
                  : "Formador particular"}
              </span>
            </div>

            <a href="#" onClick={(e) => e.preventDefault()} className="group flex items-center justify-between w-full px-4 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-small">
              <span>Ir a mi espacio</span>
              <span>→</span>
            </a>

            <button type="button" onClick={handleLogout} className="mt-4 block w-full text-left text-small text-muted hover:text-fg py-1">
              Cerrar sesión
            </button>
          </div>
        )}

        {!isAuthenticated && !isRecoveryMode && (
          <form onSubmit={handleSubmit} noValidate className="p-5">
            <p className="font-mono text-caption uppercase text-primary mb-1.5">Entra a Aulentra</p>
            <h3 className="text-body font-semibold text-fg mb-4 leading-snug">¿Cómo enseñas hoy?</h3>

            <div className="grid grid-cols-2 gap-1 p-1 bg-bg-deep/50 border border-line-soft rounded-md mb-4">
              <button
                type="button"
                onClick={() => { setTab("institution"); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                className={cn(
                  "py-2 px-3 rounded-[6px] text-small font-medium transition-all",
                  tab === "institution" ? "bg-elevated text-fg shadow-xs border border-line" : "text-fg-soft"
                )}
              >
                Institución
              </button>
              <button
                type="button"
                onClick={() => { setTab("independent"); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                className={cn(
                  "py-2 px-3 rounded-[6px] text-small font-medium transition-all",
                  tab === "independent" ? "bg-elevated text-fg shadow-xs border border-line" : "text-fg-soft"
                )}
              >
                Formador
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                placeholder={tab === "institution" ? "tu.nombre@institucion.edu" : "tu@correo.com"}
                className={cn(
                  "block w-full px-3 py-3 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-base normal-case tracking-normal",
                  "focus:outline-none focus:ring-1 focus:ring-primary/60",
                  auth.kind === "error" && auth.message !== "wrong_tab" && auth.message !== "empty"
                    ? "border-red-400/50"
                    : "border-line focus:border-primary/50"
                )}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                  placeholder="Contraseña"
                  className={cn(
                    "block w-full px-3 py-3 pr-11 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-base normal-case tracking-normal",
                    "focus:outline-none focus:ring-1 focus:ring-primary/60",
                    auth.kind === "error" && auth.message !== "wrong_tab" && auth.message !== "empty"
                      ? "border-red-400/50"
                      : "border-line focus:border-primary/50"
                  )}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Ocultar" : "Mostrar"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M3 3l14 14M7.5 7.5A3 3 0 0012.5 12.5M4.5 10.5a9 9 0 0111 0M9.5 4.5a9 9 0 016 4.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1.5 10s3-6 8.5-6 8.5 6 8.5 6-3 6-8.5 6S1.5 10 1.5 10z" />
                      <circle cx="10" cy="10" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {auth.kind === "error" && auth.message === "wrong_tab" && auth.suggestedTab && (
              <div className="mt-3 p-3 rounded-md bg-accent-light border border-accent/30">
                <p className="text-small text-fg mb-2 leading-relaxed">
                  Este correo está registrado como{" "}
                  <strong className="text-accent-cyan">
                    {auth.suggestedTab === "institution" ? "usuario institucional" : "formador particular"}
                  </strong>.
                </p>
                <button type="button" onClick={() => switchToSuggested(auth.suggestedTab!)} className="text-caption font-semibold text-accent-cyan tracking-normal normal-case">
                  Cambiar de pestaña →
                </button>
              </div>
            )}

            {auth.kind === "error" && auth.message === "empty" && (
              <div className="mt-3 p-3 rounded-md bg-primary-light border border-primary/30">
                <p className="text-small font-medium text-fg">Completa los campos</p>
              </div>
            )}

            {auth.kind === "error" && (auth.message === "invalid" || auth.message === "not_found") && (
              <div className="mt-3 p-3 rounded-md bg-red-500/8 border border-red-400/25">
                <p className="text-small font-medium text-red-300">
                  {auth.message === "not_found" ? "Correo no registrado" : "Credenciales inválidas"}
                </p>
              </div>
            )}

            <button type="button" onClick={() => { setAuth({ kind: "recovery" }); setPassword(""); }} className="block mt-3 text-caption text-primary">
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              disabled={auth.kind === "loading"}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-small bg-horizon-gradient text-white disabled:opacity-70"
            >
              {auth.kind === "loading" && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {auth.kind === "loading" ? "Verificando…" : tab === "institution" ? "Entrar como institución" : "Entrar como formador"}
            </button>

            <div className="mt-4 pt-4 border-t border-line-soft text-center">
              <a href="/#cta-form" className="text-small font-semibold text-primary">
                Crear cuenta →
              </a>
            </div>
          </form>
        )}

        {/* Recovery */}
        {(auth.kind === "recovery" || auth.kind === "recovery_loading" || auth.kind === "recovery_error") && (
          <form onSubmit={handleRecoverySubmit} noValidate className="p-5">
            <button type="button" onClick={() => { setAuth({ kind: "idle" }); resetRecoveryFields(); }} className="inline-flex items-center gap-1.5 text-caption text-fg-soft mb-3">
              <span>←</span> Volver
            </button>

            <p className="font-mono text-caption uppercase text-primary mb-1.5">Recuperar acceso</p>
            <h3 className="text-body font-semibold text-fg mb-2 leading-snug">
              {tab === "institution" ? "Restablece tu contraseña institucional." : "Te enviamos un enlace."}
            </h3>
            <p className="text-caption text-fg-soft leading-relaxed mb-4 tracking-normal normal-case">
              {tab === "institution"
                ? "Confirma tus datos para validar tu identidad institucional."
                : "Ingresa tu correo y verifica que no eres un bot."}
            </p>

            <div className="space-y-3">
              {tab === "institution" && (
                <>
                  <input
                    type="text"
                    value={recoveryName}
                    onChange={(e) => { setRecoveryName(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                    placeholder="Nombre completo"
                    className="block w-full px-3 py-3 rounded-md bg-bg-deep/60 border border-line text-fg placeholder:text-muted text-base normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-primary/60"
                  />
                  <input
                    type="text"
                    value={recoveryInstitution}
                    onChange={(e) => { setRecoveryInstitution(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                    placeholder="Nombre de la institución"
                    className="block w-full px-3 py-3 rounded-md bg-bg-deep/60 border border-line text-fg placeholder:text-muted text-base normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-primary/60"
                  />
                  <select
                    value={recoveryRole}
                    onChange={(e) => { setRecoveryRole(e.target.value as typeof recoveryRole); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                    className={cn(
                      "block w-full px-3 py-3 rounded-md bg-bg-deep/60 border border-line text-base normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-primary/60 appearance-none",
                      "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%237B82A6%22 stroke-width=%221.5%22><polyline points=%223,5 6,8 9,5%22/></svg>')] bg-[length:12px] bg-no-repeat bg-[right_0.75rem_center] pr-10",
                      recoveryRole === "" ? "text-muted" : "text-fg"
                    )}
                  >
                    <option value="" disabled>Tu rol en la institución</option>
                    <option value="ADMIN">Administración</option>
                    <option value="TEACHER">Docente</option>
                    <option value="STUDENT">Estudiante</option>
                    <option value="GUARDIAN">Acudiente</option>
                  </select>
                </>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                placeholder={tab === "institution" ? "Correo institucional" : "tu@correo.com"}
                className="block w-full px-3 py-3 rounded-md bg-bg-deep/60 border border-line text-fg placeholder:text-muted text-base normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-primary/60"
              />

              {tab === "independent" && (
                <button
                  type="button"
                  onClick={() => { setRecoveryCaptcha((v) => !v); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-md border transition-colors text-left",
                    recoveryCaptcha
                      ? "bg-primary-light border-primary/40"
                      : "bg-bg-deep/60 border-line"
                  )}
                >
                  <span className={cn(
                    "inline-flex items-center justify-center w-5 h-5 rounded border-[1.5px] shrink-0 transition-colors",
                    recoveryCaptcha ? "bg-primary border-primary" : "bg-bg-deep border-muted"
                  )}>
                    {recoveryCaptcha && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block text-small font-medium text-fg tracking-normal normal-case">No soy un robot</span>
                    <span className="block text-caption text-fg-soft tracking-normal normal-case">Verificación de seguridad</span>
                  </span>
                </button>
              )}
            </div>

            {auth.kind === "recovery_error" && (
              <div className={cn(
                "mt-3 p-3 rounded-md border",
                auth.message === "empty" ? "bg-primary-light border-primary/30" : "bg-red-500/8 border-red-400/25"
              )}>
                <p className={cn(
                  "text-small font-medium",
                  auth.message === "empty" ? "text-fg" : "text-red-300"
                )}>
                  {auth.message === "empty"
                    ? "Completa todos los campos"
                    : auth.message === "not_found"
                      ? "Correo no registrado"
                      : "Correo inválido"}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={auth.kind === "recovery_loading"}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-small bg-horizon-gradient text-white disabled:opacity-70"
            >
              {auth.kind === "recovery_loading" ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Enviando…
                </>
              ) : (
                <>Enviar instrucciones</>
              )}
            </button>
          </form>
        )}

        {auth.kind === "recovery_sent" && (
          <div className="p-5">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="text-body font-semibold text-fg mb-2 leading-snug">Revisa tu correo.</h3>
            <p className="text-small text-fg-soft leading-relaxed mb-4 tracking-normal normal-case">
              Si los datos coinciden, enviamos instrucciones a{" "}
              <span className="text-primary font-medium break-all">{auth.email}</span>.
            </p>
            <button
              type="button"
              onClick={() => { setAuth({ kind: "idle" }); resetRecoveryFields(); }}
              className="w-full inline-flex items-center justify-center py-3 rounded-md border border-line text-small font-medium text-fg"
            >
              Volver al login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
