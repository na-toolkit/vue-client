<script setup lang="ts">
import { computed } from "vue";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();

const userStore = useUserStore();
const logout = () => {
  userStore.actionLogout();
  router.push({ name: "login" });
};
const auth = computed(() =>
  (Object.keys(userStore.auth) as Array<keyof typeof userStore.auth>)
    .map((i) => `${i}: ${userStore.auth[i]}`)
    .join("\n")
);
const info = computed(() =>
  (Object.keys(userStore.info) as Array<keyof typeof userStore.info>)
    .map((i) => `${i}: ${userStore.info[i]}`)
    .join("\n")
);
</script>
<template>
  <div>Dashboard</div>
  <p>驗證信息</p>
  <pre>{{ auth }}</pre>
  <p>用戶信息</p>
  <p v-if="userStore.infoLoading">獲取中...</p>
  <pre v-else>{{ info }}</pre>
  <NButton @click="logout">清除登入信息</NButton>
  <NButton @click="userStore.infoQuery">重新獲取用戶信息</NButton>
</template>
