import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartDelivery from "../components/CartDelivery";
import { generateMockStore } from "../../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("CartData", () => {
  let wrapper;
  let store;
  let listeners = { click: null };

  const createComponent = (options) => {
    wrapper = mount(CartDelivery, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    listeners.click = jest.fn();
    createUser(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
