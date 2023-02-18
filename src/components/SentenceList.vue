<script setup lang="ts">
import { defineProps, withDefaults, toRef } from "vue";
import BoxCard from "./BoxCard.vue";
import SentenceItem from "./SentenceItem.vue";
import type { Sentence } from "@/types/sentence";

const props = withDefaults(defineProps<{ list: Sentence[] }>(), {
  list: () => [],
});

const list = toRef(props, "list");
</script>
<template>
  <div class="grid gap-8 m-y-4">
    <SentenceItem
      v-for="item in list"
      :key="item.sentenceUid"
      :item="item"
    ></SentenceItem>
  </div>
</template>
