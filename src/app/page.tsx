import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";
import { HeroContactForm } from "./HeroContactForm";
import { CapasSection } from "./CapasSection";

/**
 * Home Aulentra (/) — abrebocas a /producto, /roles, /casos, /recursos, /sobre.
 * 5 secciones compactas + form B2B condicional en el hero.
 * Sin la palabra "demo" en NINGÚN lado (regla project_aulentra_brand_rules).
 */
export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════ 01 · HERO ═══════════════════════ */}
      <SectionWrapper id="hero" tone="bg" spacing="xl">
        <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-16 lg:items-stretch">
          {/* Izquierda · copy + promesa anclada al fondo */}
          <div className="max-w-[680px] flex flex-col">
            <Reveal>
              <Badge tone="primary" className="mb-8">{landing.hero.eyebrow}</Badge>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-display text-fg font-bold">{landing.hero.headline}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-body-l text-fg-soft">{landing.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap gap-4">
              <Button href={landing.hero.ctaPrimary.href} variant="primary">{landing.hero.ctaPrimary.label}</Button>
              <Button href={landing.hero.ctaSecondary.href} variant="secondary">{landing.hero.ctaSecondary.label}</Button>
            </Reveal>
            <Reveal delay={320} className="mt-10 h-px w-28 bg-horizon-gradient-soft" />

            {/* Promesa al lead — anclada al fondo en lg+ */}
            <Reveal delay={420} className="mt-12 lg:mt-auto lg:pt-14">
              <div className="text-small uppercase tracking-[0.22em] text-primary mb-4 font-medium">
                {landing.heroPromesa.eyebrow}
              </div>
              <p className="text-h2 text-fg font-medium leading-tight tracking-tight max-w-[560px] border-l-2 border-primary pl-6">
                {landing.heroPromesa.body}
              </p>
            </Reveal>
          </div>

          {/* Derecha · form Aulentra (perfil condicional) */}
          <Reveal delay={200}>
            <HeroContactForm />
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════ 02 · MANIFIESTO ═══════════════════════ */}
      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="neutral">{landing.manifiesto.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 text-display text-fg font-bold max-w-[900px] leading-[1.1]">
            {landing.manifiesto.headline}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 font-serif italic text-h2 text-primary border-l-2 border-primary pl-6 max-w-[780px]">
            {landing.manifiesto.quote}
          </p>
        </Reveal>
        <Reveal delay={280} className="mt-10">
          <Button href={landing.manifiesto.link.href} variant="link">
            {landing.manifiesto.link.label}
          </Button>
        </Reveal>
      </SectionWrapper>

      {/* ═══════════════════════ 03 · CAPAS (interactivo) ═══════════════════════ */}
      <SectionWrapper tone="bg" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="primary">{landing.capas.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[780px]">{landing.capas.headline}</h2>
        </Reveal>

        <Reveal delay={160} className="mt-12">
          <CapasSection layers={landing.capas.items} helper={landing.capas.helper} />
        </Reveal>

        <Reveal delay={500} className="mt-10">
          <Button href={landing.capas.link.href} variant="link">
            {landing.capas.link.label}
          </Button>
        </Reveal>
      </SectionWrapper>

      {/* ═══════════════════════ 04 · ROLES (compacto) ═══════════════════════ */}
      <SectionWrapper tone="bg-deep" spacing="lg" className="border-t border-line-soft">
        <Reveal><Badge tone="neutral">{landing.roles.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[780px]">{landing.roles.headline}</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {landing.roles.items.map((r, i) => (
            <Reveal key={r.code} delay={i * 80}>
              <div className="p-5 rounded-lg border border-line bg-card h-full">
                <div className="font-mono text-caption uppercase tracking-[0.22em] bg-horizon-gradient-soft bg-clip-text text-transparent mb-2">
                  {r.code}
                </div>
                <div className="text-body text-fg font-semibold">{r.core}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-10">
          <Button href={landing.roles.link.href} variant="link">
            {landing.roles.link.label}
          </Button>
        </Reveal>
      </SectionWrapper>

      {/* ═══════════════════════ 05 · CTA FINAL ═══════════════════════ */}
      <SectionWrapper tone="elevated" spacing="xl" className="border-t border-line-soft">
        <div className="max-w-[820px]">
          <Reveal><Badge tone="primary">{landing.cta.eyebrow}</Badge></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-display text-fg font-bold leading-[1.05]">{landing.cta.headline}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-body-l text-fg-soft max-w-[680px]">{landing.cta.subtitle}</p>
          </Reveal>

          <Reveal delay={240} className="mt-10 flex flex-wrap gap-4">
            <Button href={landing.cta.ctaPrimary.href} variant="primary">{landing.cta.ctaPrimary.label}</Button>
            <Button href={landing.cta.ctaSecondary.href} variant="secondary">{landing.cta.ctaSecondary.label}</Button>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-4 text-small text-muted max-w-[480px]">{landing.cta.support}</p>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  );
}
