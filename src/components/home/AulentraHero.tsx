import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const CAPITULOS = [
  {
    title: "Estructura",
    items: ["Organigrama", "Calendario", "Programas", "Normativa"],
  },
  {
    title: "Operación",
    items: ["Sesiones", "Eventos", "Tareas", "Comunicaciones"],
  },
  {
    title: "Lectura",
    items: ["Indicadores", "Reportes", "Evidencias", "Auditoría"],
  },
  {
    title: "Estabilidad",
    items: ["Histórico", "Trazabilidad", "Permanencia", "Trayectoria"],
  },
];

export function AulentraHero() {
  return (
    <div className="relative min-h-[calc(100svh-8rem)] flex items-start justify-center pt-6 md:pt-[56px]">
      {/* Constelación atmosférica · sutil · detrás de todo */}
      <Constelacion />
      {/* Sigilo gigante de fondo · detrás de la matriz 4×4 · capa atmosférica */}
      <SigiloFondo />

      <div className="relative max-w-[920px] mx-auto text-center w-full z-10">
        {/* Halo horizon radial detrás del lockup */}
        <div
          className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-[680px] h-[520px] pointer-events-none opacity-55"
          style={{
            background:
              "radial-gradient(ellipse at center,rgba(99,102,241,0.22) 0%,rgba(6,182,212,0.08) 45%,transparent 72%)",
          }}
        />

        {/* Wordmark + tagline · sin símbolo arriba (vive como sigilo de fondo) */}
        <Reveal>
          <div className="relative flex flex-col items-center">
            <div className="text-wordmark-sm md:text-wordmark bg-clip-text text-transparent leading-none bg-horizon-gradient-h-wordmark">
              AULENTRA
            </div>
            <div className="mt-3 text-caption-mono-xs md:text-caption-mono-sm uppercase text-text-subtle whitespace-nowrap">
              Sistema operativo académico
            </div>
          </div>
        </Reveal>

        {/* Headline · 40px del lockup · domina la composición */}
        <Reveal delay={120}>
          <h1 className="mt-10 text-display font-bold text-fg leading-[1.02] tracking-[-0.025em] max-w-[780px] mx-auto">
            <span className="block">Una institución funciona como un sistema.</span>
            <span className="block text-text-subtle">O no funciona.</span>
          </h1>
        </Reveal>

        {/* Afirmación · 32px del headline · subordinada en peso · gradient como acento */}
        <Reveal delay={240}>
          <div className="mt-8 inline-block text-h2 md:text-h1 font-semibold leading-[1.1] tracking-[-0.015em] bg-clip-text text-transparent bg-horizon-gradient-h-soft">
            No cambia lo que haces. Cambia cómo funciona.
          </div>
        </Reveal>

        {/* CTAs · 40px de la afirmación · 16px entre botones */}
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button href="/acceso" variant="primary">
              Acceder
            </Button>
            <Button href="#que-es" variant="secondary">
              Ver cómo opera
            </Button>
          </div>
        </Reveal>

        {/* Micro institucional · 24px de los CTAs */}
        <Reveal delay={460}>
          <p className="mt-6 font-mono text-micro uppercase text-text-subtle">
            Acceso por organización autorizada
          </p>
        </Reveal>

        {/* Capítulos institucionales · matriz 4×4 · sustituye la barra plana */}
        <Reveal delay={560}>
          <CapitulosTabla />
        </Reveal>
      </div>
    </div>
  );
}

function CapitulosTabla() {
  return (
    <div className="mt-10 max-w-[1040px] mx-auto px-2">
      {/* Desktop · grid 4 columnas */}
      <div className="hidden md:grid grid-cols-4 gap-x-6">
        {CAPITULOS.map((c) => (
          <div key={c.title} className="text-center">
            <div className="relative pb-2.5 mb-3">
              <h3 className="font-sans text-caption-mono uppercase text-fg">
                {c.title}
              </h3>
              <div className="absolute left-[14%] right-[14%] bottom-0 h-[1px] opacity-70 bg-horizon-fade-h" />
            </div>
            <ul className="space-y-1.5">
              {c.items.map((item, idx) => (
                <li
                  key={item}
                  /* 12px: matriz P12 cerrada · escala fijada en hero (excepción visual). */
                  className={`text-[12px] leading-snug ${
                    idx === 0 ? "text-text-default font-medium" : "text-text-muted"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile · 4 bloques apilados */}
      <div className="md:hidden flex flex-col gap-5 max-w-[320px] mx-auto">
        {CAPITULOS.map((c) => (
          <div key={c.title} className="text-center">
            <div className="relative pb-2 mb-2.5">
              <h3 className="font-sans text-caption-mono-sm uppercase text-fg">
                {c.title}
              </h3>
              <div className="absolute left-[20%] right-[20%] bottom-0 h-[1px] opacity-70 bg-horizon-fade-h" />
            </div>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {c.items.map((item, idx) => (
                <li
                  key={item}
                  /* 11px mobile: matriz P12 cerrada · escala fijada en hero (excepción visual). */
                  className={`text-[11px] ${
                    idx === 0 ? "text-text-default font-medium" : "text-text-muted"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SigiloFondo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        zIndex: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(720px, 60vw)",
        height: "720px",
        opacity: 0.27,
        maskImage:
          "radial-gradient(ellipse at center, black 45%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 45%, transparent 78%)",
      }}
    >
      <Image
        src="/brand/aulentra_symbol_transparent.png"
        alt=""
        fill
        sizes="720px"
        className="object-contain"
      />
    </div>
  );
}

function Constelacion() {
  return (
    <div
      aria-hidden
      className="absolute top-0 bottom-0 left-1/2 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        width: "100vw",
        transform: "translateX(-50%)",
        opacity: 0.3,
        // Atmósfera A+B+D · 2026-04-28 · fade vertical en el último 18%
        // del hero. Evita el corte abrupto con IdentityDeclaration y crea
        // la transición suave hacia la siguiente sección. SigiloFondo no
        // se toca: su mask radial ya lo cubre.
        maskImage:
          "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 200 130"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="aulHaloAtm" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="rgba(165,180,252,0.14)" />
            <stop offset="55%" stopColor="rgba(103,232,249,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="200" height="130" fill="url(#aulHaloAtm)" />

        {/* Líneas de constelación · trazos libres entre estrellas · sin rectángulos */}
        <g stroke="rgba(165,180,252,0.08)" strokeWidth="0.22" fill="none" strokeLinecap="round">
          {/* Constelación NW · 4 estrellas */}
          <line x1="12" y1="18" x2="34" y2="26" />
          <line x1="34" y1="26" x2="48" y2="14" />
          <line x1="34" y1="26" x2="42" y2="48" />
          {/* Constelación N · puente al centro */}
          <line x1="48" y1="14" x2="80" y2="22" />
          <line x1="80" y1="22" x2="100" y2="40" />
          {/* Constelación NE · 4 estrellas */}
          <line x1="124" y1="18" x2="148" y2="26" />
          <line x1="148" y1="26" x2="172" y2="16" />
          <line x1="148" y1="26" x2="160" y2="46" />
          <line x1="172" y1="16" x2="190" y2="32" />
          {/* Centro · ancla con sigilo */}
          <line x1="100" y1="40" x2="100" y2="58" />
          <line x1="100" y1="58" x2="118" y2="74" />
          <line x1="100" y1="58" x2="82" y2="74" />
          {/* Constelación SW · 5 estrellas */}
          <line x1="14" y1="78" x2="36" y2="86" />
          <line x1="36" y1="86" x2="58" y2="78" />
          <line x1="36" y1="86" x2="44" y2="108" />
          <line x1="44" y1="108" x2="68" y2="116" />
          {/* Constelación SE · 4 estrellas */}
          <line x1="142" y1="80" x2="164" y2="92" />
          <line x1="164" y1="92" x2="186" y2="84" />
          <line x1="164" y1="92" x2="156" y2="114" />
          <line x1="156" y1="114" x2="180" y2="118" />
          {/* Trazos largos diagonales · respiración */}
          <line x1="6" y1="38" x2="42" y2="48" />
          <line x1="190" y1="56" x2="160" y2="46" />
          <line x1="68" y1="116" x2="82" y2="74" />
          <line x1="118" y1="74" x2="156" y2="114" />
        </g>

        {/* Estrellas brillantes · ancladas a los trazos */}
        <g fill="rgba(165,180,252,0.28)">
          <circle cx="34" cy="26" r="0.9" />
          <circle cx="148" cy="26" r="0.9" />
          <circle cx="36" cy="86" r="0.9" />
          <circle cx="164" cy="92" r="0.9" />
          <circle cx="100" cy="58" r="1.2" />
        </g>

        {/* Estrellas medias */}
        <g fill="rgba(165,180,252,0.16)">
          <circle cx="12" cy="18" r="0.6" />
          <circle cx="48" cy="14" r="0.6" />
          <circle cx="80" cy="22" r="0.6" />
          <circle cx="124" cy="18" r="0.6" />
          <circle cx="172" cy="16" r="0.6" />
          <circle cx="190" cy="32" r="0.6" />
          <circle cx="42" cy="48" r="0.6" />
          <circle cx="160" cy="46" r="0.6" />
          <circle cx="14" cy="78" r="0.6" />
          <circle cx="58" cy="78" r="0.6" />
          <circle cx="44" cy="108" r="0.6" />
          <circle cx="68" cy="116" r="0.6" />
          <circle cx="142" cy="80" r="0.6" />
          <circle cx="186" cy="84" r="0.6" />
          <circle cx="156" cy="114" r="0.6" />
          <circle cx="180" cy="118" r="0.6" />
          <circle cx="100" cy="40" r="0.5" />
          <circle cx="82" cy="74" r="0.5" />
          <circle cx="118" cy="74" r="0.5" />
        </g>

        {/* Estrellas tenues · campo disperso */}
        <g fill="rgba(165,180,252,0.09)">
          <circle cx="22" cy="50" r="0.4" />
          <circle cx="66" cy="40" r="0.4" />
          <circle cx="92" cy="14" r="0.4" />
          <circle cx="108" cy="14" r="0.4" />
          <circle cx="134" cy="40" r="0.4" />
          <circle cx="178" cy="48" r="0.4" />
          <circle cx="6" cy="60" r="0.4" />
          <circle cx="194" cy="68" r="0.4" />
          <circle cx="28" cy="100" r="0.4" />
          <circle cx="78" cy="98" r="0.4" />
          <circle cx="100" cy="106" r="0.4" />
          <circle cx="124" cy="100" r="0.4" />
          <circle cx="172" cy="106" r="0.4" />
          <circle cx="60" cy="64" r="0.3" />
          <circle cx="140" cy="64" r="0.3" />
        </g>
      </svg>
    </div>
  );
}
