export {};

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
  }
}

import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { useUserStore } from "@/stores/user";

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
          meta: { public: true },
          component: () => import("@/views/PageHome.vue"),
        },
        {
          path: "login",
          name: "login",
          meta: { public: true },
          component: () => import("@/views/PageLogin.vue"),
        },
        {
          path: "register",
          name: "register",
          meta: { public: true },
          component: () => import("@/views/PageRegister.vue"),
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/PageDashboard.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const { userTokenValid } = useUserStore();
  if (to.meta.public && userTokenValid) return { name: "dashboard" };
  if (!to.meta.public && !userTokenValid) return { name: "home" };
});

export default router;
