<script setup lang="ts">
import { defineProps, toRef } from "vue";
import BoxCard from "./BoxCard.vue";
import type { Sentence } from "@/types/sentence";

const props = defineProps<{ item: Sentence }>();
const item = toRef(props, "item");
</script>
<template>
  <BoxCard>
    {{ item.content }}
  </BoxCard>
</template>
