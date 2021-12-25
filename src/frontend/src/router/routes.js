const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
];

export default routes;
