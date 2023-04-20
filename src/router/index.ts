export {};

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
  }
}

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LayoutPublic from "@/layouts/LayoutPublic.vue";
import LayoutPrivate from "@/layouts/LayoutPrivate.vue";
import { useUserStore } from "@/stores/user";

type RouterNamed<Key extends string> = {
  [Property in Key as Uncapitalize<Property>]: {
    path: RouteRecordRaw["path"];
    name: Property;
    component: NonNullable<RouteRecordRaw["component"]>;
  };
};
export type AllRouteName = "Home" | "Login" | "Register" | "Dashboard";
const routerNamed: RouterNamed<AllRouteName> = {
  home: {
    path: "",
    name: "Home",
    component: () => import("@/views/PageHome.vue"),
  },
  login: {
    path: "/login",
    name: "Login",
    component: () => import("@/views/PageLogin.vue"),
  },
  register: {
    path: "/register",
    name: "Register",
    component: () => import("@/views/PageRegister.vue"),
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/PageDashboard.vue"),
    // component: () => import("@/views/PageTestVirtual.vue"),
  },
} as const;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: LayoutPublic,
      children: [routerNamed.home, routerNamed.login, routerNamed.register].map(
        ({ path, name, component }) => ({
          path,
          name,
          meta: { public: true },
          component,
        })
      ),
    },
    {
      path: "",
      component: LayoutPrivate,
      children: [routerNamed.dashboard].map(({ path, name, component }) => ({
        path,
        name,
        component,
      })),
    },
  ],
});

router.beforeEach((to) => {
  const { userTokenValid } = useUserStore();
  if (to.meta.public && userTokenValid) {
    return { name: routerNamed.dashboard.name };
  }
  if (!to.meta.public && !userTokenValid) {
    return { name: routerNamed.home.name };
  }
});

export default router;
