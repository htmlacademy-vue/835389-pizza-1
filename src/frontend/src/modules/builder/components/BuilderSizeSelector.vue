<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="(size, i) in sizes"
          :key="size.id"
          :input="size"
          :checked="i === 0"
          :class-name="`diameter__input diameter__input--${size.value}`"
          :name="'diameter'"
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
  },
};
</script>
