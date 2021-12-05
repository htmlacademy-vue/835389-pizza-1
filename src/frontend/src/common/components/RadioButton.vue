<template>
  <label :class="className">
    <input
      type="radio"
      :name="name"
      :value="input.value"
      :checked="checked"
      class="visually-hidden"
    />
    <template v-if="input.description">
      <b>{{ input.name }}</b>
      <span>{{ input.description }}</span>
    </template>
    <span v-else>{{ input.name }}</span>
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
    checked: {
      type: Boolean,
      default() {
        return false;
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
  },
};
</script>
