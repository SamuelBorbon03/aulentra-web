import type { Config } from "tailwindcss";

// Tokens Horizon DARK — fuente: aulentra_manual_base_marca.pdf
// (paleta oficial dark extraída del monorepo de producto)
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "3rem",
      },
      screens: {
        "2xl": "1120px",
      },
    },
    extend: {
      colors: {
        // Superficies dark
        bg: {
          DEFAULT: "#151935",
          deep:    "#101328",
        },
        card:     "#1D2145",
        elevated: "#242852",
        hover:    "#2C305C",

        // Texto (legacy — superficies sólidas)
        fg:        "#ECEEF8",
        "fg-soft": "#B8BDD6",
        muted:     "#7B82A6",
        subtle:    "#555B7A",

        // Texto semántico (Sprint C · A.2 · 5 niveles desde --text-*)
        // Uso preferido: text-text-strong / text-text-default / text-text-muted /
        // text-text-subtle / text-text-faint. Migra ocurrencias text-fg/N a estos.
        text: {
          strong:  "var(--text-strong)",
          DEFAULT: "var(--text-default)",
          muted:   "var(--text-muted)",
          subtle:  "var(--text-subtle)",
          faint:   "var(--text-faint)",
        },

        // Bordes
        line: {
          DEFAULT: "#272B50",
          soft:    "#1E2240",
          strong:  "#363B68",
        },

        // Horizon soft (variante dark de la marca)
        primary: {
          DEFAULT: "#A5B4FC",
          hover:   "#818CF8",
          light:   "rgba(99, 102, 241, 0.1)",
        },
        accent: {
          DEFAULT: "#7DD3FC",
          cyan:    "#67E8F9",
          light:   "rgba(125, 211, 252, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-plex-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // ─── Escala base (NO TOCAR) ───
        display:  ["3.5rem",   { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "h1":     ["2.75rem",  { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        "h2":     ["2rem",     { lineHeight: "1.2",  letterSpacing: "-0.02em",  fontWeight: "600" }],
        "h3":     ["1.5rem",   { lineHeight: "1.3",  letterSpacing: "-0.01em",  fontWeight: "600" }],
        "body-l": ["1.25rem",  { lineHeight: "1.6",  letterSpacing: "0", fontWeight: "400" }],
        "body":   ["1rem",     { lineHeight: "1.6",  letterSpacing: "-0.006em", fontWeight: "400" }],
        "small":  ["0.875rem", { lineHeight: "1.5",  letterSpacing: "0", fontWeight: "400" }],
        "caption":["0.75rem",  { lineHeight: "1.4",  letterSpacing: "0.22em", fontWeight: "500" }],

        // ─── Sprint C · A.1 · Tokens nuevos ───
        // Numerales monumentales (Capabilities, etc.)
        "numeral-xl":     ["104px", { lineHeight: "0.82", letterSpacing: "-0.05em", fontWeight: "200" }],
        "numeral-lg":     ["80px",  { lineHeight: "0.82", letterSpacing: "-0.05em", fontWeight: "200" }],
        "numeral-tenant": ["320px", { lineHeight: "1",    letterSpacing: "-0.04em", fontWeight: "700" }],
        // Display variants (afirmaciones gradient · headlines internos)
        "display-lg":     ["48px",  { lineHeight: "1.05", letterSpacing: "-0.02em",  fontWeight: "600" }],
        "display-md":     ["44px",  { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-sm":     ["40px",  { lineHeight: "1.05", letterSpacing: "-0.02em",  fontWeight: "600" }],
        "display-xs":     ["36px",  { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        // Wordmarks
        "wordmark":       ["40px",  { lineHeight: "1",    letterSpacing: "0.18em",   fontWeight: "700" }],
        "wordmark-sm":    ["32px",  { lineHeight: "1",    letterSpacing: "0.18em",   fontWeight: "700" }],
        // Body soft (15px · entre body y small)
        "body-soft":      ["15px",  { lineHeight: "1.6",  letterSpacing: "-0.005em", fontWeight: "400" }],
        // Caption mono (uppercase tracking · etiquetas técnicas)
        "caption-mono":   ["13px",  { lineHeight: "1.4",  letterSpacing: "0.18em",   fontWeight: "700" }],
        "caption-mono-sm":["12px",  { lineHeight: "1.4",  letterSpacing: "0.20em",   fontWeight: "700" }],
        "caption-mono-xs":["11px",  { lineHeight: "1.4",  letterSpacing: "0.32em",   fontWeight: "500" }],
        // Micro (eyebrows · microcopy técnico)
        "micro":          ["10px",  { lineHeight: "1.4",  letterSpacing: "0.28em",   fontWeight: "500" }],
        "micro-xs":       ["8.5px", { lineHeight: "1.4",  letterSpacing: "0.22em",   fontWeight: "500" }],
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        pill: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.25)",
        sm: "0 1px 4px rgba(0,0,0,0.3)",
        md: "0 4px 12px rgba(0,0,0,0.3)",
        lg: "0 12px 28px rgba(0,0,0,0.35)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        // Gradiente principal (versión saturada, para CTAs de alto impacto)
        "horizon-gradient":
          "linear-gradient(135deg, #4F46E5 0%, #3B82F6 55%, #06B6D4 100%)",
        // Gradiente soft (versión dark-mode del manual — acentos, regla de marca)
        "horizon-gradient-soft":
          "linear-gradient(135deg, #A5B4FC 0%, #7DD3FC 55%, #67E8F9 100%)",
        // ─── Sprint C · A.7 · Variantes horizontales ───
        "horizon-gradient-h-soft":
          "linear-gradient(90deg, #A5B4FC 0%, #7DD3FC 55%, #67E8F9 100%)",
        "horizon-gradient-h-soft-50":
          "linear-gradient(90deg, #A5B4FC 0%, transparent 100%)",
        "horizon-gradient-h-wordmark":
          "linear-gradient(90deg, #A5B4FC 0%, #93C5FD 50%, #67E8F9 100%)",
        "horizon-fade-h":
          "linear-gradient(90deg, transparent 0%, #A5B4FC 30%, #67E8F9 70%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
