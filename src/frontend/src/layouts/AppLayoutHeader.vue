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
      <router-link to="/cart">{{ formattedPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formattedPrice } from "../common/helpers";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", {
      price: "price",
    }),
    ...mapState("Auth", {
      user: "user",
    }),
    formattedPrice() {
      return formattedPrice(this.price);
    },
  },
};
</script>
