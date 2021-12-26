<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.id"
          :input="size"
          @change="changeSize"
          :class-name="`diameter__input diameter__input--${size.value}`"
          :name="'diameter'"
          :checked="size.id === current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      default() {
        return [];
      },
    },
    current: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    changeSize(id) {
      this.$emit("change-size", id);
    },
  },
};
</script>
