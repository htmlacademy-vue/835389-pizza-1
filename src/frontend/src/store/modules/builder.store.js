import pizza from "../../static/pizza.json";

import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";
import { normalizePizza } from "../../common/helpers";
import { uniqueId } from "lodash";

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
    currentPizza: {
      dough: normalizePizza(pizza.dough[0], PIZZA_DOUGH),
      size: normalizePizza(pizza.sizes[0], PIZZA_SIZES),
      sauce: normalizePizza(pizza.sauces[0], PIZZA_SAUSES),
      ingredients: [],
      name: "",
      qty: 1,
      price: 0,
      id: uniqueId(),
    },
  },
  mutations: {
    setPizza(state, product) {
      state.currentPizza = product;
      state.pizza.ingredients.map((item) => {
        if (product.ingredients.length) {
          let ingredient = product.ingredients.findIndex(
            (el) => el.id === item.id
          );
          if (ingredient !== -1) {
            item.count = product.ingredients[ingredient].count;
          } else {
            item.count = 0;
          }
        } else {
          item.count = 0;
        }
        return item;
      });
    },
    changeIngredients(state, ingredient) {
      state.pizza.ingredients = state.pizza.ingredients.map((item) => {
        if (item.id === ingredient.id) {
          item.count = ingredient.count;
        }
        return item;
      });
      state.currentPizza.ingredients = state.pizza.ingredients.filter(
        (item) => {
          return item.count && item.count > 0;
        }
      );
    },
    changeDough(state, id) {
      state.currentPizza.dough = state.pizza.dough.find(
        (item) => item.id === id
      );
    },
    changeSize(state, id) {
      state.currentPizza.size = state.pizza.sizes.find(
        (item) => item.id === id
      );
    },
    changeSauce(state, id) {
      state.currentPizza.sauce = state.pizza.sauces.find(
        (item) => item.id === id
      );
    },
  },
  actions: {
    setPizza({ commit }, product) {
      commit("setPizza", product);
    },
    changeIngredients({ commit }, ingredient) {
      commit("changeIngredients", ingredient);
    },
    changeDough({ commit }, id) {
      commit("changeDough", id);
    },
    changeSize({ commit }, id) {
      commit("changeSize", id);
    },
    changeSauce({ commit }, id) {
      commit("changeSauce", id);
    },
  },
  getters: {},
};
