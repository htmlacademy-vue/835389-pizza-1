import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartData from "../components/CartData";
import { generateMockStore } from "../../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);

import pizza from "../../../static/pizza.json";
import misc from "../../../static/misc.json";
import { normalizePizza } from "../../../common/helpers";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../../common/constants";

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

const user = {
  name: "Вася Пупкин",
  email: "user@example.com",
  password: "user@example.com",
  avatar: "/public/img/users/user.jpg",
  phone: "+777 777 777",
};

const addresses = [
  {
    id: 1,
    name: "testName",
    street: "testStreet",
    building: "testBuilding",
    flat: "testFlat",
    comment: "testComment",
  },
];

const createUser = (store) => {
  store.commit("Auth/SET_ENTITY", {
    entity: "isAuthenticated",
    value: true,
  });
  store.commit("Auth/SET_ENTITY", {
    entity: "user",
    value: user,
  });
  store.commit("Auth/SET_ENTITY", {
    entity: "addresses",
    value: addresses,
  });
};

const createBuilder = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "dough",
    property: pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH)),
  });
  store.commit("Builder/SET_BUILDER", {
    type: "sauces",
    property: pizza.sauces.map((item) => {
      return normalizePizza(item, PIZZA_SAUSES);
    }),
  });
  store.commit("Builder/SET_BUILDER", {
    type: "ingredients",
    property: pizza.ingredients.map((item) => {
      return normalizePizza(item, PIZZA_INGREDIENTS, "ingredients");
    }),
  });
  store.commit("Builder/SET_BUILDER", {
    type: "sizes",
    property: pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES)),
  });
};

describe("CartData", () => {
  let wrapper;
  let store;
  let actions;
  let listeners = { click: null, submit: null };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const stubs = ["router-link", "router-view"];

  const createComponent = (options) => {
    wrapper = mount(CartData, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        getAddresses: jest.fn(),
      },
      Builder: {
        setPizza: jest.fn(),
      },
      Orders: {
        createOrder: jest.fn(),
      },
      Cart: {
        deleteCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    listeners.click = jest.fn();
    listeners.submit = jest.fn();
    createUser(store);
    createCart(store);
    createBuilder(store);
    createComponent({ localVue, store, mocks, stubs });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(actions.Auth.getAddresses).toHaveBeenCalled();
  });

  it("Correct display modal", () => {
    expect(wrapper.html()).not.toContain("[data-test='cart-modal']");
  });

  it("Correct props cart-delivery component", () => {
    const cartDeliveryComponent = wrapper.find("[data-test='cart-delivery']");
    expect(cartDeliveryComponent.props("phone")).toBe(user.phone);
    expect(cartDeliveryComponent.props("address")).toStrictEqual({
      street: "",
      building: "",
      flat: "",
    });
    expect(cartDeliveryComponent.props("delivery")).toBe("1");
  });

  it("Click new pizza", () => {
    const btnEditPizza = wrapper.find("[data-test='edit-pizza']");
    btnEditPizza.trigger("click");
    expect(actions.Builder.setPizza).toBeCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("Submitted order", () => {
    const formOrder = wrapper.find("[data-test='form-order']");
    formOrder.trigger("submit");
    expect(actions.Orders.createOrder).toBeCalled();
    expect(wrapper.find("[data-test='cart-modal']")).toBeTruthy();
  });
});
