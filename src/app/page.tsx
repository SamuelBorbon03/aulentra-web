import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HorizonDivider } from "@/components/ui/HorizonDivider";
import { AulentraHero } from "@/components/home/AulentraHero";
import { IdentityDeclaration } from "@/components/home/IdentityDeclaration";
import { Triada } from "@/components/home/Triada";
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
      {/* Hero · halo local del lockup (no del sistema) */}
      <SectionWrapper id="hero" tone="bg" spacing="flush" halo={false}>
        <AulentraHero />
      </SectionWrapper>

      {/* Transición tonal bg → bg-deep · línea horizon */}
      <HorizonDivider />

      {/* IdentityDeclaration · halo "default" sustituye el halo local 460×460 */}
      <SectionWrapper id="que-es" tone="bg-deep" spacing="xl" halo="default" className="border-t border-line">
        <IdentityDeclaration />
      </SectionWrapper>

      {/* Triada · Sprint C · C.1 — tres distinciones editoriales antes de DualPlatform */}
      {/* Transición tonal bg-deep → bg · línea horizon */}
      <HorizonDivider />
      <SectionWrapper id="triada" tone="bg" spacing="xl" halo="default" className="border-t border-line">
        <Triada />
      </SectionWrapper>

      {/* Transición tonal bg → bg-deep · línea horizon */}
      <HorizonDivider />
      <SectionWrapper id="publico" tone="bg-deep" spacing="xl" halo="default" className="border-t border-line">
        <DualPlatform />
      </SectionWrapper>

      {/* Transición tonal bg-deep → bg · línea horizon */}
      <HorizonDivider />
      <SectionWrapper id="capacidades" tone="bg" spacing="xl" halo="default" className="border-t border-line">
        <Capabilities />
      </SectionWrapper>

      {/* Transición tonal bg → bg-deep · línea horizon */}
      <HorizonDivider />
      {/* AccessFinal · cierre · halo local cyan vive en el componente (no en wrapper) */}
      <SectionWrapper id="acceso" tone="bg-deep" spacing="xl" halo="closure" className="border-t border-line">
        <AccessFinal />
      </SectionWrapper>
    </>
  );
}
