<script setup lang="ts">
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";

const router = useRouter();
</script>
<template>
  <div class="h-full w-full flex justify-center items-center">
    <NButton class="w-100px" @click="() => router.push({ name: 'login' })"
      >登入</NButton
    >
  </div>
</template>
