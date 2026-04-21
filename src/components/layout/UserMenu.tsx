"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  type Profile,
  type AuthState,
  mockLookup,
  displayName,
} from "@/lib/aulentra-auth";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Profile>("institution");
  const [auth, setAuth] = useState<AuthState>({ kind: "idle" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Campos extra de recovery — la exigencia varía según tab.
  // Institución: nombre, institución, rol (verificación de identidad).
  // Formador particular: captcha (bot protection).
  const [recoveryName, setRecoveryName] = useState("");
  const [recoveryInstitution, setRecoveryInstitution] = useState("");
  const [recoveryRole, setRecoveryRole] = useState<"ADMIN" | "TEACHER" | "STUDENT" | "GUARDIAN" | "">("");
  const [recoveryCaptcha, setRecoveryCaptcha] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuth({ kind: "error", message: "empty" });
      return;
    }
    setAuth({ kind: "loading" });
    setTimeout(() => {
      const lookup = mockLookup(email);
      if (!lookup) {
        setAuth({ kind: "error", message: "invalid" });
        return;
      }
      if (password.length < 4) {
        setAuth({ kind: "error", message: "invalid" });
        return;
      }
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

  // Recovery — institución: nombre + institución + rol; formador: captcha.
  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setAuth({ kind: "recovery_error", message: "empty" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setAuth({ kind: "recovery_error", message: "invalid" });
      return;
    }

    if (tab === "institution") {
      if (!recoveryName.trim() || !recoveryInstitution.trim() || !recoveryRole) {
        setAuth({ kind: "recovery_error", message: "empty" });
        return;
      }
    } else {
      // Formador particular — exigir captcha
      if (!recoveryCaptcha) {
        setAuth({ kind: "recovery_error", message: "empty" });
        return;
      }
    }

    setAuth({ kind: "recovery_loading" });
    setTimeout(() => {
      const lookup = mockLookup(trimmed);
      setAuth({
        kind: "recovery_sent",
        email: trimmed,
        profile: tab,
        institutionName: tab === "institution"
          ? recoveryInstitution.trim()
          : lookup?.institutionName,
      });
    }, 900);
  };

  const resetRecoveryFields = () => {
    setRecoveryName("");
    setRecoveryInstitution("");
    setRecoveryRole("");
    setRecoveryCaptcha(false);
  };

  const handleLogout = () => {
    setAuth({ kind: "idle" });
    setEmail("");
    setPassword("");
    resetRecoveryFields();
  };

  const goToRecovery = () => {
    setAuth({ kind: "recovery" });
    setPassword("");
  };

  const backToLogin = () => {
    setAuth({ kind: "idle" });
    resetRecoveryFields();
  };

  const switchToSuggested = (suggested: Profile) => {
    setTab(suggested);
    setAuth({ kind: "idle" });
  };

  const isAuthenticated = auth.kind === "authenticated";
  const isRecoveryMode =
    auth.kind === "recovery" ||
    auth.kind === "recovery_loading" ||
    auth.kind === "recovery_error" ||
    auth.kind === "recovery_sent";

  const submitLabel =
    auth.kind === "loading"
      ? "Verificando…"
      : tab === "institution"
        ? "Entrar como institución"
        : "Entrar como formador";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Iniciar sesión"
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors border",
          open || isAuthenticated
            ? "text-primary border-primary/40 bg-primary-light"
            : "text-fg/80 border-line hover:text-primary hover:border-primary/30"
        )}
      >
        {isAuthenticated ? (
          <span className="font-semibold text-small">{auth.user.name.charAt(0).toUpperCase()}</span>
        ) : (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="10" cy="7" r="3" />
            <path d="M4 17c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" />
          </svg>
        )}
      </button>

      <div
        role="dialog"
        aria-label="Acceso Aulentra"
        className={cn(
          "absolute right-0 top-full mt-3 w-[380px] origin-top-right z-40",
          "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="rounded-lg bg-elevated border border-primary/20 overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(165,180,252,0.08)] ring-1 ring-primary/5">
          <div className="h-[2px] bg-horizon-gradient" />

          {isAuthenticated && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-horizon-gradient flex items-center justify-center text-white font-semibold">
                  {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-body font-semibold text-fg truncate">Hola, {auth.user.name}</p>
                  <p className="text-caption text-fg-soft truncate normal-case tracking-normal">
                    {auth.user.email}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-primary-light text-primary text-caption font-medium tracking-normal normal-case">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {auth.user.profile === "institution"
                    ? auth.user.institutionName
                      ? `${auth.user.institutionName} · Institución`
                      : "Perfil institucional"
                    : "Formador particular"}
                </span>
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center justify-between w-full px-4 py-3 rounded-md bg-horizon-gradient text-white font-semibold text-small hover:brightness-105 transition"
              >
                <span>Ir a mi espacio</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>

              <div className="mt-5 pt-5 border-t border-line-soft space-y-2">
                <button type="button" onClick={(e) => e.preventDefault()} className="block w-full text-left text-small text-fg-soft hover:text-primary transition-colors py-1">
                  Mi perfil
                </button>
                <button type="button" onClick={(e) => e.preventDefault()} className="block w-full text-left text-small text-fg-soft hover:text-primary transition-colors py-1">
                  Configuración
                </button>
                <button type="button" onClick={handleLogout} className="block w-full text-left text-small text-muted hover:text-fg transition-colors py-1">
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && !isRecoveryMode && (
            <form onSubmit={handleSubmit} noValidate className="p-6">
              <p className="font-mono text-caption uppercase text-primary mb-1.5">Entra a Aulentra</p>
              <h3 className="text-body-l font-semibold text-fg mb-5 leading-snug">¿Cómo enseñas hoy?</h3>

              <div className="grid grid-cols-2 gap-1 p-1 bg-bg-deep/50 border border-line-soft rounded-md mb-5">
                <button
                  type="button"
                  onClick={() => { setTab("institution"); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                  className={cn(
                    "py-2 px-3 rounded-[6px] text-small font-medium transition-all",
                    tab === "institution" ? "bg-elevated text-fg shadow-xs border border-line" : "text-fg-soft hover:text-fg"
                  )}
                >
                  Institución
                </button>
                <button
                  type="button"
                  onClick={() => { setTab("independent"); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                  className={cn(
                    "py-2 px-3 rounded-[6px] text-small font-medium transition-all",
                    tab === "independent" ? "bg-elevated text-fg shadow-xs border border-line" : "text-fg-soft hover:text-fg"
                  )}
                >
                  Formador particular
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="um-email" className="block text-caption uppercase text-fg-soft mb-1.5">Email</label>
                  <input
                    id="um-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                    placeholder={tab === "institution" ? "tu.nombre@institucion.edu" : "tu@correo.com"}
                    className={cn(
                      "block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-small normal-case tracking-normal",
                      "focus:outline-none focus:ring-1 focus:ring-primary/60 transition-colors",
                      auth.kind === "error" && auth.message !== "wrong_tab" && auth.message !== "empty"
                        ? "border-red-400/50"
                        : "border-line focus:border-primary/50"
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="um-password" className="block text-caption uppercase text-fg-soft mb-1.5">Contraseña</label>
                  <div className="relative">
                    <input
                      id="um-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (auth.kind === "error") setAuth({ kind: "idle" }); }}
                      placeholder="••••••••"
                      className={cn(
                        "block w-full px-3 py-2.5 pr-10 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-small normal-case tracking-normal",
                        "focus:outline-none focus:ring-1 focus:ring-primary/60 transition-colors",
                        auth.kind === "error" && auth.message !== "wrong_tab" && auth.message !== "empty"
                          ? "border-red-400/50"
                          : "border-line focus:border-primary/50"
                      )}
                    />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors">
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M3 3l14 14M7.5 7.5A3 3 0 0012.5 12.5M4.5 10.5a9 9 0 0111 0M9.5 4.5a9 9 0 016 4.5" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M1.5 10s3-6 8.5-6 8.5 6 8.5 6-3 6-8.5 6S1.5 10 1.5 10z" />
                          <circle cx="10" cy="10" r="2.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {auth.kind === "error" && auth.message === "wrong_tab" && auth.suggestedTab && (
                <div className="mt-4 p-3 rounded-md bg-accent-light border border-accent/30">
                  <p className="text-small text-fg mb-2 leading-relaxed">
                    Este correo está registrado como{" "}
                    <strong className="text-accent-cyan">
                      {auth.suggestedTab === "institution" ? "usuario institucional" : "formador particular"}
                    </strong>
                    . ¿Quieres entrar por ahí?
                  </p>
                  <button type="button" onClick={() => switchToSuggested(auth.suggestedTab!)} className="inline-flex items-center gap-1.5 text-caption font-semibold text-accent-cyan hover:text-accent transition-colors tracking-normal normal-case">
                    Cambiar de pestaña <span>→</span>
                  </button>
                </div>
              )}

              {auth.kind === "error" && auth.message === "empty" && (
                <div className="mt-4 p-3 rounded-md bg-primary-light border border-primary/30">
                  <p className="text-small font-medium text-fg mb-0.5">Completa los campos</p>
                  <p className="text-caption text-fg-soft leading-relaxed tracking-normal normal-case">Ingresa tu correo y contraseña para continuar.</p>
                </div>
              )}

              {auth.kind === "error" && (auth.message === "invalid" || auth.message === "not_found") && (
                <div className="mt-4 p-3 rounded-md bg-red-500/8 border border-red-400/25">
                  <p className="text-small font-medium text-red-300 mb-0.5">
                    {auth.message === "not_found" ? "Correo no registrado" : "Credenciales inválidas"}
                  </p>
                  <p className="text-caption text-fg-soft leading-relaxed tracking-normal normal-case">Revisa los datos e inténtalo de nuevo.</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 mb-5">
                <label className="inline-flex items-center gap-2 text-caption text-fg-soft cursor-pointer select-none tracking-normal normal-case">
                  <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                  Recordarme
                </label>
                <button type="button" onClick={goToRecovery} className="text-caption text-primary hover:text-primary-hover transition-colors tracking-normal normal-case">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                disabled={auth.kind === "loading"}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-small",
                  "bg-horizon-gradient text-white transition-[filter,opacity] duration-200",
                  "hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              >
                {auth.kind === "loading" && (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
                {submitLabel}
              </button>

              <div className="mt-5 pt-5 border-t border-line-soft text-center">
                <p className="text-caption text-fg-soft leading-relaxed tracking-normal normal-case mb-2">
                  {tab === "institution" ? "¿Tu institución aún no usa Aulentra?" : "¿Aún no tienes cuenta como formador?"}
                </p>
                <a href="/#cta-form" className="inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:text-primary-hover transition-colors">
                  Crear cuenta <span>→</span>
                </a>
              </div>
            </form>
          )}

          {/* Recovery — formulario (campos variables según tab) */}
          {(auth.kind === "recovery" || auth.kind === "recovery_loading" || auth.kind === "recovery_error") && (
            <form onSubmit={handleRecoverySubmit} noValidate className="p-6">
              <button type="button" onClick={backToLogin} className="inline-flex items-center gap-1.5 text-caption text-fg-soft hover:text-primary transition-colors mb-4 tracking-normal normal-case">
                <span>←</span> Volver al login
              </button>

              <p className="font-mono text-caption uppercase text-primary mb-1.5">Recuperar acceso</p>
              <h3 className="text-body-l font-semibold text-fg mb-2 leading-snug">
                {tab === "institution" ? "Restablece tu contraseña institucional." : "Te enviamos un enlace de recuperación."}
              </h3>
              <p className="text-caption text-fg-soft leading-relaxed tracking-normal normal-case mb-5">
                {tab === "institution"
                  ? "Confirma tus datos para validar tu identidad institucional."
                  : "Ingresa tu correo y recibirás instrucciones para restablecer tu contraseña."}
              </p>

              <div className="space-y-4">
                {tab === "institution" && (
                  <>
                    <div>
                      <label htmlFor="um-recovery-name" className="block text-caption uppercase text-fg-soft mb-1.5">
                        Nombre completo
                      </label>
                      <input
                        id="um-recovery-name"
                        type="text"
                        value={recoveryName}
                        onChange={(e) => { setRecoveryName(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                        placeholder="Tu nombre"
                        className={cn(
                          "block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-small normal-case tracking-normal",
                          "focus:outline-none focus:ring-1 focus:ring-primary/60",
                          auth.kind === "recovery_error" && auth.message !== "empty"
                            ? "border-red-400/50"
                            : "border-line focus:border-primary/50"
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="um-recovery-inst" className="block text-caption uppercase text-fg-soft mb-1.5">
                        Nombre de la institución
                      </label>
                      <input
                        id="um-recovery-inst"
                        type="text"
                        value={recoveryInstitution}
                        onChange={(e) => { setRecoveryInstitution(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                        placeholder="Colegio, universidad, academia…"
                        className={cn(
                          "block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-small normal-case tracking-normal",
                          "focus:outline-none focus:ring-1 focus:ring-primary/60",
                          auth.kind === "recovery_error" && auth.message !== "empty"
                            ? "border-red-400/50"
                            : "border-line focus:border-primary/50"
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="um-recovery-role" className="block text-caption uppercase text-fg-soft mb-1.5">
                        Tu rol en la institución
                      </label>
                      <select
                        id="um-recovery-role"
                        value={recoveryRole}
                        onChange={(e) => { setRecoveryRole(e.target.value as typeof recoveryRole); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                        className={cn(
                          "block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border text-fg text-small normal-case tracking-normal appearance-none",
                          "focus:outline-none focus:ring-1 focus:ring-primary/60",
                          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%237B82A6%22 stroke-width=%221.5%22><polyline points=%223,5 6,8 9,5%22/></svg>')] bg-[length:12px] bg-no-repeat bg-[right_0.75rem_center] pr-10",
                          auth.kind === "recovery_error" && auth.message !== "empty"
                            ? "border-red-400/50"
                            : "border-line focus:border-primary/50",
                          recoveryRole === "" && "text-muted"
                        )}
                      >
                        <option value="" disabled>Selecciona tu rol</option>
                        <option value="ADMIN">Administración</option>
                        <option value="TEACHER">Docente</option>
                        <option value="STUDENT">Estudiante</option>
                        <option value="GUARDIAN">Acudiente</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="um-recovery-email" className="block text-caption uppercase text-fg-soft mb-1.5">
                    {tab === "institution" ? "Correo institucional" : "Email"}
                  </label>
                  <input
                    id="um-recovery-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                    placeholder={tab === "institution" ? "tu.nombre@institucion.edu" : "tu@correo.com"}
                    className={cn(
                      "block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border text-fg placeholder:text-muted text-small normal-case tracking-normal",
                      "focus:outline-none focus:ring-1 focus:ring-primary/60",
                      auth.kind === "recovery_error" && auth.message !== "empty"
                        ? "border-red-400/50"
                        : "border-line focus:border-primary/50"
                    )}
                  />
                </div>

                {tab === "independent" && (
                  <button
                    type="button"
                    onClick={() => { setRecoveryCaptcha((v) => !v); if (auth.kind === "recovery_error") setAuth({ kind: "recovery" }); }}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-md border transition-colors text-left",
                      recoveryCaptcha
                        ? "bg-primary-light border-primary/40"
                        : "bg-bg-deep/60 border-line hover:border-primary/30"
                    )}
                  >
                    <span className={cn(
                      "inline-flex items-center justify-center w-5 h-5 rounded border-[1.5px] shrink-0 transition-colors",
                      recoveryCaptcha
                        ? "bg-primary border-primary"
                        : "bg-bg-deep border-muted"
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/60 shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </button>
                )}
              </div>

              {auth.kind === "recovery_error" && (
                <div className={cn(
                  "mt-4 p-3 rounded-md border",
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
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-small bg-horizon-gradient text-white disabled:opacity-70 disabled:cursor-not-allowed"
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
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-body-l font-semibold text-fg mb-2 leading-snug">Revisa tu correo.</h3>
              <p className="text-small text-fg-soft leading-relaxed mb-4 tracking-normal normal-case">
                Si los datos coinciden, enviaremos instrucciones a{" "}
                <span className="text-primary font-medium break-all">{auth.email}</span>.
              </p>

              <button
                type="button"
                onClick={backToLogin}
                className="w-full inline-flex items-center justify-center py-3 rounded-md border border-line text-small font-medium text-fg hover:text-primary hover:border-primary/40 transition-colors"
              >
                Volver al login
              </button>

              <p className="mt-4 pt-4 border-t border-line-soft text-caption text-fg-soft leading-relaxed text-center tracking-normal normal-case">
                ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
                <button type="button" onClick={() => setAuth({ kind: "recovery" })} className="text-primary hover:text-primary-hover underline underline-offset-2">
                  intenta de nuevo
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
