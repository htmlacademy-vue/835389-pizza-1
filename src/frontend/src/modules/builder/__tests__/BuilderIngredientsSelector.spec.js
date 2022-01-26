import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "../../../store/mock";
import BuilderIngredientsSelector from "../components/BuilderIngredientsSelector";
import pizza from "../../../static/pizza.json";
import { normalizePizza } from "../../../common/helpers";
import { PIZZA_INGREDIENTS, PIZZA_SAUSES } from "../../../common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const ingredients = pizza.ingredients.map((item) => {
  return normalizePizza(item, PIZZA_INGREDIENTS, "ingredients");
});

const sauces = pizza.sauces.map((item) => {
  return normalizePizza(item, PIZZA_SAUSES);
});

const createIngredients = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "ingredients",
    property: ingredients,
  });
};

const createSauces = (store) => {
  store.commit("Builder/SET_BUILDER", {
    type: "sauces",
    property: sauces,
  });
};

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changePizza: jest.fn(),
        changeIngredients: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createIngredients(store);
    createSauces(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sauce component is renderer", () => {
    const saucesComponents = wrapper.findAll(
      "[data-test='sauce-radio-button']"
    );
    expect(saucesComponents).toHaveLength(sauces.length);
    sauces.forEach((item, ind) => {
      expect(saucesComponents.at(ind).props("input")).toBe(item);
    });
  });

  it("Correct set checked sauce", () => {
    store.commit("Builder/CHANGE_PIZZA", { name: "sauces", id: sauces[0].id });
    const saucesComponents = wrapper.findAll(
      "[data-test='sauce-radio-button']"
    );
    expect(saucesComponents.at(0).props("checked")).toBe(true);
    for (let i = 1; i < sauces.length; i++) {
      expect(saucesComponents.at(i).props("checked")).toBe(false);
    }
  });

  it("Ingredients component is renderer", () => {
    const ingredientsComponents = wrapper.findAll(
      "[data-test='selector-item']"
    );
    expect(ingredientsComponents).toHaveLength(ingredients.length);
    ingredients.forEach((item, ind) => {
      expect(ingredientsComponents.at(ind).props("item")).toBe(item);
    });
  });

  it("Ingredients counter component is renderer", () => {
    const CounterComponents = wrapper.findAll("[data-test='item-counter']");
    expect(CounterComponents).toHaveLength(ingredients.length);
    ingredients.forEach((item, ind) => {
      expect(CounterComponents.at(ind).props("count")).toBe(item.count);
      expect(CounterComponents.at(ind).props("id")).toBe(item.id);
    });
  });

  it("Change sauce", () => {
    const sauceRadioButton = wrapper.find("[data-test='sauce-radio-button']");
    sauceRadioButton.vm.$emit("change", sauces[0].id);
    expect(actions.Builder.changePizza).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: sauces[0].id,
        name: "sauces",
      }
    );
  });

  it("Correct set count ingredient", async () => {
    store.commit("Builder/CHANGE_INGREDIENTS", {
      id: ingredients[0].id,
      count: 2,
    });
    await wrapper.vm.$nextTick();
    const itemCounterComponents = wrapper.findAll("[data-test='item-counter']");
    expect(itemCounterComponents.at(0).props("count")).toBe(2);
    for (let i = 1; i < ingredients.length; i++) {
      expect(itemCounterComponents.at(i).props("count")).toBe(0);
    }
  });

  it("Change ingredients", () => {
    const itemCounters = wrapper.find("[data-test='item-counter']");
    itemCounters.vm.$emit("change-count", ingredients[0].id, 1);
    expect(actions.Builder.changeIngredients).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: ingredients[0].id,
        count: 1,
      }
    );
  });
});
