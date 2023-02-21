<script setup lang="ts">
import { defineProps, toRef } from "vue";
import { NButton, NIcon } from "naive-ui";
import { EditCircle, Trash } from "@vicons/tabler";
import BoxCard from "./BoxCard.vue";
import type { Sentence } from "@/types/sentence";

const props = defineProps<{ item: Sentence }>();
const item = toRef(props, "item");

const emit = defineEmits<{
  (e: "update"): void;
}>();

const triggerUpdate = () => {
  emit("update");
};
</script>
<template>
  <BoxCard class="flex">
    <div class="flex-grow-1">
      <div>{{ item.content }}</div>
      <div>{{ item.translation }}</div>
    </div>
    <div class="grid auto-rows-min gap-2">
      <NButton
        :circle="true"
        :size="'large'"
        :text="true"
        class="w-6 h-6"
        @click="triggerUpdate"
      >
        <template #icon>
          <NIcon size="24"><EditCircle></EditCircle></NIcon>
        </template>
      </NButton>
      <NButton
        :circle="true"
        :size="'large'"
        :text="true"
        class="w-6 h-6"
        type="error"
      >
        <template #icon>
          <NIcon size="24"><Trash></Trash></NIcon>
        </template>
      </NButton>
    </div>
  </BoxCard>
</template>
