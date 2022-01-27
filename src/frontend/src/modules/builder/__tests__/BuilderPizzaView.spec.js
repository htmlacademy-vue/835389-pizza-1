import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import BuilderPizzaView from "../components/BuilderPizzaView";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
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

const currentPizza = {
  dough: dough[0],
  sizes: sizes[0],
  sauces: sauces[0],
  ingredients: [],
  name: "",
  qty: 1,
  id: uniqueId(),
};

const createPizza = (store) => {
  store.commit("Builder/SET_PIZZA", currentPizza);
};

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;
  let actions;
  let getters;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changeIngredients: jest.fn(),
        changePizzaName: jest.fn(),
        setPizza: jest.fn(),
      },
      Cart: {
        addCart: jest.fn(),
      },
    };
    getters = {
      Builder: {
        pizzaPrice: 350,
      },
    };
    store = generateMockStore(actions, getters);
    createPizza(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("change name before input", () => {
    wrapper.find("[data-test='input-pizza-name']").trigger("input");
    expect(actions.Builder.changePizzaName).toHaveBeenCalledWith(
      expect.any(Object),
      currentPizza.name
    );
  });

  it("Correct Pizza Class", () => {
    expect(wrapper.find("[data-test='pizza']").attributes("class")).toBe(
      `pizza pizza--foundation--${
        currentPizza.dough.value === "light" ? "small" : "big"
      }-${currentPizza.sauces.value}`
    );
  });

  it("Disabled button default", () => {
    expect(
      wrapper.find("[data-test='button']").attributes("disabled")
    ).toBeTruthy();
  });

  it("Disabled button", async () => {
    let newPizza = {
      ...currentPizza,
      ingredients: [{ ...ingredients[0], count: 1 }],
      name: "Name",
    };
    await store.commit("Builder/SET_PIZZA", newPizza);
    expect(
      wrapper.find("[data-test='button']").attributes("disabled")
    ).toBeFalsy();
  });

  it("Correct display price", () => {
    expect(wrapper.find("[data-test='price']").element.textContent).toBe(
      String(getters.Builder.pizzaPrice)
    );
  });

  it("Correct display ingredients", async () => {
    let newPizza = {
      ...currentPizza,
      ingredients: [
        { ...ingredients[0], count: 1 },
        { ...ingredients[1], count: 2 },
        { ...ingredients[2], count: 3 },
      ],
    };
    await store.commit("Builder/SET_PIZZA", newPizza);
    const blockIngredients = wrapper.findAll("[data-test='pizza-ingredient']");
    expect(blockIngredients).toHaveLength(currentPizza.ingredients.length);
  });
});
