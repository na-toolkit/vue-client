<script setup lang="ts">
import { watch } from "vue";
import LayoutFooter from "./LayoutFooter.vue";
import { useUserStore } from "@/stores/user";
import { checkAuthTokenValid } from "@/utils/checkAuthTokenValid";

const userStore = useUserStore();
if (checkAuthTokenValid(userStore.auth)) userStore.infoQuery();
watch(
  () => userStore.auth,
  (v) => {
    if (checkAuthTokenValid(v)) userStore.infoQuery();
  },
  { flush: "post" }
);
</script>
<template>
  <article class="text-white-primary text-4">
    <RouterView></RouterView>
  </article>
  <LayoutFooter></LayoutFooter>
</template>
