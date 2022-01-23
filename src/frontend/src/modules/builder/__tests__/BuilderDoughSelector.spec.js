import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import { CHANGE_PIZZA } from "../../../store/mutation-types";
import BuilderDoughSelector from "../components/BuilderDoughSelector";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import { PIZZA_DOUGH } from "../../../common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH));

const createDough = (store) => {
  store.commit(CHANGE_PIZZA, {
    module: "Builder",
    name: "dough",
    id: dough[0].id,
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
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createDough(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Change dough", async () => {
    createDough(store);
    createComponent({ localVue, store });
    const radioButton = wrapper.find("[data-test='dough-radio-button']");
    await radioButton.vm.$emit("change", { name: "dough", id: dough[0].id });
    expect(actions.Builder.changePizza).toHaveBeenCalledWith(
      expect.any(Object),
      dough[0].id
    );
  });
});
