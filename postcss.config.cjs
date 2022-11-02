const purgecss = require('@fullhuman/postcss-purgecss')
const aosWhitelist = [
  "aos-init",
  "aos-animate",
  "data-aos-delay",
  "data-aos-offset",
  "data-aos-once",
  "data-aos-duration",
  "fade-up",
  "fade-left",
  "agrid",
  "acol-12",
  "agrid-2", 
  "md:agrid-3",
  /^sm:acol-/
];

module.exports = {
  plugins: [
    require('autoprefixer')({ grid: 'autoplace' }),
    require('cssnano')({
      preset: ['advanced', { zindex: false, discardComments: { removeAll: true } }]
    }),
    purgecss({
      content: ['./src/**/*.{astro,vue,html}'],
      safelist: [...aosWhitelist],
    })
  ]
};
