<script lang="ts" setup>
import { onMounted, ref } from "vue";
const persistedTheme = (localStorage.getItem("data-theme") as any) ?? "dark";
const theme = ref<"light" | "dark">(persistedTheme);
const isMounted = ref(false);

const toggleTheme = () => {
  const newState = theme.value === "light" ? "dark" : "light";
  if (newState === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "");
  }
  theme.value = newState;
  localStorage.setItem("data-theme", newState);
};

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <button
    class="switch"
    :class="[theme, isMounted ? 'visible' : '']"
    @click="toggleTheme"
  >
    <div class="icon">
      <!--?xml version="1.0" ?-->
      <svg class="sun" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height="256" width="256"></rect>
        <circle cx="128" cy="128" r="68"></circle>
        <path
          d="M128,44a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V36A8,8,0,0,0,128,44Z"
        ></path>
        <path
          d="M57.3,68.6a8.1,8.1,0,0,0,11.3,0,8,8,0,0,0,0-11.3L54.5,43.1A8.1,8.1,0,1,0,43.1,54.5Z"
        ></path>
        <path
          d="M44,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H36A8,8,0,0,0,44,128Z"
        ></path>
        <path
          d="M57.3,187.4,43.1,201.5a8.1,8.1,0,0,0,0,11.4,8.5,8.5,0,0,0,5.7,2.3,8.3,8.3,0,0,0,5.7-2.3l14.1-14.2a8,8,0,0,0-11.3-11.3Z"
        ></path>
        <path
          d="M128,212a8,8,0,0,0-8,8v20a8,8,0,0,0,16,0V220A8,8,0,0,0,128,212Z"
        ></path>
        <path
          d="M198.7,187.4a8,8,0,0,0-11.3,11.3l14.1,14.2a8.3,8.3,0,0,0,5.7,2.3,8.5,8.5,0,0,0,5.7-2.3,8.1,8.1,0,0,0,0-11.4Z"
        ></path>
        <path d="M240,120H220a8,8,0,0,0,0,16h20a8,8,0,0,0,0-16Z"></path>
        <path
          d="M193.1,70.9a7.8,7.8,0,0,0,5.6-2.3l14.2-14.1a8.1,8.1,0,0,0-11.4-11.4L187.4,57.3a8,8,0,0,0,0,11.3A7.8,7.8,0,0,0,193.1,70.9Z"
        ></path>
      </svg>

      <!--?xml version="1.0" ?-->
      <svg
        class="moon"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="256" width="256"></rect>
        <path
          d="M224.3,150.3a8.1,8.1,0,0,0-7.8-5.7l-2.2.4A84,84,0,0,1,111,41.6a5.7,5.7,0,0,0,.3-1.8A7.9,7.9,0,0,0,101,31.7,100,100,0,1,0,224.3,154.9,7.2,7.2,0,0,0,224.3,150.3Z"
        ></path>
      </svg>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.switch {
  --size: 1.375rem;
  --gap: (var(--size) * 0.2);
  --color: var(--clr-primary);
  --color-icon: var(--clr-page-bg);

  width: calc(2 * var(--size) + var(--gap));
  border: 1px solid var(--color);
  border-radius: calc(var(--size) * 0.75);
  padding: 0.125rem;
  cursor: pointer;

  &.visible .icon{
    opacity: 1;
  }

  .icon {
    width: var(--size);
    aspect-ratio: 1/1;
    background-color: var(--color);
    border-radius: 100%;
    position: relative;
    left: 0;
    transform: rotate(0);
    opacity: 0;
    transition: all 400ms ease-in-out;
    .sun,
    .moon {
      width: 85%;
      aspect-ratio: 1/1;
      fill: var(--color-icon);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      transition: opacity 400ms ease-in-out;
    }
  }

  &.dark {
    .sun {
      opacity: 0;
    }
  }

  &.light {
    --color-icon: var(--clr-page-bg-inverse);
    .icon {
      transform: rotate(360deg);
      left: calc(var(--size) + var(--gap));
    }
    .moon {
      opacity: 0;
    }
  }
}
</style>
