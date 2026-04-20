import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Página no encontrada — Aulentra",
  description: "Esta página no se encuentra. Volvamos al inicio.",
};

/**
 * 404 personalizado de Aulentra — mantiene Header + Footer (vienen del
 * layout) y respeta la identidad Horizon dark.
 */
export default function NotFound() {
  return (
    <SectionWrapper tone="bg" spacing="xl">
      <div className="max-w-[760px]">
        <Reveal>
          <Badge tone="neutral">Error 404</Badge>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex items-baseline gap-6">
            <span className="font-mono text-[120px] md:text-[180px] leading-none font-extralight bg-horizon-gradient-soft bg-clip-text text-transparent select-none">
              404
            </span>
            <span className="text-h2 text-fg/55 italic font-serif leading-tight">
              Esta página<br />no existe.
            </span>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 text-body-l text-fg-soft max-w-[560px]">
            El sistema sigue funcionando. Si llegaste siguiendo un enlace
            roto, vuelve al inicio o conoce el producto desde sus 5 capas.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="primary">Volver al inicio</Button>
          <Button href="/producto" variant="secondary">Ver el producto</Button>
        </Reveal>

        <Reveal delay={320} className="mt-14 h-px w-28 bg-horizon-gradient-soft" />
      </div>
    </SectionWrapper>
  );
}
