<script setup lang="ts">
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";

const router = useRouter();
</script>
<template>
  <div>Home(還未登入)</div>
  <NButton @click="() => router.push({ name: 'login' })">登入</NButton>
</template>
