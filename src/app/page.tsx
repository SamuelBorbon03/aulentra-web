import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";

/**
 * Landing Aulentra dark — Fase 5b.
 * Reorganización a 6 secciones (hero + 4 contenido + cierre fusionado visión/CTA).
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ═══════════════════════ 01 · HERO ═══════════════════════ */}
        <SectionWrapper id="hero" tone="bg" spacing="xl">
          <div className="max-w-[820px]">
            <Reveal>
              <Badge tone="primary" className="mb-8">{landing.hero.eyebrow}</Badge>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-display text-fg font-bold">{landing.hero.headline}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-body-l text-fg-soft max-w-[680px]">{landing.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap gap-4">
              <Button href={landing.hero.ctaPrimary.href} variant="primary">{landing.hero.ctaPrimary.label}</Button>
              <Button href={landing.hero.ctaSecondary.href} variant="secondary">{landing.hero.ctaSecondary.label}</Button>
            </Reveal>
            <Reveal delay={320} className="mt-10 h-px w-28 bg-horizon-gradient-soft" />
          </div>
        </SectionWrapper>

        {/* ═══════════════════════ 02 · PROBLEMA + SOLUCIÓN ═══════════════════════ */}
        <SectionWrapper id="solucion" tone="bg-deep" spacing="lg" className="border-t border-line-soft">
          <Reveal>
            <Badge tone="neutral">Problema · Solución</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-h1 text-fg max-w-[900px]">{landing.problema.headline}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-body-l text-fg-soft max-w-[760px]">{landing.solucion.headline}</p>
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Problema — 3 sub-bloques */}
            <Reveal>
              <div className="text-caption uppercase tracking-[0.22em] text-primary mb-5">
                {landing.problema.eyebrow}
              </div>
              <div>
                {/* Sub 1 · El contexto */}
                <div className="py-5 border-t border-b border-line">
                  <div className="text-caption uppercase tracking-[0.18em] text-muted mb-2">
                    El contexto
                  </div>
                  <p className="text-small text-fg-soft leading-relaxed">{landing.problema.body[0]}</p>
                </div>
                {/* Sub 2 · Los síntomas */}
                <div className="py-5 border-b border-line">
                  <div className="text-caption uppercase tracking-[0.18em] text-muted mb-2">
                    Los síntomas
                  </div>
                  <ul className="space-y-1.5">
                    {landing.problema.symptoms.map((s, j) => (
                      <li key={j} className="text-small text-fg-soft leading-relaxed flex gap-2">
                        <span className="text-primary">—</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Sub 3 · La consecuencia */}
                <div className="py-5 border-b border-line">
                  <div className="text-caption uppercase tracking-[0.18em] text-muted mb-2">
                    La consecuencia
                  </div>
                  <p className="text-small text-fg-soft leading-relaxed">{landing.problema.body[1]}</p>
                </div>
              </div>
            </Reveal>

            {/* Solución — 3 declaraciones */}
            <Reveal delay={120}>
              <div className="text-caption uppercase tracking-[0.22em] text-primary mb-5">
                {landing.solucion.eyebrow}
              </div>
              <div>
                {landing.solucion.statements.map((s, i) => (
                  <div
                    key={s.title}
                    className={`py-5 ${i === 0 ? "border-t" : ""} border-b border-line`}
                  >
                    <div className="text-h3 font-semibold bg-horizon-gradient-soft bg-clip-text text-transparent mb-2">
                      {s.title}
                    </div>
                    <p className="text-small text-fg-soft leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="mt-10 max-w-[780px]">
            <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5">
              {landing.problema.closer}
            </p>
          </Reveal>
        </SectionWrapper>

        {/* ═══════════════════════ 03 · CÓMO FUNCIONA — 5 CAPAS ═══════════════════════ */}
        <SectionWrapper id="how" tone="bg" spacing="lg" className="border-t border-line-soft">
          <Reveal>
            <Badge tone="neutral">{landing.howItWorks.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-h1 text-fg max-w-[900px]">{landing.howItWorks.headline}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-body-l text-muted max-w-[760px]">{landing.howItWorks.subtitle}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 text-body text-fg-soft max-w-[760px]">{landing.howItWorks.intro}</p>
          </Reveal>

          <div className="mt-10 border-t border-line">
            {landing.howItWorks.layers.map((layer, i) => (
              <Reveal key={layer.n} delay={Math.min(i * 60, 240)}>
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[100px_1fr] gap-x-6 md:gap-x-10 py-6 border-b border-line">
                  <div className="font-mono text-5xl md:text-6xl text-primary/30 font-extralight leading-none tracking-tight">
                    {layer.n}
                  </div>
                  <div>
                    <div className="text-h3 text-fg font-semibold mb-2">{layer.title}</div>
                    <p className="text-body text-fg font-medium mb-2">{layer.core}</p>
                    <p className="text-small text-fg-soft leading-relaxed max-w-[640px]">{layer.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-8 max-w-[780px]">
            <p className="text-body text-muted italic">{landing.howItWorks.closer}</p>
          </Reveal>
        </SectionWrapper>

        {/* ═══════════════════════ 04 · ROLES ═══════════════════════ */}
        <SectionWrapper id="roles" tone="bg-deep" spacing="lg" className="border-t border-line-soft">
          <Reveal>
            <Badge tone="primary">{landing.roles.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-h1 text-fg max-w-[900px]">{landing.roles.headline}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-body-l text-muted max-w-[760px]">{landing.roles.subtitle}</p>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {landing.roles.items.map((r, i) => (
              <Reveal key={r.code} delay={(i % 4) * 80}>
                <div className="p-6 rounded-lg border border-line bg-card h-full">
                  <div className="font-mono text-caption uppercase tracking-[0.22em] bg-horizon-gradient-soft bg-clip-text text-transparent mb-3">
                    {r.code}
                  </div>
                  <div className="text-h3 text-fg font-semibold mb-2">{r.core}</div>
                  <p className="text-small text-fg-soft leading-relaxed">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={380} className="mt-10">
            <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5 max-w-[720px]">
              {landing.roles.closer}
            </p>
          </Reveal>
        </SectionWrapper>

        {/* ═══════════════════════ 05 · BENEFICIOS · lista fina ═══════════════════════ */}
        <SectionWrapper id="beneficios" tone="bg" spacing="lg" className="border-t border-line-soft">
          <Reveal>
            <Badge tone="neutral">{landing.beneficios.eyebrow}</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-h1 text-fg max-w-[900px]">{landing.beneficios.headline}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-body-l text-muted max-w-[760px]">{landing.beneficios.subtitle}</p>
          </Reveal>

          <div className="mt-10 border-t border-line">
            {landing.beneficios.items.map((b, i) => (
              <Reveal key={b.n} delay={(i % 3) * 60}>
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_280px_1fr] gap-x-6 gap-y-1.5 py-5 border-b border-line items-baseline">
                  <div className="font-mono text-caption text-primary tracking-wider">{b.n}</div>
                  <div className="text-body text-fg font-semibold">{b.title}</div>
                  <p className="col-span-2 md:col-span-1 text-small text-fg-soft leading-relaxed">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="mt-10 max-w-[720px]">
            <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5">
              {landing.beneficios.closer}
            </p>
          </Reveal>
        </SectionWrapper>

        {/* ═══════════════════════ 06 · CIERRE · VISIÓN + CTA ═══════════════════════ */}
        <SectionWrapper id="cta" tone="elevated" spacing="xl" className="border-t border-line-soft">
          <div className="max-w-[900px]">
            {/* Visión */}
            <Reveal>
              <Badge tone="primary">{landing.vision.eyebrow}</Badge>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-h1 text-fg font-bold">{landing.vision.headline}</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-body-l text-muted max-w-[760px]">{landing.vision.subtitle}</p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 text-body text-fg-soft max-w-[760px]">{landing.vision.body}</p>
            </Reveal>

            <div className="mt-8 space-y-2 pl-5 border-l-2 border-primary">
              {landing.vision.contrast.map((line, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className="text-h3 text-fg font-medium">{line}</p>
                </Reveal>
              ))}
            </div>

            {/* Hairline Horizon soft de transición */}
            <div className="my-12 h-px w-full bg-horizon-gradient-soft opacity-70" />

            {/* CTA */}
            <Reveal>
              <div className="text-caption uppercase tracking-[0.22em] text-primary mb-3">
                {landing.cta.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-display text-fg font-bold leading-[1.05]">{landing.cta.headline}</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-body-l text-fg-soft max-w-[680px]">{landing.cta.subtitle}</p>
            </Reveal>

            <Reveal delay={240} className="mt-8 flex flex-wrap gap-4">
              <Button href={landing.cta.ctaPrimary.href} variant="primary">{landing.cta.ctaPrimary.label}</Button>
              <Button href={landing.cta.ctaSecondary.href} variant="secondary">{landing.cta.ctaSecondary.label}</Button>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-4 text-small text-muted max-w-[480px]">{landing.cta.support}</p>
            </Reveal>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
