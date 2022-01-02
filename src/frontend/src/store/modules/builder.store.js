import pizza from "../../static/pizza.json";
import misc from "../../static/misc.json";

import { CHANGE_INGREDIENTS, UPDATE_PIZZA } from "../mutation-types";

import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";
import { normalizePizza } from "../../common/helpers";

export default {
  namespaced: true,
  state: {
    pizza: {
      dough: pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH)),
      sizes: pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES)),
      sauces: pizza.sauces.map((item) => normalizePizza(item, PIZZA_SAUSES)),
      ingredients: pizza.ingredients.map((item) =>
        normalizePizza(item, PIZZA_INGREDIENTS)
      ),
    },
    misc: misc,
    currentPizza: {
      dough: {},
      size: {},
      sauce: {},
      ingredients: [],
    },
  },
  mutations: {
    [CHANGE_INGREDIENTS](state, id, count) {
      state.currentPizza.ingredients = state.pizza.ingredients.map((item) => {
        if (item.id === id) {
          item.count = count;
        }
        return item;
      });
    },
    [UPDATE_PIZZA](state, type, id) {
      state.currentPizza[type] = state.pizza[type].find((item) => item.id === id);
    },
  },
  actions: {},
  getters: {},
};
