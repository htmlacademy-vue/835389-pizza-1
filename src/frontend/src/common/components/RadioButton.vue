<template>
  <label :class="className">
    <input
      type="radio"
      :name="name"
      :value="input.value"
      :checked="checked"
      @change="$emit('change', input.id)"
      class="visually-hidden"
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
