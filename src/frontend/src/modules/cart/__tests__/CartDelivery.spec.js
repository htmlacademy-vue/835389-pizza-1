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
  let listeners = { input: null, submit: null, change: null };

  const createComponent = (options) => {
    wrapper = mount(CartDelivery, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    listeners.input = jest.fn();
    listeners.submit = jest.fn();
    listeners.change = jest.fn();
    createUser(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Correct options address rendered", () => {
    const select = wrapper.find("[data-test='select-address']");
    const options = select.findAll("option");
    expect(options).toHaveLength(addresses.length + 2);
    for (let i = 2; i < addresses.length; i++) {
      expect(options.at(i).element.value).toBe(
        `address-${addresses[i - 2].id}`
      );
      expect(options.at(i).text()).toBe(addresses[i - 2].name);
    }
  });

  it("Correct emitted address change", () => {
    const select = wrapper.find("[data-test='select-address']");
    select.trigger("change");
    expect(wrapper.emitted("selectAddress")[0][0]).toEqual(
      select.element.value
    );
  });

  it("Correct user phone", () => {
    const phone = wrapper.find("[data-test='phone']");
    phone.trigger("input");
    expect(wrapper.emitted("changePhone")[0][0]).toEqual(phone.element.value);
  });

  it("Correct address form rendered", async () => {
    expect(wrapper.html()).not.toContain("[data-test='form-address']");
    const select = wrapper.find("[data-test='select-address']");
    const street = wrapper.find("[data-test='address-street']");
    const building = wrapper.find("[data-test='address-building']");
    const flat = wrapper.find("[data-test='address-flat']");
    select.setValue("2");
    expect(wrapper.find("[data-test='form-address']")).toBeTruthy();
    select.setValue("3");
    expect(street.attributes("readonly")).toBeTruthy();
    expect(building.attributes("readonly")).toBeTruthy();
    expect(flat.attributes("readonly")).toBeTruthy();
  });

  it("Change street", () => {
    const select = wrapper.find("[data-test='select-address']");
    const street = wrapper.find("[data-test='address-street']");
    select.setValue("2");
    street.setValue("Street");
    street.trigger("input");
    expect(wrapper.emitted("changeAddress")[0][0]).toEqual({
      val: "Street",
      field: "street",
    });
  });

  it("Change house", () => {
    const select = wrapper.find("[data-test='select-address']");
    const building = wrapper.find("[data-test='address-building']");
    select.setValue("2");
    building.setValue("Building");
    building.trigger("input");
    expect(wrapper.emitted("changeAddress")[0][0]).toEqual({
      val: "Building",
      field: "building",
    });
  });

  it("Change flat", () => {
    const select = wrapper.find("[data-test='select-address']");
    const flat = wrapper.find("[data-test='address-flat']");
    select.setValue("2");
    flat.setValue("Flat");
    flat.trigger("input");
    expect(wrapper.emitted("changeAddress")[0][0]).toEqual({
      val: "Flat",
      field: "flat",
    });
  });
});
