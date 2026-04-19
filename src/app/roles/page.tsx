import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { roles } from "@/content/roles";

export const metadata: Metadata = {
  title: "Roles — Aulentra",
  description: roles.hero.subtitle,
};

export default function RolesPage() {
  return (
    <>
      <PageHero
        eyebrow={roles.hero.eyebrow}
        headline={roles.hero.headline}
        subtitle={roles.hero.subtitle}
      />

      {/* ─── 4 roles ─── */}
      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <div className="grid md:grid-cols-2 gap-6">
          {roles.items.map((r, i) => (
            <Reveal key={r.code} delay={(i % 2) * 120}>
              <div className="p-7 md:p-8 rounded-lg border border-line bg-card h-full">
                <div className="font-mono text-caption uppercase tracking-[0.22em] bg-horizon-gradient-soft bg-clip-text text-transparent mb-3">
                  {r.code}
                </div>
                <div className="text-h2 text-fg font-semibold mb-3">{r.core}</div>
                <p className="text-body text-fg-soft leading-relaxed">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12">
          <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5 max-w-[720px]">
            {roles.closer}
          </p>
        </Reveal>
      </SectionWrapper>

      {/* ─── Notas editoriales sobre los roles ─── */}
      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="neutral">{roles.notas.eyebrow}</Badge></Reveal>

        <div className="mt-10 max-w-[820px] space-y-5">
          {roles.notas.items.map((nota, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-body text-fg-soft leading-relaxed border-l-2 border-line-strong pl-5">
                {nota}
              </p>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
