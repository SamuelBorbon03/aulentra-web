import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Provisional } from "@/components/ui/Provisional";
import { casos } from "@/content/casos";

export const metadata: Metadata = {
  title: "Casos — Aulentra",
  description: casos.hero.subtitle,
};

export default function CasosPage() {
  return (
    <>
      <PageHero
        eyebrow={casos.hero.eyebrow}
        headline={casos.hero.headline}
        subtitle={casos.hero.subtitle}
      />

      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <Reveal>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge tone="neutral">{casos.estado.eyebrow}</Badge>
            <Provisional />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[780px]">{casos.estado.title}</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 text-body-l text-fg max-w-[760px] leading-relaxed">{casos.estado.body}</p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 text-small text-fg/55 italic max-w-[760px]">{casos.estado.nota}</p>
        </Reveal>
      </SectionWrapper>

      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line-soft">
        <Reveal>
          <p className="text-body-l text-fg-soft max-w-[760px]">
            {casos.cierre.body.split("/producto").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <Link href="/producto" className="text-primary hover:underline">/producto</Link>
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
