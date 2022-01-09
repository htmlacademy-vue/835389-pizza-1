export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("Auth/logout");
      await this.$router.push("/login");
    },
  },
};
