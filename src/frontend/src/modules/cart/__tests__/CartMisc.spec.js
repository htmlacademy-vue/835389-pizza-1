import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import CartMisc from "../components/CartMisc";
import misc from "../../../static/misc.json";
import { normalizeMisc } from "../../../common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

let miscItems = misc.map((item) => normalizeMisc(item));

const createMisc = (store) => {
  store.commit("Cart/SET_ENTITY", {
    entity: "misc",
    list: miscItems,
  });
};

const changeMisc = (store) => {
  store.commit("Cart/CHANGE_MISC", {
    id: 1,
    name: "Cola-Cola 0,5 литра",
    image: "/public/img/cola.svg",
    price: 56,
    qty: 3,
  });
};

describe("CartMisc", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartMisc, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        changeMisc: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createMisc(store);
    createComponent({ localVue, store, actions });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Misc items rendered", () => {
    const items = wrapper.findAll("[data-test='misc-item']");
    expect(items).toHaveLength(miscItems.length);
  });

  it("Misc item rendered", () => {
    const items = wrapper.findAll("[data-test='misc-item']");
    miscItems.forEach((misc, ind) => {
      expect(
        items.at(ind).find("[data-test='misc-image']").attributes("src")
      ).toBe(misc.image);
      expect(
        items.at(ind).find("[data-test='misc-image']").attributes("alt")
      ).toBe(misc.name);
      expect(items.at(ind).find("[data-test='misc-name']").text()).toBe(
        misc.name
      );
      expect(
        items.at(ind).find("[data-test='misc-counter']").element.value
      ).toBe(String(misc.qty));
      expect(items.at(ind).find("[data-test='misc-price']").text()).toBe(
        `× ${misc.price} ₽`
      );
    });
  });

  it("Misc item change quality", () => {
    createMisc(store);
    changeMisc(store);
    createComponent({ localVue, store, actions });
    const items = wrapper.findAll("[data-test='misc-item']");
    const btnMinus = items.at(0).find("[data-test='misc-button-minus']");
    expect(btnMinus.attributes("disabled")).toBeFalsy();
    btnMinus.trigger("click");
    expect(actions.Cart.changeMisc).toHaveBeenCalledWith(expect.any(Object), {
      id: miscItems[0].id,
      action: "decrement",
    });
    for (let i = 1; i < miscItems.length; i++) {
      const btnPlus = items.at(i).find("[data-test='misc-button-plus']");
      const btnMinus = items.at(i).find("[data-test='misc-button-minus']");
      expect(btnMinus.attributes("disabled")).toBeTruthy();
      btnPlus.trigger("click");
      expect(actions.Cart.changeMisc).toHaveBeenCalledWith(expect.any(Object), {
        id: miscItems[i].id,
        action: "increment",
      });
    }
  });
});
