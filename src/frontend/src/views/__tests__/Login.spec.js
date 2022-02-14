import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "../Login";
import { generateMockStore } from "../../store/mock";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  let wrapper;
  let store;
  let actions;
  const listeners = { submit: null };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const stubs = ["router-link", "router-view"];

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
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Submit form", async () => {
    createComponent({ localVue, store, mocks, listeners, stubs });
    wrapper.vm.form.email = "user@example.com";
    wrapper.vm.form.password = "user@example.com";
    wrapper.find("[data-test='form-login']").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(actions.Auth.login).toHaveBeenCalledWith(expect.any(Object), {
      email: "user@example.com",
      password: "user@example.com",
    });
    await wrapper.vm.$nextTick();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
