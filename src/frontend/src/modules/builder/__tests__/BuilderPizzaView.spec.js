import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import BuilderPizzaView from "../components/BuilderPizzaView";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import {
  PIZZA_DOUGH, PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../../common/constants";
import { uniqueId } from "lodash";

const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH));
const sizes = pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES));
const sauces = pizza.sauces.map((item) => {
  return normalizePizza(item, PIZZA_SAUSES);
});
const ingredients = pizza.ingredients.map((item) => {
  return normalizePizza(item, PIZZA_INGREDIENTS, "ingredients");
});

const createPizza = (store) => {
  store.commit("Builder/SET_PIZZA", {
    dough: dough[0],
    sizes: sizes[0],
    sauces: sauces[0],
    ingredients: [],
    name: "",
    qty: 1,
    id: uniqueId(),
  });
};

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changeIngredients: jest.fn(),
        changePizzaName: jest.fn(),
      },
      Cart: {
        addCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createPizza(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
