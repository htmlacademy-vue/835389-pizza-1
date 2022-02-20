import { shallowMount } from "@vue/test-utils";
import RadioButton from "../RadioButton";

describe("RadioButton", () => {
  const propsData = {
    input: {
      id: 1,
      name: "Тонкое",
      description: "Из твердых сортов пшеницы",
      value: "light",
    },
    className: "dough__input dough__input--light",
    name: "dought",
    checked: true,
  };
  const listeners = { change: null };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("raises the change event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("input").trigger("change");
    expect(listeners.change).toHaveBeenCalled();
  });

  it("emit before click", async () => {
    createComponent({ propsData });
    await wrapper.find("input").trigger("change");
    expect(wrapper.emitted("change")[0][0]).toBe(propsData.input.id);
  });

  it("label class is className", async () => {
    createComponent({ propsData });
    expect(wrapper.find("label").attributes("class")).toBe(propsData.className);
  });

  it("input name is props name", async () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("input value is props input.value", async () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("value")).toBe(
      propsData.input.value
    );
  });

  it("input checked is props input.checked === true", async () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.checked).toBeTruthy();
  });

  it("input checked is props input.checked === false", async () => {
    propsData.input.checked = false;
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("checked")).toBeFalsy();
  });

  it("name is props input.name", async () => {
    createComponent({ propsData });
    expect(wrapper.find("[data-test='name']").element.textContent).toBe(
      propsData.input.name
    );
  });

  it("description is props input.description", async () => {
    createComponent({ propsData });
    expect(wrapper.find("[data-test='description']").element.textContent).toBe(
      propsData.input.description
    );
  });

  it("renders description", async () => {
    delete propsData.input.description;
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain("[data-test='description']");
  });
});
