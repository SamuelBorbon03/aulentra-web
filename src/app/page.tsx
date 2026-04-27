import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AulentraHero } from "@/components/home/AulentraHero";
import { IdentityDeclaration } from "@/components/home/IdentityDeclaration";
import { DualPlatform } from "@/components/home/DualPlatform";
import { Capabilities } from "@/components/home/Capabilities";
import { AccessFinal } from "@/components/home/AccessFinal";

/**
 * Home Aulentra — rediseño 2026-04-23.
 *
 * Estructura narrativa en 5 secciones con tono ejecutivo declarativo:
 *   1. Hero              · Promesa central + acceso directo
 *   2. Qué es Aulentra   · Declaración de identidad
 *   3. Dos mundos        · Institución vs formador independiente
 *   4. Cómo opera        · 4 capacidades estructurales
 *   5. Acceso final      · CTA hacia /acceso (login 2 pasos)
 *
 * Bloque de Evidencia retirado (2026-04-25) por decisión editorial:
 * el componente ImpactMetrics queda en disco como referencia.
 *
 * No hay form de contacto en el home · todo lleva a /acceso.
 * La arquitectura cierra cuando Samuel comparta el endpoint de la herramienta externa.
 */
export default function HomePage() {
  return (
    <>
      <SectionWrapper id="hero" tone="bg" spacing="sm" className="!pt-0 !pb-4 md:!pt-1 md:!pb-6">
        <AulentraHero />
      </SectionWrapper>

      <SectionWrapper id="que-es" tone="bg-deep" spacing="xl" className="border-t border-line">
        <IdentityDeclaration />
      </SectionWrapper>

      <SectionWrapper id="publico" tone="bg" spacing="xl" className="border-t border-line">
        <DualPlatform />
      </SectionWrapper>

      <SectionWrapper id="capacidades" tone="bg-deep" spacing="xl" className="border-t border-line">
        <Capabilities />
      </SectionWrapper>

      <SectionWrapper id="acceso" tone="bg" spacing="xl" className="border-t border-line">
        <AccessFinal />
      </SectionWrapper>
    </>
  );
}
