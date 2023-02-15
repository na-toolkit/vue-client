import type { UserAuthStore } from "@/stores/user";

export const checkAuthTokenValid = (auth: UserAuthStore) =>
  auth.accessToken && auth.expiredAt && auth.expiredAt > +new Date();
