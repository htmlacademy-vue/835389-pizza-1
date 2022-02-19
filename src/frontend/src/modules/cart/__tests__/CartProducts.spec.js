import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartProducts from "../components/CartProducts";
import { generateMockStore } from "../../../store/mock";
import { normalizePizza } from "../../../common/helpers";
import pizza from "../../../static/pizza.json";
import {
  PIZZA_DOUGH,
  PIZZA_INGREDIENTS,
  PIZZA_SAUSES,
  PIZZA_SIZES,
} from "../../../common/constants";
import misc from "../../../static/misc.json";

const cartItems = [
  {
    name: "любимка",
    qty: 1,
    id: "3",
    price: 455,
    sizes: normalizePizza(pizza.sizes[0], PIZZA_SIZES),
    dough: normalizePizza(pizza.dough[0], PIZZA_DOUGH),
    sauces: normalizePizza(pizza.sauces[0], PIZZA_SAUSES),
    ingredients: pizza.ingredients.slice(0, 3).map((item) => {
      let normalizeIngredient = normalizePizza(
        item,
        PIZZA_INGREDIENTS,
        "ingredients"
      );
      return {
        ...normalizeIngredient,
        count: 1,
      };
    }),
  },
];
const miscItems = misc.slice(0, 1).map((item) => {
  return {
    ...item,
    qty: 1,
  };
});

const createCart = (store) => {
  store.commit("Cart/SET_ENTITY", {
    entity: "cartItems",
    list: cartItems,
  });
  store.commit("Cart/SET_ENTITY", {
    entity: "misc",
    list: miscItems,
  });
  store.commit("Cart/CHANGE_PRICE");
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartProducts", () => {
  let wrapper;
  let store;
  let actions;
  let listeners = { click: null };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartProducts, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        changeCart: jest.fn(),
      },
      Builder: {
        setPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    listeners.click = jest.fn();
    createCart(store);
    createComponent({ localVue, store, mocks });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Cart items rendered", () => {
    const products = wrapper.findAll("[data-test='cart-item']");
    expect(products).toHaveLength(cartItems.length);
  });

  it("Cart items rendered", () => {
    const products = wrapper.findAll("[data-test='cart-item']");
    expect(products).toHaveLength(cartItems.length);
  });

  it("Correct cart items rendered", () => {
    const products = wrapper.findAll("[data-test='cart-item']");
    cartItems.forEach((item, ind) => {
      expect(
        products.at(ind).find("[data-test='product-img']").attributes("alt")
      ).toBe(item.name);
      expect(products.at(ind).find("[data-test='product-name']").text()).toBe(
        item.name
      );
      expect(products.at(ind).find("[data-test='product-size']").text()).toBe(
        `${item.sizes.name}, ${
          item.dough.value === "large" ? "на толстом тесте" : "на тонком тесте"
        }`
      );
      expect(products.at(ind).find("[data-test='product-sauce']").text()).toBe(
        `Соус: ${item.sauces.name}`
      );
      expect(
        products.at(ind).find("[data-test='product-ingredients']").text()
      ).toBe(
        `Начинка: ${item.ingredients.map((item) => item.name).join(", ")}`
      );
      expect(
        products.at(ind).find("[data-test='product-counter']").element.value
      ).toBe(String(item.qty));
      expect(products.at(ind).find("[data-test='product-price']").text()).toBe(
        `${item.price * item.qty} ₽`
      );
    });
  });

  it("Cart item change quality", () => {
    const products = wrapper.findAll("[data-test='cart-item']");
    cartItems.forEach((item, ind) => {
      const btnPlus = products.at(ind).find("[data-test='button-plus']");
      const btnMinus = products.at(ind).find("[data-test='button-minus']");
      btnPlus.trigger("click");
      expect(actions.Cart.changeCart).toHaveBeenCalledWith(expect.any(Object), {
        ...item,
        qty: item.qty + 1,
      });
      btnMinus.trigger("click");
      expect(actions.Cart.changeCart).toHaveBeenCalledWith(expect.any(Object), {
        ...item,
        qty: item.qty - 1,
      });
    });
  });

  it("Edit pizza", () => {
    const products = wrapper.findAll("[data-test='cart-item']");
    cartItems.forEach((item, ind) => {
      const btnChange = products.at(ind).find("[data-test='edit-product']");
      btnChange.trigger("click");
      expect(actions.Builder.setPizza).toHaveBeenCalledWith(
        expect.any(Object),
        item
      );
      expect(mocks.$router.push).toHaveBeenCalledWith("/");
    });
  });
});
