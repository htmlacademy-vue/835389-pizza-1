import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth.store";
import Builder from "./modules/builder.store";
import Cart from "./modules/cart.store";
import Orders from "./modules/orders.store";
import VuexPlugins from "../plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [VuexPlugins],
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
