<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Logout } from "@vicons/tabler";
import { NButton, NIcon } from "naive-ui";
import { routeNameJumpTo } from "@/utils/routeJumpTo";
import { useInfoStore } from "@/stores/info";

const userStore = useUserStore();
const router = useRouter();
const jumpTo = routeNameJumpTo(router);
const name = computed(() => userStore.info.name);

const logout = () => {
  userStore.actionLogout();
  jumpTo("Login");
};

const infoStore = useInfoStore();
</script>
<template>
  <header
    class="h-60px flex shrink-0 items-center border-0 border-b-1 border-gray-dark-3 border-style-solid p-x-5"
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
