import { createRouter, createWebHistory } from "vue-router";
import LayoutLogin from "../layouts/LayoutLogin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/PageHome.vue"),
    },
    {
      path: "/login",
      name: "loginRoot",
      component: LayoutLogin,
      children: [
        {
          path: "",
          name: "login",
          component: () => import("../views/PageLogin.vue"),
        },
      ],
    },
  ],
});

export default router;
