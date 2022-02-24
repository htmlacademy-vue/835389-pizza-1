<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form data-test="form-login" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="form.email"
            data-test="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="form.password"
            data-test="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",

  middlewares: [isLoggedIn],

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      if (this.form.email.length && this.form.password.length) {
        await this.$store.dispatch("Auth/login", this.form);
        await this.$router.push("/");
      }
    },
  },
};
</script>
