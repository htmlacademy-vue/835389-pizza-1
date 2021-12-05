<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector :dough="dough" />
        <BuilderSizeSelector :sizes="sizes" />
        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
        />
        <BuilderPizzaView @change-ingredient="changeIngredients" />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import user from "../static/user.json";
import misc from "../static/misc.json";
import { PIZZA_DOUGH } from "../common/constants";
import { PIZZA_INGREDIENTS } from "../common/constants";
import { PIZZA_SAUSES } from "../common/constants";
import { PIZZA_SIZES } from "../common/constants";
import { normalizePizza } from "../common/helpers";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
export default {
  name: "Index",
  data() {
    return {
      pizza: pizza,
      user: user,
      misc: misc,
    };
  },
  computed: {
    dough() {
      return this.pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH));
    },
    ingredients() {
      return this.pizza.ingredients.map((item) =>
        normalizePizza(item, PIZZA_INGREDIENTS)
      );
    },
    sauces() {
      return this.pizza.sauces.map((item) =>
        normalizePizza(item, PIZZA_SAUSES)
      );
    },
    sizes() {
      return this.pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES));
    },
  },
  methods: {
    changeIngredients(id, count) {
      this.pizza.ingredients = this.pizza.ingredients.map((item) => {
        if (item.id === id) {
          item.count = count;
        }
        return item;
      });
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
