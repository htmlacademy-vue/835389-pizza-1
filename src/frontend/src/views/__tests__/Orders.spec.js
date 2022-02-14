import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "../Orders";
import { generateMockStore } from "../../store/mock";
import pizza from "../../static/pizza.json";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";
import {normalizePizza} from "../../common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const user = {
  name: "Вася Пупкин",
  email: "user@example.com",
  password: "user@example.com",
  avatar: "/public/img/users/user.jpg",
  phone: "+777 777 777",
};

let addresses = [
  {
    id: 1,
    name: "testName",
    street: "testStreet",
    building: "testBuilding",
    flat: "testFlat",
    comment: "testComment",
  },
];

let orders = [
  {
    id: 3,
    phone: "+777 777 777",
    userId: 1,
    addressId: 1,
    orderPizzas: [
      {
        id: 3,
        name: "любимка",
        quantity: 1,
        sauceId: 2,
        sauces: {
          id: 2,
          name: "Томатный",
          price: 50,
          value: "tomato",
        },
        doughId: 2,
        dough: {
          id: 2,
          name: "Тонкое",
          image: "/public/img/dough-light.svg",
          description: "Из твердых сортов пшеницы",
          price: 300,
          value: "light",
        },
        sizeId: 2,
        orderId: 3,
        ingredients: [
          {
            id: 12,
            quantity: 3,
            pizzaId: 3,
            ingredientId: 2,
            name: "Чеддер",
            price: 42,
            value: "cheddar",
          },
          {
            id: 13,
            quantity: 1,
            pizzaId: 3,
            ingredientId: 3,
            name: "Томаты",
            price: 35,
            value: "tomatoes",
          },
        ],
      },
    ],
    orderAddress: {
      id: 1,
      name: "test",
      street: "street",
      building: "building",
      flat: "flat",
      comment: null,
      userId: 1,
    },
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

const createOrdersList = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "dough",
    property: pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH))
  });
  store.commit("Builder/SET_BUILDER", {
    type: "sauces",
    property: pizza.sauces.map((item) => {
      return normalizePizza(item, PIZZA_SAUSES);
    })
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
  store.commit("Orders/SET_ENTITY", {
    entity: "orders",
    list: orders,
  });
};

describe("Orders", () => {
  let wrapper;
  let store;
  let actions;
  const listeners = { click: null };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const stubs = ["router-link", "router-view"];

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
        getAddresses: jest.fn(),
      },
      Orders: {
        getOrders: jest.fn(),
        deleteOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    listeners.submit = jest.fn();
    createUser(store);
    createOrdersList(store);
    createComponent({ localVue, actions, store, mocks, stubs });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sidebar is rendered", () => {
    expect(wrapper.find("[data-test='sidebar']")).toBeTruthy();
  });

  it("Correct orders rendered", () => {
    let ordersList = wrapper.findAll("[data-test='order-item']");
    expect(ordersList).toHaveLength(orders.length);
  });

  it("Correct order number rendered", () => {
    orders.forEach((order, ind) => {
      expect(wrapper.findAll("[data-test='order-id']").at(ind).text()).toBe(
        `Заказ #${orders[ind].id}`
      );
    });
  });

  it("Correct order pizza items rendered", () => {
    orders.forEach((order, ind) => {
      expect(
        wrapper
          .findAll("[data-test='order-item']")
          .at(ind)
          .findAll("[data-test='order-pizza-item']")
      ).toHaveLength(orders[ind].orderPizzas.length);
    });
  });
});
