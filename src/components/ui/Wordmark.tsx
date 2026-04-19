import { cn } from "@/lib/cn";

type Tone = "fg" | "primary" | "gradient";

interface WordmarkProps {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  /** Si true, muestra el isotipo Aulentra (curva con núcleo y horizonte). */
  withSymbol?: boolean;
  className?: string;
}

const tones: Record<Tone, string> = {
  fg:       "text-fg",
  primary:  "text-primary",
  gradient: "bg-horizon-gradient-soft bg-clip-text text-transparent",
};

const sizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

const symbolSizes: Record<"sm" | "md" | "lg", number> = {
  sm: 26,
  md: 34,
  lg: 42,
};

/**
 * AulentraSymbol — isotipo oficial del producto (gradiente soft dark).
 */
function AulentraSymbol({ size, id }: { size: number; id: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="50%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#67E8F9" />
        </linearGradient>
      </defs>
      <path
        d="M10 80C 30 80, 40 20, 50 20C 60 20, 70 80, 90 80"
        stroke={`url(#${id})`}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="55" r="14" fill={`url(#${id})`} fillOpacity="0.85" />
      <path
        d="M20 80H80"
        stroke="#A5B4FC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

export function Wordmark({
  tone = "fg",
  size = "md",
  withSymbol = false,
  className,
}: WordmarkProps) {
  const gradId = `aulentraHorizonDark-${size}-${tone}`;

  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label="Aulentra">
      {withSymbol && <AulentraSymbol size={symbolSizes[size]} id={gradId} />}
      <span
        className={cn("font-bold uppercase tracking-[0.18em] leading-none", tones[tone], sizes[size])}
      >
        AULENTRA
      </span>
    </span>
  );
}
