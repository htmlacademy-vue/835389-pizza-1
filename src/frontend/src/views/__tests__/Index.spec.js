import { shallowMount } from "@vue/test-utils";
import Index from "../Index";

describe("Index", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("rendered BuilderDoughSelector", () => {
    expect(wrapper.find("[data-test='builder-dough']")).toBeTruthy();
  });

  it("rendered BuilderSizeSelector", () => {
    expect(wrapper.find("[data-test='builder-size']")).toBeTruthy();
  });

  it("rendered BuilderIngredientsSelector", () => {
    expect(wrapper.find("[data-test='builder-ingredients']")).toBeTruthy();
  });

  it("rendered BuilderPizzaView", () => {
    expect(wrapper.find("[data-test='builder-view']")).toBeTruthy();
  });
});
