import pizza from "../../static/pizza.json";

import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";
import { normalizePizza } from "../../common/helpers";
import { uniqueId } from "lodash";
import {
  SET_PIZZA,
  CHANGE_PIZZA,
  CHANGE_INGREDIENTS,
  CHANGE_PIZZA_NAME,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    pizza: {
      dough: pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH)),
      sizes: pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES)),
      sauces: pizza.sauces.map((item) => normalizePizza(item, PIZZA_SAUSES)),
      ingredients: pizza.ingredients.map((item) =>
        normalizePizza(item, PIZZA_INGREDIENTS, "ingredients")
      ),
    },
    currentPizza: {
      dough: normalizePizza(pizza.dough[0], PIZZA_DOUGH),
      sizes: normalizePizza(pizza.sizes[0], PIZZA_SIZES),
      sauces: normalizePizza(pizza.sauces[0], PIZZA_SAUSES),
      ingredients: [],
      name: "",
      qty: 1,
      id: uniqueId(),
    },
  },
  mutations: {
    [SET_PIZZA](state, product) {
      state.currentPizza = product;
      state.pizza.ingredients = state.pizza.ingredients.map((item) => {
        if (product.ingredients.length > 0) {
          console.log(product.ingredients.length);
          let ingredient = product.ingredients.findIndex(
            (el) => el.id === item.id
          );
          if (ingredient !== -1) {
            return { ...item, count: product.ingredients[ingredient].count };
          } else {
            return item;
          }
        } else {
          return { ...item, count: 0 };
        }
      });
    },
    [CHANGE_INGREDIENTS](state, ingredient) {
      state.pizza.ingredients = state.pizza.ingredients.map((item) => {
        if (item.id === ingredient.id) {
          return { ...item, count: ingredient.count };
        } else {
          return item;
        }
      });
      state.currentPizza.ingredients = state.pizza.ingredients.filter(
        (item) => {
          return item.count && item.count > 0;
        }
      );
    },
    [CHANGE_PIZZA](state, item) {
      state.currentPizza[item.name] = state.pizza[item.name].find(
        (el) => item.id === el.id
      );
    },
    [CHANGE_PIZZA_NAME](state, name) {
      state.currentPizza.name = name;
    },
  },
  actions: {
    setPizza({ commit }, product) {
      commit("SET_PIZZA", product);
    },
    changeIngredients({ commit }, ingredient) {
      commit("CHANGE_INGREDIENTS", ingredient);
    },
    changePizza({ commit }, item) {
      commit("CHANGE_PIZZA", item);
    },
    changePizzaName({ commit }, name) {
      commit("CHANGE_PIZZA_NAME", name);
    },
  },
  getters: {
    pizzaPrice(state) {
      const ingredients_price = state.currentPizza.ingredients
        .filter((item) => item.count && item.count > 0)
        .reduce((sum, item) => {
          return sum + item.count * item.price;
        }, 0);
      const dough_price = state.currentPizza.dough.price;
      const multiplier = state.currentPizza.sizes.multiplier;
      const sauces_price = state.currentPizza.sauces.price;
      return multiplier * (dough_price + sauces_price + ingredients_price);
    },
  },
};
