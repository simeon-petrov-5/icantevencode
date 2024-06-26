import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://icantevencode.com",
  integrations: [
    vue(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    partytown(),
  ],
  compilerOptions: {
    baseUrl: ".",
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
