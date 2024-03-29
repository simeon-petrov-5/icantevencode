const purgecss = require('@fullhuman/postcss-purgecss');
const advancedPreset  = require( 'cssnano-preset-advanced');
const preset = advancedPreset({ zindex: false, discardComments: { removeAll: true } });

const aosWhitelist = [
  "aos-init",
  "aos-animate",
  "data-aos-delay",
  "data-aos-offset",
  "data-aos-once",
  "data-aos-duration",
  "fade-up",
  "fade-left",
  /^:where/,
];

module.exports = {
  plugins: [
    require('cssnano')({
      preset,
      plugins: [['autoprefixer', {grid: 'autoplace'}]]
    }),
    purgecss({
      content: ['./src/**/*.{astro,vue,html}'],
      safelist: [...aosWhitelist],
    })
  ]
};
