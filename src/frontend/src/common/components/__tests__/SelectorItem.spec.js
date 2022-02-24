import { shallowMount } from "@vue/test-utils";
import SelectorItem from "../SelectorItem";

describe("SelectorItem", () => {
  // Определяем входные параметры по умолчанию и заглушки.

  const propsData = {
    item: {
      count: 0,
      id: 1,
      image: "/public/img/filling/mushrooms.svg",
      name: "Грибы",
      price: 33,
      value: "mushrooms",
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("span class", async () => {
    createComponent({ propsData });
    expect(wrapper.find("span").attributes("class")).toContain(
      `filling--${propsData.item.value}`
    );
  });

  it("text content is props item.name", async () => {
    createComponent({ propsData });
    expect(wrapper.find("span").text()).toBe(propsData.item.name.trim());
  });
});
