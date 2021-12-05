<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count < 1"
      @click="changeCount(count - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="count > 2"
      @click="changeCount(count + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    count: {
      type: Number,
      default() {
        return 0;
      },
    },
    id: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    changeCount(count) {
      if (count > 0) {
        this.$emit("change-count", this.id, count);
      } else {
        this.$emit("change-count", this.id, 0);
      }
    },
  },
};
</script>
