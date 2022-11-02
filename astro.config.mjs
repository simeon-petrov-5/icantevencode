import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

export default defineConfig({
  site: 'https://icantevencode.com',
  integrations: [vue(), sitemap(), compress()]
});