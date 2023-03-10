<script setup lang="ts">
import { toRef, computed, ref } from "vue";
import { NButton, NIcon } from "naive-ui";
import { EditCircle, Trash } from "@vicons/tabler";
import BoxCard from "./BoxCard.vue";
import type { Sentence } from "@/types/sentence";

const props = defineProps<{ item: Sentence }>();
const item = toRef(props, "item");
const wordList = computed(() =>
  item.value.content.split(" ").map((v, idx) => ({
    key: `${item.value.sentenceUid}-${idx}`,
    word: v,
  }))
);
const mark = ref<string[]>([]);

const markWord = (key: string) => {
  const item = mark.value.findIndex((v) => v === key);
  if (item === -1) mark.value.push(key);
  else mark.value.splice(item, 1);
};

const emit = defineEmits<{
  (e: "update"): void;
  (e: "delete"): void;
}>();

const triggerUpdate = () => {
  emit("update");
};
const triggerDelete = () => {
  emit("delete");
};
</script>
<template>
  <BoxCard class="flex">
    <div class="flex-grow-1">
      <div>
        <span
          v-for="word in wordList"
          :key="word.key"
          class="px-1px mx-2px cursor-pointer rounded text-xl ease-in-out hover:shadow-word hover:shadow-current"
          :class="{
            'shadow-word': mark.includes(word.key),
            'shadow-current': mark.includes(word.key),
          }"
          @click="() => markWord(word.key)"
        >
          {{ word.word }}
        </span>
      </div>
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
        @click="triggerDelete"
      >
        <template #icon>
          <NIcon size="24"><Trash></Trash></NIcon>
        </template>
      </NButton>
    </div>
  </BoxCard>
</template>
