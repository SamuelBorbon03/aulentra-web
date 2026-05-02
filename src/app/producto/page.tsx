import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HorizonDivider } from "@/components/ui/HorizonDivider";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Problema } from "@/components/producto/Problema";
import { producto } from "@/content/producto";

export const metadata: Metadata = {
  title: "Producto · Aulentra",
  description: producto.intro.filter(Boolean).join(" "),
};

/** Agrupa líneas en párrafos cuando hay strings vacíos como separadores. */
function groupLines(lines: readonly string[]): string[][] {
  const groups: string[][] = [[]];
  for (const line of lines) {
    if (line === "") {
      if (groups[groups.length - 1].length > 0) groups.push([]);
    } else {
      groups[groups.length - 1].push(line);
    }
  }
  return groups.filter((g) => g.length > 0);
}

export default function ProductoPage() {
  return (
    <>
      <PageHero
        eyebrow={producto.hero.eyebrow}
        headline={producto.hero.headline}
        subtitle={producto.hero.subtitle}
      />

      {/* PageHero es austero — sin halo. Transición a Problema con horizon. */}
      <HorizonDivider />

      {/* ─── Diagnóstico (Sprint C · C.3) — antes de las 5 capas · halo default ─── */}
      <SectionWrapper tone="bg" spacing="xl" halo="default" className="border-t border-line">
        <Problema />
      </SectionWrapper>

      {/* Transición tonal bg → bg-deep · línea horizon */}
      <HorizonDivider />

      {/* ─── 5 capas · sin halo (refuerzo ya recibido en Problema) ─── */}
      <SectionWrapper tone="bg-deep" spacing="lg" halo={false} className="border-t border-line">
        <Reveal>
          <div className="text-body-l text-fg max-w-[820px] leading-relaxed space-y-4">
            {groupLines(producto.intro).map((group, i) => (
              <p key={i}>
                {group.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 border-t border-line">
          {producto.layers.map((layer, i) => (
            <Reveal key={layer.n} delay={Math.min(i * 60, 240)}>
              <div className="grid grid-cols-[auto_1fr] md:grid-cols-[100px_1fr] gap-x-6 md:gap-x-10 py-8 border-b border-line">
                <div className="font-mono text-5xl md:text-6xl text-primary/30 font-extralight leading-none tracking-tight">
                  {layer.n}
                </div>
                <div>
                  <div className="text-h2 text-fg font-semibold mb-2">{layer.title}</div>
                  <p className="text-body-l text-fg font-medium mb-3">{layer.core}</p>
                  <p className="text-body text-fg-soft leading-relaxed max-w-[640px]">{layer.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 max-w-[820px]">
          <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5">
            {producto.closer}
          </p>
        </Reveal>
      </SectionWrapper>

      {/* Transición tonal bg-deep → bg · línea horizon */}
      <HorizonDivider />

      {/* ─── Una experiencia por rol · sin halo ─── */}
      <SectionWrapper id="experiencia" tone="bg" spacing="lg" halo={false} className="border-t border-line">
        <Reveal><Badge tone="primary">{producto.experiencia.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[780px] leading-tight">
            {producto.experiencia.headline}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-5 text-body-l text-fg-soft max-w-[820px] leading-relaxed space-y-4">
            {groupLines(producto.experiencia.intro).map((group, i) => (
              <p key={i}>
                {group.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 space-y-px bg-line-soft border border-line-soft rounded-lg overflow-hidden">
          {producto.experiencia.items.map((rol, i) => (
            <Reveal key={rol.code} delay={Math.min(i * 60, 240)}>
              <div className="bg-bg grid md:grid-cols-[260px_1fr] gap-8 md:gap-10 p-7 md:p-10">
                {/* Columna izquierda — identidad del rol */}
                <div className="flex flex-col">
                  <span className="font-mono text-caption tracking-[0.22em] bg-horizon-gradient-soft bg-clip-text text-transparent mb-3">
                    {rol.code}
                  </span>
                  <p className="text-caption uppercase tracking-[0.18em] text-muted mb-4">
                    {rol.persona}
                  </p>
                  <p className="text-h3 text-fg font-semibold leading-tight">
                    {rol.promise}
                  </p>
                </div>

                {/* Columna derecha — escena + usos */}
                <div>
                  <p className="font-serif italic text-body-l text-fg leading-relaxed border-l-2 border-primary/50 pl-5">
                    {rol.scenario}
                  </p>
                  <div className="mt-6 pt-6 border-t border-line">
                    <p className="font-mono text-caption uppercase tracking-[0.18em] text-muted mb-3">
                      Lo que hace aquí
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {rol.uses.map((use) => (
                        <li
                          key={use}
                          className="inline-flex items-center px-3 py-1.5 rounded-pill text-caption tracking-normal normal-case text-fg-soft bg-card border border-line"
                        >
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 max-w-[720px]">
          <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5">
            {producto.experiencia.closer}
          </p>
        </Reveal>
      </SectionWrapper>

      {/* Transición tonal bg → bg-deep · línea horizon */}
      <HorizonDivider />

      {/* ─── Beneficios · halo cyan closure ─── */}
      <SectionWrapper tone="bg-deep" spacing="lg" halo="closure" className="border-t border-line">
        <Reveal><Badge tone="primary">{producto.beneficios.eyebrow}</Badge></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-h1 text-fg font-bold max-w-[780px]">{producto.beneficios.headline}</h2>
        </Reveal>

        <div className="mt-10 border-t border-line">
          {producto.beneficios.items.map((b, i) => (
            <Reveal key={b.n} delay={(i % 3) * 60}>
              <div className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_280px_1fr] gap-x-6 gap-y-1.5 py-5 border-b border-line items-baseline">
                <div className="font-mono text-caption text-primary tracking-wider">{b.n}</div>
                <div className="text-body text-fg font-semibold">{b.title}</div>
                <p className="col-span-2 md:col-span-1 text-small text-fg-soft leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260} className="mt-10 max-w-[720px]">
          <p className="font-serif italic text-body-l text-fg border-l-2 border-primary pl-5">
            {producto.beneficios.closer}
          </p>
        </Reveal>
      </SectionWrapper>
    </>
  );
}
