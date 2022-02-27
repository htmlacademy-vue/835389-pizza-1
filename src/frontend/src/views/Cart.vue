<template>
  <div>
    <CartData
      v-if="cartItems.length"
      data-test="cart-data"
    />
    <CartEmpty
      v-else
      data-test="cart-empty"
    />
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
