module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  darkMode: "class", // or "media"
  theme: {
    extend: {
      fontFamily: {
        body: ["Twemoji Country Flags", "Figtree", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 3px 3px 1px #141414",
      },
      colors: {
        appColor: {
          DEFAULT: "var(--app-color)",
          hex: "var(--app-color-hex)",
          50: "var(--app-color-50)",
          100: "var(--app-color-100)",
          200: "var(--app-color-200)",
          300: "var(--app-color-300)",
          400: "var(--app-color-400)",
          500: "var(--app-color-500)",
          600: "var(--app-color-600)",
          700: "var(--app-color-700)",
          800: "var(--app-color-800)",
          900: "var(--app-color-900)",
          950: "var(--app-color-950)",
        },
        black: {
          DEFAULT: "#0A0A0A",
          50: "#141414",
          100: "#1D1D1D",
          200: "#272727",
          300: "#303030",
          400: "#444444",
          500: "#575757",
          600: "#6A6A6A",
          700: "#7D7D7D",
          800: "#909090",
          900: "#A3A3A3",
        },
        ravenBlack: "#3D3D3D",
        whiteSmoke: {
          DEFAULT: "#F5F5F5",
          50: "#E9E9E9",
          100: "#DDDDDD",
          200: "#D0D0D0",
          300: "#C4C4C4",
          400: "#ACACAC",
          500: "#949494",
          600: "#7C7C7C",
          700: "#636363",
          800: "#4B4B4B",
          900: "#333333",
        },
      },
    },
  },
};
