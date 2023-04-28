<script setup lang="ts">
import { computed, reactive } from "vue";

interface Fields {
  name: string;
  email: string;
  message: string;
}

const formData: Fields = reactive({
  name: "",
  email: "",
  message: "",
});

const touched = reactive({
  name: false,
  email: false,
  message: false,
});

const validateEmail = (email: string): boolean => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) as any;
};

const errorValidation = (field: keyof Fields) => {
  let validEmail = false;
  if (field === "email") {
    validEmail = validateEmail(field) || false;
  }
  return touched[field] && formData[field].length === 0 && !validEmail;
};

const nameError = computed(() => errorValidation("name"));
const emailError = computed(() => errorValidation("email"));
const messageError = computed(() => errorValidation("message"));

const onSubmit = () => {
  touched.name = true;
  touched.email = true;
  touched.message = true;

  if (!nameError.value && !emailError.value && !messageError.value) {
    (
      document.querySelector("#section-contacts .form") as HTMLFormElement
    ).submit();
  }
};
</script>

<template>
  <section id="section-contacts" class="ds__section--sm contacts">
    <h2 id="contacts-title" class="ds__title--xl" data-aos="fade-up">
      Contacts
    </h2>
    <div style="overflow: hidden">
      <p class="ds__text socials" data-aos="fade-left" data-aos-delay="300">
        Find me on
        <a
          href="https://www.youtube.com/channel/UCPG8KezVTaixto9CgtyB5dg"
          target="__blank"
        >
          YouTube
        </a>
        <a href="https://www.twitch.tv/icantevencode" target="__blank">
          Twitch
        </a>
        <a href="https://www.linkedin.com/in/simeonpetrov5/" target="__blank">
          LinkedIn
        </a>
      </p>
    </div>

    <form
      class="form"
      name="ask-question"
      method="post"
      netlify-honeypot="honey-field"
      data-netlify="true"
      action="/submission-success"
      data-aos="fade-up"
      data-aos-delay="600"
      data-aos-offset="0"
      @submit.prevent="onSubmit"
    >
      <input type="hidden" name="form-name" value="ask-question" />

      <div class="name">
        <input
          id="name"
          type="text"
          v-model="formData.name"
          name="name"
          :class="{ filled: formData.name, error: nameError }"
          @blur="touched.name = true"
        />
        <label for="name">Your Name</label>
        <transition>
          <span v-if="nameError" class="error">Tell me your name!</span>
        </transition>

        <p
          style="
            visibility: hidden;
            height: 0px;
            width: 0px;
            overflow: hidden;
            padding: 0;
          "
        >
          <label>
            Don't fill this out if you're human: <input name="honey-field" />
          </label>
        </p>
      </div>

      <div class="email">
        <input
          id="email"
          type="email"
          name="email"
          v-model="formData.email"
          :class="{ filled: formData.email, error: emailError }"
          @blur="touched.email = true"
        />
        <label for="email">Your Email</label>
        <transition>
          <span v-if="emailError" class="error">Give me a valid email!</span>
        </transition>
      </div>

      <div class="message">
        <textarea
          id="message"
          rows="10"
          :class="{ filled: formData.message, error: messageError }"
          v-model="formData.message"
          name="message"
          @blur="touched.message = true"
        ></textarea>
        <label for="message">Your Message</label>
        <transition>
          <span v-if="messageError" class="error">
            Hey, write me something!
          </span>
        </transition>
      </div>

      <button type="submit" class="btn">Send</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.contacts {
  position: relative;
  .ds__title--xl,
  .ds__text {
    text-align: right;
  }

  .socials {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .form {
    --input-container-pt: 17px;
    --input-py: 0.5rem;

    max-width: 720px;
    margin-inline: auto;

    div {
      position: relative;
      padding-top: var(--input-container-pt);

      label {
        position: absolute;
        top: calc(var(--input-container-pt) + var(--input-py));
        left: 1rem;
        color: var(--clr-label);
        background-color: var(--clr-page);
        transition: all 300ms ease-in;
      }

      input,
      textarea {
        width: 100%;
        background-color: transparent;
        border: 2px solid var(--clr-primary-d2);
        padding: var(--input-py) 1rem;
        color: var(--clr-text);
        border-radius: 0.325rem;
        outline: none;
        transition: border-color 300ms ease-in-out;

        &.error {
          border-color: var(--clr-danger);
        }

        &:focus + label,
        &.filled + label {
          top: 0px;
          padding-inline: 0.5rem;
          left: 0.5rem;
        }
      }

      .error {
        color: var(--clr-danger);
      }
    }

    .btn {
      width: 100%;
      margin-top: var(--input-container-pt);
      border: 2px solid var(--clr-primary-d2);
      color: var(--clr-primary-d2);
      text-align: center;
      border-radius: 0.325rem;
      padding: 0.5rem 0.25rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

      &:hover {
        background-color: var(--clr-primary-d2);
        color: var(--dark-9);
      }
    }

    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(12, minmax(50px, 1fr));
      gap: 1rem;

      .name {
        grid-column: auto / span 5;
      }
      .email {
        grid-column: auto / span 7;
      }
      .message {
        grid-column: auto / span 12;
      }
      .btn {
        grid-column: auto / span 4;
      }
    }
  }
}
</style>
