import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";
import store from "../store";
import { middlewarePipeline } from "../middlewares";

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});

export default router;
