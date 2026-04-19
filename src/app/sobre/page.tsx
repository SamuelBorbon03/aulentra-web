import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { sobre } from "@/content/sobre";

export const metadata: Metadata = {
  title: "Sobre Aulentra",
  description: sobre.hero.subtitle,
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow={sobre.hero.eyebrow}
        headline={sobre.hero.headline}
        subtitle={sobre.hero.subtitle}
      />

      {/* ─── Qué es Aulentra ─── */}
      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="primary">{sobre.quees.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[820px]">{sobre.quees.headline}</h2>
        </Reveal>
        <Reveal delay={160} className="mt-8 max-w-[760px] space-y-5">
          {sobre.quees.body.map((p, i) => (
            <p key={i} className="text-body-l text-fg leading-relaxed">{p}</p>
          ))}
        </Reveal>
      </SectionWrapper>

      {/* ─── Propósito + Visión (2-col) ─── */}
      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line-soft">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <Badge tone="primary">{sobre.proposito.eyebrow}</Badge>
            <p className="mt-6 text-body-l text-fg leading-relaxed">{sobre.proposito.body}</p>
          </Reveal>
          <Reveal delay={120}>
            <Badge tone="primary">{sobre.vision.eyebrow}</Badge>
            <h3 className="mt-6 text-h2 text-fg font-bold mb-3">{sobre.vision.headline}</h3>
            <p className="text-body text-fg-soft leading-relaxed mb-6">{sobre.vision.body}</p>
            <div className="space-y-2 pl-5 border-l-2 border-primary">
              {sobre.vision.contrast.map((line, i) => (
                <p key={i} className="text-h3 text-fg font-medium">{line}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Para quién (los dos públicos) ─── */}
      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="neutral">{sobre.paraquien.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[820px]">{sobre.paraquien.headline}</h2>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {sobre.paraquien.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="p-7 rounded-lg border border-line bg-card h-full">
                <div className="text-h3 text-fg font-semibold mb-3">{p.title}</div>
                <p className="text-body text-fg-soft leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-10">
          <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5 max-w-[720px]">
            {sobre.paraquien.cierre}
          </p>
        </Reveal>
      </SectionWrapper>

      {/* ─── Relación con Noventor ─── */}
      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="primary">{sobre.noventor.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[820px]">{sobre.noventor.headline}</h2>
        </Reveal>
        <Reveal delay={160} className="mt-8 max-w-[760px] space-y-5">
          {sobre.noventor.body.map((p, i) => (
            <p key={i} className="text-body-l text-fg leading-relaxed">{p}</p>
          ))}
        </Reveal>

        <div className="mt-12 max-w-[820px]">
          <h3 className="text-h3 text-fg font-bold mb-5">{sobre.noventor.porque.title}</h3>
          <div className="border-t border-line">
            {sobre.noventor.porque.items.map((it, i) => {
              const [bold, ...rest] = it.split("—");
              return (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <div className="flex gap-4 py-4 border-b border-line">
                    <div className="font-mono text-caption text-primary tracking-wider min-w-[36px]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-body text-fg leading-relaxed">
                      <strong className="text-fg font-semibold">{bold.trim()}</strong>
                      {rest.length > 0 && <> — {rest.join("—").trim()}</>}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={400} className="mt-12">
          <p className="font-serif italic text-h2 text-fg border-l-2 border-primary pl-6 max-w-[680px] leading-snug">
            {sobre.cierre}
          </p>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
