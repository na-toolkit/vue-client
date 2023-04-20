<script setup lang="ts">
import { watch } from "vue";
import LayoutHeader from "./LayoutHeader.vue";
import { useUserStore } from "@/stores/user";
import { checkAuthTokenValid } from "@/utils/checkAuthTokenValid";
import { useWhoami } from "@/apis/whoami";
import { Plus } from "@vicons/tabler";
import { NIcon } from "naive-ui";
import { useSentenceStore } from "@/stores/sentence";

const sentenceStore = useSentenceStore();

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
    class="grid grid-rows-[60px_minmax(0,1fr)] h-full w-full text-white-primary"
  >
    <div
      class="fixed bottom-20px right-20px h-44px w-44px flex cursor-pointer items-center justify-center border border-gray-dark-1 rounded-full border-style-solid text-2xl xl:(left-1064px top-76px)"
      @click="sentenceStore.openCreateModal"
    >
      <NIcon><Plus></Plus></NIcon>
    </div>
    <LayoutHeader></LayoutHeader>
    <article class="h-full text-4 text-white-primary">
      <RouterView></RouterView>
    </article>
  </article>
</template>
