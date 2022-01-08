<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="../assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      class="layout__link"
      to="/orders"
      :exact-active-class="'layout__link--active'"
    >
      История заказов
    </router-link>
    <router-link
      class="layout__link"
      to="/profile"
      :exact-active-class="'layout__link--active'"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutSidebar",
};
</script>
