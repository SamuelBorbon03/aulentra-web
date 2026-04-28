import Link from "next/link";
import { Badge } from "./Badge";
import { Reveal } from "./Reveal";
import { SectionWrapper } from "./SectionWrapper";

interface PageHeroProps {
  /** Texto pequeño en mayúsculas — categoría de la página. */
  eyebrow: string;
  /** Título principal de la página (H1). */
  headline: string;
  /** Bajada opcional bajo el headline. */
  subtitle?: string;
  /** ID para anclas internas. */
  id?: string;
  /** Ruta del botón "Volver". Default: "/" (home). */
  backHref?: string;
  /** Label del botón "Volver". Default: "Volver al inicio". */
  backLabel?: string;
}

/**
 * PageHero — header de páginas interiores Aulentra. Más bajo que el hero
 * del home, mantiene la familia visual (badge, fg headline, regla horizon).
 * Incluye un "Volver" discreto arriba-izquierda.
 */
export function PageHero({
  eyebrow,
  headline,
  subtitle,
  id,
  backHref = "/",
  backLabel = "Volver al inicio",
}: PageHeroProps) {
  return (
    <SectionWrapper id={id} tone="bg" spacing="lg">
      <div className="max-w-[820px]">
        <Reveal>
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 text-small text-text-subtle hover:text-primary transition-colors mb-10"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>{backLabel}</span>
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <Badge tone="primary">{eyebrow}</Badge>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="mt-6 text-h1 text-fg font-bold">{headline}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={220}>
            <p className="mt-5 text-body-l text-fg-soft max-w-[680px]">{subtitle}</p>
          </Reveal>
        )}
        <Reveal delay={300} className="mt-10 h-px w-28 bg-horizon-gradient-soft" />
      </div>
    </SectionWrapper>
  );
}
