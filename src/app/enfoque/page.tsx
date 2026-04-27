import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { enfoque } from "@/content/enfoque";

export const metadata: Metadata = {
  title: "Enfoque · Aulentra",
  description: enfoque.hero.subtitle,
};

/**
 * /enfoque — declaración filosófica. Reemplaza al retirado /casos.
 * Estructura: hero declarativo · bloque manifiesto · 4 pilares · cierre + CTA.
 * Tono: frases cortas partidas en líneas, mucho whitespace, serif italic en
 * los bloques manifiesto, sin guiones largos (el socio no los quiere).
 */
export default function EnfoquePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <SectionWrapper tone="bg" spacing="lg">
        <div className="max-w-[880px]">
          <Reveal>
            <Badge tone="primary">{enfoque.hero.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 text-h1 text-fg font-bold leading-[1.1]">
              {enfoque.hero.headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 text-body-l text-fg-soft max-w-[760px] leading-relaxed">
              {enfoque.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={320} className="mt-12 h-px w-28 bg-horizon-gradient-soft" />
        </div>
      </SectionWrapper>

      {/* ─── Bloque declarativo (manifiesto en serif italic) ─── */}
      <SectionWrapper tone="bg-deep" spacing="xl" className="border-t border-line">
        <div className="max-w-[820px] mx-auto">
          <div className="space-y-10 font-serif italic text-fg">
            {enfoque.declarative.stanzas.map((stanza, i) => (
              <Reveal key={i} delay={Math.min(i * 80, 240)}>
                <div className="text-[1.75rem] md:text-[2rem] leading-[1.35] font-normal tracking-tight">
                  {stanza.map((line, j) => (
                    <span key={j} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Pilares ─── */}
      <SectionWrapper tone="bg" spacing="xl" className="border-t border-line">
        <div className="grid md:grid-cols-2 gap-px bg-line-soft border border-line-soft rounded-lg overflow-hidden">
          {enfoque.pillars.map((p, i) => (
            <Reveal key={p.n} delay={Math.min(i * 80, 240)}>
              <div className="bg-bg p-8 md:p-10 h-full flex flex-col">
                <span className="font-mono text-caption tracking-[0.22em] bg-horizon-gradient-soft bg-clip-text text-transparent mb-5">
                  {p.n} · {p.title.toUpperCase()}
                </span>
                <h3 className="text-h2 text-fg font-semibold mb-4">{p.title}</h3>
                <p className="text-body text-fg-soft leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ─── Cierre + CTA ─── */}
      <SectionWrapper tone="bg-deep" spacing="xl" className="border-t border-line">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <div className="font-serif italic text-fg text-[1.75rem] md:text-[2rem] leading-[1.4] font-normal tracking-tight space-y-1">
              {enfoque.closing.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-10 text-h2 text-fg font-semibold">{enfoque.closing.emphasis}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-14">
              <Button href={enfoque.closing.cta.href} variant="primary">
                {enfoque.closing.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  );
}
