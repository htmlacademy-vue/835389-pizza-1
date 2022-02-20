<template>
  <div>
    <CartData data-test="cart-data" v-if="cartItems.length" />
    <CartEmpty data-test="cart-empty" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartData from "../modules/cart/components/CartData";
import CartEmpty from "../modules/cart/components/CartEmpty";

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
