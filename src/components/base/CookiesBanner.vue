<script lang="ts" setup>
import { onMounted, ref } from "vue";
const isVisible = ref(false);

const onClose = () => {
  isVisible.value = false;
  localStorage.setItem("privacy:accepted", "true");
};

onMounted(() => {
  const persisted = localStorage.getItem("privacy:accepted");
  isVisible.value = persisted !== "true";
});
</script>

<template>
  <div v-if="isVisible" class="cookiesBanner">
    <p class="ds__text">
      🍪 We take your privacy seriously. This website uses anonymous analytics
      data to improve your browsing experience.
    </p>

    <div class="btnWrapper">
      <a class="ds__link--clean" href="/privacy-policy">
        <button class="btn learn">Learn more</button>
      </a>
      <button class="btn close" @click="onClose">Close</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cookiesBanner {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 1rem 2rem;
  background: var(--clr-page-bg);
  border-top: 1px solid var(--clr-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  .ds__text {
    margin-right: auto;
    padding: 0px;
    font-size: 1rem;
    text-align: center;
  }

  .btnWrapper {
    display: flex;
    gap: 1rem;
    a {
      text-decoration: none;
    }
  }
  .btn {
    border: 2px solid var(--clr-form-element-border);
    border-radius: 0.325rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    &.learn {
      color: var(--clr-form-btn-text);
      &:hover {
        color: var(--clr-form-btn-hover-text);
        background-color: var(--clr-form-btn-hover-bg);
      }
    }
    &.close {
      background-color: var(--clr-form-btn-hover-bg);
      color: var(--clr-form-btn-hover-text);
      &:hover {
        color: var(--clr-form-btn-text);
        background-color: transparent;
      }
    }
  }
}
</style>
