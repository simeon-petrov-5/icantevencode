<script setup>
const codePerson = `const person = { 
  firstName: "Simeon", 
  lastName: "Petrov" 
}`;

const codeAbout = `const about = {
    profesion: "Developer", 
    whatIDo: "Nobody knows tbh", 
    hobby:"Styling buttons...?"
}`;
</script>

<template>
  <section class="hero">
    <div class="heroContent">
      <h1 data-aos="fade-up" class="title">
        Hello <span data-aos="fade-up" data-aos-delay="200">I'm Simeon</span>
      </h1>

      <div
        id="hero-image"
        class="imgWrapper"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <img class="img" src="@/assets/img/15708352.jpg" alt="Simeon photo" />
      </div>

      <div class="codes">
        <code
          class="code"
          data-aos-anchor="#hero-image"
          data-aos-anchor-placement="top-bottom"
          data-aos="fade-left"
          data-aos-delay="1000"
          >{{ codePerson }}</code
        >
        <code
          class="code"
          data-aos-anchor="#hero-image"
          data-aos-anchor-placement="top-bottom"
          data-aos="fade-left"
          data-aos-delay="1400"
          >{{ codeAbout }}</code
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  overflow: hidden;

  .heroContent {
    width: 100%;
    max-width: 480px;
  }
  .title {
    font-size: 4.5rem;
    line-height: 1.2;
    color: var(--clr-primary-3);
    margin-bottom: 3rem;
  }
  .img {
    width: 100%;
    max-width: 400px;
    border-radius: 1rem;
    margin: 0 auto 3rem;
  }
  .title span {
    display: block;
    color: var(--clr-primary);
    text-align: center;
    font-size: 3rem;
    font-family: "Open Sans";
    font-weight: 300;
    line-height: 1;
  }

  .code {
    width: 100%;
    max-width: 360px;
    display: block;
    padding: 1rem;
    font-size: 15px;
    white-space: pre;
    color: var(--clr-primary);
    background-color: var(--clr-primary-dark-300);
    background-image: linear-gradient(
      to right bottom,
      var(--gray-9),
      var(--dark-6),
      var(--dark-7),
      var(--dark-8),
      var(--dark-9)
    );
    border: 1px solid var(--clr-primary-3);
    border-radius: 0.5rem;
    overflow: hidden;

    &:first-child {
      margin-bottom: 2rem;
    }

    &:last-child {
      margin-left: auto;
    }
  }
}

@media screen and (min-width: 768px) {
  .hero {
    .heroContent {
      max-width: 960px;
      display: grid;
      gap: 1rem;
      grid-template-columns: 45% 1fr;
      grid-template-rows: 160px auto;
      grid-template-areas:
        "img title"
        "img code";
      align-content: center;
    }
    .imgWrapper {
      grid-area: img;
      aspect-ratio: 2 / 3;
      .img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      grid-area: title;
      margin-bottom: 0;
    }
    .codes {
      grid-area: code;
    }
  }
}

@media screen and (min-width: 1080px) {
  .hero .heroContent {
    grid-template-columns: 380px 1fr;
    max-width: 900px;
  }
}
</style>
