import misc from "../../static/misc.json";
import { normalizeMisc } from "../../common/helpers";

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
    //изменяет state
    ADD_CART(state, item) {
      let index = state.cartItems.findIndex((el) => el.id === item.id);
      if (index === -1) {
        state.cartItems.push(item);
      } else {
        state.cartItems[index] = item;
      }
      state.cartPrice = state.cartItems.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
    CHANGE_CART(state, item) {
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
    changeMisc(state, item) {
      state.misc = state.misc.map((el) => {
        if (el.id === item.id) {
          el = item;
        }
        return el;
      });
      state.miscPrice = state.misc.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);
    },
  },
  actions: {
    //вызывает мутации
    addCart({ commit }, items) {
      commit("ADD_CART", items);
    },
    changeCart({ commit }, product) {
      commit("CHANGE_CART", product);
    },
    changeMisc({ commit }, item) {
      commit("changeMisc", item);
    },
  },
  getters: {
    price(state) {
      return state.cartPrice + state.miscPrice;
    },
  },
};
