<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        @input="changeName($event.target.value)"
        :value="currentPizza.name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div
      class="content__constructor"
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="pizza" :class="pizzaClass">
        <div class="pizza__wrapper">
          <transition-group
            name="zoom"
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <template v-for="ingredient in currentPizza.ingredients">
              <div
                :key="`view-ingredient-${ingredient.id}`"
                class="pizza__filling"
                :class="[
                  `pizza__filling--${ingredient.value}`,
                  ingredient.count === 2 ? 'pizza__filling--second' : '',
                  ingredient.count === 3 ? 'pizza__filling--third' : '',
                ]"
              ></div>
            </template>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ formattedPrice }} ₽</p>
      <button
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
