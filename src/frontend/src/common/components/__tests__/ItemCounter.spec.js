import { shallowMount } from "@vue/test-utils";
import ItemCounter from "../ItemCounter";

// Указываем название блока тестов — соответствует названию компонента.
describe("ItemCounter", () => {
  const propsData = { count: 2, id: 1 };
  const listeners = { click: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is count", async () => {
    createComponent({ propsData });

    expect(wrapper.find("input").element.value).toBe("2");
  });

  it("emit before click on plus", async () => {
    createComponent({ propsData });
    await wrapper.find(".counter__button--plus").trigger("click");

    expect(wrapper.emitted("change-count")[0][0]).toEqual(1);
    expect(wrapper.emitted("change-count")[0][1]).toEqual(3);
  });

  it("emit before click on minus", async () => {
    createComponent({ propsData });
    await wrapper.find(".counter__button--minus").trigger("click");

    expect(wrapper.emitted("change-count")[0][0]).toEqual(1);
    expect(wrapper.emitted("change-count")[0][1]).toEqual(1);
  });

  it("disabled button plus if count === 3", async () => {
    propsData.count = 3;
    createComponent({ propsData });
    expect(
      wrapper.find(".counter__button--plus").attributes("disabled")
    ).toBeTruthy();
  });

  it("disabled button minus if count === 0", async () => {
    propsData.count = 0;
    createComponent({ propsData });
    expect(
      wrapper.find(".counter__button--minus").attributes("disabled")
    ).toBeTruthy();
  });
});
