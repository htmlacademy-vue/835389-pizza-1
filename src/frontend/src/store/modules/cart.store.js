import { normalizeMisc } from "../../common/helpers";
import {
  ADD_CART,
  CHANGE_CART,
  CHANGE_MISC,
  DELETE_CART,
  SET_ENTITY,
  CHANGE_PRICE,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    cartItems: [],
    cartPrice: 0,
    miscPrice: 0,
    misc: [],
  },
  mutations: {
    [SET_ENTITY](state, { entity, list }) {
      state[entity] = list;
    },
    [CHANGE_PRICE](state) {
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
      state.miscPrice = state.misc.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
    [ADD_CART](state, item) {
      let index = state.cartItems.findIndex((el) => el.id === item.id);
      if (index === -1) {
        state.cartItems.push(item);
      } else {
        state.cartItems.splice(index, 1, item);
      }
    },
    [CHANGE_CART](state, item) {
      if (item.qty > 0) {
        state.cartItems = state.cartItems.map((product) => {
          if (product.id === item.id) {
            return {
              ...item,
            };
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
          return {
            ...el,
            qty: item.action === "decrement" ? item.qty - 1 : item.qty + 1,
          };
        } else {
          return el;
        }
      });
    },
    [DELETE_CART](state) {
      state.cartItems = [];
      state.cartPrice = 0;
      state.misc = state.misc.map((el) => {
        return normalizeMisc(el);
      });
      state.miscPrice = 0;
    },
  },
  actions: {
    async fetchMisc({ commit }) {
      const list = await this.$api.misc.getList();
      commit("SET_ENTITY", { entity: "misc", list });
    },
    addCart({ commit }, items) {
      commit("ADD_CART", items);
      commit("CHANGE_PRICE");
    },
    changeCart({ commit }, product) {
      commit("CHANGE_CART", product);
    },
    changeMisc({ commit }, item) {
      commit("CHANGE_MISC", item);
      commit("CHANGE_PRICE");
    },
    deleteCart({ commit }) {
      commit("DELETE_CART");
    },
    setCart({ commit }, { cartItems, miscItems }) {
      commit("SET_ENTITY", { entity: "cartItems", list: cartItems });
      commit("SET_ENTITY", { entity: "misc", list: miscItems });
      commit("CHANGE_PRICE");
    },
  },
  getters: {
    price(state) {
      return state.cartPrice + state.miscPrice;
    },
  },
};
