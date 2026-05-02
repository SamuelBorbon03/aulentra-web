import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SolicitudForm } from "./SolicitudForm";

export const metadata: Metadata = {
  title: "Solicitar acceso · Aulentra",
  description:
    "Aulentra incorpora instituciones y formadores bajo un proceso de acceso controlado.",
};

/**
 * /solicitar-acceso — Sprint A · 2026-04-27.
 * Server component minimal que envuelve el formulario cliente. Mantiene el
 * patrón SSR + componente cliente extraído (proyecto: feedback_pages_pattern).
 */
export default function SolicitarAccesoPage() {
  return (
    // Atmósfera A+B+D · halo discreto (--halo-alpha-section override 0.040
    // declarado en globals.css vía .solicitud-form-section). El form sigue
    // siendo el foco; el halo solo rompe la planicidad del fondo.
    <SectionWrapper
      tone="bg"
      spacing="xl"
      halo="default"
      className="solicitud-form-section"
    >
      <SolicitudForm />
    </SectionWrapper>
  );
}
