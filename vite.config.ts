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
          primary: "#C7802D",
          shader: "#094074",
          light: {
            primary: "rgba(255,255,255,.9)",
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
