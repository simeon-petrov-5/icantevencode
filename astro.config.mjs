import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import critters from "astro-critters";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://icantevencode.com',
  integrations: [vue(), sitemap(), compress({
    css: false,
    html: false
  }), critters(), image(), partytown()]
});