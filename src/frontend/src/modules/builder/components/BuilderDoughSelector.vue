<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="item in dough"
          :key="item.id"
          @change="changeDough"
          :class-name="`dough__input dough__input--${item.value}`"
          :name="'dought'"
          :input="item"
          :checked="item.id === current"
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
    current: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    changeDough(item) {
      this.$emit("change-dough", item);
    },
  },
};
</script>
