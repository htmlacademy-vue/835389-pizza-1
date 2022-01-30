import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Profile from "../Profile";
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
    list: addresses,
  });
};

describe("Profile", () => {
  let wrapper;
  let store;
  let actions;
  let listeners = { click: null };
  const router = new VueRouter();
  let propsData = {
    isFormAddress: false,
    address: {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  };

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
        getAddresses: jest.fn(),
        addAddress: jest.fn(),
        changeAddress: jest.fn(),
        deleteAddress: jest.fn(),
      },
      Orders: {
        getOrders: jest.fn(),
        deleteOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    listeners.click = jest.fn();
    createUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store, router, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sidebar is rendered", () => {
    createComponent({ localVue, store, router, propsData });
    expect(wrapper.find("[data-test='sidebar']")).toBeTruthy();
  });

  it("Correct avatar user rendered", () => {
    createComponent({ localVue, store, router, propsData });
    expect(wrapper.find("[data-test='avatar']")).toBeTruthy();
    expect(wrapper.find("[data-test='avatar']").attributes("src")).toBe(
      user.avatar
    );
    expect(wrapper.find("[data-test='avatar']").attributes("alt")).toBe(
      user.name
    );
  });

  it("Correct user name rendered", () => {
    createComponent({ localVue, store, router, propsData });
    expect(
      wrapper.find("[data-test='user-name']").element.textContent.trim()
    ).toBe(user.name.trim());
  });

  it("Correct user phone rendered", () => {
    createComponent({ localVue, store, router, propsData });
    expect(
      wrapper.find("[data-test='user-phone']").element.textContent.trim()
    ).toBe(user.phone.trim());
  });

  it("rendered form", () => {
    createComponent({ localVue, store, router, propsData });
    expect(wrapper.html()).not.toContain("[data-test='form-address']");
  });

  it("rendered form add address", () => {
    propsData.isFormAddress = true;
    createComponent({ localVue, store, router, propsData });
    expect(wrapper.find("[data-test='form-address']")).toBeTruthy();
  });

  it("submit form add address", async () => {
    propsData.isFormAddress = true;
    propsData.address = {
      id: null,
      name: "test",
      street: "street",
      building: "building",
      flat: "flat",
      comment: "comment",
    };
    createComponent({ localVue, store, router, propsData, listeners });
    wrapper.find("[data-test='submit-address']").trigger("click");
    await wrapper.vm.$nextTick();
    expect(actions.Auth.addAddress).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.address
    );
  });

  it("Correct user addresses rendered", () => {
    const addressesItems = wrapper.findAll("[data-test='user-address']");
    expect(addressesItems).toHaveLength(addresses.length);
  });
});
