<script setup lang="ts">
import { RouterView } from "vue-router";
import {
  NConfigProvider,
  NMessageProvider,
  darkTheme,
  type GlobalThemeOverrides,
} from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {};
</script>

<template>
  <NConfigProvider
    :theme="darkTheme"
    :theme-overrides="themeOverrides"
    class="h-full w-full"
  >
    <NMessageProvider>
      <RouterView></RouterView>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
