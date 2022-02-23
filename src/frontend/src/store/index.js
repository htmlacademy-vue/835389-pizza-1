import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import VuexPlugins from "../plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [VuexPlugins],
  modules,
});
