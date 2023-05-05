<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>(),
  {
    added: false,
    removed: false,
  }
);

const { value: v, added, removed } = toRefs(props);
const value = computed(() => v.value.trim());
</script>
<template>
  <span>
    <span class="text-red" v-if="added">{{ value }}</span>
    <span class="text-green" v-else-if="removed">{{ value }}</span>
    <span v-else>{{ value }}</span>
  </span>
</template>
