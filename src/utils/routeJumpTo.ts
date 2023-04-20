import type { AllRouteName } from "@/router";
import type { Router } from "vue-router";

export const routeNameJumpTo = (router: Router) => (name: AllRouteName) =>
  router.push({ name });
