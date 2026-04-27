"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_LINKS } from "./nav-config";

/**
 * Footer Aulentra — 3 columnas (Sitio · Acerca de · Contacto) sobre bloque
 * superior con propósito + wordmark. Otros hrefs externos quedan en "#"
 * hasta routing real (memoria project_web_hyperlinks_pending).
 *
 * Sin la palabra "demo" en ningún lado (regla project_aulentra_brand_rules).
 */

// URL del sitio Noventor — env var con fallback a dev local.
// Cuando se defina URL de producción, sobrescribir con NEXT_PUBLIC_NOVENTOR_URL.
const NOVENTOR_URL =
  process.env.NEXT_PUBLIC_NOVENTOR_URL ?? "http://localhost:3000";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Mi espacio tiene chrome propio; no mostramos footer público ahí.
  if (pathname.startsWith("/mi-espacio")) return null;

  return (
    <footer className="border-t border-line-soft bg-bg-deep">
      <Container>
        {/* ─── Propósito + wordmark ─── */}
        <div className="py-14 border-b border-line-soft">
          <Wordmark tone="fg" size="md" withSymbol />
          <p className="mt-5 text-body-l text-fg-soft max-w-[520px] leading-relaxed">
            Sistema operativo académico para instituciones que necesitan estructura.
          </p>
          <p className="mt-4 text-caption uppercase tracking-[0.22em] text-primary">
            Una solución de{" "}
            <a
              href={NOVENTOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline transition-all"
            >
              Noventor →
            </a>
          </p>
        </div>

        {/* ─── 3 columnas ─── */}
        <div className="py-14 grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Col 1 · Sitio */}
          <div>
            <div className="text-caption uppercase tracking-[0.22em] text-fg/50 mb-5">Sitio</div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-small text-fg/75 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small text-fg/75 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 · Acerca de */}
          <div>
            <div className="text-caption uppercase tracking-[0.22em] text-fg/50 mb-5">Acerca de</div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sobre" className="text-small text-fg/75 hover:text-primary transition-colors">
                  Sobre Aulentra
                </Link>
                <p className="mt-1 text-caption text-fg/40 tracking-[0.08em] uppercase">
                  Una marca de Noventor
                </p>
              </li>
            </ul>
            <p className="mt-6 text-small text-fg/45 italic max-w-[260px] leading-relaxed">
              Aulentra es la primera solución de Noventor.
            </p>
          </div>

          {/* Col 3 · Contacto */}
          <div>
            <div className="text-caption uppercase tracking-[0.22em] text-fg/50 mb-5">Contacto</div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/producto" className="text-small text-fg/75 hover:text-primary transition-colors">
                  Conocer Aulentra
                </Link>
              </li>
              <li>
                <a href="#" className="text-small text-fg/75 hover:text-primary transition-colors">
                  hola@aulentra.com
                </a>
              </li>
              <li>
                <span className="text-small text-fg/75">Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Línea final ─── */}
        <div className="py-6 border-t border-line-soft flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:justify-between">
          <p className="text-small text-fg/45">
            © {currentYear} Noventor. Aulentra es una marca de Noventor.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-small text-fg/45">
            <Link href="#" className="hover:text-primary transition-colors">Aviso legal</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
