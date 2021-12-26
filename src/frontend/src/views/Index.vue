<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="dough"
          :current="currentPizza.dough.id"
          @change-dough="changeDough"
        />
        <BuilderSizeSelector
          :sizes="sizes"
          :current="currentPizza.size.id"
          @change-size="changeSize"
        />
        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          :current="currentPizza.sauce.id"
          @change-sauce="changeSauce"
          @change-ingredient="changeIngredients"
        />
        <BuilderPizzaView
          :price="price"
          :current-pizza="currentPizza"
          :ingredients="ingredients"
          @change-ingredient="changeIngredients"
        />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import user from "../static/user.json";
import misc from "../static/misc.json";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../common/constants";
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
      currentPizza: {
        dough: {},
        size: {},
        sauce: {},
      },
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
    priceIngredients() {
      const ingredients_price = this.ingredients
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
  methods: {
    changeIngredients(id, count) {
      this.pizza.ingredients = this.pizza.ingredients.map((item) => {
        if (item.id === id) {
          item.count = count;
        }
        return item;
      });
    },
    changeDough(id) {
      this.currentPizza.dough = this.dough.find((item) => item.id === id);
    },
    changeSize(id) {
      this.currentPizza.size = this.sizes.find((item) => item.id === id);
    },
    changeSauce(id) {
      this.currentPizza.sauce = this.sauces.find((item) => item.id === id);
    },
  },
  created() {
    this.currentPizza.dough = this.dough[0];
    this.currentPizza.size = this.sizes[0];
    this.currentPizza.sauce = this.sauces[0];
  },
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
};
</script>
