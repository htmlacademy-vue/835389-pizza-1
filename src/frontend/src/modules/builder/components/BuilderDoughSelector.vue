<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <RadioButton
          v-for="item in pizza.dough"
          :key="`dough-${item.id}`"
          @change="changeDough"
          :class-name="`dough__input dough__input--${item.value}`"
          name="dought"
          :input="item"
          :checked="item.id === currentPizza.dough.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderDoughSelector",
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
    changeDough(id) {
      this.$store.dispatch("Builder/changePizza", { name: "dough", id });
    },
  },
};
</script>
