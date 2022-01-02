import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth.store";
import Builder from "./modules/builder.store";
import Cart from "./modules/cart.store";
import Orders from "./modules/orders.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
