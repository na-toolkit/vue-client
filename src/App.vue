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
      <article
        class="w-full h-full text-white-primary grid grid-rows-[60px_minmax(0,1fr)_40px]"
      >
        <RouterView></RouterView>
      </article>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
