<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
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
          <template v-for="ingredient in ingredients">
            <div
              v-if="ingredient.count > 0"
              :key="ingredient.id"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient.value}`,
                ingredient.count === 2 ? 'pizza__filling--second' : '',
                ingredient.count === 3 ? 'pizza__filling--third' : '',
              ]"
            ></div>
          </template>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ formattedPrice }} ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "../../../common/constants";
import { formattedPrice } from "../../../common/helpers";

export default {
  name: "BuilderPizzaView",
  props: {
    price: {
      type: Number,
      default() {
        return 0;
      },
    },
    currentPizza: {
      type: Object,
      default() {
        return {};
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    pizzaClass() {
      return `pizza--foundation--${
        this.currentPizza.dough.value === "light" ? "small" : "big"
      }-${this.currentPizza.sauce.value}`;
    },
    formattedPrice() {
      return formattedPrice(this.price);
    },
  },
  methods: {
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
      this.$emit("change-ingredient", id, count);
    },
  },
};
</script>
