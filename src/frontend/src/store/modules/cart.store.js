import misc from "../../static/misc.json";
import { normalizeMisc } from "../../common/helpers";
import {
  ADD_CART,
  CHANGE_CART,
  CHANGE_MISC,
  DELETE_CART,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    cartItems: [],
    cartPrice: 0,
    miscPrice: 0,
    misc: misc.map((el) => {
      return normalizeMisc(el);
    }),
  },
  mutations: {
    [ADD_CART](state, item) {
      let index = state.cartItems.findIndex((el) => el.id === item.id);
      if (index === -1) {
        state.cartItems.push(item);
      } else {
        state.cartItems[index] = item;
      }
      state.cartItems.forEach((item) => {
        const ingredients_price = item.ingredients
          .filter((item) => item.count && item.count > 0)
          .reduce((sum, item) => {
            return sum + item.count * item.price;
          }, 0);
        const dough_price = item.dough.price;
        const multiplier = item.sizes.multiplier;
        const sauces_price = item.sauces.price;
        item.price =
          multiplier * (dough_price + sauces_price + ingredients_price);
      });
      state.cartPrice = state.cartItems.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
    [CHANGE_CART](state, item) {
      if (item.qty > 0) {
        state.cartItems.forEach((product) => {
          if (product.id === item.id) {
            product = item;
          }
          return product;
        });
      } else {
        let index = state.cartItems.findIndex((product) => {
          product.id = item.id;
        });
        state.cartItems.splice(index, 1);
      }
      state.cartPrice = state.cartItems.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
    [CHANGE_MISC](state, item) {
      state.misc = state.misc.map((el) => {
        if (el.id === item.id) {
          return { ...el, qty: item.qty };
        } else {
          return el;
        }
      });
      state.miscPrice = state.misc.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
    [DELETE_CART](state) {
      state.cartItems = [];
      state.cartPrice = 0;
      state.misc = misc.map((el) => {
        return normalizeMisc(el);
      });
      state.miscPrice = 0;
    },
  },
  actions: {
    addCart({ commit }, items) {
      commit("ADD_CART", items);
    },
    changeCart({ commit }, product) {
      commit("CHANGE_CART", product);
    },
    changeMisc({ commit }, item) {
      commit("CHANGE_MISC", item);
    },
    deleteCart({ commit }) {
      commit("DELETE_CART");
    },
  },
  getters: {
    price(state) {
      return state.cartPrice + state.miscPrice;
    },
  },
};
