<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
