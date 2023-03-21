<script setup lang="ts">
import { defineProps, withDefaults, toRef } from "vue";
import SentenceItem from "./SentenceItem.vue";
import { NSkeleton } from "naive-ui";
import type { Sentence } from "@/types/sentence";

const props = withDefaults(
  defineProps<{ list: Sentence[]; loading: boolean }>(),
  {
    list: () => [],
    loading: false,
  }
);
const emit = defineEmits<{
  (e: "update", idx: number, modal: boolean): void;
  (e: "delete", idx: number): void;
}>();

const list = toRef(props, "list");
const loading = toRef(props, "loading");
const triggerUpdate = (modal: boolean, idx: number) => {
  emit("update", idx, modal);
};
const triggerDelete = (idx: number) => {
  emit("delete", idx);
};
</script>
<template>
  <div class="grid gap-8 m-y-4 auto-rows-min" ref="el">
    <SentenceItem
      v-for="(item, idx) in list"
      :key="item.sentenceUid"
      :item="item"
      @update="(modal) => triggerUpdate(modal, idx)"
      @delete="() => triggerDelete(idx)"
    ></SentenceItem>
    <template v-if="loading">
      <NSkeleton :height="60"></NSkeleton>
      <NSkeleton :height="60" width="90%"></NSkeleton>
      <NSkeleton :height="60" width="85%"></NSkeleton>
    </template>
  </div>
</template>
