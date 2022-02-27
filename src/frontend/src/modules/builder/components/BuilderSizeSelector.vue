<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите размер
      </h2>
      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in pizza.sizes"
          :key="`size-${size.id}`"
          :input="size"
          :class-name="`diameter__input diameter__input--${size.value}`"
          :name="'diameter'"
          :checked="size.id === currentPizza.sizes.id"
          data-test="size-radio-button"
          @change="changeSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },

  computed: {
    ...mapState("Builder", {
      pizza: "pizza",
      currentPizza: "currentPizza",
    }),
  },

  methods: {
    changeSize(id) {
      this.$store.dispatch("Builder/changePizza", { name: "sizes", id });
    },
  },
};
</script>
