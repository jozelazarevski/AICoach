import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        line: "var(--line)",
        paper: "var(--paper)",
        "paper-dim": "var(--paper-dim)",
        "paper-faint": "var(--paper-faint)",
        accent: "var(--accent)",
        "stand-high": "#6FA56B",
        "stand-mid": "#C98A3A",
        "stand-low": "#C2584A",
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
