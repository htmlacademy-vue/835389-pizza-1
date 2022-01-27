import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "../Cart";
import {generateMockStore} from "../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);

let cartItems = [{}, {}];

const createCart = (store) => {
  store.commit("SET_ENTITY", { entity: "cartItems", list: cartItems });
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
  });

  it("Display CartData", () => {
    expect(wrapper.find("[data-test='cart-data']")).toBeTruthy();
  });
});
