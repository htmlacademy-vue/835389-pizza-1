<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ formattedPrice }} ₽ </router-link>
    </div>
    <div v-if="isAuthenticated" class="header__user">
      <router-link to="/profile">
        <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        <span>
          {{ user.name }}
        </span>
      </router-link>
      <a href="#" class="header__logout" @click.prevent="$logout">
        <span>Выйти</span>
      </a>
    </div>
    <div v-else class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formattedPrice } from "../common/helpers";
import logout from "../common/mixins/logout";

export default {
  name: "AppLayoutHeader",

  mixins: [logout],

  computed: {
    ...mapGetters("Cart", {
      price: "price",
    }),

    ...mapState("Auth", {
      isAuthenticated: "isAuthenticated",
      user: "user",
    }),

    formattedPrice() {
      return formattedPrice(this.price);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/logo";
</style>
