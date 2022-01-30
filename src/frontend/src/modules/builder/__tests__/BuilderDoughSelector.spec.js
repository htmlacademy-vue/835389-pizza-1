import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import BuilderDoughSelector from "../components/BuilderDoughSelector";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import { PIZZA_DOUGH } from "../../../common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH));

const createDough = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "dough",
    property: dough,
  });
};

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changePizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createDough(store);
    createComponent({ localVue, store, actions });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Correct set checked dough", () => {
    store.commit("Builder/CHANGE_PIZZA", { name: "dough", id: dough[0].id });
    const doughComponents = wrapper.findAll("[data-test='dough-radio-button']");
    expect(doughComponents.at(0).props("checked")).toBe(true);
    for (let i = 1; i < dough.length; i++) {
      expect(doughComponents.at(i).props("checked")).toBe(false);
    }
  });

  it("Change dough", () => {
    const radioButton = wrapper.find("[data-test='dough-radio-button']");
    radioButton.vm.$emit("change", dough[0].id);
    expect(actions.Builder.changePizza).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: dough[0].id,
        name: "dough",
      }
    );
  });

  it("Dough radio-buttons component is renderer", () => {
    const doughComponents = wrapper.findAll(
      "[data-test='dough-radio-button']"
    );
    expect(doughComponents).toHaveLength(dough.length);
    dough.forEach((item, ind) => {
      expect(doughComponents.at(ind).props("input")).toBe(item);
    });
  });
});
