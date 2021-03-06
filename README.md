# icantevencode - Static website based on Vue + Vite + NetlifyCMS

This is the project for my personal website [icantevencode.com](https://icantevencode.com/). This is pretty much a playground to spin up something a little bit unusual - a static site without the usual Nuxt/Gridsome/Gatsby stuff. The SSG part is handled by Vite plugins and the blog is git-based via NetlifyCMS.

## Features
- π Vue 3 + `<script setup>`
- β‘ Vite
- π Static  [viteSSG](https://github.com/antfu/vite-ssg)
- ποΈ File based routing [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)
- π§± Components auto importing [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- πΊοΈ Layout system [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- π Markdown pages [vite-plugin-md](https://github.com/antfu/vite-plugin-md)
- π¨οΈ NetlifyCMS
- π¨ SASS
- π©οΈ Netlify + Netlify Forms

## βοΈ More stuff to check
- [ ] Critical CSS (Critters via ViteSSG)
- [ ] Blog: Add tags and sorting in the blog page
- [ ] CSS: Play around with design tokes & SCSS vs CSS variables
- [ ] Check Netlify Richtext to MD escaping valid Markdown [examples](https://github.com/netlify/netlify-cms/issues/4360)
- [ ] π© Think about own git based admin? [headless-cms](https://jamstack.org/headless-cms/) / Obsidian as CMS ?
- [ ] Use aGrid's sass module to trim excess
- [ ] Add analytics like https://splitbee.io/docs/javascript-library
- [ ] Add cookies module & page


## Is it worth it?
Eh.. probably not that much, who knows. It's an experiment I had in my head and wanted to do. Going SentlifyCMS + Nuxt/Gridsome would have been way easier. Or just Nust with its Content module. But that's always a good idea for a future project.
