<template>
  <label :class="className">
    <input
      type="radio"
      :name="name"
      :value="input.value"
      :checked="checked"
      class="visually-hidden"
      @change="$emit('change', input.id)"
    />
    <template v-if="input.description">
      <b data-test="name">{{ input.name }}</b>
      <span data-test="description">{{ input.description }}</span>
    </template>
    <span v-else data-test="name">{{ input.name }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    input: {
      type: Object,
      default() {
        return {};
      },
    },

    className: {
      type: String,
      default() {
        return "";
      },
    },

    name: {
      type: String,
      default() {
        return "";
      },
    },

    checked: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/radio";
@import "~@/assets/scss/blocks/counter";
@import "~@/assets/scss/blocks/dough";
@import "~@/assets/scss/blocks/diameter";
</style>
