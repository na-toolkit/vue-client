import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { AccountStatus } from "@/apis/schema";
import { checkAuthTokenValid } from "@/utils/checkAuthTokenValid";

type UserInfo = {
  account: string;
  accountUid: string;
  name: string;
  profile: string;
  status: AccountStatus;
};

export interface UserAuthStore {
  accessToken: string;
  expiredAt: number | null;
}

const genInitUserAuth = (): UserAuthStore => ({
  accessToken: "",
  expiredAt: null,
});
const genInitUserInfo = (): UserInfo => ({
  account: "",
  accountUid: "",
  name: "",
  profile: "",
  status: AccountStatus.None,
});

export const useUserStore = defineStore("user", () => {
  const auth = useLocalStorage<UserAuthStore>("auth", genInitUserAuth());
  const info = ref(genInitUserInfo());
  const userTokenValid = computed(() => checkAuthTokenValid(auth.value));

  const actionUpdateInfo = (data: UserInfo) => {
    info.value = data;
  };

  const actionLoginSuccess = async (params: UserAuthStore) => {
    const { accessToken, expiredAt } = params;
    auth.value = { ...auth.value, accessToken, expiredAt };
  };

  const actionLogout = () => {
    auth.value = genInitUserAuth();
    info.value = genInitUserInfo();
  };
  return {
    auth,
    info,
    userTokenValid,
    actionLoginSuccess,
    actionLogout,
    actionUpdateInfo,
  };
});
