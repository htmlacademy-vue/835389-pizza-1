const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayout" },
  },
];

export default routes;
