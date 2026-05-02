import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { HorizonDivider } from "@/components/ui/HorizonDivider";

import { HeroConstelacion } from "@/components/soluciones/instituciones/HeroConstelacion";
import { Manifiesto } from "@/components/soluciones/instituciones/Manifiesto";
import { SistemaRoles } from "@/components/soluciones/instituciones/SistemaRoles";
import { Cobertura } from "@/components/soluciones/instituciones/Cobertura";
import { EscalaInstitucion } from "@/components/soluciones/instituciones/EscalaInstitucion";
import { Implementacion } from "@/components/soluciones/instituciones/Implementacion";
import { CierreInstitucional } from "@/components/soluciones/instituciones/CierreInstitucional";

export const metadata: Metadata = {
  title: "Soluciones · Instituciones educativas · Aulentra",
  description:
    "Aulentra organiza la responsabilidad de cada equipo, conecta los procesos académicos y deja a la dirección con visibilidad real.",
};

/**
 * /soluciones/instituciones — Sprint C · PARTE D · 2026-04-28
 *
 * 7 secciones definitivas:
 *   1. Hero · Constelación institucional (SVG 18 nodos · 3 anillos)
 *   2. Manifiesto editorial (italic + regla horizon + firma)
 *   3. Sistema de roles flexible (mapa de territorios + 3 bloques)
 *   4. Cobertura · 5 procesos grid 2×3 + celda visual decorativa
 *   5. Escala · 3 cards horizontales sin imagen + nota italic
 *   6. Implementación supervisada (línea horizon + 3 estaciones)
 *   7. Cierre · CTA institucional + sigilo grande con halo
 *
 * Estructura: cada sección es un componente independiente. La página
 * es solo composición + Hero (que vive en este archivo porque mezcla
 * estructura split — copy izquierda + visual derecha).
 */
export default function SolucionesInstitucionesPage() {
  return (
    <>
      {/* ─────────────── HERO · split editorial / constelación ───────────────
          Hero NO recibe halo — la constelación (SVG full-bleed) ES el atmosphere
          de esta sección. Atmósfera A+B+D · 2026-04-28. */}
      <SectionWrapper tone="bg" spacing="lg" halo={false} className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-small text-text-subtle hover:text-primary transition-colors mb-10"
            >
              <Icon
                name="arrow-left"
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span>Volver al inicio</span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Copy · 4 cols (D-final 2026-04-27 · 5→4: el texto cede 1 col más
             * para que la constelación XL respire en su columna 8/12). */}
            <div className="lg:col-span-4">
              <Reveal delay={60}>
                <Badge tone="primary">Soluciones · Instituciones educativas</Badge>
              </Reveal>
              <Reveal delay={140}>
                <h1 className="mt-6 text-h1 md:text-display-md font-bold tracking-[-0.025em] text-text-strong leading-[1.1]">
                  La operación completa de tu institución, en un solo sistema.
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-6 text-body-l text-text-default leading-relaxed max-w-[560px]">
                  Aulentra organiza la responsabilidad de cada equipo, conecta los procesos académicos y deja a la dirección con visibilidad real.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/solicitar-acceso" variant="primary">
                    Solicitar acceso institucional
                  </Button>
                  <Button
                    href="/solicitar-acceso?tipo=conversacion"
                    variant="secondary"
                  >
                    Hablar con el equipo de implementación
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={380} className="mt-10 h-px w-28 bg-horizon-gradient-h-soft" />
            </div>

            {/* Constelación · 8 cols (D-final 2026-04-27 · 7→8 + padding-left 16px
             * en lugar de 48px para reducir margen interno del split y permitir
             * que la constelación XL aproveche el lienzo completo). */}
            <div className="lg:col-span-8 lg:pl-4 flex justify-center lg:justify-end">
              <Reveal delay={300}>
                <HeroConstelacion />
              </Reveal>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Manifiesto />
      {/* No insertamos HorizonDivider antes/después del Manifiesto:
          el Manifiesto trae su propia línea atmospheric horizontal interna
          a 60% que ya cumple la función de divisor (decisión QA fix 2026-04-28). */}
      <SistemaRoles />
      {/* No insertamos HorizonDivider alrededor de SistemaRoles: la sección
          implementa su propia regla "waterline" interna como divisor (decisión
          QA fix 2026-04-28). */}
      <Cobertura />
      <HorizonDivider />
      <EscalaInstitucion />
      <HorizonDivider />
      <Implementacion />
      <HorizonDivider />
      <CierreInstitucional />
    </>
  );
}
