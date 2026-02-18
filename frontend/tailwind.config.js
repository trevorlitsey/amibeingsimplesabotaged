/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        classified: {
          bg: "#0a0a0a",
          surface: "#141414",
          border: "#2a2a2a",
          text: "#e0e0e0",
          muted: "#888888",
          amber: "#f59e0b",
          red: "#ef4444",
          green: "#22c55e",
        },
      },
    },
  },
  plugins: [],
};
