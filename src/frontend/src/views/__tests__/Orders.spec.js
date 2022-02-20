import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "../Orders";
import { generateMockStore } from "../../store/mock";
import pizza from "../../static/pizza.json";
import misc from "../../static/misc.json";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../common/constants";
import { normalizePizza } from "../../common/helpers";

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
        pricePizza: 900,
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
        sizes: {
          id: 2,
          name: "32 см",
          image: "/public/img/diameter.svg",
          multiplier: 2,
        },
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
    orderMisc: [
      {
        miscId: 1,
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quality: 1,
      },
    ],
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
  store.commit("Orders/SET_ENTITY", {
    entity: "orders",
    list: orders,
  });
  store.commit("Cart/SET_ENTITY", {
    entity: "misc",
    list: misc.slice(0, 1).map((item) => {
      return {
        ...item,
        qty: 1,
      };
    }),
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
      Cart: {
        setCart: jest.fn(),
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

  it("Correct order pizza item rendered", () => {
    orders.forEach((order, ind) => {
      const items = wrapper
        .findAll("[data-test='order-item']")
        .at(ind)
        .findAll("[data-test='order-pizza-item']");
      for (let i = 0; i < items.length; i++) {
        expect(
          items.at(i).find("[data-test='product-img']").attributes("alt")
        ).toBe(order.orderPizzas[i].name);
        expect(items.at(i).find("[data-test='product-name']").text()).toBe(
          order.orderPizzas[i].name
        );
        expect(items.at(i).find("[data-test='product-size']").text()).toBe(
          order.orderPizzas[i].sizes.name
        );
        expect(items.at(i).find("[data-test='product-dough']").text()).toBe(
          order.orderPizzas[i].dough.value === "large"
            ? "на толстом тесте"
            : "на тонком тесте"
        );
        expect(items.at(i).find("[data-test='product-sauce']").text()).toBe(
          `Соус: ${order.orderPizzas[i].sauces.name}`
        );
        expect(
          items.at(i).find("[data-test='product-ingredients']").text()
        ).toBe(
          `Начинка: ${order.orderPizzas[i].ingredients
            .map((item) => item.name)
            .join(", ")}`
        );
        expect(items.at(i).find("[data-test='product-price']").text()).toBe(
          order.orderPizzas[i].quantity > 1
            ? `${order.orderPizzas[i].quantity} х ${order.orderPizzas[i].pricePizza} ₽`
            : `${order.orderPizzas[i].pricePizza} ₽`
        );
      }
    });
  });

  it("Correct order misc items rendered", () => {
    orders.forEach((order, ind) => {
      expect(
        wrapper
          .findAll("[data-test='order-item']")
          .at(ind)
          .findAll("[data-test='misc-item']")
      ).toHaveLength(orders[ind].orderMisc.length);
    });
  });

  it("Correct order misc item rendered", () => {
    orders.forEach((order, ind) => {
      const items = wrapper
        .findAll("[data-test='order-item']")
        .at(ind)
        .findAll("[data-test='misc-item']");
      for (let i = 0; i < items.length; i++) {
        expect(
          items.at(i).find("[data-test='misc-img']").attributes("src")
        ).toBe(order.orderMisc[i].image);
        expect(
          items.at(i).find("[data-test='misc-img']").attributes("alt")
        ).toBe(order.orderMisc[i].name);
        expect(items.at(i).find("[data-test='misc-name']").text()).toBe(
          order.orderMisc[i].name
        );
        expect(items.at(i).find("[data-test='misc-price']").text()).toBe(
          order.orderMisc[i].quantity > 1
            ? `${order.orderMisc[i].quantity} х ${order.orderMisc[i].price} ₽`
            : `${order.orderMisc[i].price} ₽`
        );
      }
    });
  });

  it("Correct order address rendered", () => {
    orders.forEach((order, ind) => {
      expect(
        wrapper
          .findAll("[data-test='order-item']")
          .at(ind)
          .find("[data-test='order-address']")
          .text()
      ).toBe(
        `Адрес доставки: ${
          addresses.find((address) => address.id === order.addressId).name
        }`
      );
    });
  });

  it("Correct delete order", () => {
    orders.forEach((order, ind) => {
      wrapper
        .findAll("[data-test='order-item']")
        .at(ind)
        .find("[data-test='delete-order']")
        .trigger("click");
      expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
        expect.any(Object),
        order.id
      );
    });
  });

  it("Correct repeat order", () => {
    orders.forEach((order, ind) => {
      wrapper
        .findAll("[data-test='order-item']")
        .at(ind)
        .find("[data-test='repeat-order']")
        .trigger("click");
      expect(actions.Cart.setCart).toHaveBeenCalled();
      expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
    });
  });
});
