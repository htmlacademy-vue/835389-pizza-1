import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Orders from "../Orders";
import { generateMockStore } from "../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

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
    list: addresses,
  });
};

const createOrdersList = (store) => {
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
  const router = new VueRouter();

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
    createComponent({ localVue, store, actions, router });
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

  it("Correct count orders rendered", () => {
    let ordersList = wrapper.findAll("[data-test='order-item]'");
    expect(ordersList).toHaveLength(orders.length);
  });
});
