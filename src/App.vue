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
    class="w-full h-full"
  >
    <NMessageProvider>
      <article class="w-full h-full grid grid-rows-layouts text-white-primary">
        <RouterView></RouterView>
      </article>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
