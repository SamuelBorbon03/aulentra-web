import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Solicitar acceso · Aulentra",
  description:
    "Aulentra incorpora instituciones y formadores bajo un proceso de acceso controlado.",
};

/**
 * /solicitar-acceso — stub provisional.
 * La experiencia final será un formulario de solicitud conectado a backend.
 * Por ahora: página institucional que comunica que el acceso es controlado y
 * deja un correo de contacto estable. Copy provisional.
 */
export default function SolicitarAccesoPage() {
  return (
    <SectionWrapper tone="bg" spacing="xl">
      <div className="max-w-[760px] mx-auto text-center">
        <Reveal>
          <Badge tone="primary">Solicitar acceso</Badge>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 text-h1 text-fg font-bold leading-[1.1]">
            <span className="block">Aulentra opera bajo acceso controlado.</span>
            <span className="block">Comencemos conversando.</span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-8 text-body-l text-fg-soft leading-relaxed">
            Incorporamos instituciones educativas y formadores independientes dentro de un proceso
            supervisado, para asegurar que cada implementación se diseñe sobre tu realidad
            operativa.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10 h-px w-28 bg-horizon-gradient-soft mx-auto" />
        <Reveal delay={360}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-small text-muted font-mono uppercase tracking-[0.22em]">
              Contacto directo
            </p>
            <a
              href="mailto:hola@aulentra.com"
              className="text-h3 text-fg hover:text-primary transition-colors font-semibold"
            >
              hola@aulentra.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={460}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/enfoque" variant="secondary" className="!text-small">
              Conocer el enfoque
            </Button>
            <Button href="/acceso" variant="link">
              Ya tengo acceso
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
