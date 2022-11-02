<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { computed, ref } from "vue";
const topics = [
  "🛒 Nuxt & Strapi eCommerce",
  "🕷️ Crawlers",
  "💾 Git for storing data",
  "🎨 Design systems & tokens",
  "🖥️ Home servers / NAS",
  "🤖 SmartHome",
  "⚡ Astro",
];
const layerEl = ref(null);
const { width, height } = useElementSize(layerEl);
const columns = computed(() => Math.floor(width.value / 50));
const rows = computed(() => Math.floor(height.value / 50));
const cells = computed(() => columns.value * rows.value);
</script>

<template>
  <section id="section-current-work" ref="layerEl">
    <div class="layer">
      <div v-if="cells" class="layer__bg" />
      <div
        class="layer__grid"
        :style="`--grid-col:${columns}; --grid-row:${rows}`"
      >
        <div v-for="cell in cells" :key="cell" class="layer__grid__cell"></div>
      </div>
    </div>

    <div class="section section--sm">
      <h2 class="title-1" data-aos="fade-up">
        What's currently keeping me up at night? 🧠
      </h2>
      <ul class="topics" role="list" data-aos="fade-up">
        <li v-for="topic in topics" :key="topic" class="text topics__item">
          {{ topic }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@keyframes gradient-move {
  from {
    background-position: 0% top;
  }
  to {
    background-position: -200% top;
  }
}

#section-current-work {
  position: relative;
  .title-1 {
    text-align: center;
    line-height: 1.2;
    margin-bottom: 3rem;
  }
  .topics {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    text-align: center;
  }

  .layer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    &__bg {
      height: 100%;
      background-size: 200% 200%;
      background-image: linear-gradient(
        to right,
        #4f285c,
        #9f2e62,
        #dc4c47,
        #f08c00,
        #dc4c47,
        #9f2e62,
        #4f285c
      );
      animation: gradient-move 10s ease-in-out infinite;
      opacity: 0.4;
    }

    &__grid {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-columns: repeat(var(--grid-col), 1fr);
      grid-template-rows: repeat(var(--grid-row), 1fr);
      gap: 1px;

      &__cell {
        background-color: var(--clr-page);
      }
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 25%;
      z-index: 1;
    }

    &::before {
      top: 0;
      background: linear-gradient(
        0deg,
        rgba(255, 216, 110, 0) 0%,
        var(--clr-page) 100%
      );
    }
    &::after {
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 216, 110, 0) 0%,
        var(--clr-page) 100%
      );
    }
  }
}
</style>
