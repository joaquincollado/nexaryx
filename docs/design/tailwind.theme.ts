// Tema de Tailwind para Indira Portal. Todos los valores salen de las variables de tokens.css,
// así que cambiar data-theme en <html> cambia la paleta sin tocar nada más.
//
// Uso (tailwind.config.ts, v3 o v4 con @config):
//   import { indiraTheme } from "./docs/design/tailwind.theme";
//   export default { content: [...], theme: { extend: indiraTheme } } satisfies Config;

export const indiraTheme = {
  colors: {
    void: "var(--void)",
    panel: "var(--panel)",
    line: "var(--line)",
    ink: "var(--ink)",
    "ink-muted": "var(--ink-muted)",
    signal: "var(--signal)",
    "on-signal": "var(--on-signal)",
    glitch: "var(--glitch)",
    warn: "var(--warn)",
  },
  fontFamily: {
    display: ["var(--font-display)"],
    mono: ["var(--font-mono)"],
  },
  fontSize: {
    "display-xl": ["80px", { lineHeight: "76px", fontWeight: "400" }],
    "display-md": ["48px", { lineHeight: "48px", fontWeight: "400" }],
    title: ["20px", { lineHeight: "28px", fontWeight: "600" }],
    body: ["14px", { lineHeight: "22px", fontWeight: "400" }],
    small: ["12px", { lineHeight: "18px", fontWeight: "400" }],
    label: ["11px", { lineHeight: "16px", letterSpacing: "0.14em", fontWeight: "500" }],
  },
  borderRadius: {
    none: "0px",
    DEFAULT: "0px",
    sm: "2px",
    dot: "50%",
  },
  boxShadow: {
    "glow-signal": "var(--glow-signal)",
    "glow-glitch": "var(--glow-glitch)",
  },
};
