import { uniqueId } from "lodash";
import {
  SET_PIZZA,
  CHANGE_PIZZA,
  CHANGE_INGREDIENTS,
  CHANGE_PIZZA_NAME,
  SET_BUILDER,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    pizza: {
      dough: [],
      sizes: [],
      sauces: [],
      ingredients: [],
    },
    currentPizza: {
      dough: {},
      sizes: {},
      sauces: {},
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
    [SET_BUILDER](state, data) {
      state.pizza[data.type] = data.property;
      if (data.type !== "ingredients") {
        state.currentPizza[data.type] = data.property[0];
      }
    },
  },
  actions: {
    async getDough({ commit }) {
      const list = await this.$api.dough.getList();
      commit("SET_BUILDER", { type: "dough", property: list });
    },
    async getSizes({ commit }) {
      const list = await this.$api.sizes.getList();
      commit("SET_BUILDER", { type: "sizes", property: list });
    },
    async getIngredients({ commit }) {
      const list = await this.$api.ingredients.getList();
      commit("SET_BUILDER", { type: "ingredients", property: list });
    },
    async getSauces({ commit }) {
      const list = await this.$api.sauces.getList();
      commit("SET_BUILDER", { type: "sauces", property: list });
    },
    async init({ dispatch }) {
      dispatch("getDough");
      dispatch("getSizes");
      dispatch("getIngredients");
      dispatch("getSauces");
    },
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
