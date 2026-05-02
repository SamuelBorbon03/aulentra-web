import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { HorizonDivider } from "@/components/ui/HorizonDivider";

import { HeroNucleo } from "@/components/soluciones/formadores/HeroNucleo";
import { InterfazUnica } from "@/components/soluciones/formadores/InterfazUnica";
import { Subdominio } from "@/components/soluciones/formadores/Subdominio";
import { CrecimientoOrganico } from "@/components/soluciones/formadores/CrecimientoOrganico";
import { CapacidadesGrid } from "@/components/soluciones/formadores/CapacidadesGrid";
import { RitmoSemanal } from "@/components/soluciones/formadores/RitmoSemanal";
import { CierreFormador } from "@/components/soluciones/formadores/CierreFormador";

export const metadata: Metadata = {
  title: "Soluciones · Formadores independientes · Aulentra",
  description:
    "Aulentra para profesionales que enseñan por cuenta propia — sin equipos, sin estructura institucional, con control total.",
};

/**
 * /soluciones/formadores — Sprint C · PARTE D · 2026-04-28
 *
 * 7 secciones definitivas:
 *   1. Hero · Núcleo enfocado (centrado, NO split — ruptura visual con
 *      Instituciones · 6 satélites con etiquetas literales del SPEC)
 *   2. Una sola interfaz (3 bloques + dashboard mockup HTML/CSS)
 *   3. Tu marca, tu subdominio (URL editorial rotando + cursor blink)
 *   4. Crecimiento orgánico (curva Bezier + 4 hitos 30/80/180/300+)
 *   5. Capacidades centrales (grid 2×2 · 4 áreas · íconos Lucide whitelist)
 *   6. Cómo se siente operar (cita italic prov. + ritmo semanal 7 cols)
 *   7. Cierre · 1 solo CTA + mini núcleo eco
 */
export default function SolucionesFormadoresPage() {
  return (
    <>
      {/* ─────────────── HERO · centrado · núcleo + 6 satélites ───────────────
          Hero NO recibe halo — el SVG del núcleo + 6 satélites ES el
          atmosphere de esta sección. Atmósfera A+B+D · 2026-04-28. */}
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

          {/* Layout CENTRADO — clave de ruptura visual con Instituciones (split) */}
          <div className="flex flex-col items-center text-center">
            <Reveal delay={60}>
              <Badge tone="primary">Soluciones · Formadores independientes</Badge>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-6 text-h1 md:text-display-md font-bold tracking-[-0.025em] text-text-strong leading-[1.1] max-w-[840px]">
                Tu práctica formativa, operada desde un solo lugar.
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-body-l text-text-default leading-relaxed max-w-[640px]">
                Aulentra para profesionales que enseñan por cuenta propia — sin equipos, sin estructura institucional, con control total.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Button href="/solicitar-acceso" variant="primary">
                  Solicitar acceso
                </Button>
                <Button href="#seccion-control" variant="secondary">
                  Ver cómo opera Aulentra para ti
                </Button>
              </div>
            </Reveal>
            <Reveal delay={380} className="mt-10 h-px w-28 bg-horizon-gradient-h-soft" />

            {/* Visual del núcleo · ancho amplio, centrado */}
            <Reveal delay={460}>
              <div className="mt-16 flex justify-center w-full">
                <HeroNucleo />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionWrapper>

      {/* HorizonDividers entre cada par de SectionWrappers donde el tone
          cambia (bg ↔ bg-deep). En esta página todas las transiciones son
          alternantes, así que cada juntura recibe divider. Spec atmósfera
          A+B+D · fix QA 2026-04-28. */}
      <HorizonDivider />
      <InterfazUnica />
      <HorizonDivider />
      <Subdominio />
      <HorizonDivider />
      <CrecimientoOrganico />
      <HorizonDivider />
      <CapacidadesGrid />
      <HorizonDivider />
      <RitmoSemanal />
      <HorizonDivider />
      <CierreFormador />
    </>
  );
}
