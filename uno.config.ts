import { defineConfig, presetUno, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  /* options */
  safelist: ["cursor-pointer"],
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      black: {
        primary: "#1a1a1a",
        pure: "#000000",
        soft: "#242424",
        mute: "#2f2f2f",
      },
      white: {
        primary: "#ffffff",
        soft: "#f9f9f9",
        mute: "#ffffffb3",
      },
      indigo: {
        primary: "#213547",
        soft: "#476582",
        light: "#aac8e4",
      },
      gray: {
        primary: "#8e8e8e",
        light: {
          1: "#aeaeae",
          2: "#c7c7c7",
          3: "#d1d1d1",
          4: "#e5e5e5",
          5: "#f2f2f2",
        },
        dark: {
          1: "#636363",
          2: "#484848",
          3: "#3a3a3a",
          4: "#282828",
          5: "#202020",
        },
      },
      green: {
        default: "#42b883",
        light: "#42d392",
        lighter: "#35eb9a",
        dark: "#33a06f",
        darker: "#155f3e",
      },
    },
    gridTemplateRow: {
      layouts: "minmax(0, 1fr) 40px",
    },
    boxShadow: {
      word: "var(--un-shadow-inset) 0 0px 2px 0 var(--un-shadow-color, rgba(0,0,0,0.1)),var(--un-shadow-inset) 0 0px 0px 0px var(--un-shadow-color, rgba(0,0,0,0.1));",
    },
  },
  shortcuts: {
    "login-box":
      "m-auto max-w-400px border-1 border-white-primary border-style-solid p-4",
  },
});
