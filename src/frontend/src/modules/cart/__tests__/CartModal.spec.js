import { shallowMount } from "@vue/test-utils";
import CartModal from "../components/CartModal";

describe("CartModal", () => {
  let wrapper;
  let listeners = { click: null };

  const createComponent = (options) => {
    wrapper = shallowMount(CartModal, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
    createComponent(listeners);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("emitted before click close", () => {
    wrapper.find("[data-test='btn-close']").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emitted before click button wait", () => {
    wrapper.find("[data-test='btn-wait']").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
