<script setup lang="ts">
import { toRef } from "vue";

const props = withDefaults(
  defineProps<{
    border?: boolean;
  }>(),
  {
    border: true,
  }
);
const border = toRef(props, "border");
</script>
<template>
  <div v-if="border" class="border-1 border-gray-dark-1 border-style-solid p-4">
    <slot></slot>
  </div>
  <div v-else class="p-4">
    <slot></slot>
  </div>
</template>
