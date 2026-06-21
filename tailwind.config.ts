import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14181F",
        "ink-2": "#1A1F28",
        "ink-3": "#232A35",
        line: "#2D3440",
        paper: "#ECE7DD",
        "paper-dim": "#9AA1AD",
        "paper-faint": "#69707D",
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
