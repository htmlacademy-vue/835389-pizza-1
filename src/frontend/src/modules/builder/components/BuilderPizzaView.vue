<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        :value="currentPizza.name"
        placeholder="Введите название пиццы"
        data-test="input-pizza-name"
        @input="changeName($event.target.value)"
      >
    </label>

    <div
      class="content__constructor"
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="pizza"
        :class="pizzaClass"
        data-test="pizza"
      >
        <div class="pizza__wrapper">
          <transition-group
            name="zoom"
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <template
              v-for="ingredient in currentPizza.ingredients"
              data-test="pizza-ingredient"
            >
              <div
                :key="`view-ingredient-${ingredient.id}`"
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.value}`"
              />
              <div
                v-if="ingredient.count > 1"
                :key="`view-ingredient-second-${ingredient.id}`"
                class="pizza__filling pizza__filling--second"
                :class="`pizza__filling--${ingredient.value}`"
              />
              <div
                v-if="ingredient.count > 2"
                :key="`view-ingredient-third-${ingredient.id}`"
                class="pizza__filling pizza__filling--third"
                :class="`pizza__filling--${ingredient.value}`"
              />
            </template>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>
        Итого:
        <span data-test="price">
          {{ formattedPrice }}
        </span>
        ₽
      </p>
      <button
        data-test="button"
        type="button"
        class="button"
        :disabled="isDisabled"
        @click="setCart"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { DATA_TRANSFER_PAYLOAD } from "../../../common/constants";
import { formattedPrice } from "../../../common/helpers";

export default {
  name: "BuilderPizzaView",

  computed: {
    ...mapGetters("Builder", {
      pizzaPrice: "pizzaPrice",
    }),

    ...mapState("Builder", {
      currentPizza: "currentPizza",
    }),

    formattedPrice() {
      return formattedPrice(this.pizzaPrice);
    },

    isDisabled() {
      return (
        !this.currentPizza.name.length || !this.currentPizza.ingredients.length
      );
    },

    pizzaClass() {
      return `pizza--foundation--${
        this.currentPizza.dough.value === "light" ? "small" : "big"
      }-${this.currentPizza.sauces.value}`;
    },
  },

  methods: {
    setCart() {
      this.$store.dispatch("Cart/addCart", this.currentPizza);
      this.$router.push("/cart");
    },

    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );
        this.addIngredient(transferData);
      }
    },

    addIngredient(ingredient) {
      const count = ingredient.count ? ingredient.count + 1 : 1;
      this.setIngredient(ingredient.id, count);
    },

    setIngredient(id, count) {
      this.$store.dispatch("Builder/changeIngredients", { id, count });
    },

    changeName(name) {
      this.$store.dispatch("Builder/changePizzaName", name);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/pizza";
</style>
