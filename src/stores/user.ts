import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { AccountStatus } from "@/apis/schema";
import { useWhoami } from "@/apis/whoami";
import { checkAuthTokenValid } from "@/utils/checkAuthTokenValid";

export interface UserAuthStore {
  accessToken: string;
  expiredAt: number | null;
}

const genInitUserAuth = (): UserAuthStore => ({
  accessToken: "",
  expiredAt: null,
});
const genInitUserInfo = () => ({
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

  const { query, loading: infoLoading } = useWhoami({
    onResult(params) {
      const { account, accountUid, name, profile, status } = params;
      info.value = { account, accountUid, name, profile, status };
    },
  });

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
    infoLoading,
    infoQuery: query,
    userTokenValid,
    actionLoginSuccess,
    actionLogout,
  };
});
