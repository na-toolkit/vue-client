import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import UnoCSS from "@unocss/vite";
import presetWind from "@unocss/preset-wind";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        /* no presets by default */
        presetWind(),
      ],
      /* options */
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
            mute: "#f1f1f1",
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
      },
      shortcuts: {
        "login-box":
          "m-auto w-400px h-500px border-white-primary border-1 border-style-solid",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
