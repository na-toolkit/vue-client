<script setup lang="ts">
import { defineProps, withDefaults, toRef, ref } from "vue";
import BoxCard from "./BoxCard.vue";
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

const list = toRef(props, "list");
const loading = toRef(props, "loading");
</script>
<template>
  <div class="grid gap-8 m-y-4" ref="el">
    <SentenceItem
      v-for="item in list"
      :key="item.sentenceUid"
      :item="item"
    ></SentenceItem>
    <template v-if="loading">
      <NSkeleton :height="60"></NSkeleton>
      <NSkeleton :height="60" width="90%"></NSkeleton>
      <NSkeleton :height="60" width="85%"></NSkeleton>
    </template>
  </div>
</template>
