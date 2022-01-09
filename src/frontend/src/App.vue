<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";
export default {
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("Builder/init");
    this.$store.dispatch("Cart/fetchMisc");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
