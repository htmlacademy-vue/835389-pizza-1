import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Login from "../Login";
import { generateMockStore } from "../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Login", () => {
  let wrapper;
  let store;
  let actions;
  const listeners = { submit: null }
  const router = new VueRouter();
  const propsData = {
    form: {
      email: "test@mail.ru",
      password: "1111",
    },
  };

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    listeners.submit = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store, propsData, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Submit form", async () => {
    createComponent({ localVue, store, propsData, router, listeners });
    await wrapper.find("[data-test='form-login']").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(actions.Auth.login).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.form
    );
    expect(router.push("/")).toHaveBeenCalled();
  });
});
