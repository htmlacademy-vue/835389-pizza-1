import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "../Cart";
import { generateMockStore } from "../../store/mock";
import pizza from "../../static/pizza.json";
import misc from "../../static/misc.json";
import { normalizePizza } from "../../common/helpers";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const cartItems = [
  {
    name: "любимка",
    qty: 1,
    id: "3",
    price: 455,
    sizes: normalizePizza(pizza.dough[0], PIZZA_DOUGH),
    dough: normalizePizza(pizza.sizes[0], PIZZA_SIZES),
    sauces: normalizePizza(pizza.sauces[0], PIZZA_SAUSES),
    ingredients: pizza.ingredients.slice(0, 3).map((item) => {
      let normalizeIngredient = normalizePizza(
        item,
        PIZZA_INGREDIENTS,
        "ingredients"
      );
      return {
        ...normalizeIngredient,
        count: 1,
      };
    }),
  },
];
const miscItems = misc.slice(0, 1).map((item) => {
  return {
    ...item,
    qty: 1,
  };
});

const createCart = (store) => {
  store.commit("Cart/SET_ENTITY", {
    entity: "cartItems",
    list: cartItems,
  });
  store.commit("Cart/SET_ENTITY", {
    entity: "misc",
    list: miscItems,
  });
  store.commit("Cart/CHANGE_PRICE");
};

describe("Cart", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createCart(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Display empty Cart", () => {
    store.commit("Cart/DELETE_CART");
    expect(wrapper.find("[data-test='cart-empty']")).toBeTruthy();
    expect(wrapper.html()).not.toContain("[data-test='cart-data']");
  });

  it("Display CartData", () => {
    expect(wrapper.find("[data-test='cart-data']")).toBeTruthy();
    expect(wrapper.html()).not.toContain("[data-test='cart-empty']");
  });
});
