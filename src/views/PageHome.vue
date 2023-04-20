<script setup lang="ts">
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";
import { routeNameJumpTo } from "@/utils/routeJumpTo";

const router = useRouter();
const jumpTo = routeNameJumpTo(router);
</script>
<template>
  <div class="h-full w-full flex items-center justify-center">
    <NButton class="w-100px" @click="() => jumpTo('Login')">登入</NButton>
  </div>
</template>
