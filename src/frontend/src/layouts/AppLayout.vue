<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <router-view />
  </div>
</template>

<script>
import AppLayoutHeader from "../layouts/AppLayoutHeader";
export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
  },
};
</script>
