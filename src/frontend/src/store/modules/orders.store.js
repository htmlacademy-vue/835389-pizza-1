import { DELETE_ENTITY, SET_ENTITY } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [SET_ENTITY](state, { entity, list }) {
      state[entity] = list;
    },
    [DELETE_ENTITY](state, { entity, id }) {
      const index = state[entity].findIndex((item) => {
        return item.id === id;
      });
      state[entity].splice(index, 1);
    },
  },
  actions: {
    async createOrder(context, order) {
      return await this.$api.orders.post(order);
    },
    async deleteOrder({ commit }, id) {
      await this.$api.orders.delete(id);
      commit("DELETE_ENTITY", { entity: "orders", id });
    },
    async getOrders({ commit }) {
      const list = await this.$api.orders.getList();
      commit("SET_ENTITY", { entity: "orders", list });
    },
  },
  getters: {
    formattedOrders(state, getters, rootState) {
      if (state.orders.length > 0) {
        return state.orders.map((order) => {
          order.orderPizzas = order.orderPizzas.map((pizza) => {
            const builderPizza = rootState.Builder.pizza;
            let dough = builderPizza.dough.find((el) => {
              return el.id === pizza.doughId;
            });
            let sizes = builderPizza.sizes.find((el) => {
              return el.id === pizza.sizeId;
            });
            let sauces = builderPizza.sauces.find((el) => {
              return el.id === pizza.sauceId;
            });
            let updateIngredients = pizza.ingredients.map((el) => {
              let ingredient = builderPizza.ingredients.find((ingredient) => {
                return el.ingredientId === ingredient.id;
              });
              return {
                ...el,
                name: ingredient.name,
                price: ingredient.price,
                value: ingredient.value,
              };
            });
            return {
              ...pizza,
              dough,
              sizes,
              sauces,
              ingredients: updateIngredients,
              pricePizza:
                sizes.multiplier *
                (dough.price +
                  sauces.price +
                  updateIngredients.reduce(
                    (sum, item) => sum + item.quantity * item.price,
                    0
                  )),
            };
          });
          if (order.orderMisc && order.orderMisc.length > 0) {
            order.orderMisc = order.orderMisc.map((misc) => {
              let miscCart = rootState.Cart.misc.find((el) => {
                return el.id === misc.miscId;
              });
              return {
                ...misc,
                image: miscCart.image,
                name: miscCart.name,
                price: miscCart.price,
              };
            });
          }
          return order;
        });
      }
    },
  },
};
