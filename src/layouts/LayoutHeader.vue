<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Logout } from "@vicons/tabler";
import { NButton, NIcon } from "naive-ui";

const userStore = useUserStore();
const router = useRouter();
const name = computed(() => userStore.info.name);

const logout = () => {
  userStore.actionLogout();
  router.push({ name: "login" });
};
</script>
<template>
  <header
    class="h-60px shrink-0 border-0 border-b-1 border-style-solid border-gray-dark-3 flex items-center p-x-5"
  >
    <div class="grow-1"></div>
    <div class="mr-2">{{ name }}</div>
    <NButton text @click="logout">
      <template #icon>
        <NIcon><Logout></Logout></NIcon>
      </template>
    </NButton>
  </header>
</template>
