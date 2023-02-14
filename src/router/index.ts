import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "../layouts/LayoutDefault.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: LayoutDefault,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/PageHome.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/PageLogin.vue"),
        },
      ],
    },
  ],
});

export default router;
