<script setup>
useHead({
  title: "Success | icantevencode",
  meta: [
    {
      name: `description`,
      content: `Email sent successfully`,
    },
  ],
});
</script>

<template>
  <section class="not-found section">
    <h1 class="title-1">Email sent successfully!</h1>

    <div>
      <img
        src="https://media3.giphy.com/media/xTiQyDyfgHXXLwpoBi/giphy.gif?cid=790b761182220263a659a6ecd1531eaf9aa0acb2d5d0531f&rid=giphy.gif&ct=g"
        width="480"
      />
      <p>
        <a
          href="https://giphy.com/gifs/latelateshow-james-corden-late-show-xTiQyDyfgHXXLwpoBi"
          >via GIPHY</a
        >
      </p>
    </div>

    <p class="text">
      Probably you should go back to
      <router-link to="/">Home</router-link>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .title-1 {
    text-align: center;
  }
  .subTitle {
    margin-left: auto;
    display: block;
    font-size: var(--font-size-fluid-0);
    text-align: right;
    color: var(--clr-primary-3);
    margin-bottom: 3rem;
    font-style: italic;
  }
}
</style>
