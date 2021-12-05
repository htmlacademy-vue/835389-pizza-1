<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="(item, i) in dough"
          :key="item.id"
          :class-name="`dough__input dough__input--${item.value}`"
          :name="'dought'"
          :checked="i === 0"
          :input="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    dough: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
