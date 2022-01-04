<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="pizza.dough"
          :current="currentPizza.dough.id"
          @change-dough="changeDough"
        />
        <BuilderSizeSelector
          :sizes="pizza.sizes"
          :current="currentPizza.size.id"
          @change-size="changeSize"
        />
        <BuilderIngredientsSelector
          :sauces="pizza.sauces"
          :ingredients="pizza.ingredients"
          :current="currentPizza.sauce.id"
          @change-sauce="changeSauce"
          @change-ingredient="changeIngredients"
        />
        <BuilderPizzaView
          :current-pizza="currentPizza"
          :ingredients="pizza.ingredients"
          @change-ingredient="changeIngredients"
        />
      </div>
    </form>
  </main>
</template>

<script>
import { mapState } from "vuex";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",
  computed: {
    ...mapState("Builder", {
      pizza: "pizza",
      currentPizza: "currentPizza",
    }),
    priceIngredients() {
      const ingredients_price = this.currentPizza.ingredients
        .filter((item) => item.count && item.count > 0)
        .reduce((sum, item) => {
          return sum + item.count * item.price;
        }, 0);
      return ingredients_price;
    },
    price() {
      const dough_price = this.currentPizza.dough.price;
      const multiplier = this.currentPizza.size.multiplier;
      const sauces_price = this.currentPizza.sauce.price;
      return multiplier * (dough_price + sauces_price + this.priceIngredients);
    },
  },
  watch: {
    price() {
      let product = this.currentPizza;
      product.price = this.price;
      this.$store.dispatch("Builder/setPizza", product);
    },
  },
  methods: {
    changeIngredients(id, count) {
      this.$store.dispatch("Builder/changeIngredients", { id, count });
    },
    changeDough(id) {
      this.$store.dispatch("Builder/changeDough", id);
    },
    changeSize(id) {
      this.$store.dispatch("Builder/changeSize", id);
    },
    changeSauce(id) {
      this.$store.dispatch("Builder/changeSauce", id);
    },
  },
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
};
</script>
