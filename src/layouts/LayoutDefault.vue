<script setup lang="ts">
import { watch } from "vue";
import LayoutHeader from "./LayoutHeader.vue";
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
  <LayoutHeader v-if="userStore.userTokenValid"></LayoutHeader>
  <header v-else></header>
  <article class="text-white-primary text-4 overflow-y-scroll">
    <RouterView></RouterView>
  </article>
  <LayoutFooter></LayoutFooter>
</template>
