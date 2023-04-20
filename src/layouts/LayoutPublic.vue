<script setup lang="ts">
import { watch } from "vue";
import LayoutFooter from "./LayoutFooter.vue";
import { useUserStore } from "@/stores/user";
import { checkAuthTokenValid } from "@/utils/checkAuthTokenValid";
import { useWhoami } from "@/apis/whoami";

const userStore = useUserStore();

const { query } = useWhoami({
  onResult(params) {
    const { account, accountUid, name, profile, status } = params;
    userStore.actionUpdateInfo({ account, accountUid, name, profile, status });
  },
});

if (checkAuthTokenValid(userStore.auth)) query();
watch(
  () => userStore.auth,
  (v) => {
    if (checkAuthTokenValid(v)) query();
  },
  { flush: "post" }
);
</script>
<template>
  <article
    class="grid grid-rows-[minmax(0,1fr)_20px] h-full w-full text-white-primary"
  >
    <article class="overflow-y-scroll text-4 text-white-primary">
      <RouterView></RouterView>
    </article>
    <LayoutFooter></LayoutFooter>
  </article>
</template>
