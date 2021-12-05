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
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: 0 ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "../../../common/constants";
export default {
  name: "BuilderPizzaView",
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
