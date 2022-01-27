<template>
  <ul class="cart-list sheet">
    <li v-for="product in cartItems" :key="product.id" class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="../../../assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="product.name"
        />
        <div class="product__text">
          <h2>{{ product.name }}</h2>
          <ul>
            <li>
              {{ product.sizes.name }},
              {{ productDough(product.dough.value) }}
            </li>
            <li>Соус: {{ product.sauces.name }}</li>
            <li>Начинка: {{ productIngredients(product.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="decrement(product)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="product.qty"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="increment(product)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ formattedPrice(product.price * product.qty) }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changePizza(product)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { formattedPrice } from "../../../common/helpers";

export default {
  name: "CartProducts",
  computed: {
    ...mapState("Cart", {
      cartItems: "cartItems",
    }),
  },
  methods: {
    productDough(value) {
      return value === "large" ? "на толстом тесте" : "на тонком тесте";
    },
    productIngredients(items) {
      let ingredients = items.map((item) => item.name);
      return ingredients.join(", ");
    },
    formattedPrice(price) {
      return formattedPrice(price);
    },
    increment(product) {
      this.$store.dispatch("Cart/changeCart", {
        ...product,
        qty: product.qty + 1,
      });
    },
    decrement(product) {
      this.$store.dispatch("Cart/changeCart", {
        ...product,
        qty: product.qty - 1,
      });
    },
    changePizza(product) {
      this.$store.dispatch("Builder/setPizza", product);
      this.$router.push("/");
    },
  },
};
</script>
