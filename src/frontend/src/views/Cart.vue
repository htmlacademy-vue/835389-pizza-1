<template>
  <div>
    <CartData v-if="cartItems.length" />
    <CartEmpty v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartData from "../modules/cart/CartData";
import CartEmpty from "../modules/cart/CartEmpty";

export default {
  name: "Cart",
  components: { CartEmpty, CartData },
  computed: {
    ...mapState("Cart", {
      cartItems: "cartItems",
    }),
  },
};
</script>
