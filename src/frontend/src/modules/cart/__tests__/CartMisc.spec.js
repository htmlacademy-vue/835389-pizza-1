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
    type: "misc",
    property: miscItems,
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
    expect(items.length).toHaveLength(miscItems.length);
  });
});
