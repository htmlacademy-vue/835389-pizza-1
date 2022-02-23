require("babel-plugin-require-context-hook/register")();
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "../Profile";
import { generateMockStore } from "../../store/mock";

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

describe("Profile", () => {
  let wrapper;
  let store;
  let actions;
  let listeners = { click: null };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const stubs = ["router-link", "router-view"];

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
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sidebar is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find("[data-test='sidebar']")).toBeTruthy();
  });

  it("Correct avatar user rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find("[data-test='avatar']")).toBeTruthy();
    expect(wrapper.find("[data-test='avatar']").attributes("src")).toBe(
      user.avatar
    );
    expect(wrapper.find("[data-test='avatar']").attributes("alt")).toBe(
      user.name
    );
  });

  it("Correct user name rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(
      wrapper.find("[data-test='user-name']").element.textContent.trim()
    ).toBe(user.name.trim());
  });

  it("Correct user phone rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(
      wrapper.find("[data-test='user-phone']").element.textContent.trim()
    ).toBe(user.phone.trim());
  });

  it("rendered form", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.html()).not.toContain("[data-test='form-address']");
  });

  it("rendered form add address", () => {
    createComponent({ localVue, store, mocks, stubs });
    wrapper.find("[data-test='add-address']").trigger("click");
    expect(wrapper.find("[data-test='form-address']")).toBeTruthy();
  });

  it("Correct user addresses rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    const addressesItems = wrapper.findAll("[data-test='user-address']");
    expect(addressesItems).toHaveLength(addresses.length);
  });

  it("Correct user address change", async () => {
    createComponent({ localVue, store, mocks, stubs, listeners });
    await wrapper
      .findAll("[data-test='change-address']")
      .at(0)
      .trigger("click");
    expect(wrapper.find("[data-test='form-address']")).toBeTruthy();
    expect(wrapper.find("[data-test='index-address']").text()).toBe(`Адрес №1`);
    expect(wrapper.find("[name='addr-name']").element.value).toBe(
      addresses[0].name
    );
    expect(wrapper.find("[name='addr-name']").element.value).toBe(
      addresses[0].name
    );
    expect(wrapper.find("[name='addr-street']").element.value).toBe(
      addresses[0].street
    );
    expect(wrapper.find("[name='addr-house']").element.value).toBe(
      addresses[0].building
    );
    expect(wrapper.find("[name='addr-apartment']").element.value).toBe(
      addresses[0].flat
    );
    expect(wrapper.find("[name='addr-comment']").element.value).toBe(
      addresses[0].comment
    );
    await wrapper.find("[data-test='form']").trigger("submit");
    expect(actions.Auth.changeAddress).toHaveBeenCalledWith(
      expect.any(Object),
      addresses[0]
    );
  });

  it("Correct user address delete", async () => {
    createComponent({ localVue, store, mocks, stubs, listeners });
    await wrapper
      .findAll("[data-test='change-address']")
      .at(0)
      .trigger("click");
    await wrapper.find("[data-test='delete-address']").trigger("click");
    expect(actions.Auth.deleteAddress).toHaveBeenCalledWith(
      expect.any(Object),
      addresses[0].id
    );
  });

  it("submit form add address", async () => {
    createComponent({ localVue, store, mocks, stubs, listeners });
    await wrapper.find("[data-test='add-address']").trigger("click");
    await wrapper.find("[name='addr-name']").setValue(addresses[0].name);
    await wrapper.find("[name='addr-street']").setValue(addresses[0].street);
    await wrapper.find("[name='addr-house']").setValue(addresses[0].building);
    await wrapper.find("[name='addr-apartment']").setValue(addresses[0].flat);
    await wrapper.find("[name='addr-comment']").setValue(addresses[0].comment);
    await wrapper.find("[data-test='form']").trigger("submit");
    expect(actions.Auth.addAddress).toHaveBeenCalledWith(expect.any(Object), {
      id: null,
      name: "testName",
      street: "testStreet",
      building: "testBuilding",
      flat: "testFlat",
      comment: "testComment",
    });
  });
});
