import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Provisional } from "@/components/ui/Provisional";
import { recursos } from "@/content/recursos";

export const metadata: Metadata = {
  title: "Recursos · Aulentra",
  description: recursos.hero.subtitle,
};

export default function RecursosPage() {
  return (
    <>
      <PageHero
        eyebrow={recursos.hero.eyebrow}
        headline={recursos.hero.headline}
        subtitle={recursos.hero.subtitle}
      />

      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line">
        <Reveal>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge tone="neutral">{recursos.categorias.eyebrow}</Badge>
            <Provisional />
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {recursos.categorias.items.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <div className="p-6 rounded-lg border border-line bg-card h-full">
                <div className="text-h3 text-fg font-semibold mb-3">{cat.title}</div>
                <p className="text-small text-fg-soft leading-relaxed">{cat.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line">
        <Reveal>
          <p className="text-body-l text-fg-soft max-w-[760px]">
            Mientras tanto, en{" "}
            <Link href="/producto" className="text-primary hover:underline">/producto</Link>{" "}
            encuentras la base conceptual completa de Aulentra.
          </p>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
