import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import BuilderSizeSelector from "../components/BuilderSizeSelector";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import { PIZZA_SIZES } from "../../../common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const sizes = pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES));

const createSizes = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "sizes",
    property: sizes,
  });
};

describe("BuilderSizesSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changePizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createSizes(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Correct set checked size", () => {
    store.commit("Builder/CHANGE_PIZZA", { name: "sizes", id: sizes[0].id });
    const sizesComponents = wrapper.findAll("[data-test='size-radio-button']");
    expect(sizesComponents.at(0).props("checked")).toBe(true);
    for (let i = 1; i < sizes.length; i++) {
      expect(sizesComponents.at(i).props("checked")).toBe(false);
    }
  });

  it("Change size", () => {
    const radioButton = wrapper.find("[data-test='size-radio-button']");
    radioButton.vm.$emit("change", sizes[0].id);
    expect(actions.Builder.changePizza).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: sizes[0].id,
        name: "sizes",
      }
    );
  });

  it("Sizes radio-buttons component is renderer", () => {
    const sizesComponents = wrapper.findAll("[data-test='size-radio-button']");
    expect(sizesComponents).toHaveLength(sizes.length);
    sizes.forEach((item, ind) => {
      expect(sizesComponents.at(ind).props("input")).toBe(item);
    });
  });
});
