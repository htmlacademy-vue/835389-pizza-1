import { SET_ENTITY, ADD_ENTITY, DELETE_ENTITY } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
    addresses: [],
  },
  actions: {
    async login({ dispatch }, form) {
      const data = await this.$api.auth.login(form);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit("SET_ENTITY", { entity: "isAuthenticated", value: false });
      commit("SET_ENTITY", { entity: "user", value: null });
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("SET_ENTITY", { entity: "isAuthenticated", value: true });
        commit("SET_ENTITY", { entity: "user", value: data });
      } catch {
        dispatch("logout", false);
      }
    },

    async getAddresses({ commit, state }) {
      if (!state.user) {
        return;
      }
      const list = await this.$api.addresses.getList();
      commit("SET_ENTITY", { entity: "addresses", value: list });
    },

    async addAddress({ state, commit }, address) {
      const item = await this.$api.addresses.post({
        ...address,
        userId: state.user.id,
      });
      commit("ADD_ENTITY", { entity: "addresses", value: item });
    },

    async changeAddress({ state }, address) {
      await this.$api.addresses.put({
        ...address,
        userId: state.user.id,
      });
    },

    async deleteAddress({ commit }, id) {
      await this.$api.addresses.delete(id);
      commit("DELETE_ENTITY", { entity: "addresses", id });
    },
  },
  mutations: {
    [SET_ENTITY](state, { entity, value }) {
      state[entity] = value;
    },
    [ADD_ENTITY](state, { entity, value }) {
      state[entity] = [...state[entity], value];
    },
    [DELETE_ENTITY](state, { entity, id }) {
      const index = state[entity].findIndex((item) => {
        return item.id === id;
      });
      state[entity].splice(index, 1);
    },
  },
  getters: {},
};
